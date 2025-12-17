import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import "../styles/PreviousTrees.css"

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function PreviousTrees() {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/previous-trees`)
      .then(response => {
        setTrees(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.log("Error loading trees:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <main className="main-content">
        <div className="page-title">
          <h1>Previous Trees</h1>
        </div>

        {loading && <p className="loading-text">Loading previous trees...</p>}

        {!loading && trees.length === 0 && (
          <p className="empty-text">No previous trees saved yet.</p>
        )}

        {!loading && trees.length > 0 && (
          <div className="trees-grid">
            {trees.map((record) => (
              <div key={record.id} className="tree-card">
                <p><strong>Input Numbers: </strong> <span class = "tree-cardinput">({record.inputNumbers}) </span></p>
                <pre className="json-display">
                  {JSON.stringify(JSON.parse(record.treeJson), null, 2)}
                </pre>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}