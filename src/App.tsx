import { createContext, useContext, useEffect, useRef, useState } from 'react';
import MobilePage from './components/MobilePage';
import SolarSystem from './components/SolarSystem';

// Below this width the 3D scene has nowhere near enough room for the
// orbit rings/camera framing to read correctly, so the flat scrolling
// page takes over instead — whether that's an actual phone or just a
// narrow desktop window.
const MIN_DESKTOP_WIDTH = 900;

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

// Each hook narrows past the `| undefined` a bare useContext() call would
// carry (providers always wrap the tree below, but createContext has no way
// to encode that) and gives a clear error instead of a silent runtime crash
// if a consumer is ever rendered outside its provider.
export function useOrbitContext(): OrbitContextType {
  const context = useContext(OrbitContext);
  if (!context) throw new Error('useOrbitContext must be used within OrbitContext.Provider');
  return context;
}

export function usePositionContext(): PositionContextType {
  const context = useContext(PositionContext);
  if (!context) throw new Error('usePositionContext must be used within PositionContext.Provider');
  return context;
}

export function useSelectedPageContext(): SelectedPageContextType {
  const context = useContext(SelectedPageContext);
  if (!context) throw new Error('useSelectedPageContext must be used within SelectedPageContext.Provider');
  return context;
}

function App() {
  const [moving, setMoving] = useState(true);
  const [position, setPosition] = useState([0, 10, 0]);
  const [page, setPage] = useState('home');
  const resizeLagRef = useRef<ReturnType<typeof setTimeout>>();
  const isWideEnough = () =>
      window.matchMedia(`(min-width: ${MIN_DESKTOP_WIDTH}px)`).matches,
    [wide, setWide] = useState(isWideEnough()),
    onWindowResize = () => {
      clearTimeout(resizeLagRef.current);
      resizeLagRef.current = setTimeout(() => {
        setWide(isWideEnough());
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

  if (!wide) return <MobilePage />;

  return (
    <OrbitContext.Provider value={{ moving, setMoving }}>
      <PositionContext.Provider value={{ position, setPosition }}>
        <SelectedPageContext.Provider value={{ page, setPage }}>
          <SolarSystem />
        </SelectedPageContext.Provider>
      </PositionContext.Provider>
    </OrbitContext.Provider>
  );
}

export default App;
