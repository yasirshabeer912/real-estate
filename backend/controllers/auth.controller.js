const User = require("../models/user.model");
const bycrypt = require('bcrypt');
const generateToken = require("../utils/generateToken");

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Email or password is incorrect' });
    } else {
        // Compare password
        const validPassword = await bycrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({message:"password is wrong"})
        }else {
            const token = await generateToken(user._id);
            console.log(token);
            return res.status(200).json({message:"Logged In Scccessfully", token})
        }
    }
};



const register = async (req, res) => {
    const { email, password, name } = req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
        return res.status(400).json({ message: "Email already in use" });
    } else {
        try {
            const salt = await bycrypt.genSalt(12);
            const hashedPassword = await bycrypt.hash(password, salt);
            const newUser = {
                name,
                email,
                password: hashedPassword
            };

            const user = await User.create(newUser);

            res.status(202).json(user);
        } catch (error) {
            console.log(error);
            res.json({
                message: "Error creating account",
                error: error
            });
        }
    }
};


const logout = async ()=>{

}


module.exports = {login,register,logout}