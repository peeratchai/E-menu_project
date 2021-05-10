const axios = require('axios')
import checkLogin from './checkLogin'

const partnerSerivce = {
    addPromotion: async (data, accessToken) => {
        let formData = new FormData()
        formData.append("restaurant", data.restaurant);
        formData.append("promote_content", data.promote_content);
        formData.append("title", data.title);
        formData.append("image", data.image);

        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'multipart/form-data'
            }
        }
        let response = await axios.post('/api/add_promotion', formData, config)
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

    addCategory: async (data) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }
        let response = await axios.post('/api/add_category', data, config)
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

    getCategoryByRestaurantId: async (restaurantId) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }
        // let response = await axios.get('/api/get_category', data, config)
        let response = await axios.get('/api/get/menu-category/restaurant_id/' + restaurantId, config)
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

    editCategory: async (categoryId, data) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }
        let response = await axios.patch('/api/update_category/' + categoryId, data, config)
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

    deleteCategory: async (categoryId) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }
        let response = await axios.delete('/api/delete_category/' + categoryId, config)
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
    addMenu: async (data) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }

        let formData = new FormData()
        formData.append("restaurant", data.restaurant);
        formData.append("menu_category", data.menu_category);
        formData.append("name", data.menuName);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("image", data.image);
        formData.append("is_active", data.is_active);

        let response = await axios.post('/api/add_menu', formData, config)
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

export default partnerSerivce