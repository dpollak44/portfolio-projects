import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import Patients from './pages/Patients';
import Providers from './pages/Providers';

export default function App() {

  return (
    <Router>
      <Header/>
        <Routes>
          <Route path="/patients" element={<Patients/>} />
          <Route path="/providers" element={<Providers/>} />
          <Route path="/" element={<Home/>}/>
        </Routes>
    </Router>
  );
}

