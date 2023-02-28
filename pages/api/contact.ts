// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    console.log(req.body)
 console.log("dsfsdf")

  let nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: 'danik77p@gmail.com',
      pass: 'aeirrpjcdxqgipuf',
    },
    secure: true,
  })

const text = `


<h3>Повідомлення з сайту</h3>
<strong>Ім'я:</strong> ${req.body.data.name} <br>
<strong>Телефон</strong> ${req.body.data.phone} <br>
<strong>Email</strong> ${req.body.data.email} <br>
<strong>Країна</strong> ${req.body.data.country.label} <br>
<strong>Місто</strong> ${req.body.data.city.label} <br>
<strong>Категорія:</strong> ${req.body.data.category} <br>
`

/// catch no email

  const mailData = {
    from: req.body.email,
    to: req.body.email, ////// admin mail 
    subject: `Повідомлення з сайту Dival`,
    html: text, 
   }


   transporter.sendMail(mailData, function (error, info) {
  if(error)
   res.status(500).json({ error: error })
  else
    res.status(200).json({ info: info })
})


 
 
}
