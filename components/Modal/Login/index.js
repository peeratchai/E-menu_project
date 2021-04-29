
import { Button, Modal, Row, Col, Image, Form } from 'react-bootstrap';
import React from 'react'
import { message } from 'antd';
import authentication from '../../../services/authentication'
import styles from './index.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoginModal(props) {
    const [form, setForm] = React.useState({})
    const [validatedSignUpForm, setValidatedSignUpForm] = React.useState(false);
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [retypePassword, setRetypePassword] = React.useState(null);
    const [tab, setTab] = React.useState('login');
    const [errors, setErrors] = React.useState({});
    const [title] = React.useState({ 'login': 'Login', 'register': 'Register', 'forgotPassword': 'Forgot Your Password ?' });
    const notDisplay = null

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

    const findFormErrors = () => {
        const { email, password, retypePassword } = form
        const newErrors = {}
        // email errors
        if (!email || email === '') newErrors.email = 'Email is required !'
        // password errors
        if (!password || password === '') newErrors.password = 'Password is required !'
        // retypePassword errors
        if (!retypePassword || retypePassword === '') newErrors.retypePassword = 'Retype password is required !'
        else if (password !== retypePassword) newErrors.retypePassword = 'Password dose not match'
        return newErrors
    }

    const signupWithEmail = async (event) => {
        // const form = event.currentTarget;
        event.preventDefault();

        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setErrors(newErrors)
        } else {
            try {
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
                message.error('Email already exists !');
            }
        }
        // setValidatedSignUpForm(true);
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
                        <Col style={{ cursor: "pointer" }} onClick={() => { setTab('login') }}>
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
                            <Form style={{ marginBottom: "20px" }}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Control type="email" placeholder="Email" />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Control type="password" placeholder="Password" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicRemember">
                                            <Row xs={2}>
                                                <Col>
                                                    <Form.Check type="checkbox" label="Remember me" />
                                                </Col>
                                                <Col style={{ textAlign: "right" }}>
                                                    <a href="#" onClick={() => { setTab('forgotPassword') }}>Forgot password?</a>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                        <Button variant="primary" onClick={() => window.localStorage.setItem('login', true)} style={{ width: "100%", backgroundColor: "#FF4046", border: "none" }}>
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
                                        Don't have an account ? <span style={{ color: '#1890ff', cursor: "pointer" }} onClick={() => { setTab('register') }}>Sign Up</span>
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
                                                type="email"
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
                                        <Button variant="primary" type="submit" className={styles.button_create_account} >
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
                                        Get <span style={{ color: '#1890ff', cursor: "pointer" }} onClick={() => { setTab('login') }}>Login</span>
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
                            <Form style={{ marginBottom: "20px" }}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label><b>EMAIL ADDRESS</b></Form.Label>
                                            <Form.Control type="email" placeholder="Email" />
                                        </Form.Group>
                                        <div style={{ textAlign: "center" }}>
                                            <Button variant="primary" onClick={() => setTab('login')} style={{ width: "50%", border: "none" }}>
                                                Reset password
                                            </Button>
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