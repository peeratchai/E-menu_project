
import { Button, Modal, Row, Col, Image, Form } from 'react-bootstrap';
import React, { useEffect } from 'react'
import { message } from 'antd';
import authentication from '../../services/authentication'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Signin(props) {
    const [form, setForm] = React.useState({})
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [errors, setErrors] = React.useState({});
    const [isRememberMe, setIsRememberMe] = React.useState(false);

    useEffect(() => {
        if (!props.email && props.email !== undefined) {
            setEmail(props.email)
            setPassword(props.password)
            setField('password', password)
            setField('email', email)
        }
    }, [props])

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

    const findSigninFormErrors = () => {
        const { email, password } = form
        console.log('email:', email)
        console.log('password:', password)

        const newErrors = {}
        // email errors
        if (!email || email === '') newErrors.email = 'Email is required !'
        // password errors
        if (!password || password === '') newErrors.password = 'Password is required !'
        // retypePassword errors
        return newErrors
    }

    const signinWithEmail = async () => {
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
                props.setLogin(true)
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
                message.error('Invalid your password or forgot password ?');
            }
        }
    }


    return (
        <div>
            <Row style={{ marginBottom: "1rem" }}>
                <Col>
                    Log In Your Account
                                </Col>
            </Row>
            <Form style={{ marginBottom: "20px" }}>
                <Row>
                    <Col>
                        <Form.Group >
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                value={email}
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
                                value={password}
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
                                    <a href="#" onClick={() => { props.setTab('forgotPassword') }}>Forgot password?</a>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Button variant="primary" onClick={() => { signinWithEmail() }} style={{ width: "100%", backgroundColor: "#FF4046", border: "none" }}>
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
                        Don't have an account ? <span style={{ color: '#1890ff', cursor: "pointer" }} onClick={() => (props.setTab('register'), setEmail(null), setPassword(null))}>Sign Up</span>
                    </div>
                </Col>
            </Row>
        </div>
    )
}