import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Card, Image, Button } from 'react-bootstrap'
import useMediaQuery from "../utils/utils";
import menu from '../utils/menu.json'
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

export default function Home({ allPostsData }) {
  const isBreakpoint = useMediaQuery(768)

  let listMenu
  if (!isBreakpoint) {
    //for Mobile
    listMenu = menu && menu.map((menu, Index) => (
      <Row className={utilStyles.list} key={menu.title + Index}>
        <Col xs={12} md={4} style={{ textAlign: "center" }}>
          <Image src={menu.image} rounded />
        </Col>
        <Col xs={12} md={8}>
          <Row className={utilStyles.headingLg}>
            {menu.title}
          </Row>
          <Row>
            {menu.detail}
          </Row>
          <Row>
            <StarIcon style={{ color: "blue" }} />
          </Row>
        </Col>
      </Row>));
  } else {
    listMenu = menu && menu.map((menu, Index) => (
      <Card key={menu.title + Index}>
        <Card.Img variant="top" src={menu.image} />
        <Card.Body>
          <Card.Title>{menu.title}</Card.Title>
          <Card.Text>
            {menu.detail}
          </Card.Text>
        </Card.Body>
        <Card.Body style={{ borderTop: '1px solid rgb(223,223,223)' }}>
          <StarIcon /><StarIcon /><StarIcon /><StarHalfIcon /><StarOutlineIcon />
        </Card.Body>
      </Card>
    ));
  }

  return (
    <Layout>
      <Head>
        <title>E-Menu</title>
      </Head>
      <Container>
        {listMenu}
      </Container>
    </Layout>
  )
}