import './App.css';
import Header from './Components/Header';
import HeroSection from './Components/HeroSection';
export const config = {
  endpoint: `https://lama-6tj9.onrender.com/v1/projects`,
};
function App() {
  return (
    <div className="App">
      <Header/>
      <HeroSection/>
    </div>
  );
}

export default App;
