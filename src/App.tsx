import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import AvatarHistory from './pages/AvatarHistory';
import Home from './pages/Home';
import Commands from './pages/Commands';

/**
 * pages
 */
function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/commands" element={<Commands />} />
                    <Route path="/api/avatar-history/:userId" element={<AvatarHistory />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
