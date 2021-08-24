import utilStyles from '../../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Button, Modal, Form } from 'react-bootstrap'
import 'antd/dist/antd.css';
import React, { useEffect } from 'react'
import useMediaQuery from "../../../utils/utils";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { message, Image } from 'antd';
import shoppingCartService from '../../../services/shoppingCart';

export default function OrderMenuModal(props) {

    const { shopping_cart, restaurant_id, restaurant_name, menu_detail, is_initial_cart, is_user_signin } = props
    const { set_initial_shopping_cart, update_shopping_cart } = props
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
        console.log('shopping_cart', shopping_cart)
        if (shopping_cart && shopping_cart !== "") {
            console.log(shopping_cart)
            setShoppingCart(shopping_cart)
        } else {
            setShoppingCart({})
        }
    }, [menu_detail, shopping_cart, is_initial_cart])

    const saveMenu = async () => {
        let newShoppingCart = shoppingCart
        let restaurantIdShoppingCart
        if (restaurant_id) {

            if (newShoppingCart.restaurant && newShoppingCart.restaurant.hasOwnProperty('id')) {
                restaurantIdShoppingCart = newShoppingCart.restaurant.id
            } else {
                restaurantIdShoppingCart = newShoppingCart.restaurant
            }

            //// Check order in cart have restaurant id same the new order
            if (restaurantIdShoppingCart !== restaurant_id) {
                //// Remove old cart before submit new cart
                if (is_user_signin) {
                    try {
                        let res_delete_shopping_cart = await shoppingCartService.deleteShoppingCart()
                        console.log('res_delete_shopping_cart', res_delete_shopping_cart)
                    } catch (error) {
                        console.log('res_delete_shopping_cart error', res_delete_shopping_cart)
                    }
                } else {
                    window.localStorage.removeItem('shoppingCart')
                }
                newShoppingCart = {}
                console.log('differrent')
            }


            let newCartItemData = {}
            let newCartItem = []
            console.log(newShoppingCart)
            if (Object.keys(newShoppingCart).length === 0 || (newShoppingCart.hasOwnProperty('shopping_cart_items') && newShoppingCart.shopping_cart_items.length === 0)) {
                //// No menu in shopping cart
                newCartItemData = {
                    "restaurant": restaurant_id,
                    "shopping_cart_items": [
                        {
                            "menu": {
                                id: menuDetail.id,
                                name: menuDetail.name,
                                image_url: menuDetail.image_url
                            },
                            "quantity": count,
                            "price": menuDetail.price,
                            "total": total,
                            "special_instruction": specialInstruction,
                        }
                    ]
                }
            } else {
                //// Has menu in shopping cart
                let existingCartItem = [...newShoppingCart.shopping_cart_items]
                console.log('existingCartItem', existingCartItem)
                existingCartItem.forEach((cartItem) => {
                    newCartItem.push({
                        "menu": {
                            id: cartItem.menu.id,
                            name: cartItem.menu.name,
                            image_url: cartItem.menu.image_url
                        },
                        "quantity": cartItem.quantity,
                        "price": cartItem.price,
                        "total": cartItem.total,
                        "special_instruction": cartItem.special_instruction,
                    })
                })
                //// add new item
                let newItem = {
                    "menu": {
                        id: menuDetail.id,
                        name: menuDetail.name,
                        image_url: menuDetail.image_url
                    },
                    "quantity": count,
                    "price": menuDetail.price,
                    "total": total,
                    "special_instruction": specialInstruction,
                }
                newCartItem.push(newItem)

                newCartItemData = {
                    ...newShoppingCart,
                    shopping_cart_items: newCartItem
                }
            }
            console.log('newCartItemData', newCartItemData)
            shoppingCartService.updateShoppingCart(newCartItemData).then((response) => {
                if (response === 'Not Login') {
                    //// Edit new menu structure database to localstorage
                    newCartItemData.shopping_cart_items[newCartItemData.shopping_cart_items.length - 1] = {
                        "menu": {
                            id: menuDetail.id,
                            name: menuDetail.name,
                            image_url: menuDetail.image_url
                        },
                        "quantity": count,
                        "price": menuDetail.price,
                        "total": total,
                        "special_instruction": specialInstruction,
                    }

                    newCartItemData.restaurant = {
                        id: restaurant_id,
                        name: restaurant_name
                    }
                    window.localStorage.setItem('shoppingCart', JSON.stringify(newCartItemData))
                } else {
                    console.log('success')
                    setShoppingCart(newCartItemData)
                }
                if (update_shopping_cart) {
                    update_shopping_cart(newCartItemData)
                }
                if (set_initial_shopping_cart !== undefined) {
                    //// For mobile version
                    set_initial_shopping_cart(newCartItemData, true)
                }
            }).catch(error => {
                console.log('error', error)
            })


            console.log('specialInstruction ->', specialInstruction)
            console.log('count ->', count)
            setCount(1)
            setSpecialInstruction('')
            message.success('Add menu to cart succesful.')
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
                                        <Image height="100%" width="100%" src={menuDetail.image_url} />
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
                                                ราคาต่อหน่วย : {menuDetail.price}
                                            </Col>
                                        </Row>
                                        <Row style={{ marginTop: "15px" }}>
                                            <Col>
                                                ราคาทั้งหมด : {(menuDetail.price * count)}
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
                            <Button className="Buttom_Close" onClick={() => closeModal()}>Close</Button>
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
                                                ราคาต่อหน่วย : {menuDetail.price}
                                            </Col>
                                        </Row>
                                        <Row style={{ marginTop: "15px" }}>
                                            <Col>
                                                ราคาทั้งหมด : {(menuDetail.price * count)}
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
                            <Button className="Buttom_Close" onClick={() => closeModal()}>Close</Button>
                        </Modal.Footer>
                    </>
                )
            }
        </Modal >
    );
}