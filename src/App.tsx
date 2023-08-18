import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import './App.css';
import CelestialObject from './CelestialObject';

function App() {
  return (
    <Canvas>
      <OrbitControls />
      <Stars factor={6} fade speed={0} />
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 10, 10]} intensity={500} color="white" />
      <CelestialObject position={[0, 0, 0]} isStar={true} color={'blue'} />
      <CelestialObject position={[5, 0, -5]} color={'red'} />
      <CelestialObject position={[10, 0, 10]} color={'green'} />
    </Canvas>
  );
}

export default App;
