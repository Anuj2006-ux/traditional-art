
import './App.css';
import Login from './components/Login';
import Home from './components/Home';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shopping from './components/Shopping';
import { CartProvider } from './components/CartContext';
import Cartpage from './components/Cartpage';
import Register2 from './components/Register2';
import Forgetpassword from './components/Forgetpassword';
import Gallery from './components/Gallery';
import Supportpage from './components/Supportpage';

import Orderpage from './components/Orderpage';
import About from './components/About';
import Contact from './components/Contact';
// import Artmatcher from './components/Artmatcher';
import Create from './components/Create';

import Landing from './components/LandingPage';
import Artmatcher from './components/Artmatcher';
import Special from './components/Special';
import Puzzle from './components/Puzzle';
// import Quiz from './components/Quiz';




function App() {
  return (
    <CartProvider>
    <Router>
       <Routes>
        <Route path="/" element={<Login />} />
         <Route path="/Register2" element={<Register2/>} />
        <Route path="/Forgetpassword" element={<Forgetpassword />} />
         <Route path="/Gallery" element={<Gallery />} />
           <Route path="/Order" element={<Orderpage />} />
           <Route path="/" element={<Orderpage />} />
           <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            {/* <Route path="/Artmatcher" element={<Artmatcher />} /> */}
             <Route path="/Create" element={<Create />} />
             
              <Route path="/Landing" element={<Landing />} />
              <Route path="/Supportpage" element={<Supportpage />} />
              <Route path="/Artmatcher" element={<Artmatcher />} />
                 <Route path="/Special" element={<Special />} />
                  {/* <Route path="/Quiz" element={<Quiz />} /> */}
                  <Route path="/Puzzle" element={<Puzzle />} />



        <Route path="/Home" element={<Home />} />
          <Route path="/Shopping" element={<Shopping />} />
           <Route path="/cart" element={<Cartpage />} />
      </Routes>
    </Router>
    </CartProvider>
   
   
  );
}

export default App;
