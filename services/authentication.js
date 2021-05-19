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

    requestResetPassword: async function (email) {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let data = {
            email: email,
        }
        console.log(data)
        let response = await axios.post('/api/request_resetpassword', data, config)
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

    resetPassword: async function (data) {

        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
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
    },

    loginWithGuestUser: async function () {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let data = {
            email: 'guest@test.com',
            password: 'p@assword_guestuser'
        }

        console.log(data)
        let response = await axios.post('/api/auth/signin-with-email', data, config)
            .then(function (response) {
                console.log(response)
                return response.data.accessToken
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response
    }
}

export default authentication