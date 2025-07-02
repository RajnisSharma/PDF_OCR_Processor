import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import ResultsViewer from './components/ResultsViewer';
import './App.css';

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (files) => {
    setLoading(true);
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    
    try {
      const response = await axios.post(
        'http://localhost:8000/api/process/', 
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setResults(response.data);
    } catch (error) {
      console.error('Error processing files:', error);
      alert('Error processing files. Please check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>PDF OCR Processor</h1>
        <p>Extract text with 99.99% accuracy from PDF documents</p>
      </header>

      <main>
        <FileUpload onUpload={handleUpload} />
        
        {loading ? (
          <div className="loader">
            <div className="spinner"></div>
            <p>Processing documents...</p>
          </div>
        ) : (
          <ResultsViewer results={results} />
        )}
      </main>

      <footer>
        <p>OCR Processing System &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;