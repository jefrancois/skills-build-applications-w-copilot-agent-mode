
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Log the backend API base URL for debugging
console.log('Backend API base URL:', process.env.REACT_APP_CODESPACE_URL);

reportWebVitals();
