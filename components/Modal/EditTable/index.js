import utilStyles from '../../../styles/utils.module.css'
import styles from './index.module.css'
import { Row, Col, Form, Image, Button, Modal, Container } from 'react-bootstrap'
import { message } from 'antd'
import 'antd/dist/antd.css';
import React, { useEffect } from 'react'

export default function EditTableModal(props) {

    const { table_selected } = props
    const { edit_table } = props
    console.log(table_selected)
    const [tableName, setTableName] = React.useState('');
    const [tableSize, setTableSize] = React.useState('small');
    const [tableType, setTableType] = React.useState('square');

    useEffect(() => {
        if (table_selected) {
            setTableName(table_selected.name)
            setTableSize(table_selected.size)
            setTableType(table_selected.type)
        }
    }, [props])

    const tableImages = {
        'small': {
            'square': 'images/table-square-S.png',
            'triangle': 'images/table-triangle-S.png',
            'rectangle': 'images/table-rectangle-S.png',
        },
        'medium': {
            'square': 'images/table-square-M.png',
            'triangle': 'images/table-triangle-M.png',
            'rectangle': 'images/table-rectangle-M.png',
        },
        'large': {
            'square': 'images/table-square-L.png',
            'triangle': 'images/table-triangle-L.png',
            'rectangle': 'images/table-rectangle-L.png',
        }
    }

    const onSave = () => {
        if (tableName === '') {
            message.error('Please input table name.')
        } else {
            setTableName("")
            let tableData = {
                "name": tableName,
                "type": tableType,
                "size": tableSize,
                "position_x": table_selected.position_x,
                "position_y": table_selected.position_y,
                "id": table_selected.id,
                "zone": table_selected.zone,
                "is_active": table_selected.is_active
            }
            edit_table(tableData)
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
                    Edit table
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
                            <div onClick={() => setTableSize('small')} className={tableSize == 'small' ? styles.selected + ' ' + styles.btnTableSize : styles.notSelected + ' ' + styles.btnTableSize} >
                                small
                            </div>
                        </Col>
                        <Col>
                            <div onClick={() => setTableSize('medium')} className={tableSize == 'medium' ? styles.selected + ' ' + styles.btnTableSize : styles.notSelected + ' ' + styles.btnTableSize}>
                                medium
                            </div>
                        </Col>
                        <Col>
                            <div onClick={() => setTableSize('large')} className={tableSize == 'large' ? styles.selected + ' ' + styles.btnTableSize : styles.notSelected + ' ' + styles.btnTableSize}>
                                large
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
                <Button onClick={() => { onSave() }}>
                    Save
                </Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>

        </Modal >
    );
}