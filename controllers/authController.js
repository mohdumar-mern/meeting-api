import bcrypt from 'bcryptjs'
import Admin from '../models/adminModel.js'
import expressAsyncHandler from 'express-async-handler'
import { generateToken } from '../utils/generateToken.js'

// @desc    Register a new admin
// @route   POST /api/admin/register
// @access  Public
export const adminRegister = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const existingAdmin = await Admin.findOne({ email })
  if (existingAdmin) {
    return res.status(409).json({ message: 'Admin already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const newAdmin = new Admin({ email, password: hashedPassword })
  await newAdmin.save()

  res.status(201).json({ message: 'Admin registered successfully' })
})

// @desc    Login admin and set cookie
// @route   POST /api/admin/login
// @access  Public
export const adminLogin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const admin = await Admin.findOne({ email }).select('+password');

  if (!admin || !admin.password) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const isMatch = await bcrypt.compare(password, admin.password)

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = generateToken(admin._id)

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  res.status(200).json({ message: 'Login successful', token })
})

// @desc    Logout admin and clear cookie
// @route   GET /api/admin/logout
// @access  Private
export const adminLogout = expressAsyncHandler(async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
  })

  res.status(200).json({ message: 'Logged out successfully' })
})
