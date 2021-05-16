import utilStyles from '../../../styles/utils.module.css'
import styles from './index.module.css'
import { Row, Col, Form, Image, Button, Modal, Container } from 'react-bootstrap'
import { message } from 'antd'
import 'antd/dist/antd.css';
import React from 'react'

export default function AddTableModal(props) {

    const [tableName, setTableName] = React.useState('');
    const [tableSize, setTableSize] = React.useState('เล็ก');
    const [tableType, setTableType] = React.useState('square');
    const tableImages = {
        'เล็ก': {
            'square': 'images/table-square-S.png',
            'triangle': 'images/table-triangle-S.png',
            'rectangle': 'images/table-rectangle-S.png',
        },
        'กลาง': {
            'square': 'images/table-square-M.png',
            'triangle': 'images/table-triangle-M.png',
            'rectangle': 'images/table-rectangle-M.png',
        },
        'ใหญ่': {
            'square': 'images/table-square-L.png',
            'triangle': 'images/table-triangle-L.png',
            'rectangle': 'images/table-rectangle-L.png',
        }
    }

    const saveMenu = () => {
        if (tableName === '') {
            message.error('Please input table name.')
        } else {
            setTableName("")
            let tableData = {
                "name": tableName,
                "type": tableType,
                "size": tableSize,
                "position_x": "0",
                "position_y": "0",
            }
            props.add_table(tableData)
            props.onHide()
        }
    }

    return (

        <Modal
            {...props}
            dialogClassName="menuModal-70w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}>
                    Add new table
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <div>
                                <Image src={tableImages[tableSize][tableType]} className={utilStyles.image_size_160x160} style={{ objectFit: "contain" }} />
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "10px" }}>
                        <Col>
                            <Form>
                                <Form.Group controlId="areaName">
                                    <Form.Control
                                        type="text"
                                        placeholder="ชื่อโต๊ะ"
                                        onChange={(e) => setTableName(e.target.value)}
                                        value={tableName}
                                    />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div onClick={() => setTableSize('เล็ก')} className={tableSize == 'เล็ก' ? styles.selected + ' ' + styles.btnTableSize : styles.notSelected + ' ' + styles.btnTableSize} >
                                เล็ก
                            </div>
                        </Col>
                        <Col>
                            <div onClick={() => setTableSize('กลาง')} className={tableSize == 'กลาง' ? styles.selected + ' ' + styles.btnTableSize : styles.notSelected + ' ' + styles.btnTableSize}>
                                กลาง
                            </div>
                        </Col>
                        <Col>
                            <div onClick={() => setTableSize('ใหญ่')} className={tableSize == 'ใหญ่' ? styles.selected + ' ' + styles.btnTableSize : styles.notSelected + ' ' + styles.btnTableSize}>
                                ใหญ่
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "10px" }}>
                        <Col>
                            <div onClick={() => setTableType('square')} className={tableType == 'square' ? styles.selected + ' ' + styles.btnTableType : styles.notSelected + ' ' + styles.btnTableType}>
                                <Image src="/images/square.png" style={{ height: "50px", objectFit: "contain" }} />
                            </div>
                        </Col>
                        <Col>
                            <div onClick={() => setTableType('triangle')} className={tableType == 'triangle' ? styles.selected + ' ' + styles.btnTableType : styles.notSelected + ' ' + styles.btnTableType}>
                                <Image src="/images/triangle.png" style={{ height: "50px", objectFit: "contain" }} />
                            </div>
                        </Col>
                        <Col>
                            <div onClick={() => setTableType('rectangle')} className={tableType == 'rectangle' ? styles.selected + ' ' + styles.btnTableType : styles.notSelected + ' ' + styles.btnTableType}>
                                <Image src="/images/rectangle.png" style={{ height: "50px", objectFit: "contain" }} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { saveMenu() }}>
                    Add
                </Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>

        </Modal >
    );
}