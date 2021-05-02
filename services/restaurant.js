const axios = require('axios');

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

    getRestaurantById: async function (accessToken, restaurantId) {
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

    getRestaurantSearchByFilter: async function () {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let data = {
            email: email,
            password: password
        }
        let response = await axios.post('/api/auth/signup-with-email', data, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        const axios = require('axios');
        return response
    }
}

export default restaurantService