import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import { Navbar, Nav, NavDropdown, Button, Modal, Row, Col, Image, Form } from 'react-bootstrap';
import { useRouter } from 'next/router'
import ActiveLink from './ActiveLink'
import { Link } from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect } from 'react'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import useMediaQuery from "../utils/utils";
import { Badge } from 'antd';

import 'react-chat-widget/lib/styles.css';
import dynamic from 'next/dynamic';
const Widget = dynamic(() => import("react-chat-widget").then(mod => mod.Widget), {
    ssr: false
});

export default function Layout({ children, containerType, searchFunc }) {
    const [modalShow, setModalShow] = React.useState(false);
    const [login, setLogin] = React.useState();
    const isBreakpoint = useMediaQuery(768)
    const [containerStyle, setContainerStyle] = React.useState(null);

    useEffect(() => {
        setStyleOfContainer(containerType)
    }, [containerType])

    const setStyleOfContainer = (containerType) => {
        let style = ""
        switch (containerType) {
            case 'mobile': style = styles.containerMobile; break;
            case 'center': style = styles.container; break;
            default: break;
        }

        setContainerStyle(style)
    }

    const CustomTimeStampFragment = () => {
        return (
            <div className='rcw-client'>
                <div className='rcw-message-text'>
                    <p>Help!</p>
                </div>
                <span class="rcw-timestamp">06:38</span>
            </div>
        )
    }

    const CustomTimeStampFragmentAdmin = () => {
        return (
            <>
                <img src="/images/administrator_icon.png" class="rcw-avatar" alt="profile" />
                <div className='rcw-response'>
                    <div className='rcw-message-text'>
                        <p>Hello</p>
                    </div>
                    <span class="rcw-timestamp">06:37</span>
                </div>
            </>
        )
    }

    useEffect(() => {
        let loginStatus = false
        if (typeof window !== 'undefined') {
            const { addResponseMessage, renderCustomComponent } = require('react-chat-widget');
            loginStatus = window.localStorage.getItem('login');
            renderCustomComponent(CustomTimeStampFragmentAdmin)
            renderCustomComponent(CustomTimeStampFragment)
        }
        // console.log(loginStatus)
        // console.log(searchFunc)
        setLogin(loginStatus)

    }, [])

    const signOut = () => {
        let loginStatus
        if (typeof window !== 'undefined') {
            loginStatus = window.localStorage.setItem('login', false);
        }
        setLogin(loginStatus)
    }



    const handleNewUserMessage = (handleNewUserMessage) => {
        console.log(handleNewUserMessage)
    }

    return (
        <div style={{ paddingBottom: '5px' }}>
            <Head>
                <title>E-Menu</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bree Serif" />
            </Head>
            <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "#eaeff3", boxShadow: "rgb(204 204 204) 3px 2px 8px 1px", padding: "20px 20px", fontWeight: "bold" }}>
                <style jsx>{`
                    .nav-link {
                        text-decoration: none;
                        cursor:pointer
                    }
                    .active:after {
                        color:"white"
                    }
                    `}</style>
                <ActiveLink activeClassName="active" href="/newspaper">
                    {
                        isBreakpoint ? (
                            //For Mobile
                            <>
                                <Navbar.Brand style={{ color: "black !important", cursor: "pointer", paddingLeft: "40px", margin: "auto", fontWeight: "bold", fontFamily: "Bree Serif" }}><MenuBookIcon style={{ margin: "auto", color: "#FF4A4F", fontSize: "2.5rem" }} /><div style={{ display: "inline", marginLeft: "15px" }}>E-Menu</div></Navbar.Brand>

                                <SearchIcon className="d-inline-block align-top" style={{ color: "black", fontSize: "2.5rem" }} onClick={() => searchFunc()} />
                            </>
                        ) : (
                            //For PC
                            <>
                                <MenuBookIcon
                                    className="d-inline-block align-top" style={{ color: "#FF4A4F", fontSize: "2.5rem" }} />
                                <Navbar.Brand style={{ color: "black !important", cursor: "pointer", paddingLeft: "10px", fontWeight: "bold", fontFamily: "Bree Serif" }}>E-Menu</Navbar.Brand>
                            </>
                        )
                    }
                </ActiveLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                        <ActiveLink activeClassName="active" href="/newspaper">
                            <a className="nav-link">Newspaper</a>
                        </ActiveLink>
                        <ActiveLink activeClassName="active" href="/menuFeeding">
                            <a className="nav-link">Menu Feeding</a>
                        </ActiveLink>
                        <ActiveLink activeClassName="active" href="/contact">
                            <a className="nav-link">Contact</a>
                        </ActiveLink>
                        {/* <Nav.Item onClick={() => setModalShow(true)}>
                            Login
                        </Nav.Item> */}
                        {
                            login == 'true' ? (
                                <NavDropdown title="Login" id="nav-dropdown">
                                    <NavDropdown.Item >
                                        <ActiveLink activeClassName="active" href="/userProfile">
                                            <a className="nav-link">Update user profile</a>
                                        </ActiveLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item >
                                        <ActiveLink activeClassName="active" href="/orderHistory">
                                            <a className="nav-link">Order History</a>
                                        </ActiveLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item >
                                        <a className="nav-link" onClick={() => signOut()}>Log Out</a>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <a className="nav-link" onClick={() => setModalShow(true)}>Login</a>
                            )
                        }

                        <ActiveLink activeClassName="active" href="/partner">
                            <a className="nav-link">Partner</a>
                        </ActiveLink>

                        <ActiveLink activeClassName="active" href="/admin">
                            <a className="nav-link">Admin</a>
                        </ActiveLink>
                        <ActiveLink activeClassName="active" href="/checkout" >
                            <a className="nav-link" >Check out</a>
                        </ActiveLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className={containerStyle}>
                {children}
            </div>

            <Widget
                // titleAvatar={<MenuBookIcon />}
                handleNewUserMessage={handleNewUserMessage}
                // profileAvatar={logo}
                title='My E-menu Live Chat'
                subtitle='Ready to help you'
                handleNewUserMessage={(newMessage) => handleNewUserMessage(newMessage)}
            />
            <LoginModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div >
    )
}

//Login Modal
function LoginModal(props) {

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