import Layout, { siteTitle } from '../../components/layout'
import { Row, Col, Card, Form, Button } from 'react-bootstrap'
import useMediaQuery from "../../utils/utils";
import utilStyles from '../../styles/utils.module.css'
import Head from 'next/head'
import React from 'react'
import contactUsService from '../../services/contactUsService'
import { message } from 'antd'
import 'antd/dist/antd.css';
import Link from 'next/link';

export default function Contact() {
    const isMobileResolution = useMediaQuery(768)
    const [errors, setErrors] = React.useState({});
    const [contactUsForm, setContactUsForm] = React.useState({
        "name": '',
        "email": '',
        "phone": '',
        "subject": '',
        "message": ''
    })
    const setProfileform = (fieldName, value) => {
        // console.log
        setContactUsForm({
            ...contactUsForm,
            [fieldName]: value
        })

        // Check and see if errors exist, and remove them from the error object:
        if (!!errors[fieldName]) setErrors({
            ...errors,
            [fieldName]: null
        })
    }

    const findContactUsFormErrors = () => {
        const { name, email, phone, subject, message } = contactUsForm
        var patternNumber = new RegExp(/^\d+$/);
        var patternEmail = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        const newErrors = {}
        // name  errors
        if (!name || name === '') newErrors.name = 'Name is required !'
        // email  errors
        if (!email || email === '') newErrors.email = 'Email is required !'
        else if (!patternEmail.test(email)) newErrors.email = 'Please enter valid email address !'
        // phone errors
        if (!phone || phone === '') newErrors.phone = 'Phone is required !'
        else if (!patternNumber.test(phone)) newErrors.phone = 'Please enter valid phone!'
        // subject errors
        if (!subject || subject === '') newErrors.subject = 'Subject is required !'
        // message errors
        if (!message || message === '') newErrors.message = 'Message is required !'
        return newErrors
    }

    const sendMessage = async () => {
        const newErrors = findContactUsFormErrors()

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            const { name, email, phone, subject } = contactUsForm

            let data = {
                "name": name,
                "email": email,
                "phone": phone,
                "subject": subject,
                "message": contactUsForm.message
            }

            console.log('data', data)

            contactUsService.sendMessage(data).then((response) => {
                message.success('Send message successful.')
                console.log('response', response)
                setContactUsForm({
                    "name": '',
                    "email": '',
                    "phone": '',
                    "subject": '',
                    "message": ''
                })
            }).catch(error => {
                console.log('error', error)
                message.error('Cannot send message.')
            })

        }
    }

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
                !isMobileResolution ? (
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
                                <Link href={process.env.FACEBOOK_PAGE_URL} passHref={true}>
                                    <Button style={{ border: "none" }}>Contact Us</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    //Mobile version
                    <div style={{ backgroundImage: " url('/images/backgroundContactUs.jpg')", width: "100%", minHeight: "50vh", position: "relative", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", opacity: "0.85" }}>
                        <div style={{ textAlign: "center", width: "100%", margin: "auto", padding: "10px", position: "relative" }}>
                            <div className={utilStyles.heading2Xl} style={{ color: "white", fontFamily: "Montserrat", textShadow: "0 0 6px #000000" }}>
                                Contact Informations
                    </div>
                            <div style={{ color: "#ededed", textShadow: "0 0 6px #000000" }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    </div>
                            <div style={{ marginTop: "50px" }}>
                                <Link href={process.env.FACEBOOK_PAGE_URL} passHref={true}>
                                    <Button style={{ border: "none" }}>Contact Us</Button>
                                </Link>
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
                                <Form.Control
                                    type="text"
                                    placeholder="Your Name"
                                    onChange={(e) => setProfileform('name', e.target.value)}
                                    isInvalid={!!errors.name}
                                    value={contactUsForm.name}
                                    autoComplete="off"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Email"
                                    onChange={(e) => setProfileform('email', e.target.value)}
                                    isInvalid={!!errors.email}
                                    value={contactUsForm.email}
                                    autoComplete="off"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Subject</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Subject"
                                    onChange={(e) => setProfileform('subject', e.target.value)}
                                    isInvalid={!!errors.subject}
                                    value={contactUsForm.subject}
                                    autoComplete="off"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.subject}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="formPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Phone"
                                    onChange={(e) => setProfileform('phone', e.target.value)}
                                    isInvalid={!!errors.phone}
                                    value={contactUsForm.phone}
                                    autoComplete="off"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phone}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formMessage">
                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    onChange={(e) => setProfileform('message', e.target.value)}
                                    isInvalid={!!errors.message}
                                    value={contactUsForm.message}
                                    autoComplete="off"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group style={{ textAlign: "right" }}>
                        <Button variant="primary" onClick={() => sendMessage()} >
                            Send Message
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </Layout>
    )
}