import withSession from '../../lib/session'

const axios = require('axios');
export default withSession(async (req, res) => {
  const { email, password } = await req.body

  try {
    console.log('email', email)
    console.log('password', password)
    let data = {
      "email": email,
      "password": password
    }
    let config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    let reponse = await axios.post('http://localhost:8080/auth/signin-with-email', data, config)
    let accessToken = reponse.data.accessToken
    const user = { isLoggedIn: true, accessToken: accessToken }
    req.session.set('user', user)
    await req.session.save()
    res.json(user)

  } catch (error) {
    const { response: fetchResponse } = error
    res.status(fetchResponse?.status || 500).json(error.data)
  }
})
