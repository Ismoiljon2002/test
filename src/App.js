import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Game1 from './components/Game1';
import Game2 from './components/Game2';
import Navigate from './components/Navigate';
import './Bootstrap/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
        <BrowserRouter >
            <Navigate />
            
            <Routes>
                <Route path='/' element={<Game1 />} />
                <Route path='/game2' element={<Game2 />} />
            </Routes>


        </BrowserRouter>
    </div>
  );
}

export default App;
