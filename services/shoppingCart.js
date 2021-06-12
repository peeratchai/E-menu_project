import sendRequest from './sendRequest'
const axios = require('axios');

const shoppingCartService = {
    getShoppingCart: async () => {
        let accessTokenlocalStorage = window.localStorage.getItem('accessToken');
        if (accessTokenlocalStorage === null) {
            return 'Not Login'
        }

        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessTokenlocalStorage
            }
        }

        return axios.get('/api/get-shopping-cart', config)
            .then(function (response) {
                console.log(response)
                return response.data
            })
            .catch(function (error) {
                console.log(error)
                throw error
            });
    },
    updateShoppingCart: async (data) => {
        let accessTokenlocalStorage = window.localStorage.getItem('accessToken');
        if (accessTokenlocalStorage === null) {
            return 'Not Login'
        }

        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessTokenlocalStorage,
                'Content-Type': 'application/json'
            }
        }

        return axios.patch('/api/update-shopping-cart', data, config)
            .then(function (response) {
                console.log(response)
                return response.data
            })
            .catch(function (error) {
                console.log(error)
                throw error
            });

    },
    deleteShoppingCart: async () => {
        let accessTokenlocalStorage = window.localStorage.getItem('accessToken');
        if (accessTokenlocalStorage === null) {
            return 'Not Login'
        }

        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessTokenlocalStorage,
                'Content-Type': 'application/json'
            }
        }

        return axios.delete('/api/delete-shopping-cart', config)
            .then(function (response) {
                console.log(response)
                return response.data
            })
            .catch(function (error) {
                console.log(error)
                throw error
            });
    },
    deleteShoppingCartItem: async (cartItem) => {

        let accessTokenlocalStorage = window.localStorage.getItem('accessToken');
        if (accessTokenlocalStorage === null) {
            return 'Not Login'
        }

        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessTokenlocalStorage,
                'Content-Type': 'application/json'
            }
        }

        return axios.delete('/api/delete-shopping-cart-item/' + cartItem, config)
            .then(function (response) {
                console.log(response)
                return response.data
            })
            .catch(function (error) {
                console.log(error)
                throw error
            });
    },
}

export default shoppingCartService