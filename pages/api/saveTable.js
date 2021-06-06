import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const { tableId } = await req.body

  console.log('tableId', tableId)
  try {
    req.session.set('tableId', tableId)
    await req.session.save()
    res.json({ is_sucess: true })

  } catch (error) {
    const { response: fetchResponse } = error
    res.status(fetchResponse?.status || 500).json(error.data)
  }
})
