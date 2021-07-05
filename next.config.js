
const { rountingApi } = require('./routingApi')


module.exports = {
    // async redirects() {
    //     return [
    //         {
    //             source: '/',
    //             destination: '/newspaper',
    //             permanent: true,
    //         },
    //         {
    //             source: '/liff/newspaper',
    //             destination: '/newspaper',
    //             permanent: true,
    //         },
    //         {
    //             source: '/liff/userProfile',
    //             destination: '/userProfile',
    //             permanent: true,
    //         }
    //     ]
    // },
    async rewrites() {
        return rountingApi
    },
    future: {
        webpack5: true,
    },
    env: {
        REACT_APP_FACEBOOK_APP_ID: '259379829306113',
        URL: 'https://cee-menu-frontend-nsv2u.ondigitalocean.app',
        API_URL: 'https://cee-menu-back-rg3yt.ondigitalocean.app',
        // URL: 'http://localhost:3000',
        // API_URL: 'http://localhost:8080',
        SECRET_COOKIE_PASSWORD: '2gyZ3GDw3LDCSCDhPmPDL3sjREVRXPr8',
        FACEBOOK_PAGE_URL: 'https://www.facebook.com/ceeMenu-104347888513882',
        FACEBOOK_PAGE_ID: '104347888513882'
    },
}
