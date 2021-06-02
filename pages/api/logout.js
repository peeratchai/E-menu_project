import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  console.log('logout')
  req.session.destroy()
  res.json({ isLoggedIn: false })
})
