import Head from 'next/head'
import styles from './layout.module.css'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router'
import { Badge } from 'antd';
import ActiveLink from './ActiveLink'
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect } from 'react'
import LoginModal from './Modal/Login'
import { ShoppingCartOutlined } from '@ant-design/icons';
import 'react-chat-widget/lib/styles.css';
import dynamic from 'next/dynamic';
React.useLayoutEffect = React.useEffect


const Widget = dynamic(() => import("react-chat-widget").then(mod => mod.Widget), {
    ssr: false
});

export default function Layout({ children, containerType, searchFunc, page, menuInBasket }) {
    const router = useRouter()

    //// Set state
    const [modalShow, setModalShow] = React.useState(false);
    const [islogin, setIsLogin] = React.useState();
    const [containerStyle, setContainerStyle] = React.useState(null);
    const [buttonNavbar, setButtonNavbar] = React.useState();
    const [have_menu_in_basket, setHave_menu_in_basket] = React.useState(false)
    const [total_menu_in_basket, setTotal_menu_in_basket] = React.useState(false)
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

    const CustomTimeStampFragment = () => {
        return (
            <div className='rcw-client'>
                <div className='rcw-message-text'>
                    <p>Help!</p>
                </div>
                <span class="rcw-timestamp">06:38</span>
            </div>
        )
    }

    const CustomTimeStampFragmentAdmin = () => {
        return (
            <>
                <img src="/images/administrator_icon.png" class="rcw-avatar" alt="profile" />
                <div className='rcw-response'>
                    <div className='rcw-message-text'>
                        <p>Hello</p>
                    </div>
                    <span class="rcw-timestamp">06:37</span>
                </div>
            </>
        )
    }

    useEffect(() => {
        let loginStatus = false
        if (typeof window !== 'undefined') {
            // console.log('menuInBasket', menuInBasket)
            const { addResponseMessage, renderCustomComponent } = require('react-chat-widget');
            loginStatus = window.localStorage.getItem('islogin');
            // let basket = window.localStorage.getItem('basket');
            // if (basket !== null) {
            //     let menuList = Object.keys(basket)
            //     console.log('menuList', menuList)
            //     console.log('menuList.length', menuList.length)
            //     setTotal_menu_in_basket(menuList.length)
            //     setHave_menu_in_basket(true)
            // }
            renderCustomComponent(CustomTimeStampFragmentAdmin)
            renderCustomComponent(CustomTimeStampFragment)
        }
        setIsLogin(loginStatus)
        setStyleOfContainer(containerType)
        generateButtonNavbar()

    }, [containerType, page, islogin, menuInBasket])

    const signOut = () => {
        let loginStatus
        if (typeof window !== 'undefined') {
            loginStatus = window.localStorage.setItem('islogin', false);
        }
        setIsLogin(loginStatus)
    }



    const handleNewUserMessage = (handleNewUserMessage) => {
        console.log(handleNewUserMessage)
    }

    const navToCheckout = () => {
        router.push({
            pathname: "/checkout"
        })
    }

    const generateButtonNavbar = () => {
        let buttonNavbar
        if (page === 'restaurantDetails') {
            if (have_menu_in_basket) {
                buttonNavbar = (
                    <ActiveLink activeClassName="active" href="/newspaper">
                        <Navbar.Brand style={{ color: "black !important", cursor: "pointer", paddingLeft: "40px", margin: "auto", fontWeight: "bold", fontFamily: "Bree Serif" }}><MenuBookIcon style={{ margin: "auto", color: "#FF4A4F", fontSize: "2.5rem" }} /><div style={{ display: "inline", marginLeft: "15px" }}>E-Menu</div></Navbar.Brand>
                        <ShoppingCartOutlined className="d-inline-block align-top" style={{ color: "black", fontSize: "2.5rem" }} onClick={() => navToCheckout()} />
                    </ActiveLink>
                )
            } else {
                buttonNavbar = (
                    <ActiveLink activeClassName="active" href="/newspaper">
                        <Navbar.Brand style={{ color: "black !important", cursor: "pointer", paddingLeft: "40px", margin: "auto", fontWeight: "bold", fontFamily: "Bree Serif" }}><MenuBookIcon style={{ margin: "auto", color: "#FF4A4F", fontSize: "2.5rem" }} /><div style={{ display: "inline", marginLeft: "15px" }}>E-Menu</div></Navbar.Brand>
                        <ShoppingCartOutlined className="d-inline-block align-top" style={{ color: "black", fontSize: "2.5rem" }} onClick={() => navToCheckout()} />
                    </ActiveLink>
                )
            }

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
                            islogin == 'true' ? (
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

                        <ActiveLink activeClassName="active" href="/partner">
                            <a className="nav-link">Partner</a>
                        </ActiveLink>

                        <ActiveLink activeClassName="active" href="/admin">
                            <a className="nav-link">Admin</a>
                        </ActiveLink>
                        <ActiveLink activeClassName="active" href="/checkout" >
                            <a className="nav-link" >Check out</a>
                        </ActiveLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className={containerStyle}>
                {children}
            </div>

            <Widget
                // titleAvatar={<MenuBookIcon />}
                handleNewUserMessage={handleNewUserMessage}
                // profileAvatar={logo}
                title='My E-menu Live Chat'
                subtitle='Ready to help you'
                handleNewUserMessage={(newMessage) => handleNewUserMessage(newMessage)}
            />
            <LoginModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                setlogin={setIsLogin}
            />
        </div >
    )
}

