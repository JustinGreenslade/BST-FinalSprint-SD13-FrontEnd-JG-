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
  const [balanced, setBalanced] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setTree(null);

    const numbers = input.split(',').map(num => parseInt(num));

    if (numbers.length === 0 || numbers.some(isNaN)) {
      setError('Please enter numbers separated by commas');
      return;
    }

    try {
      const url = `${API_URL}/process-numbers${balanced ? '?balanced=true' : ''}`;
      
      const response = await axios.post(url, numbers);
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
              placeholder="eg 2, 1, 4, 3, 5"
              className="input-box"
            />

            <div className="checkbox-wrapper">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={balanced}
                  onChange={(e) => setBalanced(e.target.checked)}
                />
                <span>Build Balanced Tree</span>
              </label>
            </div>

            <button type="submit" className="submit-btn">Build Tree</button>
          </form>

          {error && <p className="error">{error}</p>}

          {tree && (
            <div className="result">
              <h2>Resulting Tree Structure</h2>
              
              {tree.type && (
                <p className="tree-type-info">
                  This is a {tree.type === 'balanced' ? 'Balanced' : 'Sequential'} BST
                </p>
              )}

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