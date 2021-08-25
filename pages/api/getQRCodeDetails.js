import withSession from '../../lib/session'

export default withSession(async (req, res) => {

  let qr_code_details = {
    tableId: null,
    restaurantId: null
  }

  try {
    qr_code_details.tableId = req.session.get('tableId')
    qr_code_details.restaurantId = req.session.get('restaurantId')
    res.json({qr_code_details})

  } catch (error) {
    const { response: fetchResponse } = error
    res.status(fetchResponse?.status || 500).json(error.data)
  }
})
