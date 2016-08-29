import nodemailer from 'nodemailer'

import config from '../../config'

// create nodemail transporter
const transporter = nodemailer.createTransport(config.mail)

/**
 * Send mail
 *
 * @param  {Object} mail
 * @return {Promise}
 */
export function sendMail(mail) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mail, (error, info) => {
      resolve({ error, info })
    })
  })
}
