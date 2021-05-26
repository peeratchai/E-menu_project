import utilStyles from '../../../styles/utils.module.css'
import { Row, Col, Form, Modal, Image, Button } from 'react-bootstrap'
import 'antd/dist/antd.css';
import { Upload, Radio, Select, Space, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react'
import profileService from '../../../services/profile'


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


export default function AdminEditProfileModal(props) {
    const { profile, restaurant_list } = props
    const { get_all_user_profile } = props
    const [profileImage, setProfileImage] = React.useState("data:image/png;base64,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");
    const [errors, setErrors] = React.useState({});
    const [profileForm, setProfileForm] = React.useState({
        first_name: '',
        last_name: '',
        age: '',
        phoneNumber: '',
        gender: '',
    })
    const [restaurantList, setRestaurantList] = React.useState([])
    const [restaurantName, setRestaurantName] = React.useState();
    const [disableRestaurantDropdown, setDisableRestaurantDropdown] = React.useState(true)
    const roles = [
        {
            label: 'Customer',
            value: 'customer',
        },
        {
            label: 'Employee',
            value: 'employee',
        },
        {
            label: 'Partner',
            value: 'partner',
        },
        {
            label: 'Admin',
            value: 'admin',
        }
    ]

    const handleChangeProfileImage = (info) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setProfileform('profileImage', info.file.originFileObj)
                setProfileImage(imageUrl)
            }
            );
        }
    };

    useEffect(() => {
        if (profile) {
            if (typeof profile.avatar_url === 'string') {
                setProfileImage(profile.avatar_url)
            } else {
                console.log('default')
                setProfileImage("data:image/png;base64,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")
            }
            setProfileForm({
                userId: profile.userId,
                first_name: profile.first_name,
                last_name: profile.last_name,
                gender: profile.gender,
                age: profile.age,
                phoneNumber: profile.phone_number,
                username: profile.username,
                roles: profile.roles,
                restaurant_employee: profile.restaurant_employee,
                is_active: profile.is_active
            })


            if (profile.roles.length > 0) {
                let havePartnerRole = false
                profile.roles.forEach((role) => {
                    if (role === 'employee' || role === 'partner') {
                        havePartnerRole = true
                    }
                })

                if (havePartnerRole) {
                    setDisableRestaurantDropdown(false)
                } else {
                    setDisableRestaurantDropdown(true)
                }
            }

            setRestaurantName(profile.restaurant_name)
            let restaurantList = []
            restaurant_list.forEach((restaurantDetails) => {
                restaurantList.push({
                    label: restaurantDetails.name,
                    value: restaurantDetails.id
                })
            })
            console.log('restaurantList', restaurantList)
            setRestaurantList(restaurantList)
        }
    }, [profile])

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

        const { userId, first_name, last_name, gender, age, phoneNumber, profileImage, username, roles, is_active, restaurant_employee } = profileForm
        let profileImageData
        if (profileImage) {
            profileImageData = profileImage
        } else {
            profileImageData = null
        }

        console.log('userId', userId)

        // let rolesString 
        // if (roles.length > 0) {
        //     rolesString = roles.join(',')
        // }

        let data = {
            username: username,
            first_name: first_name,
            last_name: last_name,
            gender: gender,
            age: age,
            phone_number: phoneNumber,
            avatar: profileImageData,
            roles: roles,
            restaurant_employee: restaurant_employee,
            is_active: is_active
        }

        console.log('data', data)

        let responseProfile = await profileService.adminEditUserProfile(data, userId)
        console.log('responseProfile',responseProfile)
        if (responseProfile) {
            let profile = await profileService.getProfile()
            window.localStorage.setItem('profile', JSON.stringify(profile))
            get_all_user_profile()
            message.success('Edit profile successful.')
        } else {
            message.error('Cannot edit profile !')
        }
    }

    const restaurantRow = {
        showArrow: true,
        style: {
            width: '100%',
        },
        value: restaurantName,
        options: restaurantList,
        onChange: (restaurant) => {
            setProfileform('restaurant_employee', restaurant)
            setRestaurantName(restaurant)
        },
        placeholder: 'Select restaurant...',
        disabled: disableRestaurantDropdown
    }

    const rolesProps = {
        showArrow: true,
        mode: 'multiple',
        style: {
            width: '100%',
        },
        value: profileForm.roles,
        options: roles,
        onChange: (roles) => {
            let havePartnerRole = false
            roles.forEach((role) => {
                if (role === 'employee' || role === 'partner') {
                    havePartnerRole = true
                }
            })

            if (havePartnerRole) {
                setDisableRestaurantDropdown(false)
            } else {
                setDisableRestaurantDropdown(true)
            }
            setProfileform('roles', roles)
        },
        placeholder: 'Select role...',
        maxTagCount: 'responsive',
    };

    return (

        <Modal
            centered
            {...props}
            dialogClassName="menuModal-70w"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}>
                    Edit Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                                    <Form.Group controlId="Restaurant Id">
                                        <Form.Label>Restaurant</Form.Label>
                                        <div>
                                            <Space
                                                direction="vertical"
                                                style={{
                                                    width: '100%',
                                                }}
                                            >
                                                <Select {...restaurantRow} />
                                            </Space>
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="First Name">
                                        <Form.Label>Fist name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            onChange={(e) => setProfileform('first_name', e.target.value)}
                                            value={profileForm.first_name}
                                            autoComplete="off"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="Last Name">
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            onChange={(e) => setProfileform('last_name', e.target.value)}
                                            value={profileForm.last_name}
                                            autoComplete="off"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group controlId="Roles">
                                        <Form.Label>Roles</Form.Label>
                                        <div>
                                            <Space
                                                direction="vertical"
                                                style={{
                                                    width: '100%',
                                                }}
                                            >
                                                <Select {...rolesProps} />
                                            </Space>
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="Gender">
                                        <Form.Label>Gander</Form.Label>
                                        <div>
                                            <Radio.Group value={profileForm.gender} onChange={(e) => onChangeGender(e)}>
                                                <Radio value="male">ชาย</Radio>
                                                <Radio value="female">หญิง</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group controlId="email">
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setProfileform('age', e.target.value)}
                                    value={profileForm.age}
                                    autoComplete="off"
                                />
                            </Form.Group>
                            <Form.Group controlId="phone">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setProfileform('phoneNumber', e.target.value)}
                                    value={profileForm.phoneNumber}
                                    autoComplete="off"
                                />
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
                                <Button variant="primary" style={{ marginRight: "15px" }} onClick={() => saveProfile()} >
                                    Save
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal >
    );
}