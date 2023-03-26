import './App.css';
import Navbaar from './components/Navbaar';
import Home from './components/Home';
import Register from './components/Register';
import Edit from './components/Edit';
import Details from './components/Details';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbaar />
        <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/edit/:id" element={<Edit/>}/>
        <Route exact path="/view/:id" element={<Details/>}/>
        </Routes>
    </>
  );
}

export default App;
