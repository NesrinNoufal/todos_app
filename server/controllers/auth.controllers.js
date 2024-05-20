import User from "../Models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import bcrypt from "bcrypt";


export const signup = async (req,res) => {
    const { fullName,username,password,confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status( 400).json({ error: "Passwords don't match" });
    }
    try{
    const user = await User.findOne({username});
    if (user) {
        return res.status(400).json({ error: "Username already exists" });
    }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User ({
            fullName,
            username,
            password: hashedPassword
        });
        if (newUser) {
            // Generate JWT token here
            const token = generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                token: token
                
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
        } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
       }

   
    }



   

    export const login = async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
    
            if (!user || !isPasswordCorrect) {
                return res.status(400).json({ error: "Invalid username or password" });
            }
    
            const token = generateTokenAndSetCookie(user._id, res);
    
            res.status(200).json({
                id: user._id,
                fullName: user.fullName,
                username: user.username,
                token: token
            });
        } catch (error) {
            console.log("Error in login controller", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    