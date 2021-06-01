import withSession from '../../lib/session'
const axios = require('axios');

export default withSession(async (req, res) => {
    const user = req.session.get('user')
    const roles = ['employee', 'partner', 'admin']
    let havePermission = false
    console.log('user', user)

    if (user) {
        // in a real world application you might read the user id from the session and then do a database request
        // to get more information on the user if needed

        let config = {
            headers: {
                'Authorization': 'Bearer ' + user.accessToken,
            }
        }
        let reponse = await axios.get('http://localhost:8080/profile', config)
        let profile = reponse.data

        const intersectionRoles = profile.roles.filter(role => roles.includes(role));
        if (intersectionRoles.length > 0) {
            havePermission = true
        }

        if (havePermission) {
            res.json({
                isLoggedIn: true,
                ...user,
            })
        } else {
            res.json({
                'havePermission': havePermission,
            })
        }

    } else {
        res.json({
            isLoggedIn: false,
        })
    }
})
