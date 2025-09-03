import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {

    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // MS
        httpOnly : true, //prevents xss attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attcks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development" // only send cookie over https in production

    })
    return token;
}