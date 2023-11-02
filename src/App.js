import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Layout from './pages/Layout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout/>}>
                        <Route path="/" element={<Home />} />
                        <Route path='/contact' element={<Contact />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<SignUp />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
