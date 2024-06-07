import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {DataProvider} from './Components/DataContext';
import HomePage from './Pages/HomePage';
import ProjectPage from './Pages/ProjectPage';
export const config = {
  endpoint: `https://lama-6tj9.onrender.com/v1/projects`,
};
function App() {
  return (
    <div className="App">
      <DataProvider>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/project' element={<ProjectPage/>}/>
          </Routes>
        </Router>
      </DataProvider>
    </div>
  );
}

export default App;
