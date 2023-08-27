import { useState, createContext } from 'react';
import SolarSystem from './components/SolarSystem';
import { MantineProvider } from '@mantine/core';
import { ChakraProvider } from '@chakra-ui/react';

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

  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <ChakraProvider>
      <OrbitContext.Provider value={{ moving, setMoving }}>
        <PositionContext.Provider value={{ position, setPosition }}>
          <SelectedPageContext.Provider value={{ page, setPage }}>
            <SolarSystem />
          </SelectedPageContext.Provider>
        </PositionContext.Provider>
      </OrbitContext.Provider>
      </ChakraProvider>
    </MantineProvider>
  );
}

export default App;
