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

const { Option } = Select;

export default function WebProfileComponent(props) {
    let { restaurant_form, spin_loading, business_district } = props
    let { check_before_upload, update_restaurant_details } = props
    const [previewVisible, setPreviewVisible] = React.useState(false);
    const [previewTitle, setPreviewTitle] = React.useState('');
    const [previewImage, setPreviewImage] = React.useState('');
    const [restaurantLogoUrl, setRestaurantLogoUrl] = React.useState();
    const [restaurantForm, setRestaurantForm] = React.useState(restaurant_form);
    const [formErrors, setFormErrors] = React.useState({});
    const [restaurantBannerFileList, setRestaurantBannerFileList] = React.useState([]);
    const [showLocationModal, setShowLocationModal] = React.useState(false)
    const dayArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

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

    const onChageBusinessHour = (newTime, day, timeType) => {
        let newBusinessHour = [...restaurantForm.business_hour]
        newBusinessHour.map((businessHour) => {
            if (businessHour.day === day) {
                businessHour[timeType] = newTime
            }
        })
        setRestaurantDetail('business_hour', newBusinessHour)
        console.log('newBusinessHour', newBusinessHour)
    }

    const format = 'HH:mm'
    let BusinessHourDay
    let BusinessHourComponent = dayArray.map((day, index) => {
        BusinessHourDay = restaurantForm.business_hour.find((businessHour) => businessHour.day === day)
        return (
            <Row style={{ marginBottom: "10px" }} key={BusinessHourDay.day + index}>
                <Col xs={3}>
                    {BusinessHourDay.day}
                </Col>
                <Col xs={9}>
                    <TimePicker value={moment(BusinessHourDay.opening_time, format)} format={format} onChange={(time, timeString) => onChageBusinessHour(timeString, day, 'opening_time')} /> - <TimePicker value={moment(BusinessHourDay.closing_time, format)} format={format} onChange={(time, timeString) => onChageBusinessHour(timeString, day, 'closing_time')} />
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
    const paymentProps = {
        showArrow: true,
        mode: 'multiple',
        style: {
            width: '100%',
        },
        value: restaurantForm.payment_option,
        options: optionsOfPayment,
        onChange: (paymentOptions) => {
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

    let businessDistrictDropdown = business_district && business_district.map((businessDistrict) => {
        return (
            <Option value={businessDistrict.id}>{businessDistrict.name}</Option>
        )
    }
    )

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
                            <Form.Group controlId="businessDistrict">
                                <Form.Label>Business District</Form.Label>
                                <div>
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Select a business district"
                                        optionFilterProp="children"
                                        onChange={(value) => setRestaurantDetail('business_district', value)}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        value={restaurantForm.business_district}
                                    >
                                        {businessDistrictDropdown}
                                    </Select>
                                </div>
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
                                    <Select {...paymentProps} />
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