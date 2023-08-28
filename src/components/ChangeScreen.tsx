import Lottie from 'lottie-react';
import { isMobile } from 'react-device-detect';
import expandScreen from '../animations/expand_screen.json';
import rotateScreen from '../animations/rotate_screen.json';

function ChangeScreen() {
  const animationData = isMobile ? rotateScreen : expandScreen;

  return (
    <div style={{ textAlign: 'center' }}>
      <Lottie loop autoplay animationData={animationData} />
      <h1 style={{ color: 'white' }}>
        {isMobile ? 'Please rotate your screen!' : 'Please expand your screen!'}
      </h1>
    </div>
  );
}

export default ChangeScreen;
