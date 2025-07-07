const User = require('../models/usermodel');
const bcrypt = require("bcryptjs");


 exports.register = async(req, res) => {
    try {
        const {email, password, username} = req.body;
        const user = await User.find({email, username});
         if (!user) {
            return res.status(400).json({message : 'User already exists.'});
         } 
         const salt = await bcrypt.getSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);
         const newUser = await User.create({
            email,
            password : hashedPassword,
            username
         })
          await  newUser.save();
         res.status(200).json({message : 'User created Successfully.'});
    }
    catch (error ) {
        res.status(500).json({ message : error.message});
    }
 }