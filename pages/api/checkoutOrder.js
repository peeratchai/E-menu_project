import withSession from '../../lib/session'

export default withSession(async (req, res) => {
    console.log('logout')
    req.session.set('tableId', false)
    await req.session.save()
    res.json({ is_success: true })
})
