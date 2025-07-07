const User = require('../models/usermodel');
const bcrypt = require("bcrypt");


 exports.register = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

       
        const newUser = await User.create({
            email,
            password: hashedPassword,
            username
        });

        res.status(200).json({ message: 'User created successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
