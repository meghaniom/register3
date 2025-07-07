const User = require("../models/usermodel");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    res.status(200).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginUser = await User.find({ email });

    if (!email || !password) {
      return res.status(400).json({ message: "Email ane Password joiye chhe" });
    }

    if (!loginUser) {
      return res
        .status(400)
        .json({ message: "Invalid email the email are not registered" });
    }
    const isPasswordValid = await bcrypt.compare(password, loginUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
