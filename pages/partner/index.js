import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import styles from './index.module.css'
import { Row, Col, Card, Image, Button, Tab, Nav, Container } from 'react-bootstrap'



export default function Partner() {


    return (
        <Layout>
            <Container className={styles.container}>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={2} style={{ borderRight: "1px solid #DEDEDE" }}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="promote">Promote</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="menu">Menu</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="profile">Profile</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="setting">Setting</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content>
                                <Tab.Pane eventKey="promote">
                                    <div className={styles.tab}>
                                        promote
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="menu">
                                    menu
                                </Tab.Pane>
                                <Tab.Pane eventKey="profile">
                                    Profile
                                </Tab.Pane>
                                <Tab.Pane eventKey="setting">
                                    Setting
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </Layout>
    )
}