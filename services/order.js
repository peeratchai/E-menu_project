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
        try {
            return await axios.patch('/api/order/check_bill_except/' + tableId, data, config)
        } catch (error) {
            throw error
                
        }
    }

}

export default orderService