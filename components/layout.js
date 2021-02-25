import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router'
import ActiveLink from './ActiveLink'

export default function Layout({ children }) {
    const router = useRouter()
    console.log(router.pathname)

    // const style = {
    //     color: router.pathname === href ? 'white' : 'black',
    // }
    return (
        <div style={{ paddingBottom: '5px', backgroundColor: '#f3f4f5' }}>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <style jsx>{`
                    .nav-link {
                        text-decoration: none;
                    }
                    .active:after {
                        color:"white"
                    }
                    `}</style>
                <Navbar.Brand href="/newspaper" style={{ color: "white !important" }}>E-Menu</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className="mr-auto">
                        <ActiveLink activeClassName="active" href="/newspaper">
                            <a className="nav-link">NewsPaper</a>
                        </ActiveLink>
                        <ActiveLink activeClassName="active" href="/menuFeeding">
                            <a className="nav-link">Menu Feeding</a>
                        </ActiveLink>
                        <ActiveLink activeClassName="active" href="#">
                            <a className="nav-link">Contact</a>
                        </ActiveLink>
                    </Nav>
                    <Nav>
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
            <div className={styles.container}>
                {children}
            </div>
        </div>
    )
}