import sendRequest from './sendRequest'
import axios from 'axios'
import checkLogin from "./checkLogin";

const orderService = {
    getOrderActive: async () => {
        return await sendRequest.post('/api/order/active')
    },
    checkBillExcept: async (tableId, accessToken = null) => {
        let data = {}
        let temp_accessToken
        if (accessToken) {
            temp_accessToken = accessToken
        } else {
            temp_accessToken = await checkLogin()
        }
        let config = {
            headers: {
                Authorization: "Bearer " + temp_accessToken,
            },
        };
        axios.patch('/api/order/check_bill_except/' + tableId, data, config)
            .then(function (response) {
                console.log('checkBillExcept', response)
                return response;
            })
            .catch(async function (error) {
                console.log('error', error)
                throw error
            })
    }

}

export default orderService