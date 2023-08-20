import { useState, createContext } from 'react';
import SolarSystem from './components/SolarSystem';

type OrbitContextType = {
  moving: boolean;
  setMoving: React.Dispatch<React.SetStateAction<boolean>>;
};

type PositionContextType = {
  position: number[];
  setPosition: React.Dispatch<React.SetStateAction<number[]>>;
};

export const OrbitContext = createContext<OrbitContextType | undefined>(
  undefined
);

export const PositionContext = createContext<PositionContextType | undefined>(
  undefined
);

function App() {
  const [moving, setMoving] = useState(true);
  const [position, setPosition] = useState([0, 10, 0]);

  return (
    <OrbitContext.Provider value={{ moving, setMoving }}>
      <PositionContext.Provider value={{ position, setPosition }}>
        <SolarSystem />
      </PositionContext.Provider>
    </OrbitContext.Provider>
  );
}

export default App;
