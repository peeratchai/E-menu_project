import React, { useEffect } from 'react'
import { Form, Checkbox, Select, Input, Button, message } from 'antd';
import { Row, Col, Image, Tab, Modal, Container, Nav, Tabs } from 'react-bootstrap'
import 'antd/dist/antd.css';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import styles from './index.module.css'
import adminService from '../../../services/admin'
import uploadService from '../../../services/upload'

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

export default function SendEmail() {
    const [form] = Form.useForm()
    const options = ['All Customers', 'All Restaurants']
    const [allEmail, setAllEmail] = React.useState([])
    const [emailForm, setEmailForm] = React.useState({
        "is_send_all_customer": false,
        "is_send_all_restaurant": false,
    })
    const [messageContent, setMessageContent] = React.useState('')


    useEffect(() => {
        getAllProfile()
    }, [])

    const getAllProfile = async () => {
        let allProfile = await adminService.getAllProfile()
        let allEmail = []
        allProfile.forEach((profile) => {
            allEmail.push(profile.email)
        })
        setAllEmail(allEmail)
        console.log('allProfile', allProfile)
    }

    const setEmailFormData = (fieldName, value) => {
        console.log('emailForm', emailForm)
        setEmailForm({
            ...emailForm,
            [fieldName]: value
        })
    }

    const onChangeCheckbox = (checkedValues) => {
        let newEmailForm = { ...emailForm }
        let mail_to = newEmailForm.mail_to
        newEmailForm.is_send_all_customer = false
        newEmailForm.is_send_all_restaurant = false
        if (checkedValues.length > 0) {
            mail_to = []
            checkedValues.forEach((checkedValue) => {
                if (checkedValue === 'All Customers') {
                    newEmailForm.is_send_all_customer = true
                    mail_to.push('AllCustomers@email.com')
                }
                if (checkedValue === 'All Restaurants') {
                    newEmailForm.is_send_all_restaurant = true
                    mail_to.push('AllRestaurants@email.com')
                }
            })
        } else {
            mail_to = []
        }
        console.log('newEmailForm', newEmailForm)
        setEmailForm({ ...newEmailForm })
        form.setFieldsValue({
            mail_to: mail_to,
        })

    }

    const onChangeMessage = (content) => {
        setMessageContent(content)
    }

    let emailOptions = allEmail && allEmail.map((email, index) => {
        return <Option key={index.toString(36) + index} value={email}>{email}</Option>
    })


    const onFinish = async (values) => {
        const { is_send_all_customer, is_send_all_restaurant } = emailForm
        const { mail_to, cc, subject, message } = values
        let mail_toString
        let cc_String = null

        if (is_send_all_customer || is_send_all_restaurant) {
            mail_toString = null
        } else {
            mail_toString = mail_to.join(';')
        }

        if (cc.length > 0) {
            cc_String = cc.join(';')
        }

        console.log('emailForm', emailForm)

        let dataForm = {
            "mail_to": mail_toString,
            "cc": cc_String,
            "subject": subject,
            "message": message,
            "is_send_all_customer": is_send_all_customer,
            "is_send_all_restaurant": is_send_all_restaurant
        }
        console.log('dataForm:', dataForm);

        adminService.sendEmail(dataForm).then(() => {
            let defaultMailTo = []
            if (is_send_all_customer || is_send_all_restaurant) {
                defaultMailTo = mail_to
            }
            form.setFieldsValue({
                "mail_to": defaultMailTo,
                "cc": [],
                "subject": undefined,
                "message": undefined,
                "is_send_all_customer": false,
                "is_send_all_restaurant": false
            })
            setMessageContent(undefined)
            sendEmailSuccessful()
        }).catch(error => {
            console.log('send email error:', error);
            sendEmailNotSuccessful()
        })
    };

    const sendEmailSuccessful = () => {
        message.success('Send email successful.')
    }
    const sendEmailNotSuccessful = () => {
        message.error('Cannot send email! Please try again.')
    }


    const onFinishFailed = (errorInfo) => {
        console.log('form', form)
        console.log('Failed:', errorInfo);
    };

    const handleImageUploadBefore = async (files, info, uploadHandler) => {
        let response = {}
        uploadService.uploadImage(files[0]).then((image) => {
            response = {
                result: [
                    {
                        url: image,
                        name: files[0].name,
                        size: files[0].size
                    }
                ]
            }

            uploadHandler(response)
        })
    }
    const handleImageUpload = (targetImgElement, index, state, imageInfo, remainingFilesCount) => {
        console.log(targetImgElement, index, state, imageInfo, remainingFilesCount)
    }
    const handleImageUploadError = (errorMessage, result) => {
        console.log(errorMessage, result)
    }

    return (
        <div>
            <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#0069D9", padding: "15px", textAlign: "center" }}>
                Email
            </div>
            <div className={styles.tab}>
                <div style={{ textAlign: "right", marginBottom: "15px" }}>
                    <Checkbox.Group options={options} onChange={(checkedValues) => onChangeCheckbox(checkedValues)} />
                </div>

                <Form
                    form={form}
                    {...layout}
                    name="emailForm"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{ cc: [], mail_to: [] }}
                >
                    <Form.Item
                        label="To"
                        name="mail_to"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email to!',
                            },
                            {
                                type: 'array',
                                defaultField: {
                                    type: 'email',
                                    message: 'Have invalid emails!'
                                },
                            }
                        ]}
                    >
                        <Select allowClear={true} mode="tags" style={{ width: '100%' }} tokenSeparators={[',']}>
                            {emailOptions}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Subject"
                        name="subject"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your subject!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="CC"
                        name="cc"
                        rules={[
                            {
                                type: 'array',
                                defaultField: {
                                    type: 'email',
                                    message: 'Have invalid emails!'
                                },
                            }
                        ]}
                    >
                        <Select allowClear={true} mode="tags" style={{ width: '100%' }} tokenSeparators={[',']}>
                            {emailOptions}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Message"
                        name="message"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your message!',
                            },
                        ]}
                    >
                        <SunEditor
                            setContents={messageContent}
                            onChange={(content) => onChangeMessage(content)}
                            onImageUpload={(targetImgElement, index, state, imageInfo, remainingFilesCount) => handleImageUpload(targetImgElement, index, state, imageInfo, remainingFilesCount)}
                            onImageUploadBefore={(files, info, uploadHandler) => handleImageUploadBefore(files, info, uploadHandler)}
                            onImageUploadError={(errorMessage, result) => handleImageUploadError(errorMessage, result)}
                            setOptions={{
                                height: 200,
                                buttonList: [[
                                    'align',
                                    'font',
                                    'fontColor',
                                    'fontSize',
                                    'formatBlock',
                                    'hiliteColor',
                                    'horizontalRule',
                                    'lineHeight',
                                    'list',
                                    'paragraphStyle',
                                    'table',
                                    'template',
                                    'textStyle',
                                    /** Dialog */
                                    'image',
                                    'link']]// Or Array of button list, eg. [['font', 'align'], ['image']]
                            }}
                        />
                    </Form.Item>

                    <div style={{ textAlign: "right", marginTop: "20px" }}>
                        <Button type="primary" htmlType="submit">
                            Send email
                        </Button>
                    </div>

                </Form>
            </div>
        </div>
    )
}