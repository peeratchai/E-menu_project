import React, { useEffect } from 'react'
import { Form, Button, Modal, Container } from 'react-bootstrap'
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons'


export default function EditCategoryModal(props) {
    const { onHide, edit_category, category } = props
    const [categoryForm, setcategoryForm] = React.useState({
        categoryName: null,
        sequenceNumber: null
    })
    const [errors, setErrors] = React.useState({})

    useEffect(() => {
        if (category !== undefined) {
            setcategoryForm({
                categoryName: category.name,
                sequenceNumber: category.sequence_number
            })
        }
    }, [props])

    const editCategory = () => {
        const newErrors = findCategoryFormErrors()
        console.log('newErrors', newErrors)
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            edit_category(categoryForm)
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
                    Edit Category
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
                                value={categoryForm.categoryName}
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
                                value={categoryForm.sequenceNumber}
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
                <Button onClick={() => editCategory()}>
                    Save
                </Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>

        </Modal >
    );
}