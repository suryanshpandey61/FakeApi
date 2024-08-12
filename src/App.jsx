
import { Route,Routes } from 'react-router-dom';
import Cart from './pages/cart';
import Admin from "./pages/admin";
import Navbar from "./component/Navbar";
import Shop from './pages/shop';




import './App.css'
import AddNewData from './component/AddNewData';

function App() {
  

  return (
    <>

     <Navbar path="/" element={<Navbar/>}/>

     <Routes>
        <Route path='/addnewdata' element={<AddNewData/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/" element={<Shop/>}/>
     </Routes>
     
    </>
  )
}

export default App
