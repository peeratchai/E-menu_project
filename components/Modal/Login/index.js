
import { Button, Modal, Row, Col, Image, Form } from 'react-bootstrap';
import React from 'react'

export default function LoginModal(props) {

    const [tab, setTab] = React.useState('login');
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
                            <h4 style={{ fontWeight: "1000", margin: "0" }}> {tab == 'login' ? 'Login' : tab == 'register' ? 'Register' : tab == 'forgotPassword' ? 'Forgot Your Password ?' : null} </h4>
                        </Col>
                        {/* <Col xs={6} sm={6} style={{ cursor: "pointer", backgroundColor: "#4b5d72" }} onClick={() => { setTab('register') }}>
                            <h3 style={{ fontWeight: "700", margin: "0", color: "#748396" }}>Register</h3>
                        </Col> */}
                    </div>
                </Row>
                {
                    tab == 'login' ? (
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
                    ) : null
                }

                {
                    tab == 'register' ? (
                        <>
                            <Row style={{ marginBottom: "1rem" }}>
                                <Col>
                                    Create Your Account
                                </Col>
                            </Row>
                            <Form style={{ marginBottom: "20px" }}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Control type="email" placeholder="Email Address" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Control type="password" placeholder="Password" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicRetypePassword">
                                            <Form.Control type="password" placeholder="Retype Password" />
                                        </Form.Group>
                                        <Button variant="primary" type="submit" style={{ width: "100%", backgroundColor: "#FF4046", border: "none" }}>
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
                    ) : null
                }
                {
                    tab == 'forgotPassword' ? (
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
                    ) : null
                }

            </Modal.Body>
        </Modal >
    );
}