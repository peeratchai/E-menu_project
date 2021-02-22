import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export default function Layout({ children, home }) {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home" style={{ color: "white !important" }}>E-Menu</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" >
                {/* <Nav className="mr-auto" >
                    <Nav.Link style={{ float: "left" }} eventKey='1' href="#features">NewsPaper</Nav.Link>
                    <Nav.Link style={{ float: "left" }} eventKey='2' href="#pricing">Menu Feeding</Nav.Link>
                    <Nav.Link style={{ float: "left" }} eventKey='3' href="#pricing">Contact</Nav.Link>
                    <Nav.Link style={{ float: "left" }} eventKey='4' href="#pricing">Check out</Nav.Link>
                </Nav>
                <Nav>
                    <NavDropdown title="Login" id="nav-dropdown">
                        <NavDropdown.Item eventKey="5.1">Update user profile</NavDropdown.Item>
                        <NavDropdown.Item eventKey="5.2">Order</NavDropdown.Item>
                    </NavDropdown>
                </Nav> */}
                <Nav>
                    <Nav.Link eventKey="1" title="Item">
                        NewsPaper
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link eventKey="2" title="Item">
                        Menu Feeding
                    </Nav.Link>
                </Nav>
                <Nav className="mr-auto">
                    <Nav.Link eventKey="3">
                        Contact
                    </Nav.Link>
                </Nav>
                <Nav>
                    <NavDropdown title="Login" id="nav-dropdown">
                        <NavDropdown.Item eventKey="5.1">Update user profile</NavDropdown.Item>
                        <NavDropdown.Item eventKey="5.2">Order</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link eventKey="3">
                        Check out
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}