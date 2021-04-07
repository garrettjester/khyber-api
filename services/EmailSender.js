const axios = require('axios')

class EmailSender {

  constructor() {}
  
  async sendWelcomeEmail(email, firstName, dealershipName, tempPassword) {

    const body = {
      from: {email: 'team@wrlds.io'},
      personalizations: [
        {
          to: [{email: email}],
          dynamic_template_data: {
            invitedName: firstName,
            dealershipName: dealershipName,
            temporaryPassword: tempPassword,
            signInLink: `https://www.khyber.io/auth?email=${email}`
          }
        }
      ],
      template_id:process.env.WELCOME_TEMPLATE_ID
    }
    
    const config = {
      headers: { 
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      }
    };

    const data = JSON.stringify(body)
    console.log("DATA", data)

    return axios.post(
      'https://api.sendgrid.com/v3/mail/send',
       data,
       config
    )
  }
};

module.exports = EmailSender;

