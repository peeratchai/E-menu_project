import sendRequest from './sendRequest'

const orderService = {
    getOrderActive: async () => {
        return await sendRequest.post('/api/order/active')
    }
}

export default orderService