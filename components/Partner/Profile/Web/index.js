import utilStyles from '../../../../styles/utils.module.css'
import styles from './index.module.css'
import { Row, Col, Form, Button } from 'react-bootstrap'
import 'antd/dist/antd.css';
import { Upload, Slider, TimePicker, Select, Space } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react'
import AntdModal from "../../../AntdModal"
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import moment from 'moment';
const { Option } = Select;

export default function WebProfileComponent(props) {
    let { restaurant_logo_url, restaurant_details, restaurant_form, form_errors, restaurant_banner_fileList } = props
    let { upload_restaurant_logo, check_before_upload, preview_image, upload_restuarant_banner_image, set_restaurant_detail } = props
    const [previewVisible, setPreviewVisible] = React.useState(false);
    const [previewTitle, setPreviewTitle] = React.useState('');
    const [previewImage, setPreviewImage] = React.useState('');
    const [priceMinSearch, setPriceMinSearch] = React.useState(0);
    const [priceMaxSearch, setPriceMaxSearch] = React.useState(2000);
    const [paymentOptionsValue, setPaymentOptionsValue] = React.useState([]);
    const [haveParking, setHaveParking] = React.useState(false);
    const [businessHour, setBusinessHour] = React.useState([
        {
            "day": "Monday",
            "opening_time": "10:00",
            "closing_time": "22:00",
        },
        {
            "day": "Tuesday",
            "opening_time": "10:00",
            "closing_time": "22:00",
        },
        {
            "day": "Wednesday",
            "opening_time": "10:00",
            "closing_time": "22:00",
        },
        {
            "day": "Thursday",
            "opening_time": "10:00",
            "closing_time": "22:00",
        },
        {
            "day": "Friday",
            "opening_time": "10:00",
            "closing_time": "22:00",
        },
        {
            "day": "Saturday",
            "opening_time": "10:00",
            "closing_time": "22:00",
        },
        {
            "day": "Sunday",
            "opening_time": "10:00",
            "closing_time": "22:00",
        }
    ]);

    const handleCancel = () => {
        setPreviewVisible(false)
    }

    useEffect(() => {
        // if (restaurant_details !== undefined) {
        //     setBusinessHour(restaurant_details.business_hour)
        // }
    }, [props])

    const format = 'HH:mm'
    const BusinessHourComponent = businessHour && businessHour.map((businessHour) => {
        console.log(businessHour.closing_time)
        return (
            <Row style={{ marginBottom: "10px" }}>
                <Col xs={3}>
                    {businessHour.day}
                </Col>
                <Col xs={9}>
                    <TimePicker value={moment(businessHour.opening_time, format)} format={format} onChange={(e) => console.log(e)} /> - <TimePicker value={moment(businessHour.closing_time, format)} format={format} onChange={(e) => console.log(e)} />
                </Col>
            </Row>
        )
    })

    const [options, setOptions] = React.useState([
        {
            label: `Cash`,
            value: 'Cash',
        },
        {
            label: `Credit Card`,
            value: 'Credit Card',
        }
    ]);

    const uploadButton = (
        <div >
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const filterProps = {
        showArrow: true,
        mode: 'multiple',
        style: {
            width: '100%',
        },
        paymentOptionsValue,
        options,
        onChange: (paymentOptions) => {
            set_form('paymentOptions', paymentOptions);
        },
        placeholder: 'Select payment options...',
        maxTagCount: 'responsive',
    };
    const onPreviewImage = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64Antd(file.originFileObj);
        }
        console.log(file.preview)
        setPreviewImage(file.url || file.preview,)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1),)
        setPreviewVisible(true)
    };
    return (
        <div className={styles.tab}>
            <Row>
                {/* Left section */}
                <Col sm={6}>
                    {/* Upload restaurants logo */}
                    <div style={{ borderBottom: "1px solid #DEDEDE", marginBottom: "10px", paddingLeft: "18px", paddingBottom: "10px" }}>
                        <Row style={{ marginBottom: "10px" }}>
                            <Col>
                                <div>
                                    <b>Restaurant Logo</b>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ textAlign: "center" }}>
                            <Col>
                                <Row>
                                    <Col>
                                        <img src={restaurant_logo_url} alt="avatar" style={{ width: '100%', height: '10rem', border: "1px solid #555", borderRadius: "5px", objectFit: "contain" }} />
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col>
                                        <Upload
                                            showUploadList={false}
                                            beforeUpload={check_before_upload}
                                            onChange={(e) => upload_restaurant_logo(e)}
                                            style={{ width: "100%" }}
                                        // onPreview={(e) => onPreview(e)}
                                        >
                                            <Button icon={<UploadOutlined />} className={utilStyles.cardText} style={{ width: "100%", backgroundColor: "#cfcfcf", color: "black", border: "none" }}>Click to Upload Restaurant Logo</Button>
                                        </Upload>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <div style={{ borderBottom: "1px solid #DEDEDE", paddingLeft: "18px", paddingBottom: "10px" }}>
                        <Row style={{ marginBottom: "10px" }}>
                            <Col>
                                <div>
                                    <b>Restaurant Banner Picture</b>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Upload
                                    listType="picture-card"
                                    fileList={restaurant_banner_fileList}
                                    beforeUpload={check_before_upload}
                                    onPreview={(e) => onPreviewImage(e)}
                                    onChange={(e) => upload_restuarant_banner_image(e)}
                                    className="upload-restaurant-list"
                                >
                                    {restaurant_banner_fileList.length > 3 ? null : uploadButton}
                                </Upload>
                            </Col>
                        </Row>
                    </div>
                    <div style={{ marginTop: "20px", paddingLeft: "18px", paddingBottom: "10px" }}>
                        <Row style={{ marginBottom: "15px" }}>
                            <Col>
                                <QueryBuilderIcon /> &nbsp; <b>OPENING HOURS</b>
                            </Col>
                        </Row>
                        {BusinessHourComponent}
                    </div>
                    <AntdModal
                        previewVisible={previewVisible}
                        previewTitle={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                        previewImage={previewImage}
                    />
                </Col>
                {/* Right section */}
                <Col sm={6}>
                    <Row style={{ marginBottom: "10px" }}>
                        <Col>
                            <div>
                                <b>Restaurant Details</b>
                            </div>
                        </Col>
                    </Row>
                    <Form>
                        <Form.Group controlId="restaurantName">
                            <Form.Label>Restaurant Name</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => set_form('restaurantName', e.target.value)}
                                isInvalid={!!form_errors.restaurantName}
                                value={restaurant_form.restaurantName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {form_errors.restaurantName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => set_form('location', e.target.value)}
                                isInvalid={!!form_errors.location}
                                value={restaurant_form.location}
                            />
                            <Form.Control.Feedback type="invalid">
                                {form_errors.location}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="phoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => set_form('phoneNumber', e.target.value)}
                                isInvalid={!!form_errors.phoneNumber}
                                value={restaurant_form.phoneNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                                {form_errors.phoneNumber}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="webSiteUrl">
                            <Form.Label>Website URL</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => set_form('webSiteUrl', e.target.value)}
                                value={restaurant_form.webSiteUrl}
                            />
                        </Form.Group>
                        <Form.Group controlId="facebookURL">
                            <Form.Label>Facebook URL</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => set_form('facebookURL', e.target.value)}
                                value={restaurant_form.facebookURL}
                            />
                        </Form.Group>
                        <Form.Group controlId="twitter">
                            <Form.Label>Twitter URL</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => set_form('twitter', e.target.value)}
                                value={restaurant_form.twitter}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Payment Option</Form.Label>
                            <Space
                                direction="vertical"
                                style={{
                                    width: '100%',
                                }}
                            >
                                <Select {...filterProps} />
                            </Space>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Parking</Form.Label>
                            <Form.Check type="checkbox" checked={haveParking} onChange={(checked) => set_form('haveParking', checked)} label="Have Parking" />
                        </Form.Group>
                        <Form.Group controlId="priceRange">
                            <Form.Label>Price Range (Generated by system)</Form.Label>
                            <br />
                            {/* Price range is generated by system */}
                            <Slider range defaultValue={[priceMinSearch, priceMaxSearch]} max={4000} disabled={true} />
                            <div className={utilStyles.font_size_sm}>From {priceMinSearch} to {priceMaxSearch} baht</div>
                        </Form.Group>

                        <div style={{ textAlign: "right" }}>
                            <Button variant="primary" >
                                Save
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}