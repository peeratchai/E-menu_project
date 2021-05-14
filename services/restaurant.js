const axios = require('axios');
import checkLogin from './checkLogin'

const restaurantService = {
    getLocationList: async function (accessToken) {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }

        let response = await axios.get('/api/location', config)
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

    getRestaurantSearchByLocation: async function (accessToken, locationID) {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }
        let response = await axios.get('/api/restaurant/location_id/' + locationID, config)
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
    }


}

export default restaurantService