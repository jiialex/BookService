import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home.jsx'

function App() {
  return (
    <>
     <BrowserRouter>
     <Navbar/>
     <Routes>
<Route path="/" element={<Home/>}/>

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
