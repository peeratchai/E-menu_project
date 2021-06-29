import React from 'react'
import { Form, Button, Modal, Container } from 'react-bootstrap'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd';
export default function AddCategoryModal(props) {
    const { onHide, add_category } = props
    const [categoryForm, setcategoryForm] = React.useState()
    const [errors, setErrors] = React.useState({})

    const addCategory = () => {

        const newErrors = findCategoryFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            add_category(categoryForm)
            onHide()
        }
    }

    const findCategoryFormErrors = () => {
        const { categoryName, sequenceNumber } = categoryForm
        const newErrors = {}
        var patternNumber = new RegExp(/^\d+$/);

        if (!categoryName || categoryName === '') newErrors.categoryName = 'Category name is required !'
        if (!sequenceNumber || sequenceNumber === '') newErrors.sequenceNumber = 'Sequence number is required !'
        else if (!patternNumber.test(sequenceNumber)) newErrors.sequenceNumber = 'Please enter valid sequence number!'
        return newErrors
    }

    const setForm = (fieldName, value) => {

        setcategoryForm({
            ...categoryForm,
            [fieldName]: value
        })

        // Check and see if errors exist, and remove them from the error object:
        if (!!errors[fieldName]) setErrors({
            ...errors,
            [fieldName]: null
        })
    }

    return (

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}>
                    New Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form>
                        <Form.Group controlId="categoryName">
                            <Form.Label>
                                Category Name
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Exp. Salmon"
                                onChange={e => setForm('categoryName', e.target.value)}
                                isInvalid={!!errors.categoryName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.categoryName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="sequenceNumber">
                            <Form.Label>
                                Sequence Number &nbsp;
                                <Tooltip title="Sequence number for use to sort the category.">
                                    <InfoCircleOutlined style={{ color: "orange" }} />
                                </Tooltip>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Exp. 1"
                                onChange={e => setForm('sequenceNumber', e.target.value)}
                                isInvalid={!!errors.sequenceNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.sequenceNumber}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => addCategory()}>
                    Submit
                </Button>
                <Button className="Buttom_Close" onClick={props.onHide}>Close</Button>
            </Modal.Footer>

        </Modal >
    );
}