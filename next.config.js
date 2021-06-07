
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
        REACT_APP_FACEBOOK_APP_ID: '935272050353357',
        URL: 'https://cee-menu-frontend-nsv2u.ondigitalocean.app',
        API_URL: 'https://cee-menu-tvh2o.ondigitalocean.app',
        // URL: 'http://localhost:3000',
        // API_URL: 'http://localhost:8080',
        SECRET_COOKIE_PASSWORD: '2gyZ3GDw3LDCSCDhPmPDL3sjREVRXPr8',
        FACEBOOK_PAGE_URL: 'https://www.facebook.com/ceeMenu-104347888513882'
    },
}
