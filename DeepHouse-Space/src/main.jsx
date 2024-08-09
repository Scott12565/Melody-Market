import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import SongcontextProvider from './context/songContext';
import { HelmetProvider } from 'react-helmet-async';
import AuthContextProvider from './context/firebaseContext.jsx';

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider >
      <AuthContextProvider>
        <SongcontextProvider>
          <App />
        </SongcontextProvider>
      </AuthContextProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
