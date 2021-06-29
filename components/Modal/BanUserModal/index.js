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

    const findUserId = (email) => {
        console.log('email', email)
        console.log('profile_all_user', profile_all_user)
        let user = profile_all_user.find((userDetail) => userDetail.email == email)
        console.log(user.id)
        setUserId(user.id)
    }

    let dropdownUser = profile_all_user && profile_all_user.map((user) => {
        if (user.email !== null && user.email !== 'null') {
            return (
                <Option value={user.email} key={user.id}>{user.email}</Option>
            )
        }
    }
    )


    return (

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}>
                    Ban User
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
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
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
                <Button className="Buttom_Close" onClick={onHide}>Close</Button>
            </Modal.Footer>

        </Modal >
    );
}