import utilStyles from '../../../styles/utils.module.css'
import { Row, Col, Form, Button, Modal, Container } from 'react-bootstrap'
import 'antd/dist/antd.css';
import { Upload, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react'


export default function AddMenuModal(props) {

    let { category, menu_image, errors, menu_form, default_image } = props
    let { check_before_upload, handle_upload, onHide, set_form, add_menu, set_errors } = props

    const saveMenu = () => {
        const newErrors = findAddMenuFormErrors()
        let isMenuImageUploaded = checkMenuImageUpload()

        if (Object.keys(newErrors).length > 0) {
            set_errors(newErrors)
        } else {
            if (!isMenuImageUploaded) {
                message.error('Please upload menu image.')
            } else {
                add_menu()
                onHide()
            }
        }
    }

    const checkMenuImageUpload = () => {
        let isMenuImageUploaded
        if (menu_image === default_image) {
            isMenuImageUploaded = false
        } else {
            isMenuImageUploaded = true
        }

        return isMenuImageUploaded
    }

    const findAddMenuFormErrors = () => {
        const { menuName, description, price } = menu_form
        const newErrors = {}
        // menu name  errors
        if (!menuName || menuName === '') newErrors.menuName = 'Menu name is required !'
        // description errors
        if (!description || description === '') newErrors.description = 'Description is required !'
        var pattern = new RegExp(/^\d+$/);
        // price errors
        if (!price || price === '') newErrors.price = 'Price is required !'
        else if (!pattern.test(price)) newErrors.price = 'Please enter valid price !'
        else if (parseFloat(price) > 1000000 || parseFloat(price) < 0) newErrors.price = 'Please enter price between 1 - 1,000,000 THB'
        return newErrors
    }

    return (

        <Modal
            {...props}
            dialogClassName="menuModal-70w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}>
                    Category : {category.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col sm={6}>
                            <Row>
                                <Col>
                                    <img src={menu_image} alt="avatar" style={{ width: '100%', height: '16rem', border: "1px solid #555", borderRadius: "5px" }} />
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <Upload
                                        showUploadList={false}
                                        beforeUpload={check_before_upload}
                                        onChange={(e) => handle_upload(e)}
                                        style={{ width: "100%" }}
                                    >
                                        <Button icon={<UploadOutlined />} className={utilStyles.cardText} style={{ width: "100%", backgroundColor: "#cfcfcf", color: "black", border: "none" }}>Click to Upload Menu Image</Button>
                                    </Upload>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={6}>
                            <Form onSubmit={saveMenu}>
                                <Form.Group >
                                    <Form.Label>Menu Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={(e) => set_form('menuName', e.target.value)}
                                        isInvalid={!!errors.menuName}
                                        value={menu_form.menuName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.menuName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={(e) => set_form('description', e.target.value)}
                                        isInvalid={!!errors.description}
                                        value={menu_form.description}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={(e) => set_form('price', e.target.value)}
                                        isInvalid={!!errors.price}
                                        value={menu_form.price}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.price}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => saveMenu()}>
                    Add
                </Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>

        </Modal >
    )

}