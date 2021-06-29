import React from 'react'
import { Form, Button, Modal, Container } from 'react-bootstrap'

export default function AddRestaurantModal(props) {
    const { onHide, add_restaurant } = props
    const [restaurantForm, setRestaurantForm] = React.useState({
        restaurantName: ''
    });
    const [errors, setErrors] = React.useState({});

    const onAddNewRestaurant = () => {

        const newErrors = findRestaurantFormErrors()

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            add_restaurant(restaurantForm)
            setRestaurantForm({
                restaurantName: ''
            })
            onHide()
        }
    }

    const setRestaurantform = (fieldName, value) => {
        // console.log
        setRestaurantForm({
            ...restaurantForm,
            [fieldName]: value
        })

        // Check and see if errors exist, and remove them from the error object:
        if (!!errors[fieldName]) setErrors({
            ...errors,
            [fieldName]: null
        })
    }


    const findRestaurantFormErrors = () => {
        const { restaurantName } = restaurantForm
        const newErrors = {}
        if (!restaurantName || restaurantName === '') newErrors.restaurantName = 'Restaurant name is required !'
        return newErrors
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
                    New Restaurant
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form>
                        <Form.Group controlId="email">
                            <Form.Label>
                                Restaurant Name
                            </Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setRestaurantform('restaurantName', e.target.value)}
                                isInvalid={!!errors.restaurantName}
                                value={restaurantForm.restaurantName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.restaurantName}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => onAddNewRestaurant()}>
                    Submit
                </Button>
                <Button className="Buttom_Close" onClick={onHide}>Close</Button>
            </Modal.Footer>

        </Modal >
    );
}