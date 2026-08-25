// @ts-nocheck
import { Center, Line, Text3D } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

// Convergence-per-second rates for the ring/label fade — bump these up for
// a snappier reappearance, down for a slower one. Text fades in a bit
// faster than the line itself (matches the original 2x ratio).
const LINE_OPACITY_RATE = 3;
const TEXT_OPACITY_RATE = 6;

// Hover feedback: the label's letters spread apart rather than recolor,
// and the plain ring crossfades into the site's violet-to-cyan card
// gradient. Same palette as GlassCard.css's --accent / --accent-2.
const HOVER_RATE = 6;
const LETTER_SPACING_REST = -0.06;
const LETTER_SPACING_HOVER = 0.18;
// Below this we snap straight to the target instead of continuing to
// ease — unlike the ref-mutated values below, letterSpacing feeds
// Text3D's geometry args, so every change rebuilds the glyph geometry.
// Cheap for a short label, but there's no reason to keep paying for it
// once the motion is visually done.
const LETTER_SPACING_EPSILON = 0.001;
const ACCENT_VIOLET = new THREE.Color('#a855f7');
const ACCENT_CYAN = new THREE.Color('#22d3ee');

function OrbitLine({ radius = 1, handleClick, moving, current_page }) {
  const [hovered, setHovered] = useState(false);
  const [letterSpacing, setLetterSpacing] = useState(LETTER_SPACING_REST);
  const textRef = useRef();
  const lineRef = useRef();
  const gradientLineRef = useRef();
  const visible = moving;

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useFrame((_state, delta) => {
    const hoverAlpha = 1 - Math.exp(-HOVER_RATE * delta);

    const spacingTarget = hovered ? LETTER_SPACING_HOVER : LETTER_SPACING_REST;
    setLetterSpacing((current) => {
      if (current === spacingTarget) return current;
      const next = THREE.MathUtils.lerp(current, spacingTarget, hoverAlpha);
      return Math.abs(spacingTarget - next) < LETTER_SPACING_EPSILON
        ? spacingTarget
        : next;
    });

    const lineTarget = visible && !hovered ? 1 : 0;
    lineRef.current.material.opacity = THREE.MathUtils.lerp(
      lineRef.current.material.opacity,
      lineTarget,
      1 - Math.exp(-LINE_OPACITY_RATE * delta)
    );
    textRef.current.material.opacity = THREE.MathUtils.lerp(
      textRef.current.material.opacity,
      visible ? 1 : 0,
      1 - Math.exp(-TEXT_OPACITY_RATE * delta)
    );

    const gradientTarget = visible && hovered ? 1 : 0;
    gradientLineRef.current.material.opacity = THREE.MathUtils.lerp(
      gradientLineRef.current.material.opacity,
      gradientTarget,
      hoverAlpha
    );
    gradientLineRef.current.material.linewidth = THREE.MathUtils.lerp(
      gradientLineRef.current.material.linewidth,
      hovered ? 1.4 : 0.5,
      hoverAlpha
    );
  });

  const handleHoverOver = () => {
    if (visible) setHovered(true);
  };

  const handleHoverOut = () => {
    if (visible) setHovered(false);
  };

  const handleOrbitClick = () => {
    setHovered(false);
    handleClick();
  };

  // Doesn't depend on the label's current spacing, so it's stable across
  // the hover transition instead of being rebuilt on every frame that
  // moves letterSpacing.
  const points = useMemo(() => {
    const circle = [];
    for (let index = 0; index < 256; index++) {
      const angle = (index / 256) * 2 * Math.PI;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      circle.push(new THREE.Vector3(x, 0, z));
    }
    circle.push(circle[0]);
    return circle;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radius]);

  // The label sits at angle = PI/2 (x=0, z=radius), where the ring's curve
  // runs almost parallel to the text baseline — leave a gap there so the
  // visible ring doesn't draw straight through the words. Gap width is
  // sized in arc-length from the label's character count (longer words
  // need a wider gap), then converted to an angle for this ring's radius.
  // The extra term grows the gap as the hovered label's letters spread
  // apart, so the ring keeps clearing the widened text instead of
  // cutting through it.
  const labelAngle = Math.PI / 2;
  const spacingGrowth = Math.max(0, letterSpacing - LETTER_SPACING_REST);
  const extraArcLength = spacingGrowth * Math.max(0, current_page.length - 1);
  const targetArcLength = current_page.length * 1 + 1 + extraArcLength;
  const gapAngle = Math.min(1.2, targetArcLength / radius);
  const visiblePoints = [];
  for (let index = 0; index <= 256; index++) {
    const angle =
      labelAngle + gapAngle / 2 + (index / 256) * (2 * Math.PI - gapAngle);
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    visiblePoints.push(new THREE.Vector3(x, 0, z));
  }

  // Sweeps violet -> cyan -> violet across the ring (a triangle wave over
  // arc position) so the gradient reads as a glow centered opposite the
  // label, echoing the diagonal violet/cyan sweep on the card border.
  const gradientColors = useMemo(() => {
    const mixColor = new THREE.Color();
    return visiblePoints.map((_point, index) => {
      const t = index / (visiblePoints.length - 1);
      const mix = t <= 0.5 ? t * 2 : (1 - t) * 2;
      mixColor.copy(ACCENT_VIOLET).lerp(ACCENT_CYAN, mix);
      return mixColor.toArray();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radius, gapAngle]);

  // Memoized so it's created once per mount, not on every re-render — a
  // fresh material defaults to opacity 1, and this component re-renders
  // often (whenever `moving` changes), so recreating it here caused the
  // label to flash to full brightness for a frame before the very next
  // useFrame tick pulled it back down toward its real faded target.
  const textMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        transparent: true,
        metalness: 1,
        roughness: 0.5,
        opacity: 0,
        color: 'white',
      }),
    []
  );

  return (
    <>
      <Center
        rotation={[-0.25, 0, 0]}
        position={[0, 0, radius]}
        // Center only re-measures its child's bounding box when this key
        // changes — by default that's once, on mount. Without it, the
        // recentering offset stays locked to the rest-state text width,
        // so widening letterSpacing on hover only grows the word to one
        // side instead of spreading it evenly from the middle.
        cacheKey={letterSpacing}
      >
        <Text3D
          ref={textRef}
          letterSpacing={letterSpacing}
          size={1.5}
          font="/fonts/EngraversGothic BT_Regular.json"
          material={textMaterial}
        >
          {current_page}
        </Text3D>
        <pointLight
          position={[0, 0, radius - 2]}
          intensity={175}
          color="#edd59e"
        />
      </Center>

      <Line
        transparent={true}
        ref={lineRef}
        points={visiblePoints}
        color={'#c9c6c9'}
        lineWidth={0.5}
      />
      <Line
        transparent={true}
        ref={gradientLineRef}
        points={visiblePoints}
        // LineMaterial multiplies vertex colors by the base `color` prop
        // (drei's Line defaults that to black), so it must be white here
        // or the gradient gets zeroed out to black regardless of opacity.
        color="white"
        vertexColors={gradientColors}
        lineWidth={0.5}
      />
      <Line
        points={points}
        onPointerOver={handleHoverOver}
        onPointerOut={handleHoverOut}
        onClick={handleOrbitClick}
        visible={false}
        lineWidth={20}
      />
    </>
  );
}

export default OrbitLine;
