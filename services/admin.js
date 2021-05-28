const axios = require('axios');
import SendEmail from '../components/Admin/SendEmail';
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
    },

    getAllLocation: async function () {
        return await sendRequest.get('/api/location')
    },

    addBusinessDistrict: async function (data) {
        return await sendRequest.post('/api/add_business_district', data)
    },
    editBusinessDistrict: async function (data, businessDistrictId) {
        let formData = new FormData()
        formData.append("name", data.name);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("location", data.location);
        formData.append("district", null);
        formData.append("image_url", data.image_url);

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        console.log('api', '/api/edit_business_district/' + businessDistrictId)
        return await sendRequest.patch('/api/edit_business_district/' + businessDistrictId, formData)
    },
    getAllProfile: async function () {
        return await sendRequest.get('/api/get/all_profile')
    },
    SendEmail: async function (data) {
        return await sendRequest.post('/api/send_email', data)
    }
}

export default adminService