import { Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import './css/App.css'



function App() {
  return (
    <Routes>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
    </Routes>
  );
}

export default App;
