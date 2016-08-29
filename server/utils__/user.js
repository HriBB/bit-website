import async from 'asyncawait/async'
import await from 'asyncawait/await'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import casual from 'casual'
import md5 from 'md5'

import config from '../../config'
import db from '../db'

// local passport strategy
passport.use(
  new LocalStrategy( async (username, password, done) => {
    console.log('==> LocalStrategy', username)
    const where = {
      username: username,
      password: md5(password),
    }
    const user = await db.User.findOne({ where })
    if (user) {
      user.password = null
      return done(null, user)
    } else {
      return done('Invalid username and/or password!', false)
    }
  })
)

/**
 * Generate jwt token
 * @param  {User} user
 * @return {String}
 */
export function generateToken(user) {
  const payload = { id: user.id }
  return jwt.sign(payload, config.jwt.secret)
}

/**
 * Extract jwt token from express request
 * @param  {Request} req
 * @return {String}
 */
export function extractToken(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1]
  }
}

/**
 * Get authenticated user from express request
 * @param  {Request} req
 * @return {Promise}
 */
export async function getAuthenticatedUser(req) {
  const token = extractToken(req)
  if (token) {
    const { id } = jwt.decode(token)
    const user = await db.User.findById(id)
    return user
  } else {
    return null
  }
}

/**
 * Login user
 *
 * Authenticate using passport local strategy
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {Function} next
 */
export function loginUser(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.json({ error: err })
    } else if (!user) {
      return res.json({ error: 'Invalid username and/or password!' })
    } else {
      const token = generateToken(user)
      return res.json({ user, token })
    }
  })(req, res, next)
}

/**
 * Generate random customers
 * @param  {Number} len
 */
async function generateRandomCustomers(len) {
  len = len || 20
  var now = new Date()
  for (var i = 0; i < len; i++) {
    var data = {
      salon_id: 2,
      username: casual.username,
      password: md5(casual.password),
      first_name: casual.first_name,
      last_name: casual.last_name,
      email: casual.email,
      messages_push: true,
      messages_mail: true,
      created_on: now,
      created_by: 1,
    }
    await db.User.create(data)
  }
}
