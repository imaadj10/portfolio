import { useProgress } from '@react-three/drei';
import '../css/LoadingScreen.css';

function LoadingScreen() {
  const { progress } = useProgress();

  return (
    <>
      {progress < 100 && (
        <div id="universe">
          <div id="galaxy">
            <div className="circle"></div>
            <div className="circle2"></div>
            <div className="circle3"></div>
            <div id="orbit0">
              <div id="pos0">
                <div id="dot0"></div>
              </div>
            </div>
            <div id="orbit1">
              <div id="pos1">
                <div id="dot1"></div>
              </div>
            </div>
            <div id="orbit2">
              <div id="pos2">
                <div id="dot2"></div>
              </div>
            </div>
            <div id="orbit3">
              <div id="pos3">
                <div id="dot3"></div>
              </div>
            </div>
          </div>
          <p
            style={{
              fontSize: '12px',
              color: '#eee',
              marginTop: '55px',
              opacity: 0.7,
            }}
          >
            Loading {progress.toFixed(2)}%
          </p>
        </div>
      )}
    </>
  );
}

export default LoadingScreen;
