
import jwt from "jsonwebtoken";


const generateTokenAndSetCookie = (userId, res) => {
	const JWT_SECRET = "sdfgddddd";
	const token = jwt.sign({ userId }, JWT_SECRET , {
		expiresIn: "15d",
	});
    const NODE_ENV = "development";
	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: NODE_ENV !== "development",
	});
	return token;
};

export default generateTokenAndSetCookie;