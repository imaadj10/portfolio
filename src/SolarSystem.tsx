import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import './SolarSystem.css';
import StellarObjectGeometry from './StellarObjectGeometry';
import StellarObject from './StellarObject';

const moon: StellarObject = new StellarObject('/models/Moon.glb', 0.015,[]);
const earth: StellarObject = new StellarObject('/models/Earth.glb', 0.003, [moon]);
const mercury: StellarObject = new StellarObject('/models/Mercury.glb', 3,[]);;
const venus: StellarObject = new StellarObject('/models/Venus.glb', 3,[]);;
const mars: StellarObject = new StellarObject('/models/Mars.glb', 3,[]);;
const jupiter: StellarObject = new StellarObject('/models/Jupiter.glb', 0.025,[]);;
const saturn: StellarObject = new StellarObject('/models/Saturn.glb', 3,[]);;
const uranus: StellarObject = new StellarObject('/models/Uranus.glb', 3,[]);;
const neptune: StellarObject = new StellarObject('/models/Neptune.glb', 0.03,[]);;
const sun: StellarObject = new StellarObject('/models/Sun.glb', 4, [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune]);

function SolarSystem() {
  return (
    <Canvas>
      <OrbitControls />
      <Stars factor={6} fade speed={0} />
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 10, 10]} intensity={500} color="white" />
      <StellarObjectGeometry
        position={[0, 0, 0]}
        isStar={true}
        model={sun.model}
        scale={sun.scale}
      />
      
      {sun.orbiters.map((planet, p_index) => (
        <>
          <StellarObjectGeometry
            position={[(p_index + 1) * 5, 0, (p_index + 1) * 5]}
            key={p_index}
            model={planet.model}
            scale={planet.scale}
          />
          {planet.orbiters.map((moon, m_index) => (
            <StellarObjectGeometry
              key={`${p_index}-${m_index}`}
              position={[
                (p_index + 1) * 5,
                (m_index + 1) * 2,
                (p_index + 1) * 5,
              ]}
              isMoon={true}
              model={moon.model}
              scale={moon.scale}
            />
          ))}
        </>
      ))}
    </Canvas>
  );
}

export default SolarSystem;
