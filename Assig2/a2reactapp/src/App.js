import { Link, Outlet } from 'react-router-dom'; import RegionList from './components/RegionList';
import './App.css';

function App() {
    return (
        <div className="App container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Environment Data</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link active" to="/Home">Home</Link>
                            <Link className="nav-link" to="/Contact">Contact</Link>
                            <Link className="nav-link" to="/Regions">Regions</Link>
                            <Link className="nav-link" to="/Countries">Countries</Link>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet/>
        </div>
    );
}

export default App;
