import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import styles from './index.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Card, Image, Button } from 'react-bootstrap'
import useMediaQuery from "../../utils/utils";
import menu from '../../utils/menu.json'
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

export default function Newspaper() {
    const isBreakpoint = useMediaQuery(768)

    let listMenu
    if (!isBreakpoint) {
        listMenu = menu && menu.map((menu, Index) => (
            <Row className={utilStyles.list} key={menu.title + Index}>
                <Col xs={12} md={4} style={{ textAlign: "center" }}>
                    <Image src={menu.image} rounded />
                </Col>
                <Col xs={12} md={8}>
                    <Row className={utilStyles.cardTitle + " " + utilStyles.listItem}>
                        {menu.title}
                    </Row>
                    <Row className={utilStyles.fontContent + " " + utilStyles.listItem}>
                        {menu.detail}
                    </Row>
                    <Row className={utilStyles.fontContent + " " + utilStyles.listItem}>
                        <StarIcon className={utilStyles.iconSize} />
                        <StarIcon className={utilStyles.iconSize} />
                        <StarIcon className={utilStyles.iconSize} />
                        <StarIcon className={utilStyles.iconSize} />
                        <StarOutlineIcon className={utilStyles.iconSize} />
                    </Row>
                </Col>
            </Row >));
    } else {
        //for Mobile
        listMenu = menu && menu.map((menu, Index) => (
            <Card key={menu.title + Index}>
                <Card.Img variant="top" src={menu.image} />
                <Card.Body className={styles.cardBodyMobile}>
                    <Card.Title className={utilStyles.fontTitleMobile}>{menu.title}</Card.Title>
                    <Card.Text className={utilStyles.fontMobile}>
                        {menu.detail}
                    </Card.Text>
                </Card.Body>
                <Card.Body className={styles.cardBodyMobile} style={{ borderTop: '1px solid rgb(223,223,223)' }}>
                    <StarIcon className={utilStyles.fontMobile} /><StarIcon className={utilStyles.fontMobile} /><StarIcon className={utilStyles.fontMobile} /><StarHalfIcon className={utilStyles.fontMobile} /><StarOutlineIcon className={utilStyles.fontMobile} />
                </Card.Body>
            </Card>
        ));
    }

    return (
        <Layout>
            <Container>
                {listMenu}
            </Container>
        </Layout>
    )
}