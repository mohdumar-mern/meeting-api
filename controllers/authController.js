import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'
import { generateToken } from '../utils/generateToken.js'

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = expressAsyncHandler(async (req, res) => {
  const { email, password, isAdmin = false } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(409).json({ message: 'Email already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 12)
  const user = await User.create({ email, password: hashedPassword, isAdmin })
  res.status(201).json({
    message: 'User registered successfully',
    user: {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  })
})

// @desc    Login user and set cookie
// @route   POST /api/auth/login
// @access  Public
export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const user = await User.findOne({ email }).select('+password')


  if (!user || !user.password) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = generateToken(user._id)

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  })

  res.status(200).json({
    message: 'Login successful',
    user: {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    token,
  })
})

// @desc    Logout user and clear cookie
// @route   GET /api/auth/logout
// @access  Private
export const logout = expressAsyncHandler(async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
  })

  res.status(200).json({ message: 'Logged out successfully' })
})
