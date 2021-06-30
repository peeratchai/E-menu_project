import Head from 'next/head'
import styles from './layout.module.css'
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { useRouter } from 'next/router'
import { Badge, message } from 'antd';
import ActiveLink from './ActiveLink'
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect } from 'react'
import LoginModal from './Modal/Login'
import { ShoppingCartOutlined } from '@ant-design/icons';
import 'react-chat-widget/lib/styles.css';
import dynamic from 'next/dynamic';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import checkUserPermission from '../lib/checkUserPermission'
import fetchJson from '../lib/fetchJson'
import profileService from '../services/profile'
import shoppingCartService from '../services/shoppingCart'

export default function Layout(props) {

    const { children, containerType, searchFunc, page, menuInBasket } = props
    const { user, mutateUser } = checkUserPermission()

    const router = useRouter()
    const { liffClientId, verifyEmail } = router.query;

    //// Set state
    const [modalShow, setModalShow] = React.useState(false);
    const [islogin, setIsLogin] = React.useState();
    const [containerStyle, setContainerStyle] = React.useState(null);
    const [buttonNavbar, setButtonNavbar] = React.useState();
    const [total_menu_in_basket, setTotal_menu_in_basket] = React.useState(0)
    const [isPartner, setIsPartner] = React.useState(false)
    const [isAdmin, setIsAdmin] = React.useState(false)
    ////

    const setStyleOfContainer = (containerType) => {
        let style = ""
        switch (containerType) {
            case 'mobile': style = styles.containerMobile; break;
            case 'center': style = styles.container; break;
            default: break;
        }

        setContainerStyle(style)
    }

    useEffect(() => {

        if (verifyEmail === '10asdokzclskf0efsf-sef0xkczlv0efie0-s0esfklkvadfadffas-adfvshbostohtrodh') {
            message.success('Verify email successful.Please sign in again.')
        }
        if (user) {
            setIsLogin(user.isLoggedIn)
            checkPermission(user)
            // setInitialCart()
            console.log('menuInBasket', menuInBasket)
            setTotal_menu_in_basket(menuInBasket)
            generateButtonNavbar(menuInBasket)

        } else {
            generateButtonNavbar()
        }
        setStyleOfContainer(containerType)

    }, [containerType, page, islogin, menuInBasket, user])

    const setInitialCart = () => {
        shoppingCartService.getShoppingCart().then((response) => {
            if (response !== 'Not Login') {
                let shoppingCart = response
                if (shoppingCart !== "") {
                    let shoppingCartItems = shoppingCart.shopping_cart_items
                    let countCartItems = 0
                    shoppingCartItems.forEach((cartItem) => countCartItems += cartItem.quantity)
                    if (countCartItems > 0) {
                        setTotal_menu_in_basket(countCartItems)
                        generateButtonNavbar(countCartItems)
                    }
                }
            }
        })
    }

    const checkPermission = (user = null) => {
        let roles = ['employee', 'partner', 'admin']
        let accessToken
        if (user === null) {
            accessToken = null
        } else {
            accessToken = user.accessToken
        }

        profileService.getProfile(accessToken).then((userProfile) => {
            let isPartner = false
            let isAdmin = false
            userProfile.roles.forEach((userRole) => {
                roles.forEach((role) => {
                    if (userRole === role) {
                        if (role === 'employee' || role === 'partner') {
                            isPartner = true
                        }
                        if (role === 'admin') {
                            isAdmin = true
                        }
                    }
                })
            })

            setIsPartner(isPartner)
            setIsAdmin(isAdmin)

        }).catch(error => {
            console.log('Layout,checkPermission,error', error)
            // message.error('Cannot get user profile.')
        })
    }

    const signOut = async () => {
        mutateUser(
            await fetchJson('/api/logout', { method: 'POST' }),
            false
        )
        window.localStorage.removeItem('accessToken')
        setIsPartner(false)
        setIsAdmin(false)
        window.location.reload()
    }

    const navToCheckout = () => {
        router.push({
            pathname: "/checkout"
        })
    }

    const generateButtonNavbar = (countCartItems = total_menu_in_basket) => {
        console.log('countCartItems', countCartItems)
        let buttonNavbar
        if (page === 'restaurantDetails') {
            buttonNavbar = (
                <ActiveLink activeClassName="active" href="/newspaper">
                    <>
                        <Navbar.Brand style={{ color: "black !important", cursor: "pointer", paddingLeft: "40px", margin: "auto", fontWeight: "bold", fontFamily: "Bree Serif" }}><Image src="/images/CeeMenuLogo.png" style={{ margin: 'auto', width: '60px', height: "60px" }} /></Navbar.Brand>
                        <Badge count={countCartItems} size="small">
                            <ShoppingCartOutlined className="d-inline-block align-top" style={{ color: "black", fontSize: "2.5rem" }} onClick={() => navToCheckout()} />
                        </Badge>
                    </>
                </ActiveLink>
            )
        } else {

            if (searchFunc === undefined) {
                buttonNavbar =
                    <ActiveLink activeClassName="active" href="/newspaper">
                        <>
                            <Navbar.Brand style={{ color: "black !important", cursor: "pointer", margin: "auto", fontWeight: "bold", fontFamily: "Bree Serif" }}><Image src="/images/CeeMenuLogo.png" style={{ margin: 'auto', width: '60px', height: "60px" }} /></Navbar.Brand>
                        </>
                    </ActiveLink>
            } else {
                buttonNavbar =
                    <ActiveLink activeClassName="active" href="/newspaper">
                        <>
                            <Navbar.Brand style={{ color: "black !important", cursor: "pointer", paddingLeft: "40px", margin: "auto", fontWeight: "bold", fontFamily: "Bree Serif" }}><Image src="/images/CeeMenuLogo.png" style={{ margin: 'auto', width: '60px', height: "60px" }} /></Navbar.Brand>
                            <SearchIcon className="d-inline-block align-top" style={{ color: "black", fontSize: "2.5rem" }} onClick={() => searchFunc()} />
                        </>
                    </ActiveLink>
            }
        }

        setButtonNavbar(buttonNavbar)
    }

    const NavbarMenu = buttonNavbar

    return (
        <div style={{ paddingBottom: '5px' }}>
            <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "#eaeff3", boxShadow: "rgb(204 204 204) 3px 2px 8px 1px", padding: "20px 20px", fontWeight: "bold" }}>
                <style jsx>{`
                    .nav-link {
                        text-decoration: none;
                        cursor:pointer
                    }
                    .active:after {
                        color:"white"
                    }
                    `}</style>
                {NavbarMenu}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                        <ActiveLink activeClassName="active" href="/newspaper">
                            <a className="nav-link">Newspaper</a>
                        </ActiveLink>
                        <ActiveLink activeClassName="active" href="/menuFeeding">
                            <a className="nav-link">Menu Feeding</a>
                        </ActiveLink>
                        <ActiveLink activeClassName="active" href="/contact">
                            <a className="nav-link">Contact</a>
                        </ActiveLink>
                        {/* <Nav.Item onClick={() => setModalShow(true)}>
                            Login
                        </Nav.Item> */}
                        {
                            islogin === true ? (
                                <NavDropdown title="Login" id="nav-dropdown">
                                    <NavDropdown.Item >
                                        <ActiveLink activeClassName="active" href="/userProfile">
                                            <a className="nav-link">Update user profile</a>
                                        </ActiveLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item >
                                        <ActiveLink activeClassName="active" href="/orderHistory">
                                            <a className="nav-link">Order History</a>
                                        </ActiveLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item >
                                        <a className="nav-link" onClick={() => signOut()}>Log Out</a>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <a className="nav-link" onClick={() => setModalShow(true)}>Login</a>
                            )
                        }

                        {
                            isPartner && (
                                <ActiveLink activeClassName="active" href="/partner">
                                    <a className="nav-link">Partner</a>
                                </ActiveLink>
                            )
                        }

                        {
                            isAdmin && (
                                <ActiveLink activeClassName="active" href="/admin">
                                    <a className="nav-link">Admin</a>
                                </ActiveLink>
                            )
                        }

                        <ActiveLink activeClassName="active" href="/checkout" >
                            <a className="nav-link" >Check out</a>
                        </ActiveLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className={containerStyle}>
                {children}
            </div>

            <MessengerCustomerChat
                pageId={process.env.FACEBOOK_PAGE_ID}
                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            />
            <LoginModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                setlogin={setIsLogin}
                check_permission={checkPermission}
                liff_client_id={liffClientId}
            />
        </div >
    )
}