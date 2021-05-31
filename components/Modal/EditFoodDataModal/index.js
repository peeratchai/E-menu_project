import { Row, Col, Form, Modal, Container } from 'react-bootstrap'
import 'antd/dist/antd.css';
import { Select, Button } from 'antd';
import React, { useEffect } from 'react'
import adminService from '../../../services/admin'

const { Option } = Select;

export default function EditFoodDataModal(props) {

    const { food_item_selected, master_food_category, master_national, master_food_kind, master_sub_kind, master_cook_method } = props
    const { get_all_menu } = props
    const [categoryName, setCategoryName] = React.useState();
    // const [masterfoodCategory, setMasterFoodCategory] = React.useState();
    // const [masterNational, setMasterNational] = React.useState();
    // const [masterFoodKind, setMasterFoodKind] = React.useState();
    // const [masterSubKind, setMasterSubKind] = React.useState();
    // const [masterCookMethod, setMasterCookMethod] = React.useState();
    const [foodDataForm, setFoodDataForm] = React.useState({
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

            console.log('food_item_selected', food_item_selected)

            setFoodDataForm({
                nameThai: food_item_selected.nameThai,
                nameEnglish: food_item_selected.nameThai,
                price: food_item_selected.price,
                category: food_item_selected.category,
                national: food_item_selected.national,
                foodKind: food_item_selected.foodKind,
                subKind: food_item_selected.subKind,
                cookMethod: food_item_selected.cookMethod,
                id: food_item_selected.id
            })
        }
    }, [props])


    const setFoodDataFormByFiled = (field, value) => {
        setFoodDataForm({
            ...foodDataForm,
            [field]: value
        })
    }

    const onEditFoodData = () => {
        let data = {
            "category": foodDataForm.category,
            "national": foodDataForm.national,
            "food_kind": foodDataForm.foodKind,
            "sub_kind": foodDataForm.subKind,
            "cook_method": foodDataForm.cookMethod
        }
        let foodDataId = foodDataForm.id
        adminService.updateFoodData(foodDataId, data).then((response) => {
            props.onHide()
            get_all_menu()
        }).catch((error) => {
            console.log('error', error)
        })

    }

    let dropdownFoodCategory = master_food_category && master_food_category.map((foodCategory) => {
        return (
            <Option value={foodCategory.name} key={foodCategory.id}>{foodCategory.name}</Option>
        )
    })

    let dropdownNational = master_national && master_national.map((national) => {
        return (
            <Option value={national.name} key={national.id}>{national.name}</Option>
        )
    })

    let dropdownFoodKind = master_food_kind && master_food_kind.map((foodKind) => {
        return (
            <Option value={foodKind.name} key={foodKind.id}>{foodKind.name}</Option>
        )
    })

    let dropdownSubKind = master_sub_kind && master_sub_kind.map((subKind) => {
        return (
            <Option value={subKind.name} key={subKind.id}>{subKind.name}</Option>
        )
    })

    let dropdownCookMethod = master_cook_method && master_cook_method.map((cookMethod) => {
        return (
            <Option value={cookMethod.name} key={cookMethod.id}>{cookMethod.name}</Option>
        )
    })


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
                                        <Form.Control value={foodDataForm.nameThai} readOnly />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="NameEnglish">
                                    <Form.Label column sm={2}>Name English</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control value={foodDataForm.nameEnglish} readOnly />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="price">
                                    <Form.Label column sm={2}>Price</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control value={foodDataForm.price} readOnly />
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
                                            value={foodDataForm.category}
                                            onChange={(value) => setFoodDataFormByFiled('category', value)}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {dropdownFoodCategory}
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
                                            value={foodDataForm.national}
                                            onChange={(value) => setFoodDataFormByFiled('national', value)}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {dropdownNational}
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
                                            value={foodDataForm.foodKind}
                                            onChange={(value) => setFoodDataFormByFiled('foodKind', value)}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {dropdownFoodKind}
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
                                            value={foodDataForm.subKind}
                                            onChange={(value) => setFoodDataFormByFiled('subKind', value)}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {dropdownSubKind}
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
                                            value={foodDataForm.cookMethod}
                                            onChange={(value) => setFoodDataFormByFiled('cookMethod', value)}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {dropdownCookMethod}
                                        </Select>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button type="primary" onClick={() => { onEditFoodData() }}>
                    Save
                </Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>

        </Modal >
    );
}
