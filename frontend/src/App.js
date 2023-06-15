import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/LandingPage'
import ToDoPage from './Pages/ToDoPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<ToDoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
