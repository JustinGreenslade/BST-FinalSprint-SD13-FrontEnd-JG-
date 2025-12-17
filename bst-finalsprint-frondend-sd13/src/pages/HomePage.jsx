import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/homePage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function HomePage() {
  const [input, setInput] = useState('');
  const [tree, setTree] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setTree(null);

    // Simple parsing – good enough, no extra trim/filter stuff
    const numbers = input.split(',').map(num => parseInt(num));

    // Basic check
    if (numbers.length === 0 || numbers.some(isNaN)) {
      setError('Please enter numbers separated by commas');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/process-numbers`, numbers);
      setTree(response.data);
    } catch (err) {
      setError('Something went wrong, is the backend running?');
    }
  };

  return (
    <>
      <Header />
      <main className="main-content">
        <div className="container form-card">
          <h1>Binary Search Tree Builder</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. 2, 1, 4, 3, 5"
              className="input-box"
            />
            <button type="submit" className="submit-btn">Build Tree</button>
          </form>

          {error && <p className="error">{error}</p>}

          {tree && (
            <div className="result">
              <h2>Resulting Tree Structure</h2>
              <pre className="json-display">
                {JSON.stringify(tree, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}