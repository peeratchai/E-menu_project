const axios = require('axios');
import sendRequest from './sendRequest'

const newspaperService = {
    getNewspaperList: async function () {
        return await sendRequest.get('/api/promotion')

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