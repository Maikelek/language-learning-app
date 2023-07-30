import {BrowserRouter,Routes,Route} from "react-router-dom";

import Index from "./pages/notLogged/Index"
import Login from "./pages/notLogged/Login"
import Register from "./pages/notLogged/Register"

import Profile from "./pages/logged/Profile";
import Decks from "./pages/logged/Decks";
import Deck from "./pages/logged/Deck";
import Review from "./pages/logged/Review";

import "./App.css";

function App() {
  return ( 
    <div className="App">
      <BrowserRouter>  
        <Routes>

          <Route path="*" element={<Index/>}/>

          <Route path="/" element={<Index/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>

          <Route path="/profile" element={<Profile/>}/>
          <Route path="/decks" element={<Decks/>}/>
          <Route path="/deck/:id" element={<Deck/>}/>
          <Route path="/review/:id" element={<Review/>}/>



        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;