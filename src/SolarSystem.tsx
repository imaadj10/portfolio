import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import './SolarSystem.css';
import StellarObjectGeometry from './StellarObjectGeometry';
import StellarObject from './StellarObject';

const moon: StellarObject = new StellarObject(0.25, []);
const earth: StellarObject = new StellarObject(0.5, [moon]);
const earth2: StellarObject = new StellarObject(0.5, []);
const sun: StellarObject = new StellarObject(1, [earth]);

function SolarSystem() {


  return (
    <Canvas>
      <OrbitControls />
      <Stars factor={6} fade speed={0} />
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 10, 10]} intensity={500} color="white" />
      <StellarObjectGeometry
        size={1}
        position={[0, 0, 0]}
        isStar={true}
        color={'yellow'}
        model={'/models/Sun.glb'}
        scale={2}
      />
      
      {sun.orbiters.map((planet, p_index) => (
        <>
          <StellarObjectGeometry
            position={[(p_index + 1) * 5, 0, (p_index + 1) * 5]}
            color={'blue'}
            size={planet.size}
            key={p_index}
            model={'/models/Earth.glb'}
            scale={0.001}
          />
          {planet.orbiters.map((moon, m_index) => (
            <StellarObjectGeometry
              key={`${p_index}-${m_index}`}
              position={[
                (p_index + 1) * 5,
                (m_index + 1) * 2,
                (p_index + 1) * 5,
              ]}
              color={'gray'}
              isMoon={true}
              size={moon.size}
              model={'/models/Moon.glb'}
              scale={0.005}
            />
          ))}
        </>
      ))}
    </Canvas>
  );
}

export default SolarSystem;
