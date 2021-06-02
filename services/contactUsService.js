import sendRequest from './sendRequest'

const contactUsService = {
    sendMessage: async (data) => {
        return await sendRequest.post('/api/send-message', data)
    },
    getMessage: async () => {
        return await sendRequest.get('/api/get-contact-us-message')
    },
    deleteMessage: async (contactUsId) => {
        return await sendRequest.get('/api/get-contact-us-message/' + contactUsId)
    }
}

export default contactUsService