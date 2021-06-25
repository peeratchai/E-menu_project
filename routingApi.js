
// dev env.
// Current backend server
const API_URL = 'https://cee-menu-back-rg3yt.ondigitalocean.app'

// Old backend server
// const API_URL = 'https://cee-menu-tvh2o.ondigitalocean.app'

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
            source: '/api/restaurant_list_admin/all',
            destination: API_URL + '/restaurant/all',
        },
        {
            source: '/api/delete_restaurant/:restaurantId',
            destination: API_URL + '/restaurant/:restaurantId',
        },
        {
            source: '/api/add_new_restaurant',
            destination: API_URL + '/restaurant',
        },
        {
            source: '/api/set_active_restaurant/:restaurantId',
            destination: API_URL + '/restaurant/set_active_status/:restaurantId',
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
            source: '/api/edit/promotion/:promotionId',
            destination: API_URL + '/promotion/:promotionId',
        },
        {
            source: '/api/delete/promotion/:promotionId',
            destination: API_URL + '/promotion/:promotionId',
        },
        {
            source: '/api/get/promotion/restaurant_id/:restaurantId',
            destination: API_URL + '/promotion/restaurant_id/:restaurantId',
        },
        {
            source: '/api/restaurant/search_by_filter',
            destination: API_URL + '/restaurant/search_by_filter',
        },
        {
            source: '/api/restaurant/search_with_paging/:page/:limit',
            destination: API_URL + '/restaurant/search_with_paging?page=:page&limit=:limit',
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
            source: '/api/promotion/newspaper_with_paging/:page/:limit',
            destination: API_URL + '/promotion/newspaper_with_paging?page=:page&limit=:limit',
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
            source: '/api/get_table_by_tableId/:tableId',
            destination: API_URL + '/table/:tableId',
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
            source: '/api/get_order_by_filter2',
            destination: API_URL + '/order/search_by_filter2',
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
            source: '/api/get_order_history',
            destination: API_URL + '/order/history',
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
            source: '/api/update_promotion_status/:promotionId',
            destination: API_URL + '/promotion/update_status/:promotionId'
        },
        {
            source: '/api/add_business_district',
            destination: API_URL + '/location'
        },
        {
            source: '/api/edit_business_district/:businessDistrictId',
            destination: API_URL + '/location/:businessDistrictId'
        },
        {
            source: '/api/delete_business_district/:businessDistrictId',
            destination: API_URL + '/location/:businessDistrictId'
        },
        {
            source: '/api/get/all_profile',
            destination: API_URL + '/profile/users'
        },
        {
            source: '/api/send_email',
            destination: API_URL + '/mail'
        },
        {
            source: '/api/auth/signin-with-social',
            destination: API_URL + '/auth/signin-with-social'
        },
        {
            source: '/api/auth/signup-with-social',
            destination: API_URL + '/auth/signup-with-social'
        },
        {
            source: '/api/get_order_by_period',
            destination: API_URL + '/order/dashboard'
        },
        {
            source: '/api/add-master-food-category',
            destination: API_URL + '/food-category'
        },
        {
            source: '/api/get/master-food-category',
            destination: API_URL + '/food-category'
        },
        {
            source: '/api/update-master-food-category/:foodCategoryId',
            destination: API_URL + '/food-category/:foodCategoryId'
        },
        {
            source: '/api/delete-master-food-category/:foodCategoryId',
            destination: API_URL + '/food-category/:foodCategoryId'
        },
        {
            source: '/api/add-master-national',
            destination: API_URL + '/national'
        },
        {
            source: '/api/get/master-national',
            destination: API_URL + '/national'
        },
        {
            source: '/api/update-master-national/:nationalId',
            destination: API_URL + '/national/:nationalId'
        },
        {
            source: '/api/delete-master-national/:nationalId',
            destination: API_URL + '/national/:nationalId'
        },
        {
            source: '/api/add-master-food-kind',
            destination: API_URL + '/food-kind'
        },
        {
            source: '/api/get/master-food-kind',
            destination: API_URL + '/food-kind'
        },
        {
            source: '/api/update-master-food-kind/:foodKindId',
            destination: API_URL + '/food-kind/:foodKindId'
        },
        {
            source: '/api/delete-master-food-kind/:foodKindId',
            destination: API_URL + '/food-kind/:foodKindId'
        },
        {
            source: '/api/add-master-sub-kind',
            destination: API_URL + '/sub-kind'
        },
        {
            source: '/api/get/master-sub-kind',
            destination: API_URL + '/sub-kind'
        },
        {
            source: '/api/update-master-sub-kind/:subKindId',
            destination: API_URL + '/sub-kind/:subKindId'
        },
        {
            source: '/api/delete-master-sub-kind/:subKindId',
            destination: API_URL + '/sub-kind/:subKindId'
        },
        {
            source: '/api/add-master-cook-method',
            destination: API_URL + '/cook-method'
        },
        {
            source: '/api/get/master-cook-method',
            destination: API_URL + '/cook-method'
        },
        {
            source: '/api/update-master-cook-method/:cookMethodId',
            destination: API_URL + '/cook-method/:cookMethodId'
        },
        {
            source: '/api/delete-master-cook-method/:cookMethodId',
            destination: API_URL + '/cook-method/:cookMethodId'
        },
        {
            source: '/api/get/menu',
            destination: API_URL + '/menu'
        },
        {
            source: '/api/update-food-data/:foodDataId',
            destination: API_URL + '/menu/food-data/:foodDataId'
        },
        {
            source: '/api/add/ban-user',
            destination: API_URL + '/ban'
        },
        {
            source: '/api/get/ban-user',
            destination: API_URL + '/ban'
        },
        {
            source: '/api/delete/ban-user/:userId',
            destination: API_URL + '/ban/:userId'
        },
        {
            source: '/api/send-message',
            destination: API_URL + '/contact-us'
        },
        {
            source: '/api/get-contact-us-message',
            destination: API_URL + '/contact-us'
        },
        {
            source: '/api/send-message/:contactUsId',
            destination: API_URL + '/contact-us/:contactUsId'
        },
        {
            source: '/api/get/profile-all-user',
            destination: API_URL + '/profile/all_user'
        },
        {
            source: '/api/get/master_data/food-type',
            destination: API_URL + '/master_data/food-type'
        },
        {
            source: '/api/get/master_data/distance',
            destination: API_URL + '/distance'
        },
        {
            source: '/api/get/master_data/payment-option',
            destination: API_URL + '/payment-option'
        },
        {
            source: '/api/auth/verify-email',
            destination: API_URL + '/profile/verify'
        },
        {
            source: '/api/get/promotion/admin',
            destination: API_URL + '/promotion/admin'
        },
        {
            source: '/api/sync_with_social',
            destination: API_URL + '/profile/sync-with-social'
        },
        {
            source: '/api/get-shopping-cart',
            destination: API_URL + '/shopping-cart'
        },
        {
            source: '/api/update-shopping-cart',
            destination: API_URL + '/shopping-cart'
        },
        {
            source: '/api/delete-shopping-cart',
            destination: API_URL + '/shopping-cart'
        },
        {
            source: '/api/delete-shopping-cart-item/:cartItemId',
            destination: API_URL + '/shopping-cart-item/:cartItemId'
        },
    ]
}
