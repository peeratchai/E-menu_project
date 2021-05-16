
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

}
