import Selector from "../models/sector.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from "../models/user.js";
import dotenv from "dotenv";


dotenv.config();

export const createUser = async (req, res) => {
  const { name, email, password, sectors, agreeToTerms } = req.body;

  try {
    if (!name || !email || !password || !sectors || !agreeToTerms) {
      return res.status(400).json({
        error: 'Incomplete data. Please provide name, email, password, sectors, and agreeToTerms.',
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: 'Email is already registered. Please use a different email.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, sectors, agreeToTerms });
    const savedUser = await newUser.save();
    const userWithoutPassword = savedUser.toObject();
    delete userWithoutPassword.password;

    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRECT, { expiresIn: '1h' });

    res.status(201).json({message:"User Created Successfully", user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};


export const getUserById= async(req, res)=> {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const editUser= async(req, res)=> {
  const userId = req.params.userId;
  const { name, agreeToTerms, sectors } = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (name) user.name = name;
    if (agreeToTerms !== undefined) user.agreeToTerms = agreeToTerms;
    if (sectors) user.sectors = sectors;
    const updatedUser = await user.save();
    const userWithoutPassword = updatedUser.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({ message: 'User updated successfully', user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const getSelectors = async (req, res) => {
  try {
    const allSelectors = await Selector.find({});
    res.status(200).json({
      success: true,
      data: allSelectors,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
