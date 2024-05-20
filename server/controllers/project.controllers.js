
import Project from "../Models/project.model.js";
import User from "../Models/user.model.js";





export const addProject = async (req, res) => {
    console.log("addProject function called");
   try {
       // Extract project details from request body
       const { title } = req.body;


       // Get current user's ID from request (assuming user is authenticated)
       const userId = req.user.userId;
    //    const userId = '663d53c1d18e13e4c8f3f415';
       console.log("userId",userId);

       // Find the current user in the database
       const user = await User.findById(userId);

       if (!user) {
           return res.status(404).json({ error: 'User not found' });
       }

       // Create a new project document
       const newProject = new Project({
           title: title,
           user: userId, // Associate the project with the current user
       });

       // Save the new project to the database
       await newProject.save();

       // Add the project to the user's list of projects
    //    user.projects.push(newProject);
    //    await user.save();

       // Return success response
       res.status(201).json({ message: 'Project added successfully', project: newProject });
   } catch (error) {
       console.error('Error adding project:', error);
       res.status(500).json({ error: 'Failed to add project' });
   }
};




export const  getProjects = async (req, res) => {
   try {
       console.log("getProjects function executed");
       // Get the current user's ID from the request (assuming user is authenticated)
       const userId = req.user.userId;
       console.log("userId",userId);

       // Find the user in the database
       const user = await User.findById(userId);

       if (!user) {
           return res.status(404).json({ error: 'User not found' });
       }

       // Populate the user's projects from the Project collection
    //    await user.populate('projects').execPopulate();

    //    // Extract the populated projects from the user object
    //    const projects = user.projects;

    //    // Return the list of projects as the response
    //    res.status(200).json({ projects });
  

     const projects = await Project.find({user:user});
     return res.status(200).json(projects);


   } catch (error) {
       console.error('Error fetching projects:', error);
       res.status(500).json({ error: 'Failed to fetch projects' });
   }
};








