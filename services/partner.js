const axios = require('axios')
import checkLogin from './checkLogin'

const partnerSerivce = {
    addPromotion: async (data) => {
        let accessToken = await checkLogin()
        let formData = new FormData()
        formData.append("restaurant", data.restaurant);
        formData.append("promote_content", data.promote_content);
        formData.append("title", data.title);
        formData.append("image", data.image);
        formData.append("image_url", null);
        formData.append("status", 'pending');

        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'multipart/form-data'
            }
        }
        let response = await axios.post('/api/add_promotion', formData, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    },

    addCategory: async (data) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }
        let response = await axios.post('/api/add_category', data, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    },

    getCategoryByRestaurantId: async (restaurantId) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }
        // let response = await axios.get('/api/get_category', data, config)
        let response = await axios.get('/api/get/menu-category/restaurant_id/' + restaurantId, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    },

    editCategory: async (categoryId, data) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }
        let response = await axios.patch('/api/update_category/' + categoryId, data, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    },

    deleteCategory: async (categoryId) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }
        let response = await axios.delete('/api/delete_category/' + categoryId, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    },
    editMenu: async (data, menuId) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'multipart/form-data'
            }
        }

        let formData = new FormData()
        formData.append("restaurant", data.restaurant);
        formData.append("menu_category", data.menu_category);
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("image", data.image);
        formData.append("is_active", data.is_active);
        console.log(data)

        let response = await axios.patch('/api/edit_menu/' + menuId, formData, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    },
    deleteMenu: async (menuId) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }
        let response = await axios.delete('/api/delete_menu/' + menuId, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    },
    addMenu: async (data) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }

        let formData = new FormData()
        formData.append("restaurant", data.restaurant);
        formData.append("menu_category", data.menu_category);
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("image", data.image);
        formData.append("is_active", data.is_active);

        let response = await axios.post('/api/add_menu', formData, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    },

    getZoneByRestaurantId: async (restaurantId) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }

        let response = await axios.get('/api/get_zone_by_restaurantId/' + restaurantId, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    },

    addZone: async (data) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }
        let response = await axios.post('/api/add_zone', data, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    },
    editZone: async (data, zoneId) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }

        let response = await axios.patch('/api/edit_zone/' + zoneId, data, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    },
    deleteZone: async (zoneId) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }
        let response = await axios.delete('/api/delete_zone/' + zoneId, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    },
    getTableByRestaurantId: async (restaurantId) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }

        let response = await axios.get('/api/get_table_by_restaurantId/' + restaurantId, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    },

    addTable: async (data) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }
        let response = await axios.post('/api/add_table', data, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    },
    editTable: async (data, tableId) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }

        let response = await axios.patch('/api/edit_table/' + tableId, data, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    },
    deleteTable: async (tableId) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }
        let response = await axios.delete('/api/delete_table/' + tableId, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    },
    addOrder: async (data) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }
        let response = await axios.post('/api/add_order', data, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    },
    getOrderByfilter: async (data) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + await accessToken,
            }
        }
        let response = await axios.post('/api/get_order_by_filter', data, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    },

    takeOrder: async (orderId) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }
        let data = {}

        let response = await axios.patch('/api/take_order/' + orderId, data, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    },
    completeOrder: async (orderId) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }

        let response = await axios.patch('/api/complete_order/' + orderId, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    },
    cancelOrder: async (orderId) => {
        let accessToken = await checkLogin()
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        }

        let response = await axios.patch('/api/cancel_order/' + orderId, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    },
}

export default partnerSerivce