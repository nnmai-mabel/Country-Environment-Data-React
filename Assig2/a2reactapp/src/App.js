import RegionList from './components/RegionList';
import './App.css';

function App() {
    return (
        <div className="App container">
            <div className="bg-light py-1 mb-2">
                <h2 className="text-center">Region</h2>
            </div>
            <div className="row justify-content-center">
                <RegionList />
            </div>
        </div>
    );
}

export default App;
