import React, { useState } from 'react'
import axios from 'axios'
import './AddProject.css';

const AddProject = () => {
    const [newProject, setNewProject] = useState("")
  //   const handleAddProject = async () => {
  //     try {
  //         // Make a POST request to your backend API endpoint
  //         const response = await axios.post(
  //             'http://localhost:3000/api/projects/addProject',
  //             { title: newProject },
  //             { headers: { 'auth-token': localStorage.getItem('token') } } // Assuming you have a token stored in localStorage
  //         );

  //         // Log the response or handle success
  //         console.log('Project added successfully:', response.data);

  //         // Optionally, clear the input field after successful submission
  //         setNewProject("");
  //     } catch (error) {
  //         // Handle errors from the API request
  //         console.error('Error adding project:', error);
  //         // You can display an error message to the user if needed
  //     }
  // };

  const handleAddProject = async () => {
    try {
        const token = localStorage.getItem('token');
        console.log("token",token);
        if (!token) {
            console.error('Authentication token not found');
            return;
        }

        const response = await fetch('http://localhost:5000/api/projects/addProject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({ title: newProject })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Project added successfully:', responseData);

       
        
    } catch (error) {
        console.error('Error adding project:', error.message);
        // You can display an error message to the user if needed
    }

    
};



  return (
    <div className='create_form'>
        <input type="text" placeholder='Enter Project Name' onChange={(e) => setNewProject(e.target.value)}/>
        <button type="button" onClick={handleAddProject}>Add</button>

    </div>
  )
}

export default AddProject


 // axios.post('http://localhost:3000/api/projects/addProject' , {title:newProject} )
        // .then(result => console.log(result))
        // .catch(err => console.log(err))
