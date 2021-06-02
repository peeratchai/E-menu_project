import withSession from '../../lib/session'


export default withSession(async (req, res) => {
  const { accessToken } = await req.body
  let user = req.session.get('user')

  try {
    user = { ...user, accessToken: accessToken }
    req.session.set('user', user)
    await req.session.save()
    res.json(user)

  } catch (error) {
    const { response: fetchResponse } = error
    res.status(fetchResponse?.status || 500).json(error.data)
  }
})
