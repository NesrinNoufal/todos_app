
import './App.css';
import LoginSignup from './pages/LoginSignup';
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Projects from './pages/Projects';
import Project from './components/project/project';




function App() {
  const {authUser} = useAuthContext();
  return (
     <div>
    
    <ToastContainer />
      <Routes>
            <Route path='/' element={authUser ? <Navigate to='/dashboard'/> : <LoginSignup/>} />
            <Route path='/dashboard' element={authUser ? <Projects/> : <LoginSignup/>} />
            <Route path="/projects/:projectId" element={<Project/>}/>
      </Routes>  
     </div>
    
  );
}

export default App;
