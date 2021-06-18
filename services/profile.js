const axios = require('axios')
import checkLogin from './checkLogin'
import sendRequest from './sendRequest'


const profileService = {
    getProfile: async (access_token = null) => {
        let accessToken
        if (access_token === null) {
            accessToken = await checkLogin()
        } else {
            accessToken = access_token
        }

        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }

        return axios.get('/api/profile/get', config)
            .then(function (response) {
                // console.log(response)
                return response.data
            })
            .catch(function (error) {
                console.log(error)
                throw error
            });

    },
    adminEditUserProfile: async (data, userId) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'multipart/form-data'
            }
        }

        let formData = new FormData()
        if (data.first_name !== null) {
            formData.append("first_name", data.first_name);
        }
        if (data.last_name !== null) {
            formData.append("last_name", data.last_name);
        }
        if (data.gender !== null) {
            formData.append("gender", data.gender);
        }
        if (data.age !== null) {
            formData.append("age", data.age);
        }
        if (data.phone_number !== null) {
            formData.append("phone_number", data.phone_number);
        }
        if (data.avatar !== null) {
            formData.append("avatar", data.avatar);
        }
        if (data.restaurant_employee !== null) {
            formData.append("restaurant_employee", data.restaurant_employee);
        }
        formData.append("username", data.username);
        // formData.append("avatar_url", null);
        formData.append("is_active", data.is_active);
        formData.append("roles", data.roles);

        console.log(typeof (data.is_active))
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        let response = await axios.patch('/api/admin_edit_user_profile/' + userId, formData, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    },

    editUserProfile: async (data) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'multipart/form-data'
            }
        }

        let formData = new FormData()
        formData.append("username", data.username);
        formData.append("first_name", data.first_name);
        formData.append("last_name", data.last_name);
        formData.append("gender", data.gender);
        formData.append("age", data.age);
        formData.append("phone_number", data.phone_number);
        formData.append("avatar", data.avatar);
        formData.append("is_active", data.is_active);

        let response = await axios.patch('/api/edit_user_profile', formData, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    },

    syncWithSocial: async (data) => {
        return await sendRequest.post('/api/sync_with_social', data)
    }
}

export default profileService