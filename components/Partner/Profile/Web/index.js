import utilStyles from '../../../../styles/utils.module.css'
import styles from './index.module.css'
import { Row, Col, Form, Button } from 'react-bootstrap'
import 'antd/dist/antd.css';
import { Upload, Slider, TimePicker, Select, Space, Spin } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react'
import AntdModal from "../../../AntdModal"
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import moment from 'moment';
const { Option } = Select;

export default function WebProfileComponent(props) {
    let { restaurant_logo_url, restaurant_details, restaurant_form, spin_loading, restaurant_banner_fileList } = props
    let { check_before_upload, preview_image, upload_restuarant_banner_image, set_restaurant_detail } = props
    const [previewVisible, setPreviewVisible] = React.useState(false);
    const [previewTitle, setPreviewTitle] = React.useState('');
    const [previewImage, setPreviewImage] = React.useState('');
    const [restaurantLogoUrl, setRestaurantLogoUrl] = React.useState(restaurant_logo_url);
    const [priceMinSearch, setPriceMinSearch] = React.useState(0);
    const [priceMaxSearch, setPriceMaxSearch] = React.useState(2000);
    const [restaurantForm, setRestaurantForm] = React.useState({});
    const [formErrors, setFormErrors] = React.useState({});
    const [haveParking, setHaveParking] = React.useState(false);
    const [restaurantBannerFileList, setRestaurantBannerFileList] = React.useState([]);
    const [paymentOptions, setPaymentOptions] = React.useState();
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
        if (restaurant_form !== null) {
            console.log(restaurant_form)
            setRestaurantForm(restaurant_form)
            setDefaultPaymentOptions(restaurant_form.payment_option)
            setDefaultRestaurantBannerImage(restaurant_form.restaurant_pictures)
        }
    }, [props])

    const setDefaultRestaurantBannerImage = (restaurantBannerFileList) => {
        let cuurnetRestaurantBannerFileList = []
        restaurantBannerFileList.map((restaurantBanner, index) => {
            cuurnetRestaurantBannerFileList.push({
                uid: index,
                name: restaurantBanner.title,
                url: restaurantBanner.image_url,
            })
        })
        setRestaurantBannerFileList(cuurnetRestaurantBannerFileList)
        setRestaurantDetail('restaurant_pictures',cuurnetRestaurantBannerFileList)
    }

    const setDefaultPaymentOptions = (paymentOptionString) => {
        let splitString = paymentOptionString.split(',')
        let paymentOptions = splitString
        setPaymentOptions(paymentOptions)
    }

    const onChageBusinessHour = (newTime, indexOfBusinessHour, timeType) => {
        let newBusinessHour = [...businessHour]
        newBusinessHour[indexOfBusinessHour][timeType] = newTime
        setRestaurantDetail('businessHour', newBusinessHour)
        setBusinessHour(newBusinessHour)
    }

    const uploadRestaurantLogo = (info) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => {
                setRestaurantDetail('restaurantLogo', info.file.originFileObj)
                setRestaurantLogoUrl(imageUrl)
            })
        }
    };

    const format = 'HH:mm'
    let BusinessHourComponent = businessHour && businessHour.map((businessHour, index) => {
        return (
            <Row style={{ marginBottom: "10px" }} key={businessHour.day + index}>
                <Col xs={3}>
                    {businessHour.day}
                </Col>
                <Col xs={9}>
                    <TimePicker value={moment(businessHour.opening_time, format)} format={format} onChange={(time, timeString) => onChageBusinessHour(timeString, index, 'opening_time')} /> - <TimePicker value={moment(businessHour.closing_time, format)} format={format} onChange={(time, timeString) => onChageBusinessHour(timeString, index, 'closing_time')} />
                </Col>
            </Row>
        )
    })

    const [optionsOfPayment, setOptionsOfPayment] = React.useState([
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
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    const getBase64Antd = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    const filterProps = {
        showArrow: true,
        mode: 'multiple',
        style: {
            width: '100%',
        },
        value: paymentOptions,
        options: optionsOfPayment,
        onChange: (paymentOptions) => {
            setPaymentOptions(paymentOptions)
            setRestaurantDetail('paymentOptions', paymentOptions);
        },
        placeholder: 'Select payment options...',
        maxTagCount: 'responsive',
    };
    const onPreviewImage = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64Antd(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview,)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1),)
        setPreviewVisible(true)
    };
    const uploadRestuarantBannerImage = ({ fileList }) => {
        setRestaurantDetail('restaurant_pictures', fileList)
        setRestaurantBannerFileList(fileList)
    }

    const saveProfile = () => {
        console.log(restaurantForm)
    }

    const findProfileFormErrors = () => {
        const { promotedContents, bannerText } = promoteForm
        const newErrors = {}
        // Promoted contents errors
        if (!promotedContents || promotedContents === '') newErrors.promotedContents = 'Promoted contents is required !'
        // Banner text errors
        if (!bannerText || bannerText === '') newErrors.bannerText = 'Banner text is required !'
        return newErrors
    }

    const setRestaurantDetail = (fieldName, value) => {
        // console.log
        setRestaurantForm({
            ...restaurantForm,
            [fieldName]: value
        })

        // Check and see if errors exist, and remove them from the error object:
        if (!!formErrors[fieldName]) setFormErrors({
            ...formErrors,
            [fieldName]: null
        })
    }
    return (
        <Spin spinning={spin_loading} tip="Loading...">
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
                                            <img src={restaurantForm.image_url} alt="avatar" style={{ width: '100%', height: '10rem', border: "1px solid #555", borderRadius: "5px", objectFit: "contain" }} />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col>
                                            <Upload
                                                showUploadList={false}
                                                beforeUpload={check_before_upload}
                                                onChange={(e) => uploadRestaurantLogo(e)}
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
                                        fileList={restaurantBannerFileList}
                                        beforeUpload={check_before_upload}
                                        onPreview={(e) => onPreviewImage(e)}
                                        onChange={(e) => uploadRestuarantBannerImage(e)}
                                        className="upload-restaurant-list"
                                    >
                                        {restaurantBannerFileList.length >= 3 ? null : uploadButton}
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
                                    onChange={(e) => setRestaurantDetail('name', e.target.value)}
                                    isInvalid={!!formErrors.name}
                                    value={restaurantForm.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="location">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setRestaurantDetail('location', e.target.value)}
                                    isInvalid={!!formErrors.location}
                                    value={restaurantForm.location}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.location}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="phoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setRestaurantDetail('phone', e.target.value)}
                                    isInvalid={!!formErrors.phone}
                                    value={restaurantForm.phone}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.phone}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="webSiteUrl">
                                <Form.Label>Website URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setRestaurantDetail('website', e.target.value)}
                                    value={restaurantForm.website}
                                />
                            </Form.Group>
                            <Form.Group controlId="facebookURL">
                                <Form.Label>Facebook URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setRestaurantDetail('facebook', e.target.value)}
                                    value={restaurantForm.facebook}
                                />
                            </Form.Group>
                            <Form.Group controlId="twitter">
                                <Form.Label>Twitter URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setRestaurantDetail('instragram', e.target.value)}
                                    value={restaurantForm.instragram}
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
                                <Form.Check type="checkbox" checked={restaurantForm.have_parking} onChange={(e) => setRestaurantDetail('have_parking', e.target.checked)} label="Have Parking" />
                            </Form.Group>
                            <Form.Group controlId="priceRange">
                                <Form.Label>Price Range (Generated by system)</Form.Label>
                                <br />
                                {/* Price range is generated by system */}
                                <Slider range value={[restaurantForm.price_from, restaurantForm.price_to]} disabled={true} />
                                <div className={utilStyles.font_size_sm}>From {restaurantForm.price_from} to {restaurantForm.price_to} baht</div>
                            </Form.Group>

                            <div style={{ textAlign: "right" }}>
                                <Button variant="primary" onClick={() => saveProfile()}>
                                    Save
                            </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </div>
        </Spin>
    )
}