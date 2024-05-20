import express from "express";
import {addProject,getProjects} from '../controllers/project.controllers.js';


const projectSRouter = express();

projectSRouter.post('/addProject',addProject);
projectSRouter.get('/getProjects',getProjects);
// router.post('/viewProject',viewProject);


export default projectSRouter;