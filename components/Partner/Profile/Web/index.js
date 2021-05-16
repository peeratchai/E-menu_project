import utilStyles from '../../../../styles/utils.module.css'
import styles from './index.module.css'
import { Row, Col, Form, Button } from 'react-bootstrap'
import 'antd/dist/antd.css';
import { Upload, Slider, TimePicker, Space, Spin, Select } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react'
import AntdModal from "../../../AntdModal"
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import moment from 'moment';
import LocationModal from '../../../Modal/Location'


export default function WebProfileComponent(props) {
    let { restaurant_form, spin_loading } = props
    let { check_before_upload, update_restaurant_details } = props
    const defaultImage = "data:image/png;base64,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"
    const [previewVisible, setPreviewVisible] = React.useState(false);
    const [previewTitle, setPreviewTitle] = React.useState('');
    const [previewImage, setPreviewImage] = React.useState('');
    const [restaurantLogoUrl, setRestaurantLogoUrl] = React.useState(defaultImage);
    const [restaurantForm, setRestaurantForm] = React.useState(restaurant_form);
    const [formErrors, setFormErrors] = React.useState({});
    const [restaurantBannerFileList, setRestaurantBannerFileList] = React.useState([]);
    const [showLocationModal, setShowLocationModal] = React.useState(false)

    const handleCancel = () => {
        setPreviewVisible(false)
    }

    useEffect(() => {
        if (restaurant_form !== null) {
            setDefaultRestaurantBannerImage(restaurant_form.restaurant_pictures)
            setRestaurantForm(restaurant_form)
            setRestaurantLogoUrl(restaurant_form.image_url)
        }
    }, [props])

    const setDefaultRestaurantBannerImage = (restaurantBannerFileList) => {
        let cuurnetRestaurantBannerFileList = []

        if (restaurantBannerFileList !== undefined) {
            restaurantBannerFileList.map((restaurantBanner, index) => {
                cuurnetRestaurantBannerFileList.push({
                    uid: index,
                    name: restaurantBanner.title,
                    url: restaurantBanner.image_url,
                })
            })
            setRestaurantBannerFileList(cuurnetRestaurantBannerFileList)
            setRestaurantDetail('restaurant_pictures', cuurnetRestaurantBannerFileList)
        }
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

    const onChageBusinessHour = (newTime, indexOfBusinessHour, timeType) => {
        let newBusinessHour = [...restaurantForm.business_hour]
        newBusinessHour[indexOfBusinessHour][timeType] = newTime
        setRestaurantDetail('business_hour', newBusinessHour)
        console.log('newBusinessHour', newBusinessHour)
    }

    const format = 'HH:mm'
    let BusinessHourComponent = restaurantForm.business_hour.map((businessHour, index) => {
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
        value: restaurantForm.payment_option,
        options: optionsOfPayment,
        onChange: (paymentOptions) => {
            setPaymentOptions(paymentOptions)
            setRestaurantDetail('payment_option', paymentOptions);
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
        setRestaurantDetail('bannerImage', fileList)
        setRestaurantBannerFileList(fileList)
    }

    const saveProfile = () => {
        // console.log(restaurantForm)
        update_restaurant_details(restaurantForm)
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

    const onSelectLocation = (markerPosition) => {
        let location = "POINT(" + markerPosition.lat + " " + markerPosition.lng + ")"
        setRestaurantDetail('location', location)
        setShowLocationModal(false)
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
                                            <img src={restaurantLogoUrl} alt="avatar" style={{ width: '100%', height: '10rem', border: "1px solid #555", borderRadius: "5px", objectFit: "contain" }} />
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
                            <Form.Group controlId="restaurantName">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setRestaurantDetail('description', e.target.value)}
                                    value={restaurantForm.description}
                                />
                            </Form.Group>
                            <Form.Group controlId="location">
                                <Form.Label>Location <Button onClick={() => setShowLocationModal(true)}>Change location</Button></Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setRestaurantDetail('location', e.target.value)}
                                    value={restaurantForm.location}
                                />
                            </Form.Group>
                            <Form.Group controlId="phoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setRestaurantDetail('phone', e.target.value)}
                                    value={restaurantForm.phone}
                                />
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
            <LocationModal
                show={showLocationModal}
                onHide={() => setShowLocationModal(false)}
                on_select_location={(markerPosition) => onSelectLocation(markerPosition)}
                restaurant_location={restaurantForm.location}
            />
        </Spin>
    )
}