import React from 'react'
import { Form, Button, Modal, Container } from 'react-bootstrap'
import { Select, message } from 'antd'

const { Option } = Select;

export default function BanUserModal(props) {
    const { onHide, profile_all_user, ban_user } = props
    const [userId, setUserId] = React.useState(null);

    const onSubmit = () => {
        console.log('userId ->', userId)
        if (userId !== null || userId !== '') {
            ban_user(userId)
            setUserId("")
        } else {
            message.error('Please select email for ban the user.')
        }
        onHide()
    }
    console.log('profile_all_user', profile_all_user)

    const findUserId = (email) => {
        let userId = profile_all_user.find((userDetail) => userDetail.email = email)
        console.log(userId)
        setUserId(userId)
    }

    let dropdownUser = profile_all_user && profile_all_user.map((user) => (
        <Option value={user.email} key={user.id}>{user.email}</Option>
    ))


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
                        <Form.Group controlId="email">
                            <Form.Label>
                                User Email
                            </Form.Label>
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                optionFilterProp="children"
                                onChange={(email) => findUserId(email)}
                                filterOption={(input, option) => {
                                    console.log('option', option)
                                    console.log('input', input)
                                    return (
                                        option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    )
                                }
                                }
                            >
                                {dropdownUser}
                            </Select>
                        </Form.Group>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => onSubmit()}>
                    Submit
                </Button>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>

        </Modal >
    );
}