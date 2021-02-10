import {Route, BrowserRouter as Router} from 'react-router-dom';
import DashboardPage from './pages/dashboard-page';
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import ProtectedRoute from './components/ProtectedRoute';
// import './App.css';

function App() {
    return (
        <Router>
            <Route path='/' component={Home} exact />
            <Route path='/login' component={Login} />
            <ProtectedRoute path='/dashboard-page' component={DashboardPage} />
        </Router>
    );
}

export default App;
