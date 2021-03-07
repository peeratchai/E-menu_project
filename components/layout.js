import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import { Navbar, Nav, NavDropdown, Button, Modal, Row, Col, Container, Form } from 'react-bootstrap';
import { useRouter } from 'next/router'
import ActiveLink from './ActiveLink'
import { Link } from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import React from 'react'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

export default function Layout({ children, util }) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div style={{ paddingBottom: '5px' }}>
            <Head>
                <title>E-Menu</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bree Serif" />
            </Head>
            <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "White", boxShadow: "rgb(204 204 204) 3px 2px 8px 1px", padding: "20px 20px", fontWeight: "bold" }}>
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
                    <>
                        <span style={{ paddingLeft: "5%" }}></span>
                        <MenuBookIcon
                            className="d-inline-block align-top" style={{ color: "#FF4A4F", fontSize: "2.5rem" }} />
                        <Navbar.Brand style={{ color: "black !important", cursor: "pointer", paddingLeft: "10px", fontWeight: "bold", fontFamily: "Bree Serif" }}>E-Menu</Navbar.Brand>
                    </>
                </ActiveLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className="mr-auto">

                    </Nav>
                    <Nav>
                        <ActiveLink activeClassName="active" href="/newspaper">
                            <a className="nav-link">NewsPaper</a>
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
                        <a className="nav-link" onClick={() => setModalShow(true)}>Login</a>

                        {/* <NavDropdown title="Login" id="nav-dropdown">
                            <NavDropdown.Item >Update user profile</NavDropdown.Item>
                            <NavDropdown.Item >Order</NavDropdown.Item>
                        </NavDropdown> */}
                        <ActiveLink activeClassName="active" href="#">
                            <a className="nav-link">Check out</a>
                        </ActiveLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {
                util ? (
                    <div >
                        {children}
                    </div>
                ) : (
                    <div className={styles.container}>
                        {children}
                    </div>
                )
            }
            <LoginModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div >
    )
}

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
                <Row style={{ textAlign: "center", marginBottom: "3.125rem", fontWeight: "bold" }}>
                    <Col xs={6} sm={6} style={{ cursor: "pointer" }} onClick={() => { setTab('login') }}>
                        <h3 style={{ fontWeight: "700" }}>Login</h3>
                    </Col>
                    <Col xs={6} sm={6} style={{ cursor: "pointer" }} onClick={() => { setTab('register') }}>
                        <h3 style={{ fontWeight: "700" }}>Register</h3>
                    </Col>
                </Row>
                {
                    tab == 'login' ? (
                        <>
                            <Row style={{ marginBottom: "1rem" }}>
                                <Col>
                                    Log In Your Account
                        </Col>
                            </Row>
                            <Form style={{ marginBottom: "3rem" }}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formBasicUsername">
                                            <Form.Control type="Username" placeholder="Username" />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Control type="password" placeholder="Password" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicRemember">
                                            <Form.Check type="checkbox" label="Remember me" />
                                        </Form.Group>
                                        <Button variant="primary" type="submit" style={{ width: "100%", backgroundColor: "#FF4046", border: "none" }}>
                                            LOG IN
                                </Button>
                                    </Col>
                                </Row>
                            </Form>
                            <Row style={{ height: "50px" }}>
                                <Col xs={6} sm={6} style={{ margin: "auto" }}>
                                    Or Log In With
                    </Col>
                                <Col xs={3} sm={3}>
                                    <Button style={{ backgroundColor: "#3b5998", width: "100%", height: "100%" }}>
                                        <FacebookIcon />
                                    </Button>
                                </Col>
                                <Col xs={3} sm={3}>
                                    <Button style={{ backgroundColor: "#1da1f2", width: "100%", height: "100%" }}>
                                        <TwitterIcon />
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <>
                            <Row style={{ marginBottom: "1rem" }}>
                                <Col>
                                    Create Your Account
                                </Col>
                            </Row>
                            <Form >
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formBasicUsername">
                                            <Form.Control type="Username" placeholder="Username" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Control type="Username" placeholder="Email Address" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Control type="password" placeholder="Password" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicRetypePassword">
                                            <Form.Control type="password" placeholder="Retype Password" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicRemember">
                                            <Form.Check type="checkbox" label="Remember me" />
                                        </Form.Group>
                                        <Button variant="primary" type="submit" style={{ width: "100%", backgroundColor: "#FF4046", border: "none" }}>
                                            CREATE AN ACCOUNT
                                </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </>
                    )
                }

            </Modal.Body>
        </Modal >
    );
}