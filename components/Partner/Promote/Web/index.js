import utilStyles from '../../../../styles/utils.module.css'
import { Row, Col, Form, Button } from 'react-bootstrap'
import 'antd/dist/antd.css';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react'
import styles from './index.module.css'

export default function WebComponent(props) {
    const { restaurant_id, type } = props
    const [promoteImageUrl, setPromoteImageUrl] = React.useState('')
    const [disable, setDisable] = React.useState(true)
    useEffect(() => {
        if (props && props.promote_image_url !== undefined) {
            const { promote_image_url } = props
            setPromoteImageUrl(promote_image_url)
        }
        if (restaurant_id) {
            setDisable(false)
        }
    }, [props])

    return (
        <div>
            {
                type === 'partner' && (
                    <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#0069D9", padding: "15px", textAlign: "center" }}>
                        Promote promotion
                    </div>
                )
            }
            <Row>
                <Col sm={6}>
                    <Row>
                        <Col>
                            <img src={promoteImageUrl} alt="avatar" style={{ width: '100%', height: '16rem', border: "1px solid #555", borderRadius: "5px" }} />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <Upload
                                showUploadList={false}
                                beforeUpload={props.check_before_upload}
                                onChange={(e) => props.handle_upload(e)}
                                style={{ width: "100%" }}
                            >
                                <Button disabled={disable} icon={<UploadOutlined />} className={utilStyles.cardText} style={{ width: "100%", backgroundColor: "#cfcfcf", color: "black", border: "none" }}>Click to Upload Promote Image</Button>
                            </Upload>
                        </Col>
                    </Row>
                </Col>
                <Col sm={6}>
                    <Form onSubmit={props.add_promotion}>
                        <Form.Group controlId="banner.text">
                            <Form.Label >Banner Text</Form.Label>
                            <Form.Control
                                as="textarea"
                                onChange={(e) => props.set_form('bannerText', e.target.value)}
                                rows={2}
                                isInvalid={!!props.errors.bannerText}
                                value={props.promote_form.bannerText}
                                disabled={disable}
                            />
                            <Form.Control.Feedback type="invalid">
                                {props.errors.bannerText}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="promoted.contents">
                            <Form.Label >Promoted contents</Form.Label>
                            <Form.Control
                                as="textarea"
                                onChange={(e) => props.set_form('promotedContents', e.target.value)}
                                rows={4}
                                isInvalid={!!props.errors.promotedContents}
                                value={props.promote_form.promotedContents}
                                disabled={disable}
                            />
                            <Form.Control.Feedback type="invalid">
                                {props.errors.promotedContents}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div style={{ textAlign: "right" }}>
                            <Button disabled={disable} variant="primary" type="submit">
                                Post
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    )

}