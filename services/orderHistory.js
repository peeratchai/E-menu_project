const axios = require('axios');
import checkLogin from './checkLogin'

const orderService = {
    getOrderHistoryByUserId: async function (userId) {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }
        let data = {
            "user": userId,
            "status": "completed"
        }

        console.log('data',data)

        let response = await axios.post('/api/get_order_history', data, config)
            .then(function (response) {
                console.log(response)
                return response.data
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response
    },

    getOrderById: async function (orderId) {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }

        let response = await axios.get('/api/get_order/' + orderId, config)
            .then(function (response) {
                console.log(response)
                return response.data
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response
    },

}

export default orderService