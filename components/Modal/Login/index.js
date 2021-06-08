
import { Button, Modal, Row, Col, Image, Form } from 'react-bootstrap';
import React, { useEffect } from 'react'
import { message, Spin } from 'antd';
import authentication from '../../../services/authentication'
import styles from './index.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import utilStyles from '../../../styles/utils.module.css'
import { FacebookLogin } from 'react-facebook-login-component';
import checkUserPermission from '../../../lib/checkUserPermission'
import fetchJson from '../../../lib/fetchJson'

export default function LoginModal(props) {

    const { user, mutateUser } = checkUserPermission()
    const { liffClientId } = props
    const [signinForm, setSigninForm] = React.useState({})
    const [signupForm, setSignupForm] = React.useState({})
    const [forgotForm, setForgotForm] = React.useState({})
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState(null);
    const [retypePassword, setRetypePassword] = React.useState(null);
    const [tab, setTab] = React.useState('login');
    const [signinErrors, setSigninErrors] = React.useState({});
    const [signupErrors, setSignupErrors] = React.useState({});
    const [forgotErrors, setForgotErrors] = React.useState({});
    const [isRememberMe, setIsRememberMe] = React.useState(false);
    const [inProcessLineSignIn, setInProcessLineSignIn] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
    const [title] = React.useState({ 'login': 'Login', 'register': 'Register', 'forgotPassword': 'Forgot Your Password ?' });
    const notDisplay = null

    const signInwithLine = async () => {
        setLoading(true)
        setInProcessLineSignIn(true)
        const liff = window.liff;

        await liff.init({ liffId: `1656040863-1vw5lvgd` }).catch((err) => {
            throw err;
        });
        if (liff.isLoggedIn()) {
            let token = await liff.getIDToken();
            console.log(token)

            let profile = await liff.getProfile();
            const { displayName, pictureUrl, userId } = profile
            console.log(profile)

            const email = await liff.getDecodedIDToken().email;
            console.log(email)

            let responseSignin = await signinWithSocial(email, userId)
            console.log('responseSignin', responseSignin)
            if (responseSignin === 401) {
                //// Don't have a account 
                let signupForm = {
                    "email": email,
                    "username": email,
                    "social_id": userId,
                    "first_name": null,
                    "last_name": null,
                    "avatar": pictureUrl,
                    "signup_type": 'line'
                }

                let responseSignup = await signupWithSocial(signupForm)
                console.log('responseSignup', responseSignup)

                if (responseSignup) {
                    let accessToken = responseSignup.accessToken

                    await mutateUser(
                        fetchJson('/api/saveToken', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ accessToken: accessToken }),
                        })
                    )
                    localStorage.setItem('accessToken', accessToken)

                    props.onHide()
                    props.setlogin(true)
                    // window.location.reload()
                    message.success('Sign-in successful.')
                } else {
                    message.error('Cannot sign-up with social.')
                }

            } else {
                //// Have already a account 

                let accessToken = responseSignin.accessToken

                await mutateUser(
                    fetchJson('/api/saveToken', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ accessToken: accessToken }),
                    })
                )
                localStorage.setItem('accessToken', accessToken)

                props.onHide()
                props.setlogin(true)
                props.check_permission()
                message.success('Sign-in successful.')

                window.location.reload()
            }
            setLoading(false)
            setInProcessLineSignIn(false)
        } else {
            liff.login();
            setLoading(false)
            setInProcessLineSignIn(false)
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && tab !== 'register' && email === "") {
            console.log(email)
            let isRememberMe = window.localStorage.getItem('isRememberMe');
            if (isRememberMe) {
                setIsRememberMe(isRememberMe)
                setRememberMeValue()
            }
        }
        if (user) {
            if (liffClientId && liffClientId !== null && !user.isLoggedIn && !inProcessLineSignIn) {
                //// Automate signin with line when receive liffClientId from line and user not yet login
                signInwithLine()
            }
        }

    }, [props])

    const signinWithSocial = async (email, userId) => {

        let data = {
            "email": email,
            "social_id": userId
        }

        return await authentication.signinWithSocial(data)

    }

    const signupWithSocial = async (signupForm) => {
        return await authentication.signupWithSocial(signupForm)
    }

    const responseFacebook = async (response) => {
        setLoading(true)
        console.log(response);

        if (response.id) {
            console.log('login success');
            const { email, userID, picture, accessToken } = response
            let responseSignin = await signinWithSocial(email, userID)
            console.log('responseSignin', responseSignin);

            if (responseSignin === 401) {
                let api_url = `https://graph.facebook.com/${userID}?fields=first_name,last_name&access_token=${accessToken}`
                const { first_name, last_name } = await authentication.getUserProfileFacebook(api_url)

                let signupForm = {
                    "email": email,
                    "username": email,
                    "social_id": userID,
                    "first_name": first_name,
                    "last_name": last_name,
                    "avatar": picture.data.url,
                    "signup_type": 'facebook'
                }

                let responseSignup = await signupWithSocial(signupForm)
                if (responseSignup) {
                    let accessToken = responseSignup.accessToken
                    await mutateUser(
                        fetchJson('/api/saveToken', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ accessToken: accessToken }),
                        })
                    )
                    localStorage.setItem('accessToken', accessToken)

                    props.onHide()
                    props.setlogin(true)
                    // window.location.reload()
                    message.success('Sign-in successful.')
                } else {
                    message.error('Cannot sign-up with social.')
                }

            } else {

                let accessToken = responseSignin.accessToken
                await mutateUser(
                    fetchJson('/api/saveToken', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ accessToken: accessToken }),
                    })
                )
                localStorage.setItem('accessToken', accessToken)
                props.onHide()
                props.setlogin(true)
                props.check_permission()
                message.success('Sign-in successful.')

                // window.location.reload()
            }

            setLoading(false)
        } else {
            setLoading(false)
            console.log('error');
        }
    }

    const changeTab = (tabName) => {
        setTab(tabName)
        setSigninErrors({})
        setSignupErrors({})
        setForgotErrors({})
    }

    const setRememberMeValue = () => {
        let emailEncode = window.localStorage.getItem('email');
        let passwordEncode = window.localStorage.getItem('password');
        if (emailEncode && passwordEncode) {
            let email = Buffer.from(emailEncode, 'base64').toString()
            let password = Buffer.from(passwordEncode, 'base64').toString()
            setEmail(email)
            setPassword(password)
            setSigninForm({ 'email': email, 'password': password })
        }
    }

    const setSigninField = (field, value) => {
        setSigninForm({
            ...signinForm,
            [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if (!!signinErrors[field]) setSigninErrors({
            ...signinErrors,
            [field]: null
        })
    }


    const setSignupField = (field, value) => {
        setSignupForm({
            ...signupForm,
            [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if (!!signupErrors[field]) setSignupErrors({
            ...signupErrors,
            [field]: null
        })
    }

    const setForgotField = (field, value) => {
        setForgotForm({
            ...forgotForm,
            [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if (!!forgotErrors[field]) setForgotErrors({
            ...forgotErrors,
            [field]: null
        })
    }

    const findSignupFormErrors = () => {
        const { email, password, retypePassword } = signupForm
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        const newErrors = {}
        // email errors
        if (!email || email === '') newErrors.email = 'Email is required !'
        else if (!pattern.test(email)) newErrors.email = 'Please enter valid email address !'
        // password errors
        if (!password || password === '') newErrors.password = 'Password is required !'
        // retypePassword errors
        if (!retypePassword || retypePassword === '') newErrors.retypePassword = 'Retype password is required !'
        else if (password !== retypePassword) newErrors.retypePassword = 'Password dose not match'
        return newErrors
    }

    const findSigninFormErrors = () => {
        const { email, password } = signinForm
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        const newErrors = {}
        // email errors
        if (!email || email === '') newErrors.email = 'Email is required !'
        else if (!pattern.test(email)) newErrors.email = 'Please enter valid email address !'
        // password errors
        if (!password || password === '') newErrors.password = 'Password is required !'
        // retypePassword errors
        return newErrors
    }

    const findResetPasswordFormErrors = () => {
        const { email } = forgotForm
        const newErrors = {}
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        // email errors
        if (!email || email === '') newErrors.email = 'Email is required !'
        else if (!pattern.test(email)) newErrors.email = 'Please enter valid email address !'

        return newErrors
    }

    const signupWithEmail = async (event) => {
        event.preventDefault();
        const newErrors = findSignupFormErrors()

        if (Object.keys(newErrors).length > 0) {
            setSignupErrors(newErrors)
        } else {
            try {
                const { email, password } = signupForm
                console.log(email, password)
                let response = await authentication.signupWithEmail(email, password)
                let accessToken = response.data.accessToken
                await mutateUser(
                    fetchJson('/api/saveToken', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ accessToken: accessToken }),
                    })
                )
                localStorage.setItem('accessToken', accessToken)
                props.onHide()
                props.setlogin(true)

                window.location.reload()
            } catch (error) {
                const newErrors = {}
                newErrors.email = 'Email already registered!'
                setSignupErrors(newErrors)

            }
        }
    }

    const signinWithEmail = async (event) => {
        event.preventDefault();
        const newErrors = findSigninFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setSigninErrors(newErrors)

        } else {
            const { email, password } = signinForm
            setLoading(true)
            try {
                await mutateUser(
                    fetchJson('/api/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(signinForm),
                    })
                ).then(async (response) => {
                    console.log('response', response)
                    let accessToken = response.accessToken
                    localStorage.setItem('accessToken', accessToken)
                    props.onHide()
                    props.setlogin(true)
                    if (isRememberMe) {
                        const b64EncodedEmail = Buffer.from(email).toString('base64')
                        const b64EncodedPassword = Buffer.from(password).toString('base64')
                        localStorage.setItem('email', b64EncodedEmail)
                        localStorage.setItem('password', b64EncodedPassword)
                        localStorage.setItem('isRememberMe', true)
                    }
                    props.check_permission()
                    window.location.reload()
                    setLoading(false)
                    message.success('Sign-in successful.')
                }).catch((error) => {
                    if (error.data === 401) {
                        const newErrors = {}
                        newErrors.password = 'Email or Password incorrect.'
                        setSigninErrors(newErrors)
                    }
                })
            } catch (error) {
                console.error('An unexpected error happened:', error)
            }
        }
    }

    const resetPassword = async (event) => {
        event.preventDefault();
        const newErrors = findResetPasswordFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setForgotErrors(newErrors)
        } else {
            const { email } = forgotForm
            authentication.requestResetPassword(email).then((response) => {
                console.log('response', response)
                if (response.data.is_success) {
                    message.success("Please check your email to reset password.")
                    props.onHide()
                } else {
                    let newForgotErrors = { ...forgotErrors }
                    newForgotErrors.email = `Email haven't registered.`
                    setForgotErrors(newForgotErrors)
                    message.warning("Email haven't registered.")
                }
            })
        }
    }

    const onChangeToLoginTab = () => {
        changeTab('login')
        setRememberMeValue()
    }

    const changeTabToRegister = () => {
        changeTab('register')
        setEmail(null)
        setPassword(null)
    }

    const setFacebookLoginOn2 = (response) => {
        console.log('response', response)
        setFacebookLoginOn(true)
    }

    const buttonText = (
        <Image src="/images/facebook-icon.png " style={{ marginRight: "15px", cursor: "pointer", width: "50px", height: "50px", objectFit: "contain", display: 'inline' }} />
    )

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName='custom-dialog-login'
        >
            <Modal.Body style={{ padding: "65px 30px 45px" }}>
                <Spin spinning={loading} tip="Loading...">
                    <Row style={{ textAlign: "center", marginBottom: "2rem", fontWeight: "bold" }}>
                        <div style={{ padding: "0.5rem", margin: "auto", borderRadius: "100px" }}>
                            <Col style={{ cursor: "pointer" }} onClick={() => { changeTab('login') }}>
                                <h4 style={{ fontWeight: "1000", margin: "0" }}> {title[tab]} </h4>
                            </Col>
                        </div>
                    </Row>
                    {
                        tab === 'login' ? (
                            <>
                                <Row style={{ marginBottom: "1rem" }}>
                                    <Col>
                                        Log In Your Account
                                </Col>
                                </Row>
                                <Form style={{ marginBottom: "20px" }} onSubmit={signinWithEmail}>
                                    <Row>
                                        <Col>
                                            <Form.Group >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Email"
                                                    defaultValue={email}
                                                    onChange={(e) => setSigninField('email', e.target.value)}
                                                    isInvalid={!!signinErrors.email}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {signinErrors.email}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Password"
                                                    defaultValue={password}
                                                    onChange={(e) => setSigninField('password', e.target.value)}
                                                    isInvalid={!!signinErrors.password}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {signinErrors.password}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group>
                                                <Row xs={2}>
                                                    <Col>
                                                        <Form.Check type="checkbox" checked={isRememberMe} onChange={() => { setIsRememberMe(!isRememberMe) }} label="Remember me" />
                                                    </Col>
                                                    <Col style={{ textAlign: "right" }}>
                                                        <a href="#" onClick={() => { changeTab('forgotPassword') }}>Forgot password?</a>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                            <Button variant="primary" type="submit" style={{ width: "100%", backgroundColor: "#FF4046", border: "none" }}>
                                                LOG IN
                                        </Button>
                                        </Col>
                                    </Row>

                                </Form>
                                <Row style={{ height: "50px", }}>
                                    <Col style={{ width: "100%", height: "100%" }}>
                                        <div style={{ margin: "auto", textAlign: "center", width: "100%", height: "100%" }}>
                                            <span>
                                                Or Log In With
                                        </span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: "15px" }}>
                                    <Col>
                                        <div style={{ margin: "auto", textAlign: 'center', width: "100%", height: "100%" }}>
                                            <FacebookLogin socialId={process.env.REACT_APP_FACEBOOK_APP_ID}
                                                language="en_US"
                                                scope="public_profile,email"
                                                responseHandler={responseFacebook}
                                                xfbml={true}
                                                fields="name,email,picture.height(400).width(300)"
                                                version="v2.5"
                                                className="facebook-login"
                                                buttonText={buttonText} />
                                            <Image onClick={() => signInwithLine()} src="/images/line-icon.png " style={{ width: "50px", cursor: "pointer", height: "50px", objectFit: "contain", display: 'inline' }} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div style={{ textAlign: "center" }}>
                                            Don't have an account ? <span style={{ color: '#1890ff', cursor: "pointer" }} onClick={() => changeTabToRegister()}>Sign Up</span>
                                        </div>
                                    </Col>
                                </Row>
                            </>
                        ) : notDisplay
                    }

                    {
                        tab === 'register' ? (
                            <>
                                <Row style={{ marginBottom: "1rem" }}>
                                    <Col>
                                        Create Your Account
                                </Col>
                                </Row>
                                <Form style={{ marginBottom: "20px" }} onSubmit={signupWithEmail}>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="validationEmail" >
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Email Address"
                                                    onChange={(e) => setSignupField('email', e.target.value)}
                                                    isInvalid={!!signupErrors.email}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {signupErrors.email}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group controlId="validationPassword">
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Password"
                                                    onChange={(e) => setSignupField('password', e.target.value)}
                                                    isInvalid={!!signupErrors.password}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {signupErrors.password}
                                                </Form.Control.Feedback>

                                            </Form.Group>
                                            <Form.Group controlId="validationRetypePassword">
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Retype Password"
                                                    value={retypePassword}
                                                    onChange={(e) => setSignupField('retypePassword', e.target.value)}
                                                    isInvalid={!!signupErrors.retypePassword}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {signupErrors.retypePassword}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Button variant="primary" type="submit" className={styles.button} >
                                                CREATE AN ACCOUNT
                                        </Button>
                                        </Col>
                                    </Row>
                                </Form>

                                <Row style={{ height: "50px" }}>
                                    <Col style={{ width: "100%", height: "100%" }}>
                                        <div style={{ margin: "auto", textAlign: "center", width: "100%", height: "100%" }}>
                                            <span>
                                                Or Sign Up With
                                        </span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: "15px" }}>
                                    <Col>
                                        <div style={{ margin: "auto", textAlign: 'center', width: "100%", height: "100%" }}>
                                            <FacebookLogin socialId={process.env.REACT_APP_FACEBOOK_APP_ID}
                                                language="en_US"
                                                scope="public_profile,email"
                                                responseHandler={responseFacebook}
                                                xfbml={true}
                                                fields="name,email,picture.height(400).width(300)"
                                                version="v2.5"
                                                className="facebook-login"
                                                buttonText={buttonText} />
                                            <Image onClick={() => signInwithLine()} src="/images/line-icon.png " style={{ width: "50px", cursor: "pointer", height: "50px", objectFit: "contain", display: 'inline' }} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div style={{ textAlign: "center" }} >
                                            Get <span style={{ color: '#1890ff', cursor: "pointer" }} onClick={() => onChangeToLoginTab()}>Login</span>
                                        </div>
                                    </Col>
                                </Row>
                            </>
                        ) : notDisplay
                    }
                    {
                        tab === 'forgotPassword' ? (
                            <>
                                <Row style={{ marginBottom: "1rem", textAlign: "center" }}>
                                    <Col>
                                        Don't worry! Just fill in your email and we'll send
                                        you a link to reset your password
                                </Col>
                                </Row>
                                <Form style={{ marginBottom: "20px" }} onSubmit={resetPassword}>
                                    <Row>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label><b>EMAIL ADDRESS</b></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Email"
                                                    onChange={(e) => setForgotField('email', e.target.value)}
                                                    isInvalid={!!forgotErrors.email}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {forgotErrors.email}
                                                </Form.Control.Feedback>

                                            </Form.Group>
                                            <div style={{ textAlign: "center" }}>
                                                <Button variant="primary" type="submit" className={styles.button}>
                                                    Change password
                                            </Button>
                                            </div>
                                            <br />
                                            <div style={{ textAlign: "right", cursor: "pointer", color: "#1890FF" }} className={utilStyles.fontsize_sm} onClick={() => changeTab('login')}>
                                                {"< Back"}
                                            </div>
                                        </Col>
                                    </Row>

                                </Form>
                            </>
                        ) : notDisplay
                    }
                </Spin>
            </Modal.Body>
        </Modal >
    );
}