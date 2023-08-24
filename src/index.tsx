import ReactDOM from 'react-dom/client';
import App from './App';
import MobileApp from './MobileApp';
import { isMobile } from 'react-device-detect';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  isMobile ? <MobileApp /> : <App />
);
