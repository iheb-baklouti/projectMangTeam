import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { CrudProvider } from './contexts/CrudContext';
import AppRoutes from './routes/AppRoutes';
import Toaster from './components/ui/Toaster';

function App() {
  return (
    <Router>
      <UserProvider>
        <CrudProvider>
          <AppRoutes />
          <Toaster />
        </CrudProvider>
      </UserProvider>
    </Router>
  );
}

export default App;