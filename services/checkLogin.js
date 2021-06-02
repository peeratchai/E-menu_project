import authentication from './authentication'

export default async function checkLogin() {

    let accessTokenlocalStorage = window.localStorage.getItem('accessToken');
    if (accessTokenlocalStorage !== null) {
        return accessTokenlocalStorage
    } else {
        //// non login
        let accessToken = await authentication.loginWithGuestUser()
        return accessToken
    }
}

