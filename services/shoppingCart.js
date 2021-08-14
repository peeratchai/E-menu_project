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
        console.log('data', data)
        console.log('data.restaurant', data.restaurant)
        let restaurantId
        let shoppingCartItems = []
        let dataReq = {}
        if (data.restaurant.id) {
            //// For shopping cart from localstorage
            restaurantId = data.restaurant.id
            console.log('has id')
            data.shopping_cart_items.map((cartItem) => {
                shoppingCartItems.push({
                    menu: cartItem.menu.id,
                    price: cartItem.price,
                    quantity: cartItem.quantity,
                    special_instruction: cartItem.special_instruction,
                    total: cartItem.total,
                })
            })
        } else {
            restaurantId = data.restaurant
            console.log('no id')
        }
        dataReq = {
            restaurant : restaurantId,
            shopping_cart_items : shoppingCartItems
        }
        console.log('dataReq', dataReq)
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