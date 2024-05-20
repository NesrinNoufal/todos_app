import React, { useState } from 'react'
import './styles/LoginSignup.css'
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const LoginSignup = () => {
    
    const {setAuthUser} = useAuthContext();
    const [state,setState]=useState("Login");
     const [formData,setFormData] = useState ({
        fullName:"",
        username:"",
        password:"",
        confirmPassword:""
     });

     const onChangeHandler = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
     };

     const login = async() => {
        
        console.log("Login function executed",FormData);
        let responseData;

        await fetch('http://localhost:5000/api/auth/login' , {
            method : 'POST',
            headers : {
              'Content-type' : 'application/json'
            },
            body : JSON.stringify(formData)
        })

        .then(response => {
            if(!response.ok){
                
                throw new Error('Invalid credentials');
            }
            return response.json();
            
        })
        .then(data => {
             responseData=data;
             if(responseData){
                localStorage.setItem('token', responseData.token);
                setAuthUser(responseData);
            }
            else{
                alert(responseData.error)
            }
        })
        
        
    }


    const signup = async () => {
        
        console.log("signup function executed", formData);
        
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error('Invalid credentials');
            }
    
            const responseData = await response.json();
    
            if (responseData) {
                
                setFormData({
                    fullName: "",
                    username: "",
                    password: "",
                    confirmPassword: ""
                });
                setTimeout(() => {
                    toast.success("Signed up successfully");
                }, 100);
                
            } else {
                alert(responseData.error);
            }
        } catch (error) {
            console.error("Signup failed:", error);
            
        }
    };
    


  


  return (
    <div className="dashboard">
    <div className='loginsignup-container'>
       <h2>{state}</h2>
       {state==="Sign Up"?<input onChange={onChangeHandler} value={formData.fullName} type="text" name="fullName" placeholder="fullName" ></input>:<></>}
       <input onChange={onChangeHandler} value={formData.username} type="text" name="username" placeholder="username" autoComplete="off"></input>
       <input onChange={onChangeHandler} value={formData.password} type="password" name="password" placeholder="password" autoComplete="off"></input>
       {state==="Sign Up"?
       <input onChange={onChangeHandler} value={formData.confirmPassword} type="password" name="confirmPassword" placeholder="confirm your password" ></input>:<></>}

       {state==="Sign Up"
        ?<p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Log In</span></p>
        :<p className="loginsignup-login">Create an account? <span onClick={()=>{setState("Sign Up")}}>Sign Up</span></p>}
       
       
       <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
       
    </div>
    </div>
  )
}

export default LoginSignup



