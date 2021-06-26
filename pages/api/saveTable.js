import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const { tableId, restaurantId } = await req.body

  console.log('tableId', tableId)
  console.log('restaurantId', restaurantId)
  try {
    req.session.set('tableId', tableId)
    req.session.set('restaurantId', restaurantId)
    await req.session.save()
    res.json({ is_sucess: true })

  } catch (error) {
    const { response: fetchResponse } = error
    res.status(fetchResponse?.status || 500).json(error.data)
  }
})
