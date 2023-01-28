import './App.css';
import Contact from './Components/Contact';
import FetchData from './Components/FetchData';

function App() {
  return (
    <div className="App">
      <h1>Welcome to First Mern Practice Website - by <span className='text-primary'>Ajay Rai</span></h1>
      <FetchData />
      <Contact />
    </div>
  );
}

export default App;
