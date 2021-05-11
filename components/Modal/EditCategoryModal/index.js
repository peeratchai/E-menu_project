import React, { useEffect } from 'react'
import { Form, Button, Modal, Container } from 'react-bootstrap'


export default function EditCategoryModal(props) {
    const { onHide, edit_category, category } = props
    const [categoryName, setCategoryName] = React.useState({ name: '' });

    useEffect(() => {
        if (category !== undefined) {
            console.log(props)
            setCategoryName(category.name)
        }
    }, [props])

    const editCategory = () => {
        console.log('categoryName ->', categoryName)
        let editedCategory = category
        editedCategory.name = categoryName
        setCategoryName("")
        edit_category(editedCategory)
        onHide()
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
                            <Form.Control
                                type="text"
                                placeholder="Enter Category Name"
                                value={categoryName}
                                onChange={e => setCategoryName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { editCategory() }}>
                    Submit
                </Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>

        </Modal >
    );
}