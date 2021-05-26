const axios = require('axios');
import checkLogin from './checkLogin'
import sendRequest from './sendRequest'

const adminService = {
    getProfileUser: async () => {
        let access_token = await checkLogin()

        let config = {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }

        let response = await axios.get('/api/admin/profile/users', config)
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

    getAllPromotions: async () => {
        return await sendRequest.get('/api/get/all_promotion')
    },

    changePromotionStatus: async (promotionId, data) => {
        return await sendRequest.patch('/api/change_promotion_status/' + promotionId, data)
    }


}

export default adminService