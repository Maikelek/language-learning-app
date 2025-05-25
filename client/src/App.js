import {BrowserRouter,Routes,Route} from "react-router-dom";

import Index from "./pages/notLogged/Index"
import Register from "./pages/notLogged/Register"

import Decks from "./pages/logged/Decks";
import Deck from "./pages/logged/Deck";
import DeckEdit from "./pages/logged/DeckEdit";

import ProtectedRoute from "./pages/hooks/ProtectedRoutes";

import "./App.css";

function App() {
  return ( 
    <div>
        <BrowserRouter>  
          <Routes>

            <Route path="*" element={<Index/>}/>

            <Route path="/" element={<Index/>}/>
            <Route path="/register" element={<Register/>}/>

            <Route path="/decks" element={<ProtectedRoute> {<Decks />} </ProtectedRoute>}/>
            <Route path="/deck/:id" element={<ProtectedRoute> {<Deck />} </ProtectedRoute>}/>
            <Route path="/deck/edit/:id" element={<ProtectedRoute> {<DeckEdit />} </ProtectedRoute>}/>

          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;