import Layout, { siteTitle } from '../../components/layout'
import Container from 'react-bootstrap/Container'
import { Row, Col, Card, Form, Button } from 'react-bootstrap'
import useMediaQuery from "../../utils/utils";
import utilStyles from '../../styles/utils.module.css'
import Head from 'next/head'

export default function Contact() {
    const isBreakpoint = useMediaQuery(768)
    return (
        <Layout>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css?family=Montserrat"
                    rel="stylesheet"
                    key="google-font-cabin"
                />
            </Head>
            {
                !isBreakpoint ? (
                    //PC version
                    <div style={{ backgroundImage: " url('/images/backgroundContactUs.jpg')", width: "100%", height: "50vh", position: "relative", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", opacity: "0.85" }}>
                        <div style={{ textAlign: "center", width: "50%", margin: "auto", padding: "10px", top: "25%", position: "relative" }}>
                            <div className={utilStyles.heading2Xl} style={{ color: "white", fontFamily: "Montserrat", textShadow: "0 0 6px #000000" }}>
                                Contact Informations
                    </div>
                            <div style={{ color: "#ededed", textShadow: "0 0 3px #000000" }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    </div>
                            <div style={{ marginTop: "50px" }}>
                                <Button style={{ border: "none" }}>
                                    Contact Us
                        </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    //Mobile version
                    <div style={{ backgroundImage: " url('/images/backgroundContactUs.jpg')", width: "100%", height: "50vh", position: "relative", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", opacity: "0.85" }}>
                        <div style={{ textAlign: "center", width: "100%", margin: "auto", padding: "10px", position: "relative" }}>
                            <div className={utilStyles.heading2Xl} style={{ color: "white", fontFamily: "Montserrat", textShadow: "0 0 6px #000000" }}>
                                Contact Informations
                    </div>
                            <div style={{ color: "#ededed", textShadow: "0 0 6px #000000" }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    </div>
                            <div style={{ marginTop: "50px" }}>
                                <Button style={{ border: "none" }}>
                                    Contact Us
                        </Button>
                            </div>
                        </div>
                    </div>
                )
            }

            <div className={utilStyles.container} style={{ backgroundColor: "#F2F5F6" }}>
                <div className={utilStyles.headingLg} style={{ textAlign: "center", paddingTop: "30px" }}>
                    Get In Touch
                </div>
                <Form style={{ padding: "10px 30px 40px 30px" }}>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Your Name" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="formTel">
                                <Form.Label>Tel</Form.Label>
                                <Form.Control type="text" placeholder="Tel" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formMessage">
                                <Form.Label>Message</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group style={{ textAlign: "right" }}>
                        <Button variant="primary" type="submit" >
                            Send Message
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </Layout>
    )
}