
import { Button, Modal, Row, Col, Image, Form } from 'react-bootstrap';
import React, { useEffect } from 'react'
import { message } from 'antd';
import authentication from '../../../services/authentication'
import styles from './index.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import utilStyles from '../../../styles/utils.module.css'

export default function LoginModal(props) {
    const [form, setForm] = React.useState({})
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState(null);
    const [retypePassword, setRetypePassword] = React.useState(null);
    const [tab, setTab] = React.useState('login');
    const [errors, setErrors] = React.useState({});
    const [isRememberMe, setIsRememberMe] = React.useState(false);
    const [title] = React.useState({ 'login': 'Login', 'register': 'Register', 'forgotPassword': 'Forgot Your Password ?' });
    const notDisplay = null

    useEffect(() => {
        if (typeof window !== 'undefined' && tab !== 'register' && email === "") {
            console.log(email)
            let isRememberMe = window.localStorage.getItem('isRememberMe');
            if (isRememberMe) {
                setIsRememberMe(isRememberMe)
                setRememberMeValue()
            }
        }
    }, [])

    const changeTab = (tabName) => {
        setTab(tabName)
        setErrors({})
    }

    const setRememberMeValue = () => {
        let emailEncode = window.localStorage.getItem('email');
        let passwordEncode = window.localStorage.getItem('password');
        let email = Buffer.from(emailEncode, 'base64').toString()
        let password = Buffer.from(passwordEncode, 'base64').toString()
        console.log(email)
        setEmail(email)
        setPassword(password)
        setForm({ 'email': email, 'password': password })
        console.log(form)
    }

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    const findSignupFormErrors = () => {
        const { email, password, retypePassword } = form
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
        const { email, password } = form
        console.log('email:', email)
        console.log('password:', password)
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
        const { email } = form
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
            setErrors(newErrors)
        } else {
            try {
                const { email, password } = form
                console.log(email, password)
                let response = await authentication.signupWithEmail(email, password)
                let accessToken = response.data.accessToken
                localStorage.setItem('accessToken', accessToken)
                try {
                    response = await authentication.getProfile(accessToken)
                    let profile = response.data
                    localStorage.setItem('profile', profile)
                } catch (error) {
                    console.log(error)
                }
            } catch (error) {
                const newErrors = {}
                newErrors.email = 'Email already exists !'
                setErrors(newErrors)
            }
        }
    }

    const signinWithEmail = async (event) => {
        event.preventDefault();
        const newErrors = findSigninFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            console.log(form)

        } else {
            try {
                const { email, password } = form
                let response = await authentication.signinWithEmail(email, password)
                let accessToken = response.data.accessToken
                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('islogin', true)
                props.onHide()
                props.setlogin(true)
                if (isRememberMe) {
                    const b64EncodedEmail = Buffer.from(email).toString('base64')
                    const b64EncodedPassword = Buffer.from(password).toString('base64')
                    localStorage.setItem('email', b64EncodedEmail)
                    localStorage.setItem('password', b64EncodedPassword)
                    localStorage.setItem('isRememberMe', true)
                }
            } catch (error) {
                const newErrors = {}
                newErrors.password = 'Invalid your password or forgot password ?'
                setErrors(newErrors)
            }
        }
    }

    const resetPassword = async (event) => {
        event.preventDefault();
        const newErrors = findResetPasswordFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            try {
                const { email } = form
                let response = await authentication.resetPassword(email)
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName='custom-dialog-login'
        >
            <Modal.Body style={{ padding: "65px 30px 45px" }}>
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
                                                onChange={(e) => setField('email', e.target.value)}
                                                isInvalid={!!errors.email}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                defaultValue={password}
                                                onChange={(e) => setField('password', e.target.value)}
                                                isInvalid={!!errors.password}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Row xs={2}>
                                                <Col>
                                                    <Form.Check type="checkbox" checked={isRememberMe} onChange={() => { setIsRememberMe(true) }} label="Remember me" />
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
                                        <Image src="/images/facebook-icon.png " style={{ marginRight: "15px", cursor: "pointer", width: "50px", height: "50px", objectFit: "contain", display: 'inline' }} />
                                        <Image src="/images/line-icon.png " style={{ width: "50px", cursor: "pointer", height: "50px", objectFit: "contain", display: 'inline' }} />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div style={{ textAlign: "center" }}>
                                        Don't have an account ? <span style={{ color: '#1890ff', cursor: "pointer" }} onClick={() => (changeTab('register'), setEmail(null), setPassword(null))}>Sign Up</span>
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
                                                value={email}
                                                onChange={(e) => setField('email', e.target.value)}
                                                isInvalid={!!errors.email}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group controlId="validationPassword">
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setField('password', e.target.value)}
                                                isInvalid={!!errors.password}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>

                                        </Form.Group>
                                        <Form.Group controlId="validationRetypePassword">
                                            <Form.Control
                                                type="password"
                                                placeholder="Retype Password"
                                                value={retypePassword}
                                                onChange={(e) => setField('retypePassword', e.target.value)}
                                                isInvalid={!!errors.retypePassword}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.retypePassword}
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
                                        <Image src="/images/facebook-icon.png " style={{ marginRight: "15px", cursor: "pointer", width: "50px", height: "50px", objectFit: "contain", display: 'inline' }} />
                                        <Image src="/images/line-icon.png " style={{ width: "50px", cursor: "pointer", height: "50px", objectFit: "contain", display: 'inline' }} />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div style={{ textAlign: "center" }}>
                                        Get <span style={{ color: '#1890ff', cursor: "pointer" }} onClick={() => (changeTab('login'), setRememberMeValue())}>Login</span>
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
                                                onChange={(e) => setField('email', e.target.value)}
                                                isInvalid={!!errors.email}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
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

            </Modal.Body>
        </Modal >
    );
}