import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router'
import ActiveLink from './ActiveLink'
import { Link } from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';

export default function Layout({ children, util }) {
    const router = useRouter()

    // const style = {
    //     color: router.pathname === href ? 'white' : 'black',
    // }
    return (
        <div style={{ paddingBottom: '5px' }}>
            <Head>
                <title>E-Menu</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bree Serif" />
            </Head>
            <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "White", boxShadow: "rgb(204 204 204) 3px 2px 8px 1px", padding: "20px 20px", fontWeight: "bold" }}>
                <style jsx>{`
                    .nav-link {
                        text-decoration: none;
                    }
                    .active:after {
                        color:"white"
                    }
                    `}</style>
                <ActiveLink activeClassName="active" href="/newspaper">
                    <>
                        <span style={{ paddingLeft: "5%" }}></span>
                        <MenuBookIcon
                            className="d-inline-block align-top" style={{ color: "#FF4A4F", fontSize: "2.5rem" }} />
                        <Navbar.Brand style={{ color: "black !important", cursor: "pointer", paddingLeft: "10px", fontWeight: "bold", fontFamily: "Bree Serif" }}>E-Menu</Navbar.Brand>
                    </>
                </ActiveLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className="mr-auto">

                    </Nav>
                    <Nav>
                        <ActiveLink activeClassName="active" href="/newspaper">
                            <a className="nav-link">NewsPaper</a>
                        </ActiveLink>
                        <ActiveLink activeClassName="active" href="/menuFeeding">
                            <a className="nav-link">Menu Feeding</a>
                        </ActiveLink>
                        <ActiveLink activeClassName="active" href="/contact">
                            <a className="nav-link">Contact</a>
                        </ActiveLink>
                        <NavDropdown title="Login" id="nav-dropdown">
                            <NavDropdown.Item >Update user profile</NavDropdown.Item>
                            <NavDropdown.Item >Order</NavDropdown.Item>
                        </NavDropdown>
                        <ActiveLink activeClassName="active" href="#">
                            <a className="nav-link">Check out</a>
                        </ActiveLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {
                util ? (
                    <div >
                        {children}
                    </div>
                ) : (
                        <div className={styles.container}>
                            {children}
                        </div>
                    )
            }
        </div >
    )
}