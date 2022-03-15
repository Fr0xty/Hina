import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AvatarHistory from './pages/AvatarHistory';
import Home from './pages/Home';
// import CommandHelp from './pages/CommandHelp';

/**
 * pages
 */

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/command-help" element={<CommandHelp />} /> */}
                    <Route path="/api/avatar-history/:userId" element={<AvatarHistory />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
