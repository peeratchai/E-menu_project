const axios = require('axios');
import sendRequest from './sendRequest'
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
                return error.response.status
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

        console.log('data', data)
        await axios.post('/api/auth/signin-with-email', data, config)
            .then(function (response) {
                console.log('response.data', response.data)
                return response
            })
            .catch(function (error) {
                console.log('error222222222', error)
                return error
            });

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

        // let data = {
        //     email: 'guest@test.com',
        //     password: 'p@assword_guestuser'
        // }

        let data = {
            "email": "guest_user@test.com",
            "password": "123"
        }


        // let data = {
        //     email: 'markpeeratchai@gmail.com',
        //     password: '123'
        // }

        let response = await axios.post('/api/auth/signin-with-email', data, config)
            .then(function (response) {
                return response.data.accessToken
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response
    },

    getUserProfileFacebook: async function (api_url) {
        return await sendRequest.get(api_url)
    },

    signinWithSocial: async function (data) {
        return await sendRequest.postNonToken('/api/auth/signin-with-social', data)
    },
    signupWithSocial: async function (data) {
        return await sendRequest.postNonToken('/api/auth/signup-with-social', data)
    },
    verifyEmail: async function (data) {
        return await sendRequest.postNonToken('/api/auth/verify-email', data)
    },
}

export default authentication