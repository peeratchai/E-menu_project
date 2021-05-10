
const API_URL = 'https://cee-menu-tvh2o.ondigitalocean.app'

module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/newspaper',
                permanent: true,
            }
        ]
    },
    async rewrites() {
        return [
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
            }
        ]
    },

}
