import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Search from "./pages/Search";
import Restarants from "./pages/Restarants";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter> 
    <NavBar/>
     <div className="App">
      <Routes>  
        <Route path="/" element={<Restarants />} />
        <Route path="/Add" element={<Add />} />
        <Route path="/Update/:restaurantId" element={<Update />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </div>
    </BrowserRouter>
   
  );
}

export default App;
