const axios = require('axios');

const newspaperService = {
    getNewspaperList: async function (accessToken) {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }

        let response = await axios.get('/api/promotion', config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response

        // return await sendRequest.get('/api/promotion')

    },

    getNewspaperListBySearch: async function (accessToken, filterForm) {

        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }
        let data = filterForm
        let response = await axios.post('/api/promotion/newspaper', data, config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

        return response.data
    }
}

export default newspaperService