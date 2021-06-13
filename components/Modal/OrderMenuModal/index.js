import utilStyles from '../../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Image, Button, Modal, Form } from 'react-bootstrap'
import 'antd/dist/antd.css';
import React, { useEffect } from 'react'
import useMediaQuery from "../../../utils/utils";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { message } from 'antd';
import shoppingCartService from '../../../services/shoppingCart';

export default function OrderMenuModal(props) {

    const { shopping_cart, restaurant_id, menu_detail, is_initial_cart } = props
    const isMobileResolution = useMediaQuery(768)
    const [specialInstruction, setSpecialInstruction] = React.useState(null);
    const [count, setCount] = React.useState(1);
    const [total, setTotal] = React.useState(100);
    const [shoppingCart, setShoppingCart] = React.useState({});
    const [menuDetail, setMenuDetail] = React.useState({
        name: "",
        price: 0,
        image_url: "",
        description: ""
    })

    useEffect(() => {
        if (menu_detail !== undefined) {
            setMenuDetail(menu_detail)
            setTotal(menu_detail.price)
        }

        console.log('is_initial_cart', is_initial_cart)
        if (shopping_cart && is_initial_cart) {
            console.log(shopping_cart)
            setShoppingCart(shopping_cart)
        }
    }, [menu_detail, shopping_cart, is_initial_cart])

    const saveMenu = () => {
        if (restaurant_id) {
            let newCartItemData = {}
            let newCartItem = []
            console.log(shoppingCart)
            if (Object.keys(shoppingCart).length === 0) {
                newCartItemData = {
                    "restaurant": restaurant_id,
                    "shopping_cart_items": [
                        {
                            "menu": menuDetail.id,
                            "quantity": count,
                            "price": menuDetail.price,
                            "total": total,
                            "special_instruction": specialInstruction
                        }
                    ]
                }
            } else {
                let existingCartItem = [...shoppingCart.shopping_cart_items]
                console.log('existingCartItem', existingCartItem)
                existingCartItem.forEach((cartItem) => {
                    newCartItem.push({
                        "menu": cartItem.menu,
                        "quantity": cartItem.quantity,
                        "price": cartItem.price,
                        "total": cartItem.total,
                        "special_instruction": cartItem.special_instruction
                    })
                })
                //// add new item
                let newItem = {
                    "menu": menuDetail.id,
                    "quantity": count,
                    "price": menuDetail.price,
                    "total": total,
                    "special_instruction": specialInstruction
                }
                newCartItem.push(newItem)
                newCartItemData = {
                    ...shoppingCart,
                    shopping_cart_items: newCartItem
                }
            }
            console.log('newCartItemData', newCartItemData)
            shoppingCartService.updateShoppingCart(newCartItemData).then((response) => {
                if (response === 'Not Login') {
                    message.warning('Please login before take order.')
                } else {
                    console.log('success')
                    setShoppingCart(newCartItemData)
                }
            }).catch(error => {
                console.log('error', error)
            })


            console.log('specialInstruction ->', specialInstruction)
            console.log('count ->', count)
            setCount(1)
            setSpecialInstruction('')
            props.onHide()
        } else {
            message.error('Please scan qr code again.')
        }
    }

    const closeModal = () => {
        setCount(1)
        setSpecialInstruction('')
        props.onHide()
    }
    return (

        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {
                !isMobileResolution ? (
                    //PC Version
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ fontSize: "1.3rem" }}> {menuDetail.name}</Modal.Title>
                            {/* <Modal.Title style={{ fontSize: "1.3rem" }}> name</Modal.Title> */}

                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row>
                                    <Col xs={12} md={3}>
                                        <Image src={menuDetail.image_url} />
                                    </Col>
                                    <Col xs={6} md={9}>
                                        <Row style={{ margin: "10px -15px" }}>
                                            <Col>
                                                Detail : {menuDetail.description}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <span>
                                                    จำนวน : &nbsp;
                                                </span>
                                                <Button className={utilStyles.btn} onClick={() => (count > 1 ? (setCount((count - 1)), setTotal((total - menuDetail.price))) : null)} >
                                                    <RemoveIcon />
                                                </Button>
                                                <span style={{ margin: "0 15px" }}>
                                                    {count}
                                                </span>
                                                <Button className={utilStyles.btn} onClick={() => (setCount(count + 1), setTotal((total + menuDetail.price)))} >
                                                    <AddIcon />
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row style={{ marginTop: "15px" }}>
                                            <Col>
                                                ราคา : {menuDetail.price}
                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>
                                <Form style={{ marginTop: "15px" }}>
                                    <Form.Group>
                                        <Form.Label>Special instruction</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={specialInstruction}
                                            onChange={e => setSpecialInstruction(e.target.value)}
                                        />
                                    </Form.Group>
                                </Form>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => saveMenu()} >
                                Submit
                            </Button>
                            <Button onClick={() => closeModal()}>Close</Button>
                        </Modal.Footer>
                    </>
                ) : (
                    //Mobile Version
                    <>
                        <Modal.Header closeButton className={utilStyles.fontMobile}>
                            <Modal.Title style={{ fontSize: "1.3rem" }}> {menuDetail.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row>
                                    <Col xs={12} md={3}>
                                        <Image src={menuDetail.image_url} />
                                    </Col>
                                    <Col xs={12} md={9} style={{ marginTop: "15px" }}>
                                        <Row style={{ marginTop: "15px" }}>
                                            <Col>
                                                Detail : {menuDetail.description}
                                            </Col>
                                        </Row>
                                        <Row style={{ marginTop: "15px" }}>
                                            <Col>
                                                <span>
                                                    จำนวน : &nbsp;
                                                </span>
                                                <Button className={utilStyles.btnMobile} onClick={() => (count > 1 ? (setCount((count - 1)), setTotal((total - menuDetail.price))) : null)} >
                                                    <RemoveIcon />
                                                </Button>
                                                <span style={{ margin: "0 15px" }}>
                                                    {count}
                                                </span>
                                                <Button className={utilStyles.btnMobile} onClick={() => (setCount(count + 1), setTotal((total + menuDetail.price)))} >
                                                    <AddIcon />
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row style={{ marginTop: "15px" }}>
                                            <Col>
                                                ราคา : {menuDetail.price}
                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>
                                <Form style={{ marginTop: "15px" }}>
                                    <Form.Group>
                                        <Form.Label>Special instruction</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={specialInstruction}
                                            onChange={e => setSpecialInstruction(e.target.value)}
                                        />
                                    </Form.Group>
                                </Form>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => saveMenu()}>
                                Submit
                            </Button>
                            <Button onClick={() => closeModal()}>Close</Button>
                        </Modal.Footer>
                    </>
                )
            }
        </Modal >
    );
}