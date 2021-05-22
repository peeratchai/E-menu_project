import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import styles from './index.module.css'
import { Row, Col, Form, Image, Button, Tab, Modal, Container, Tabs } from 'react-bootstrap'
import 'antd/dist/antd.css';
import { Upload, message, Table, Space, Switch, Radio, Card } from 'antd';
import { LoadingOutlined, PlusOutlined, UploadOutlined, DeleteOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
import React, { useEffect } from 'react'
import termAgreement from '../../utils/termAgreement.json'
import profileService from '../../services/profile'

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

export default function UserProfile() {

    const [profileImage, setProfileImage] = React.useState("data:image/png;base64,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");
    const [errors, setErrors] = React.useState({});
    const [profileForm, setProfileForm] = React.useState({
        first_name: '',
        last_name: '',
        age: '',
        phoneNumber: ''
    })


    const handleChangeProfileImage = (info) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => {
                setProfileform('profileImage', info.file.originFileObj)
                setProfileImage(imageUrl)
            });
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let profile = window.localStorage.getItem('profile')
            profile = JSON.parse(profile)
            if (profile.avatar_url !== null || profile.avatar_url !== '') {
                setProfileImage(profile.avatar_url)
            }
            setProfileForm({
                first_name: profile.first_name,
                last_name: profile.last_name,
                gender: profile.gender,
                age: profile.age,
                phoneNumber: profile.phone_number,
                username: profile.username
            })
        }
    }, [])

    const onChangeGender = (e) => {
        setProfileform('gender', e.target.value)
    }

    const setProfileform = (fieldName, value) => {
        // console.log
        setProfileForm({
            ...profileForm,
            [fieldName]: value
        })

        // Check and see if errors exist, and remove them from the error object:
        if (!!errors[fieldName]) setErrors({
            ...errors,
            [fieldName]: null
        })
    }

    const saveProfile = async () => {
        const newErrors = findProfileFormErrors()

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            const { first_name, last_name, gender, age, phoneNumber, profileImage, username } = profileForm
            let profileImageData
            if (profileImage) {
                profileImageData = profileImage
            } else {
                profileImageData = null
            }

            let data = {
                username: username,
                first_name: first_name,
                last_name: last_name,
                gender: gender,
                age: age,
                phone_number: phoneNumber,
                avatar: profileImageData
            }

            console.log('data', data)

            let responseProfile = await profileService.editUserProfile(data)
            if (responseProfile) {
                let profile = await profileService.getProfile()
                window.localStorage.setItem('profile', JSON.stringify(profile))
                message.success('Edit profile successful.')
            } else {
                message.error('Cannot edit profile !')
            }
        }
    }


    const findProfileFormErrors = () => {
        const { first_name, last_name, age, phoneNumber } = profileForm
        var patternNumber = new RegExp(/^\d+$/);
        const newErrors = {}
        // first_name  errors
        if (!first_name || first_name === '') newErrors.first_name = 'First name is required !'
        // last_name  errors
        if (!last_name || last_name === '') newErrors.last_name = 'Last name is required !'
        // age errors
        if (!age || age === '') newErrors.age = 'Age is required !'
        else if (!patternNumber.test(age)) newErrors.age = 'Please enter valid age!'
        // phoneNumber errors
        if (!phoneNumber || phoneNumber === '') newErrors.phoneNumber = 'Phone number is required !'
        else if (!patternNumber.test(phoneNumber)) newErrors.phoneNumber = 'Please enter valid phone number!'
        return newErrors
    }

    return (
        <Layout containerType="center">
            <Container className={styles.container}>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                    <Tab eventKey="profile" title="Profile">
                        <div className={styles.tab}>
                            <Row>
                                <Col sm={6}>
                                    <Row>
                                        <Col>
                                            <img src={profileImage} alt="avatar" style={{ width: '100%', height: '16rem', border: "1px solid #555", borderRadius: "5px" }} />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col>
                                            <Upload
                                                showUploadList={false}
                                                beforeUpload={beforeUpload}
                                                onChange={(e) => handleChangeProfileImage(e)}
                                                style={{ width: "100%" }}
                                            // onPreview={(e) => onPreview(e)}
                                            >
                                                <Button icon={<UploadOutlined />} className={utilStyles.cardText} style={{ width: "100%", backgroundColor: "#cfcfcf", color: "black", border: "none" }}>Click to Upload Profile Image</Button>
                                            </Upload>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={6}>
                                    <Form>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="Name">
                                                    <Form.Label>Fist name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={(e) => setProfileform('first_name', e.target.value)}
                                                        isInvalid={!!errors.first_name}
                                                        value={profileForm.first_name}
                                                        autoComplete="off"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.first_name}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group controlId="Name">
                                                    <Form.Label>Last name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={(e) => setProfileform('last_name', e.target.value)}
                                                        isInvalid={!!errors.last_name}
                                                        value={profileForm.last_name}
                                                        autoComplete="off"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.last_name}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Form.Group controlId="Gender">
                                            <Form.Label>Gander</Form.Label>
                                            <div>
                                                <Radio.Group value={profileForm.gender} onChange={(e) => onChangeGender(e)}>
                                                    <Radio value="male">ชาย</Radio>
                                                    <Radio value="female">หญิง</Radio>
                                                </Radio.Group>
                                            </div>
                                        </Form.Group>
                                        <Form.Group controlId="email">
                                            <Form.Label>Age</Form.Label>
                                            <Form.Control
                                                type="text"
                                                onChange={(e) => setProfileform('age', e.target.value)}
                                                isInvalid={!!errors.age}
                                                value={profileForm.age}
                                                autoComplete="off"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.age}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group controlId="phone">
                                            <Form.Label>Phone number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                onChange={(e) => setProfileform('phoneNumber', e.target.value)}
                                                isInvalid={!!errors.phoneNumber}
                                                value={profileForm.phoneNumber}
                                                autoComplete="off"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.phoneNumber}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Row style={{ marginBottom: ".5rem" }}>
                                            <Col>
                                                Sync with Facebook or Line
                                            </Col>
                                        </Row>
                                        <Row style={{ marginBottom: "16px" }}>
                                            <Col>
                                                <Image src="/images/facebook-icon.png " style={{ marginRight: "15px", cursor: "pointer", width: "50px", height: "50px", objectFit: "contain", display: 'inline' }} />
                                                <Image src="/images/line-icon.png " style={{ width: "50px", cursor: "pointer", height: "50px", objectFit: "contain", display: 'inline' }} />
                                            </Col>
                                        </Row>

                                        <div style={{ textAlign: "right" }}>
                                            <Button variant="danger" style={{ marginRight: "15px" }}>
                                                Delete User
                                            </Button>
                                            <Button variant="primary" onClick={() => saveProfile()} >
                                                Save
                                            </Button>
                                        </div>
                                    </Form>
                                </Col>
                            </Row>
                        </div>
                    </Tab>
                    <Tab eventKey="setting" title="Setting">
                        <Card title="Term Agreements" style={{ marginTop: "15px", maxHeight: "60vh", overflow: "auto" }}>
                            {termAgreement.text}
                        </Card>
                    </Tab>
                </Tabs>
            </Container>

        </Layout >


    )
}
