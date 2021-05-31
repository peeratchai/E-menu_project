
const { rountingApi } = require('./routingApi')


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
        return rountingApi
    },
    future: {
        webpack5: true,
    },
    env: {
        REACT_APP_FACEBOOK_APP_ID: '259379829306113',
        URL: 'http://localhost:3000'
    },
}
