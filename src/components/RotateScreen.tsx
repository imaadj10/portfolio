import Lottie from 'lottie-react';
import animationData from '../rotate_screen.json';

function RotateScreen() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Lottie loop autoplay animationData={animationData} />
      <h1 style={{ color: 'white' }}>Please rotate your screen!</h1>
    </div>
  );
}

export default RotateScreen;
