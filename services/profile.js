const axios = require('axios')
import checkLogin from './checkLogin'


const profileService = {
    getProfile: async (accessToken) => {
        let access_token
        if (accessToken) {
            access_token = accessToken
        } else {
            access_token = await checkLogin()
        }

        let config = {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }

        let response = await axios.get('/api/profile/get', config)
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
    adminEditUserProfile: async (data, userId) => {
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
        formData.append("avatar_url", null);
        formData.append("is_active", data.is_active);
        formData.append("restaurant_employee", data.restaurant_employee);
        // formData.append("roles", JSON.stringify(data.roles));
        formData.append("roles", data.roles);

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
}

export default profileService