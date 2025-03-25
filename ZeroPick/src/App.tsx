import '@/font.css';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function App() {
   return (
      <Router>
         <LoginPage />
      </Router>
   );
}

export default App;
