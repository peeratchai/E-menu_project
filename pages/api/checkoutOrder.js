import withSession from '../../lib/session'

export default withSession(async (req, res) => {
    console.log('logout')
    req.session.set('tableId', 'null')
    await req.session.save()
    res.json({ is_success: true })
})
