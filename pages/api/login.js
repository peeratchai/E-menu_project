import withSession from '../../lib/session'

const axios = require('axios');

export default withSession(async (req, res) => {
  const { email, password } = await req.body

  try {

    let data = {
      "email": email,
      "password": password
    }
    let config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    axios.post(`${process.env.API_URL}/auth/signin-with-email`, data, config).then(async (response) => {
      let accessToken = response.data.accessToken
      const user = { isLoggedIn: true, accessToken: accessToken }
      req.session.set('user', user)
      await req.session.save()
      res.json(user)
    }).catch(error => {
      console.log('error', error)
      res.status(error.response.status).json(error)
    })
  } catch (error) {
    const { response: fetchResponse } = error
    res.status(fetchResponse?.status || 500).json(error.data)
  }
})
