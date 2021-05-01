
const API_URL = 'https://cee-menu-tvh2o.ondigitalocean.app'

module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/newspaper',
                permanent: true,
            },
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
                source: '/api/resetpassword',
                destination: API_URL + '/profile/request_resetpassword',
            },
        ]
    },

}
