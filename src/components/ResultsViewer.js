import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import DocumentViewer from './DocumentViewer';

const ResultsViewer = ({ results }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [viewMode, setViewMode] = useState('structured'); // 'structured' or 'raw'

  if (!results.length) return <div className="empty-state">Upload PDFs to see results</div>;

  return (
    <div className="results-container">
      <div className="tabs">
        {results.map((result, index) => (
          <button
            key={index}
            className={`tab ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {result.filename}
          </button>
        ))}
      </div>

      <div className="view-controls">
        <button 
          className={`view-btn ${viewMode === 'structured' ? 'active' : ''}`}
          onClick={() => setViewMode('structured')}
        >
          Structured View
        </button>
        <button 
          className={`view-btn ${viewMode === 'raw' ? 'active' : ''}`}
          onClick={() => setViewMode('raw')}
        >
          JSON View
        </button>
      </div>

      <div className="result-content">
        {viewMode === 'structured' ? (
          <DocumentViewer data={results[activeTab].structured_data} />
        ) : (
          <ReactJson 
            src={results[activeTab]} 
            theme="monokai"
            displayDataTypes={false}
            collapsed={1}
          />
        )}
        <div className="processing-info">
          Processed in {results[activeTab].processing_time.toFixed(2)} seconds
        </div>
      </div>
    </div>
  );
};

export default ResultsViewer;