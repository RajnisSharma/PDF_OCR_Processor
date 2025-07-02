import React, { useState } from 'react';

const DocumentViewer = ({ data }) => {
  const [activePage, setActivePage] = useState(0);

  if (!data.length) return <div>No data available</div>;

  const page = data[activePage];

  return (
    <div className="document-viewer">
      <div className="page-selector">
        {data.map((_, index) => (
          <button
            key={index}
            className={`page-btn ${activePage === index ? 'active' : ''}`}
            onClick={() => setActivePage(index)}
          >
            Page {index + 1}
          </button>
        ))}
      </div>

      <div className="document-content">
        <div className="document-section">
          <h3>Header</h3>
          <p>{page.header || 'No header detected'}</p>
        </div>

        <div className="document-section">
          <h3>Body Content</h3>
          {page.paragraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {page.tables.length > 0 && (
          <div className="document-section">
            <h3>Tables</h3>
            {page.tables.map((table, tableIdx) => (
              <div key={tableIdx} className="document-table">
                <table>
                  <tbody>
                    {table.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {row.map((cell, cellIdx) => (
                          <td key={cellIdx}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}

        <div className="document-section">
          <h3>Footer</h3>
          <p>{page.footer || 'No footer detected'}</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;