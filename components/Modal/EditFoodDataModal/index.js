import { Row, Col, Form, Modal, Container } from 'react-bootstrap'
import 'antd/dist/antd.css';
import { Select, Button } from 'antd';
import React, { useEffect } from 'react'
const { Option } = Select;

export default function EditFoodDataModal(props) {

    const { food_item_selected } = props
    const [categoryName, setCategoryName] = React.useState();
    const [foodData, setFoodData] = React.useState({
        nameThai: null,
        nameEnglish: null,
        price: null,
        category: null,
        national: null,
        foodKind: null,
        subKind: null,
        cookMethod: null
    });

    useEffect(() => {
        if (food_item_selected) {
            setFoodData({
                nameThai: null,
                nameEnglish: null,
                price: null,
                category: null,
                national: null,
                foodKind: null,
                subKind: null,
                cookMethod: null
            })

        }
    }, [props])

    const saveMenu = () => {
        console.log('categoryName ->', categoryName)
        setCategoryName("")
        props.onHide()
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
                    <b>{props.title}</b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Group as={Row} controlId="nameThai">
                                    <Form.Label column sm={2}>Name Thai</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" placeholder="" value={foodData.nameThai} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="NameEnglish">
                                    <Form.Label column sm={2}>Name English</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" placeholder="" value={foodData.nameEnglish} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="price">
                                    <Form.Label column sm={2}>Price</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" placeholder="" value={foodData.price} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="category">
                                    <Form.Label column sm={2}>Category</Form.Label>
                                    <Col sm={10}>
                                        <Select
                                            showSearch
                                            style={{ width: '100%' }}
                                            placeholder="Select category"
                                            optionFilterProp="children"
                                            value={foodData.category}
                                            onChange={(e) => onChangeCategory(e)}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="Category 1">Category 1</Option>
                                            <Option value="Category 2">Category 2</Option>
                                        </Select>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="national">
                                    <Form.Label column sm={2}>National</Form.Label>
                                    <Col sm={10}>
                                        <Select
                                            showSearch
                                            style={{ width: '100%' }}
                                            placeholder="Select national"
                                            optionFilterProp="children"
                                            value={foodData.national}
                                            onChange={(e) => onChangeNational(e)}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="National 1">National 1</Option>
                                            <Option value="National 2">National 2</Option>
                                        </Select>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="foodKind">
                                    <Form.Label column sm={2}>Food Kind</Form.Label>
                                    <Col sm={10}>
                                        <Select
                                            showSearch
                                            style={{ width: '100%' }}
                                            placeholder="Select foodKind"
                                            optionFilterProp="children"
                                            value={foodData.foodKind}
                                            onChange={() => onChangeFoodKind}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="Food Kind 1">Food Kind 1</Option>
                                            <Option value="Food Kind 2">Food Kind 2</Option>
                                        </Select>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="subKind">
                                    <Form.Label column sm={2}>Sub Kind</Form.Label>
                                    <Col sm={10}>
                                        <Select
                                            showSearch
                                            style={{ width: '100%' }}
                                            placeholder="Select sub kind"
                                            optionFilterProp="children"
                                            value={foodData.subKind}
                                            onChange={(e) => onChangeSubKind(e)}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="Sub Kind 1">Sub Kind 1</Option>
                                            <Option value="Sub Kind 2">Sub Kind 2</Option>
                                        </Select>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="cookMethod">
                                    <Form.Label column sm={2}>Cook Method</Form.Label>
                                    <Col sm={10}>
                                        <Select
                                            showSearch
                                            style={{ width: '100%' }}
                                            placeholder="Select cookMethod"
                                            optionFilterProp="children"
                                            value={foodData.cookMethod}
                                            onChange={(e) => onChangeCookMethod(e)}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="Cook Method 1">Cook Method 1</Option>
                                            <Option value="Cook Method 2">Cook Method 2</Option>
                                        </Select>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button type="primary" onClick={() => { saveMenu() }}>
                    Save
                </Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>

        </Modal >
    );
}
