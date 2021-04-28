const axios = require('axios');

const authentication = {
    signupWithEmail: function (email, password) {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let data = {
            email: email,
            password: password
        }
        axios.post('https://cee-menu-tvh2o.ondigitalocean.app/auth/signup-with-email', data, config).then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });
    },
}

export default authentication