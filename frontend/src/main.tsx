import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the main App component

// Create a root for the application and render the App component
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
