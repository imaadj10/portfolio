import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import './App.css';
import StellarObjectGeometry from './StellarObjectGeometry';
import StellarObject from './StellarObject';

const moon: StellarObject = new StellarObject([]);
const moon2: StellarObject = new StellarObject([])
const earth: StellarObject = new StellarObject([moon, moon2]);
const earth2: StellarObject = new StellarObject([moon]);
const sun: StellarObject = new StellarObject([earth, earth2]);

function SolarSystem() {
  return (
    <Canvas>
      <OrbitControls />
      <Stars factor={6} fade speed={0} />
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 10, 10]} intensity={500} color='white' />
      <StellarObjectGeometry position={[0, 0, 0]} isStar={true} color={'yellow'} />
      {sun.orbiters.map((planet, p_index) => (
        <>
          <StellarObjectGeometry
            position={[(p_index + 1) * 5, 0, (p_index + 1) * 5]}
            color={'blue'}
            key={p_index}
          />
          {planet.orbiters.map((moon, m_index) => (
            <StellarObjectGeometry
              key={`${p_index}-${m_index}`}
              position={[(p_index + 1) * 5, (m_index + 1) * 5, (p_index + 1) * 5]}
              color={'green'}
            />
          ))}
        </>
      ))}
    </Canvas>
  );
}

export default SolarSystem;
