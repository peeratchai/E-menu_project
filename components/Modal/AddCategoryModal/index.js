import React from 'react'
import { Form, Button, Modal, Container } from 'react-bootstrap'


export default function AddCategoryModal(props) {
    const { onHide, add_category } = props
    const [categoryName, setCategoryName] = React.useState('');

    const addCategory = () => {
        console.log('categoryName ->', categoryName)
        setCategoryName("")
        add_category(categoryName)
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
                    New Category
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
                <Button onClick={() => addCategory()}>
                    Submit
                </Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>

        </Modal >
    );
}