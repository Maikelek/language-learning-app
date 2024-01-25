import {BrowserRouter,Routes,Route} from "react-router-dom";
import { AuthProvider } from './pages/hooks/AuthProvider';

import Index from "./pages/notLogged/Index"
import Register from "./pages/notLogged/Register"

import Decks from "./pages/logged/Decks";
import Deck from "./pages/logged/Deck";
import DeckEdit from "./pages/logged/DeckEdit";

import "./App.css";

function App() {
  return ( 
    <div className="App">
      <AuthProvider>
        <BrowserRouter>  
          <Routes>

            <Route path="*" element={<Index/>}/>

            <Route path="/" element={<Index/>}/>
            <Route path="/register" element={<Register/>}/>

            <Route path="/decks" element={<Decks/>}/>
            <Route path="/deck/:id" element={<Deck/>}/>
            <Route path="/deck/edit/:id" element={<DeckEdit/>}/>

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;