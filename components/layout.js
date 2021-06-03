import Head from 'next/head'
import styles from './layout.module.css'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
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

export default function Layout(props) {

    const { children, containerType, searchFunc, page, menuInBasket } = props
    const { user, mutateUser } = checkUserPermission()

    const router = useRouter()
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
        console.log('user', user)
        if (user) {
            setIsLogin(user.isLoggedIn)
            checkPermission(user)
        }
        if (typeof window !== 'undefined') {
            let basket = window.localStorage.getItem('basket');
            if (basket !== null) {
                basket = JSON.parse(basket)
                let order = basket.order
                setTotal_menu_in_basket(order.length)
            }
        }
        setStyleOfContainer(containerType)
        generateButtonNavbar()

    }, [containerType, page, islogin, menuInBasket, user])

    const checkPermission = (user = null) => {
        let roles = ['employee', 'partner', 'admin']
        let accessToken
        if (user === null) {
            accessToken = null
        } else {
            accessToken = user.accessToken
        }

        profileService.getProfile(accessToken).then((userProfile) => {
            console.log('userProfile', userProfile)
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
            message.error('Cannot get user profile.')
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
    }

    const navToCheckout = () => {
        router.push({
            pathname: "/checkout"
        })
    }

    const generateButtonNavbar = () => {
        let buttonNavbar
        if (page === 'restaurantDetails') {
            buttonNavbar = (
                <ActiveLink activeClassName="active" href="/newspaper">
                    <>
                        <Navbar.Brand style={{ color: "black !important", cursor: "pointer", paddingLeft: "40px", margin: "auto", fontWeight: "bold", fontFamily: "Bree Serif" }}><MenuBookIcon style={{ margin: "auto", color: "#FF4A4F", fontSize: "2.5rem" }} /><div style={{ display: "inline", marginLeft: "15px" }}>E-Menu</div></Navbar.Brand>
                        <Badge count={total_menu_in_basket} size="small">
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
                            <Navbar.Brand style={{ color: "black !important", cursor: "pointer", margin: "auto", fontWeight: "bold", fontFamily: "Bree Serif" }}><MenuBookIcon style={{ margin: "auto", color: "#FF4A4F", fontSize: "2.5rem" }} /><div style={{ display: "inline", marginLeft: "15px" }}>E-Menu</div></Navbar.Brand>
                        </>
                    </ActiveLink>
            } else {
                buttonNavbar =
                    <ActiveLink activeClassName="active" href="/newspaper">
                        <>
                            <Navbar.Brand style={{ color: "black !important", cursor: "pointer", paddingLeft: "40px", margin: "auto", fontWeight: "bold", fontFamily: "Bree Serif" }}><MenuBookIcon style={{ margin: "auto", color: "#FF4A4F", fontSize: "2.5rem" }} /><div style={{ display: "inline", marginLeft: "15px" }}>E-Menu</div></Navbar.Brand>
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
            <Head>
                <title>E-Menu</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bree Serif" />
            </Head>
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
                pageId="112842050546604"
                appId="259379829306113"
            />
            <LoginModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                setlogin={setIsLogin}
                check_permission={checkPermission}
            />
        </div >
    )
}