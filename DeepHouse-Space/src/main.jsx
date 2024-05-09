import ReactDOM from 'react-dom'; // Correct import statement
import App from './App.jsx';
import './index.css';
import SongcontextProvider from './context/songContext';

ReactDOM.render(
  <React.StrictMode>
    <SongcontextProvider>
      <App />
    </SongcontextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
