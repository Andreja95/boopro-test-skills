import {Route, BrowserRouter as Router} from 'react-router-dom';
import DashboardPage from './pages/dashboard-page';
import Login from './pages/Login.js';
import Home from './pages/Home.js'
// import './App.css';

function App() {
  return (
    <Router>
      <Route path="/home" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard-page" component={DashboardPage} />
    </Router>

  );
}

export default App;
