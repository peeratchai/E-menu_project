const axios = require('axios')
import checkLogin from './checkLogin'

const uploadService = {
    uploadImage: async (imageFile) => {
        let accessToken = await checkLogin()
        console.log('formData', imageFile)
        let formData = new FormData()
        formData.append("image", imageFile);
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'multipart/form-data'
            }
        }
        return await axios.post('/api/upload_image', formData, config)
            .then(function (response) {
                console.log(response)
                return response.data
            })
            .catch(function (error) {
                console.log(error)
                return error
            });

    }
}

export default uploadService