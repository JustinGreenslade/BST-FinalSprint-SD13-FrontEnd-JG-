import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import PreviousTrees from './pages/PreviousTrees.jsx';
import './styles/App.css';



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/previous" element={<PreviousTrees />} />
      </Routes>
    </Router>
  );
}