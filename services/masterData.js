import sendRequest from './sendRequest'

const masterDataService = {
    getFoodType: async () => {
        return await sendRequest.get('/api/get/master_data/food-type')
    },
    getDistance: async () => {
        return await sendRequest.get('/api/get/master_data/distance')
    },
    getPaymentOptions: async () => {
        return await sendRequest.get('/api/get/master_data/payment-option')
    },
}

export default masterDataService