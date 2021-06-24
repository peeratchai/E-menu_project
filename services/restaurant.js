const axios = require('axios');
import checkLogin from './checkLogin'
import sendRequest from './sendRequest'

const restaurantService = {
    getLocationList: async function () {
        return await sendRequest.get('/api/location')
    },

    getRestaurantSearchByLocation: async function (locationID) {
        return await sendRequest.get('/api/restaurant/location_id/' + locationID)
    },

    getAllRestaurant: async function () {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }
        let response = await axios.get('/api/restaurant/all', config)
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

    getRestaurantById: async function (restaurantId) {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }
        let response = await axios.get('/api/restaurant/' + restaurantId, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response
    },

    getRestaurantSearchByFilter: async function (accessToken, filterForm) {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }
        let data = filterForm
        console.log(data)
        let response = await axios.post('/api/restaurant/search_by_filter', data, config)
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
    getRestaurantSearchWithPaging: async function (page, limit, filterForm) {
        console.log(filterForm)
        console.log('api url', '/api/restaurant / search_with_paging / ' + page + "/" + limit)
        return await sendRequest.post('/api/restaurant/search_with_paging/' + page + "/" + limit, filterForm)
        // let response = await axios.post('/api/restaurant/search_by_filter/' + page + "/" + limit, data, config)
        //     .then(function (response) {
        //         console.log(response)
        //         return response.data
        //     })
        //     .catch(function (error) {
        //         console.log(error)
        //         return error
        //     });
        // return response
    },
    getLocationSearchByFilter: async function (accessToken, filterForm) {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }
        let data = filterForm
        let response = await axios.post('/api/location/search_by_filter', data, config)
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
    updateRestaurantDetails: async function (restaurantForm) {
        console.log(restaurantForm)
        let accessToken = await checkLogin()

        let formData = new FormData()
        formData.append("description", restaurantForm.description);
        formData.append("description_eng", restaurantForm.description_eng);
        formData.append("facebook", restaurantForm.facebook);
        formData.append("have_parking", restaurantForm.have_parking);
        formData.append("image_url", restaurantForm.image_url);
        formData.append("instragram", restaurantForm.instragram);
        formData.append("location", restaurantForm.location);
        formData.append("address", restaurantForm.address);
        formData.append("name", restaurantForm.name);
        formData.append("name_eng", restaurantForm.name_eng);
        formData.append("payment_option", restaurantForm.payment_option);
        formData.append("phone", restaurantForm.phone);
        formData.append("website", restaurantForm.website);
        formData.append("food_type", restaurantForm.food_type);
        formData.append("image", restaurantForm.image);
        formData.append("is_active", true);
        formData.append("Line", restaurantForm.Line);
        formData.append("business_district", restaurantForm.business_district);
        formData.append("business_hour", JSON.stringify(restaurantForm.business_hour));

        if (restaurantForm.restaurant_pictures.length > 0) {

            formData.append("banner", null);
            formData.append("restaurant_pictures", JSON.stringify(restaurantForm.restaurant_pictures));

        } else {
            formData.append("banner", restaurantForm.banner);
            formData.append("restaurant_pictures", JSON.stringify(restaurantForm.restaurant_pictures));
        }

        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'multipart/form-data'
            }
        }

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        let response = await axios.patch('/api/update_restaurant_detail/' + restaurantForm.restaurant_id, formData, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                throw error
            });

        return response.data

    },

    deleteRestaurantById: async function (restaurantId) {
        return await sendRequest.delete('/api/delete_restaurant/' + restaurantId)
    },

    addRestaurant: async function (data) {
        let ContentType = 'multipart/form-data'

        let formData = new FormData()

        formData.append("name", data.name);
        formData.append("location", data.location);
        formData.append("is_active", data.is_active);
        // formData.append("business_hour", JSON.stringify(data.business_hour));

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        return await sendRequest.post('/api/add_new_restaurant', formData, ContentType)
    },

}

export default restaurantService