//@ts-nocheck
import { MantineProvider } from '@mantine/core';
import { createContext, useEffect, useState } from 'react';
import RotateScreen from './components/RotateScreen';
import SolarSystem from './components/SolarSystem';

type OrbitContextType = {
  moving: boolean;
  setMoving: React.Dispatch<React.SetStateAction<boolean>>;
};

type PositionContextType = {
  position: number[];
  setPosition: React.Dispatch<React.SetStateAction<number[]>>;
};

type SelectedPageContextType = {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
};

export const OrbitContext = createContext<OrbitContextType | undefined>(
  undefined
);

export const PositionContext = createContext<PositionContextType | undefined>(
  undefined
);

export const SelectedPageContext = createContext<
  SelectedPageContextType | undefined
>(undefined);

function App() {
  const [moving, setMoving] = useState(true);
  const [position, setPosition] = useState([0, 10, 0]);
  const [page, setPage] = useState('home');
  const isLandscape = () =>
      window.matchMedia('(orientation:landscape)').matches,
    [orientation, setOrientation] = useState(
      isLandscape() ? 'landscape' : 'portrait'
    ),
    onWindowResize = () => {
      clearTimeout(window.resizeLag);
      window.resizeLag = setTimeout(() => {
        delete window.resizeLag;
        setOrientation(isLandscape() ? 'landscape' : 'portrait');
      }, 200);
    };

  useEffect(
    () => (
      onWindowResize(),
      window.addEventListener('resize', onWindowResize),
      () => window.removeEventListener('resize', onWindowResize)
    ),
    []
  );

  return (
    <>
      {orientation === 'landscape' ? (
        <MantineProvider
          theme={{ colorScheme: 'dark' }}
          withGlobalStyles
          withNormalizeCSS
        >
          <OrbitContext.Provider value={{ moving, setMoving }}>
            <PositionContext.Provider value={{ position, setPosition }}>
              <SelectedPageContext.Provider value={{ page, setPage }}>
                <SolarSystem />
              </SelectedPageContext.Provider>
            </PositionContext.Provider>
          </OrbitContext.Provider>
        </MantineProvider>
      ) : (
        <RotateScreen />
      )}
    </>
  );
}

export default App;
