
// dev env.
const API_URL = 'https://cee-menu-tvh2o.ondigitalocean.app'

// localhost env.
// const API_URL = 'http://localhost:8080'

module.exports = {
    rountingApi: [
        {
            source: '/api/auth/signup-with-email',
            destination: API_URL + '/auth/signup-with-email',
        },
        {
            source: '/api/auth/signin-with-email',
            destination: API_URL + '/auth/signin-with-email',
        },
        {
            source: '/api/profile/get',
            destination: API_URL + '/profile',
        },
        {
            source: '/api/request_resetpassword',
            destination: API_URL + '/profile/request_resetpassword',
        },
        {
            source: '/api/resetpassword',
            destination: API_URL + '/profile/resetpassword',
        },
        {
            source: '/api/location',
            destination: API_URL + '/location',
        },
        {
            source: '/api/restaurant/location_id/:locationId',
            destination: API_URL + '/restaurant/location_id/:locationId',
        },
        {
            source: '/api/restaurant/all',
            destination: API_URL + '/restaurant',
        },
        {
            source: '/api/restaurant/:restaurantId',
            destination: API_URL + '/restaurant/:restaurantId',
        },
        {
            source: '/api/promotion',
            destination: API_URL + '/promotion',
        },
        {
            source: '/api/restaurant/search_by_filter',
            destination: API_URL + '/restaurant/search_by_filter',
        },
        {
            source: '/api/location/search_by_filter',
            destination: API_URL + '/location/search_by_filter',
        },
        {
            source: '/api/promotion/newspaper',
            destination: API_URL + '/promotion/newspaper',
        },
        {
            source: '/api/add_promotion',
            destination: API_URL + '/promotion',
        },
        {
            source: '/api/upload_image',
            destination: API_URL + '/uploads',
        },
        {
            source: '/api/add_category',
            destination: API_URL + '/menu-category',
        },
        {
            source: '/api/get/menu-category/restaurant_id/:restaurant_id',
            destination: API_URL + '/menu-category/restaurant_id/:restaurant_id',
        },
        {
            source: '/api/update_category/:categoryId',
            destination: API_URL + '/menu-category/:categoryId',
        },
        {
            source: '/api/delete_category/:categoryId',
            destination: API_URL + '/menu-category/:categoryId',
        },
        {
            source: '/api/add_menu',
            destination: API_URL + '/menu',
        },
        {
            source: '/api/edit_menu/:menuId',
            destination: API_URL + '/menu/:menuId',
        },
        {
            source: '/api/delete_menu/:menuId',
            destination: API_URL + '/menu/:menuId',
        },
        {
            source: '/api/update_restaurant_detail/:restaurantId',
            destination: API_URL + '/restaurant/:restaurantId',
        },
        {
            source: '/api/get_zone_by_restaurantId/:restaurantId',
            destination: API_URL + '/zone/restaurant_id/:restaurantId',
        },
        {
            source: '/api/add_zone',
            destination: API_URL + '/zone',
        },
        {
            source: '/api/edit_zone/:zoneId',
            destination: API_URL + '/zone/:zoneId',
        },
        {
            source: '/api/delete_zone/:zoneId',
            destination: API_URL + '/zone/:zoneId',
        },
        {
            source: '/api/get_table_by_restaurantId/:restaurantId',
            destination: API_URL + '/table/restaurant_id/:restaurantId',
        },
        {
            source: '/api/add_table',
            destination: API_URL + '/table',
        },
        {
            source: '/api/edit_table/:tableId',
            destination: API_URL + '/table/:tableId',
        },
        {
            source: '/api/delete_table/:tableId',
            destination: API_URL + '/table/:tableId',
        },
        {
            source: '/api/add_order',
            destination: API_URL + '/order',
        },
        {
            source: '/api/get_order_by_filter',
            destination: API_URL + '/order/search_by_filter',
        },
        {
            source: '/api/take_order/:orderId',
            destination: API_URL + '/order-item/take_order/:orderId',
        },
        {
            source: '/api/complete_order/:orderId',
            destination: API_URL + '/order-item/complete_order/:orderId',
        },
        {
            source: '/api/cancel_order/:orderId',
            destination: API_URL + '/order-item/cancel_order/:orderId',
        },
        {
            source: '/api/get_order_history/:userId',
            destination: API_URL + '/order/history/:userId',
        },
        {
            source: '/api/get_order/:orderId',
            destination: API_URL + '/order/:orderId',
        },
        {
            source: '/api/edit_user_profile',
            destination: API_URL + '/profile',
        },
        {
            source: '/api/admin_edit_user_profile/:userId',
            destination: API_URL + '/profile/user-role/:userId',
        },
        {
            source: '/api/admin/profile/users',
            destination: API_URL + '/profile/users',
        },
        {
            source: '/api/get/all_promotion',
            destination: API_URL + '/promotion'
        },
        {
            source: '/api/change_promotion_status/:promotionId',
            destination: API_URL + '/promotion/update_status/:promotionId'
        }
    ]
}
