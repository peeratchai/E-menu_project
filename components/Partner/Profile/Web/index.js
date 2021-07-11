import utilStyles from '../../../../styles/utils.module.css'
import styles from './index.module.css'
import { Row, Col, Form, Button } from 'react-bootstrap'
import 'antd/dist/antd.css';
import { Upload, Slider, TimePicker, Space, Spin, Select, Popconfirm, message, Tooltip } from 'antd';
import { PlusOutlined, UploadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react'
import AntdModal from "../../../AntdModal"
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import moment from 'moment';
import LocationModal from '../../../Modal/Location'
import restaurantService from '../../../../services/restaurant'
import checkBeforeUpload from '../../../../services/checkBeforeUploadImage'

const defaultImage = "data:image/png;base64,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"
const { Option } = Select;

export default function WebProfileComponent(props) {
    let { restaurant_form, spin_loading, business_district, restaurant_id, type, master_Data_Food_Type } = props
    let { update_restaurant_details } = props
    const [previewVisible, setPreviewVisible] = React.useState(false);
    const [previewTitle, setPreviewTitle] = React.useState('');
    const [previewImage, setPreviewImage] = React.useState('');
    const [restaurantLogoUrl, setRestaurantLogoUrl] = React.useState(defaultImage);
    const [restaurantForm, setRestaurantForm] = React.useState(restaurant_form);
    const [formErrors, setFormErrors] = React.useState({});
    const [restaurantBannerFileList, setRestaurantBannerFileList] = React.useState([]);
    const [showLocationModal, setShowLocationModal] = React.useState(false)
    const dayArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const [disable, setDisable] = React.useState(true)

    const handleCancel = () => {
        setPreviewVisible(false)
    }

    useEffect(() => {
        if (restaurant_form !== null) {
            console.log('WebProfileComponent')
            setDefaultRestaurantBannerImage(restaurant_form.restaurant_pictures)
            setRestaurantForm(restaurant_form)
            if (restaurant_form.image_url !== null && restaurant_form.image_url !== "" && restaurant_form.image_url !== "null") {
                setRestaurantLogoUrl(restaurant_form.image_url)
            } else {
                setRestaurantLogoUrl(defaultImage)
            }
        }
        if (restaurant_id) {
            setDisable(false)
        }
    }, [restaurant_form, restaurant_id])

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
        console.log('info', info)
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
        console.log('newTime', newTime)

        let newBusinessHour = [...restaurantForm.business_hour]
        newBusinessHour.map((businessHour) => {
            if (businessHour.day === day) {
                if (newTime === "") {
                    businessHour[timeType] = null
                } else {
                    businessHour[timeType] = newTime
                }
            }
        })
        setRestaurantDetail('business_hour', newBusinessHour)
        console.log('newBusinessHour', newBusinessHour)
    }

    const format = 'HH:mm'
    let businessHour
    let BusinessHourComponent = dayArray.map((day, index) => {
        businessHour = restaurantForm.business_hour.find((businessHour) => businessHour.day === day)
        if (businessHour === undefined) {
            businessHour = {
                'day': day,
                'opening_time': '8.00',
                'closing_time': '16.00'
            }
        }
        return (
            <Row style={{ marginBottom: "10px" }} key={businessHour.day + index}>
                <Col xs={3}>
                    {businessHour.day}
                </Col>
                <Col xs={9}>
                    <TimePicker disabled={disable} value={businessHour.opening_time !== null ? moment(businessHour.opening_time, format) : null} format={format} onChange={(time, timeString) => onChageBusinessHour(timeString, day, 'opening_time')} /> - <TimePicker disabled={disable} value={businessHour.closing_time !== null ? moment(businessHour.closing_time, format) : null} format={format} onChange={(time, timeString) => onChageBusinessHour(timeString, day, 'closing_time')} />
                </Col>
            </Row>
        )
    })


    const optionsOfPayment = [
        {
            label: `Cash`,
            value: 'Cash',
        },
        {
            label: `Credit Card`,
            value: 'Credit Card',
        }
    ]

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
        disabled: disable,
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


    const uploadRestuarantBannerImage = ({ fileList, file }) => {
        console.log('file', file)
        console.log('fileList', fileList)
        if (file.type || file.type === "") {
            console.log('Not delete')
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG file!');
            } else {
                if (!isLt2M) {
                    message.error('Image must smaller than 2MB!');
                } else {
                    setRestaurantDetail('bannerImage', fileList)
                    setRestaurantBannerFileList(fileList)
                }
            }
        } else {
            console.log('Delete')
            setRestaurantDetail('bannerImage', fileList)
            setRestaurantBannerFileList(fileList)
        }
    }

    const saveProfile = () => {
        // console.log(restaurantForm)

        let businessHourList = restaurantForm.business_hour
        let openingTimeListError = {}
        openingTimeListError = businessHourList.find((businessHour) => businessHour.opening_time === null)
        let closingTimeListError = {}
        closingTimeListError = businessHourList.find((businessHour) => businessHour.closing_time === null)
        console.log('openingTimeListError', openingTimeListError)
        if (openingTimeListError && Object.keys(openingTimeListError).length > 0) {
            message.error('Please select opening time in ' + openingTimeListError.day)
        } else {
            if (closingTimeListError && Object.keys(closingTimeListError).length > 0) {
                message.error('Please select closing time in ' + closingTimeListError.day)
            } else {
                update_restaurant_details(restaurantForm)
            }
        }
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
        let address = markerPosition.address
        setRestaurantForm({
            ...restaurantForm,
            location: location,
            address: address
        })
        setShowLocationModal(false)
    }

    let businessDistrictDropdown = business_district && business_district.map((businessDistrict) => {
        return (
            <Option value={businessDistrict.id}>{businessDistrict.name}</Option>
        )
    }
    )

    let foodTypeDropdown = master_Data_Food_Type && master_Data_Food_Type.map((foodType) => {
        console.log('foodType',foodType)
        return (
            <Option value={foodType.name}>{foodType.name}</Option>
        )
    }
    )

    const onDeleteRestaurant = () => {
        restaurantService.deleteRestaurantById(restaurant_id).then((response) => {
            console.log('response', response)
            message.success('Delete restaurant successful.')
            window.location.reload()
        }).catch(error => {
            console.log('confirmDeleteRestaurant error', error)
            message.error('Cannot delete restaurant.')
        })
    }

    return (
        <Spin spinning={spin_loading} tip="Loading...">
            <div>
                {
                    type === 'partner' && (
                        <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#78100E", padding: "15px", textAlign: "center" }}>
                            Restaurant Profile
                        </div>
                    )
                }
                <Row>
                    {/* Left section */}
                    <Col sm={6}>
                        {/* Upload restaurants logo */}
                        <div style={{ borderBottom: "1px solid #DEDEDE", marginBottom: "10px", paddingLeft: "18px", paddingBottom: "10px" }}>
                            <Row style={{ marginBottom: "10px" }}>
                                <Col>
                                    <div>
                                        <b>Restaurant Logo </b>
                                        <Tooltip title="Recommended ratio is 350x180">
                                            <InfoCircleOutlined style={{ color: "orange" }} />
                                        </Tooltip>
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
                                                beforeUpload={checkBeforeUpload}
                                                onChange={(e) => uploadRestaurantLogo(e)}
                                                style={{ width: "100%" }}
                                            >
                                                <Button disabled={disable} icon={<UploadOutlined />} className={utilStyles.cardText} style={{ width: "100%", backgroundColor: "#cfcfcf", color: "black", border: "none" }}>Click to Upload Restaurant Logo</Button>
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
                                        <b>Restaurant Banner Picture </b>
                                        <Tooltip title="Recommended ratio is 1300x300">
                                            <InfoCircleOutlined style={{ color: "orange" }} />
                                        </Tooltip>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Upload
                                        listType="picture-card"
                                        fileList={restaurantBannerFileList}
                                        onPreview={(e) => onPreviewImage(e)}
                                        onChange={(e) => uploadRestuarantBannerImage(e)}
                                        className="upload-restaurant-list"
                                        disabled={disable}
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
                                    disabled={disable}
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
                                    disabled={disable}
                                />
                            </Form.Group>
                            <Form.Group controlId="location">
                                <Form.Label>Location Point(Lat - Lng) <Button disabled={disable} onClick={() => setShowLocationModal(true)}>Change location</Button></Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setRestaurantDetail('location', e.target.value)}
                                    value={restaurantForm.location}
                                    disabled={disable}
                                />
                            </Form.Group>
                            <Form.Group controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setRestaurantDetail('address', e.target.value)}
                                    value={restaurantForm.address}
                                    disabled={disable}
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
                                        disabled={disable}
                                    >
                                        {businessDistrictDropdown}
                                    </Select>
                                </div>
                            </Form.Group>
                            <Form.Group controlId="foodType">
                                <Form.Label>Food Type</Form.Label>
                                <div>
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Select a food type"
                                        optionFilterProp="children"
                                        onChange={(value) => setRestaurantDetail('food_type', value)}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        value={restaurantForm.food_type}
                                        disabled={disable}
                                    >
                                        {foodTypeDropdown}
                                    </Select>
                                </div>
                            </Form.Group>
                            <Form.Group controlId="phoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setRestaurantDetail('phone', e.target.value)}
                                    value={restaurantForm.phone}
                                    disabled={disable}
                                />
                            </Form.Group>
                            <Form.Group controlId="webSiteUrl">
                                <Form.Label>Website URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setRestaurantDetail('website', e.target.value)}
                                    value={restaurantForm.website}
                                    disabled={disable}
                                />
                            </Form.Group>
                            <Form.Group controlId="facebookURL">
                                <Form.Label>Facebook URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setRestaurantDetail('facebook', e.target.value)}
                                    value={restaurantForm.facebook}
                                    disabled={disable}
                                />
                            </Form.Group>
                            <Form.Group controlId="twitter">
                                <Form.Label>Twitter URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setRestaurantDetail('instragram', e.target.value)}
                                    value={restaurantForm.instragram}
                                    disabled={disable}
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
                                <Form.Check disabled={disable} type="checkbox" checked={restaurantForm.have_parking} onChange={(e) => setRestaurantDetail('have_parking', e.target.checked)} label="Have Parking" />
                            </Form.Group>
                            <Form.Group controlId="priceRange">
                                <Form.Label>Price Range (Generated by system)</Form.Label>
                                <br />
                                {/* Price range is generated by system */}
                                <Slider range value={[restaurantForm.price_from, restaurantForm.price_to]} disabled={true} />
                                <div className={utilStyles.font_size_sm}>From {restaurantForm.price_from} to {restaurantForm.price_to} baht</div>
                            </Form.Group>

                            <div style={{ textAlign: "right" }}>
                                <Popconfirm
                                    title="Are you sure to delete this restaurant? This account wil be permanently deleted."
                                    onConfirm={() => onDeleteRestaurant()}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button variant="danger" disabled={disable} style={{ marginRight: "15px" }}>
                                        Delete Restaurant
                                    </Button>
                                </Popconfirm>
                                <Button variant="primary" disabled={disable} onClick={() => saveProfile()}>
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