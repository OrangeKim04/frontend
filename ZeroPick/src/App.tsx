import '@/font.css';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
function App() {
   return (
      <Router>
         <SignUpPage />
      </Router>
   );
}

export default App;
