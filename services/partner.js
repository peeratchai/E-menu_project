const axios = require('axios')
import checkLogin from './checkLogin'
import sendRequest from './sendRequest'

const partnerSerivce = {
    addPromotion: async (data) => {
        let formData = new FormData()
        formData.append("restaurant", data.restaurant);
        formData.append("promote_content", data.promote_content);
        formData.append("title", data.title);
        formData.append("image", data.image);
        formData.append("image_url", null);
        formData.append("status", 'pending');

        return await sendRequest.post('/api/add_promotion', formData)
    },
    editPromotion: async (promotionId, data) => {
        let formData = new FormData()
        formData.append("restaurant", data.restaurant);
        formData.append("promote_content", data.promote_content);
        formData.append("title", data.title);
        formData.append("image", data.image);
        formData.append("image_url", data.image_url);
        formData.append("status", data.status);

        return await sendRequest.patch('/api/edit/promotion/' + promotionId, formData)
    },

    deletePromotion: async (promotionId) => {
        return await sendRequest.delete('/api/delete/promotion/' + promotionId)
    },

    getPromotionsByRestaurant: async (restaurantId) => {
        return await sendRequest.get('/api/get/promotion/restaurant_id/' + restaurantId)
    },

    addCategory: async (data) => {
        return await sendRequest.post('/api/add_category', data)
    },

    getCategoryByRestaurantId: async (restaurantId) => {
        return await sendRequest.get('/api/get/menu-category/restaurant_id/' + restaurantId)
    },

    editCategory: async (categoryId, data) => {
        return await sendRequest.patch('/api/update_category/' + categoryId, data)
    },

    deleteCategory: async (categoryId) => {
        return await sendRequest.delete('/api/update_category/' + categoryId)
    },
    editMenu: async (data, menuId) => {
        let formData = new FormData()
        formData.append("restaurant", data.restaurant);
        formData.append("menu_category", data.menu_category);
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("image", data.image);
        formData.append("is_active", data.is_active);
        console.log(data)

        return await sendRequest.patch('/api/edit_menu/' + menuId, formData)

    },
    deleteMenu: async (menuId) => {
        return await sendRequest.delete('/api/delete_menu/' + menuId)
    },
    addMenu: async (data) => {
        let formData = new FormData()
        formData.append("restaurant", data.restaurant);
        formData.append("menu_category", data.menu_category);
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("image", data.image);
        formData.append("is_active", data.is_active);

        return await sendRequest.post('/api/add_menu', formData)

    },

    getZoneByRestaurantId: async (restaurantId) => {
        return await sendRequest.get('/api/get_zone_by_restaurantId/' + restaurantId)
    },

    addZone: async (data) => {
        return await sendRequest.post('/api/add_zone', data)
    },
    editZone: async (data, zoneId) => {
        return await sendRequest.patch('/api/edit_zone/' + zoneId, data)
    },
    deleteZone: async (zoneId) => {
        return await sendRequest.delete('/api/delete_zone/' + zoneId)
    },
    getTableByRestaurantId: async (restaurantId) => {
        return await sendRequest.get('/api/get_table_by_restaurantId/' + restaurantId)
    },

    addTable: async (data) => {
        return await sendRequest.post('/api/add_table', data)
    },
    editTable: async (data, tableId) => {
        return await sendRequest.patch('/api/edit_table/' + tableId, data)
    },
    deleteTable: async (tableId) => {
        return await sendRequest.delete('/api/delete_table/' + tableId)
    },
    addOrder: async (data) => {
        return await sendRequest.post('/api/add_order', data)
    },
    getOrderByfilter: async (data) => {
        return await sendRequest.post('/api/get_order_by_filter', data)
    },

    takeOrder: async (orderId) => {
        let data = {}
        return await sendRequest.patch('/api/take_order/' + orderId, data)
    },
    completeOrder: async (orderId) => {
        let data = {}
        return await sendRequest.patch('/api/complete_order/' + orderId, data)
    },
    cancelOrder: async (orderId) => {
        let data = {}
        return await sendRequest.patch('/api/cancel_order/' + orderId, data)
    },
    getOrderByPeriod: async (data) => {
        return await sendRequest.post('/api/get_order_by_period/', data)
    },
}

export default partnerSerivce