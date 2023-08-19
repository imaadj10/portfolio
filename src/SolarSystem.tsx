import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import './SolarSystem.css';
import StellarObjectGeometry from './StellarObjectGeometry';
import StellarObject from './StellarObject';

const moon: StellarObject = new StellarObject('/planet_models/Planet_32.glb', 0.1,[]);
const earth: StellarObject = new StellarObject('/planet_models/Planet_2.glb', 0.2, [moon]);
const mercury: StellarObject = new StellarObject('/planet_models/Planet_3.glb', 0.2,[]);;
const venus: StellarObject = new StellarObject('/planet_models/Planet_4.glb', 0.2,[]);;
const mars: StellarObject = new StellarObject('/planet_models/Planet_5.glb', 0.2,[]);;
const jupiter: StellarObject = new StellarObject('/planet_models/Planet_6.glb', 0.2,[]);;
const saturn: StellarObject = new StellarObject('/planet_models/Planet_7.glb', 0.2,[]);;
const uranus: StellarObject = new StellarObject('/planet_models/Planet_8.glb', 0.2,[]);;
const neptune: StellarObject = new StellarObject('/planet_models/Planet_9.glb', 0.2,[]);;
const sun: StellarObject = new StellarObject('/planet_models/Planet_10.glb', 0.2, [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune]);

function SolarSystem() {
  return (
    <Canvas>
      <OrbitControls />
      <Stars factor={6} fade speed={0} />
      <ambientLight intensity={1} />
      <pointLight position={[0, 10, 0]} intensity={500} color="white" />
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
