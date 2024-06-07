import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
export const config = {
  endpoint: `https://lama-6tj9.onrender.com/v1/projects`,
};
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
