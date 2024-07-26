import ReactDOM from 'react-dom'; // Correct import statement
import App from './App.jsx';
import './index.css';
import SongcontextProvider from './context/songContext';
import HelmetProvider from "'react-helmet-async"

ReactDOM.render(
  <React.StrictMode>
    <SongcontextProvider>
      <HelmetProvider >
        <App />
      </HelmetProvider>
      
    </SongcontextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
