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

    updatePromotionStatus: async (promotionId, data) => {
        let ContentType = 'application/json'
        return await sendRequest.patch('/api/update_promotion_status/' + promotionId, data, ContentType)
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
    },
    addMasterFoodCategory: async function (data) {
        return await sendRequest.post('/api/add-master-food-category', data)
    },
    getMasterFoodCategory: async function () {
        return await sendRequest.get('/api/get/master-food-category')
    },
    updateMasterFoodCategory: async function (foodCategoryId, data) {
        let ContentType = 'application/json'
        return await sendRequest.patch('/api/update-master-food-category/' + foodCategoryId, data, ContentType)
    },
    deleteMasterFoodCategory: async function (foodCategoryId) {
        return await sendRequest.delete('/api/delete-master-food-category/' + foodCategoryId)
    },
    addMasterNational: async function (data) {
        return await sendRequest.post('/api/add-master-national', data)
    },
    getMasterNational: async function () {
        return await sendRequest.get('/api/get/master-national')
    },
    updateMasterNational: async function (nationalId, data) {
        let ContentType = 'application/json'
        return await sendRequest.patch('/api/update-master-national/' + nationalId, data, ContentType)
    },
    deleteMasterNational: async function (nationalId) {
        return await sendRequest.delete('/api/delete-master-national/' + nationalId)
    },
    addMasterFoodKind: async function (data) {
        return await sendRequest.post('/api/add-master-food-kind', data)
    },
    getMasterFoodKind: async function () {
        return await sendRequest.get('/api/get/master-food-kind')
    },
    updateMasterFoodKind: async function (foodKindId, data) {
        let ContentType = 'application/json'
        return await sendRequest.patch('/api/update-master-foodKind/' + foodKindId, data, ContentType)
    },
    deleteMasterFoodKind: async function (foodKindId) {
        return await sendRequest.delete('/api/delete-master-foodKind/' + foodKindId)
    },
    addMasterSubKind: async function (data) {
        return await sendRequest.post('/api/add-master-sub-kind', data)
    },
    getMasterSubKind: async function () {
        return await sendRequest.get('/api/get/master-sub-kind')
    },
    updateMasterSubKind: async function (subKindIdId, data) {
        let ContentType = 'application/json'
        return await sendRequest.patch('/api/update-master-subKind/' + subKindIdId, data, ContentType)
    },
    deleteMasterSubKind: async function (subKindIdId) {
        return await sendRequest.delete('/api/delete-master-subKind/' + subKindIdId)
    },
    addMasterCookMethod: async function (data) {
        return await sendRequest.post('/api/add-master-cook-method', data)
    },
    getMasterCookMethod: async function () {
        return await sendRequest.get('/api/get/master-cook-method')
    },
    updateMasterCookMethod: async function (cookMethodIdId, data) {
        let ContentType = 'application/json'
        return await sendRequest.patch('/api/update-master-cookMethod/' + cookMethodIdId, data, ContentType)
    },
    deleteMasterCookMethod: async function (cookMethodIdId) {
        return await sendRequest.delete('/api/delete-master-cookMethod/' + cookMethodIdId)
    },
    getAllMenu: async function () {
        return await sendRequest.get('/api/get/menu')
    }

}

export default adminService