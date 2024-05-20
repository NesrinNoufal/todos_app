import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AddProject from '../components/AddProject/AddProject.jsx'
import './styles/Projects.css'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Projects = () => {
  const [projects , setProjects] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');

  // Define headers with the token
  const headers = {
    'auth-token': token // Include the auth-token header with the token
  };


    axios.get('http://localhost:5000/api/projects/getProjects',{ headers })
    .then(result => setProjects(result.data))
    .catch(err => console.log(err))
  } , [])

  
  return (
    <div>
       <h2>Projects</h2>
       <AddProject/>

       {projects.length === 0? 
       <div><h2>No Record</h2></div> 
        : 
         projects.map(project => ( <div className='project'> 
         <Link to={`/projects/${project._id}`} key={project._id} style={ {textDecoration: 'none', color:'white', textAlign:'center'} } className='projectView'>
         {project.title} 
         </Link>
         
          </div>))}

        
    </div>
  )
}

export default Projects





