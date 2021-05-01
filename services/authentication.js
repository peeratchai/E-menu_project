const axios = require('axios');

const authentication = {
    signupWithEmail: async function (email, password) {
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

        return response
    },

    signinWithEmail: async function (email, password) {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let data = {
            email: email,
            password: password
        }

        console.log(data)
        let response = await axios.post('/api/auth/signin-with-email', data, config)
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

    getProfile: async function (accessToken) {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }

        let response = await axios.get('/api/profile/get', config)
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

    resetPassword: async function (email) {

        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let data = {
            email: email,
        }
        console.log(data)
        let response = await axios.post('/api/resetpassword', data, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response
    }
}

export default authentication