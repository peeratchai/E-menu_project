const axios = require('axios');

const restaurant = {
    getLocation: () => {
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
    },

    getRestaurantSearchByFilter: () => {
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

export default restaurant