import jwt from 'jsonwebtoken'

import Admin from "../models/adminModel.js"
import expressAsyncHandler from 'express-async-handler'

export const protect = expressAsyncHandler( async(req, res, next) => {
  const token = req.cookies.token

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await Admin.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' })
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' })
  }
})

