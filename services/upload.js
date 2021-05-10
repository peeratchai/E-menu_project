const axios = require('axios')

const uploadService = {
    uploadImage: async (imageFile, accessToken) => {
        console.log('formData', imageFile)
        let formData = new FormData()
        formData.append("image", imageFile);
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'multipart/form-data'
            }
        }
        let response = await axios.post('/api/upload_image', formData, config)
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

export default uploadService