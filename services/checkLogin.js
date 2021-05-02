

export default async function checkLogin() {

    let accessTokenlocalStorage = window.localStorage.getItem('accessToken');
    if (accessTokenlocalStorage !== null) {
        return accessTokenlocalStorage
    } else {
        //// non login
        let accessToken = await loginWithGuestUser()
        return accessToken
    }


}