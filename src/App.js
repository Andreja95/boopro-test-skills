import {Route, BrowserRouter as Router} from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
// import './App.css';

function App() {
    return (
        <Router>
            <Route path='/' component={Home} exact />
            <Route path='/login' component={Login} />
            <ProtectedRoute path='/dashboardPage' component={DashboardPage} />
        </Router>
    );
}

export default App;
