import bcrypt from 'bcryptjs';
import Admin from '../models/adminModel.js';
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../utils/generateToken.js';

// @desc    Register a new admin
// @route   POST /api/admin/register
// @access  Public
export const adminRegister = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return res.status(400).json({ message: 'Admin already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = new Admin({
    email,
    password: hashedPassword,
  });

  await newAdmin.save();

  res.status(201).json({ message: 'Admin registered successfully' });
});

// @desc    Login admin and set cookie
// @route   POST /api/admin/login
// @access  Public
export const adminLogin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(400).json({ message: 'Admin not found' });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(admin._id);

  res.cookie('token', token, {
    httpOnly: true,
    secure: true, // true if using HTTPS
    sameSite: 'None', // for cross-origin
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({ message: 'Login successful', token });
});

// @desc    Logout admin and clear cookie
// @route   POST /api/admin/logout
// @access  Private
export const adminLogout = expressAsyncHandler(async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });

  res.status(200).json({ message: 'Logged out successfully' });
});
