const axios = require('axios');
import checkLogin from './checkLogin'
import authentication from './authentication'

const reLogin = async () => {
    try {
        let email = window.localStorage.getItem('email');
        let password = window.localStorage.getItem('password');
        email = Buffer.from(email, 'base64').toString('ascii')
        password = Buffer.from(password, 'base64').toString('ascii')

        let newAccessToken = await authentication.signinWithEmail(email, password)
        window.localStorage.setItem('accessToken', newAccessToken);
        return newAccessToken
    } catch (error) {
        console.log('reLogin', error)
        let accessToken = await authentication.loginWithGuestUser()
        return accessToken
    }

}

const sendRequest = {
    get: async function (api_url) {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }

        return await axios.get(api_url, config)
            .then(function (response) {
                console.log(response)
                return response.data
            })
            .catch(async function (error) {
                let status = error.response.status
                if (status === 401) {
                    console.log('Token is expire.')
                    let newAccessToken = await reLogin()
                    let config = {
                        headers: {
                            'Authorization': 'Bearer ' + newAccessToken
                        }
                    }
                    return await axios.get(api_url, config)
                        .then(function (response) {
                            return response.data
                        })
                        .catch(function (error) {
                            return error
                        })
                } else {
                    return error
                }
            });

    },

    postNonToken: async function (api_url, data) {
        return await axios.post(api_url, data)
            .then(function (response) {
                console.log(response)
                return response.data
            })
            .catch(function (error) {
                return error.response.status
            });
    },

    post: async function (api_url, data) {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }
        return await axios.post(api_url, data, config)
            .then(function (response) {
                console.log(response)
                return response.data
            })
            .catch(async function (error) {
                let status = error.response.status
                if (status === 401) {
                    console.log('Token is expire.')
                    let newAccessToken = await reLogin()
                    let config = {
                        headers: {
                            'Authorization': 'Bearer ' + newAccessToken
                        }
                    }
                    return await axios.post(api_url, data, config)
                        .then(function (response) {
                            return response
                        })
                        .catch(function (error) {
                            return error
                        })
                } else {
                    return error
                }
            });
    },

    patch: async (api_url, data, ContentType = 'multipart/form-data') => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': ContentType
            }
        }
        return await axios.patch(api_url, data, config)
            .then(function (response) {
                console.log(response)
                return response.data
            })
            .catch(async function (error) {
                let status = error.response.status
                if (status === 401) {
                    console.log('Token is expire.')
                    let newAccessToken = await reLogin()
                    let config = {
                        headers: {
                            'Authorization': 'Bearer ' + newAccessToken
                        }
                    }
                    return await axios.patch(api_url, data, config)
                        .then(function (response) {
                            return response.data
                        })
                        .catch(function (error) {
                            console.log(error)
                            return error
                        })
                } else {
                    console.log(error)
                    return error
                }
            });
    },

    delete: async (api_url) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }
        return await axios.delete(api_url, config)
            .then(function (response) {
                console.log(response)
                return response.data
            })
            .catch(async function (error) {
                let status = error.response.status
                if (status === 401) {
                    console.log('Token is expire.')
                    let newAccessToken = await reLogin()
                    let config = {
                        headers: {
                            'Authorization': 'Bearer ' + newAccessToken
                        }
                    }
                    return await axios.patch(api_url, data, config)
                        .then(function (response) {
                            return response.data
                        })
                        .catch(function (error) {
                            console.log(error)
                            return error
                        })
                } else {
                    console.log(error)
                    return error
                }
            });

    },

}


export default sendRequest