import React, { useContext } from 'react';
import { createContext, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import './SolarSystem.css';
import StellarObjectGeometry from './StellarObjectGeometry';
import StellarObject from './StellarObject';

type OrbitContextType = {
  moving: boolean;
  setMoving: React.Dispatch<React.SetStateAction<boolean>>;
};

export const OrbitContext = createContext<OrbitContextType | undefined>(
  undefined
);

const moon: StellarObject = new StellarObject(
  1,
  '/planet_models/Planet_32.glb',
  0.05,
  []
);
const mercury: StellarObject = new StellarObject(
  1,
  '/planet_models/Planet_3.glb',
  0.05,
  []
);
const earth: StellarObject = new StellarObject(
  2.5,
  '/planet_models/Planet_2.glb',
  0.1,
  [moon, mercury]
);

const venus: StellarObject = new StellarObject(
  2.5,
  '/planet_models/Planet_4.glb',
  0.1,
  []
);
const mars: StellarObject = new StellarObject(
  2,
  '/planet_models/Planet_5.glb',
  0.1,
  []
);
const jupiter: StellarObject = new StellarObject(
  5,
  '/planet_models/Planet_6.glb',
  0.1,
  []
);
const saturn: StellarObject = new StellarObject(
  4.5,
  '/planet_models/Planet_7.glb',
  0.1,
  []
);
const uranus: StellarObject = new StellarObject(
  3,
  '/planet_models/Planet_8.glb',
  0.1,
  []
);
const neptune: StellarObject = new StellarObject(
  3,
  '/planet_models/Planet_9.glb',
  0.1,
  []
);
const sun: StellarObject = new StellarObject(10, '/planet_models/Sun.glb', 4, [

  venus,
  earth,
  mars,
  jupiter,
  saturn,
  uranus,
  neptune,
]);

function SolarSystem() {
  return (
    <Canvas>
      <OrbitControls />
      <Stars factor={6} fade speed={0} />
      <ambientLight intensity={1.5} />
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
                (m_index + 1) * 1.5,
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

function App() {
  const [moving, setMoving] = useState(true);
  const handleClick = () => {
    setMoving(true);
  };
  return (
    <OrbitContext.Provider value={{ moving, setMoving }}>
      {!moving && <button style={{ position: 'absolute', zIndex: 9999 }} onClick={handleClick}>Resume Orbits</button>}
      <SolarSystem />
    </OrbitContext.Provider>
  );
}

export default App;
