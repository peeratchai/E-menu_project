import Layout from '../../components/layout'
import styles from './index.module.css'
import { Form, Button } from 'react-bootstrap'
import React, { useEffect } from 'react'
export default function resetPassword() {
    const [form, setForm] = React.useState({})
    const router = useRouter()
    const { u, token } = router.query;

    // const [password, setPassword] = React.useState(null);
    // const [confirmPassword, setConfirmPassword] = React.useState(null);
    const [errors, setErrors] = React.useState({});

    useEffect(() => {
        console.log('u data : ', u)
        console.log('token data : ', token)
        if (u !== undefined) {
            console.log('have u data : ', u)
        }
    }, [])

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    const resetPassword = (event) => {
        event.preventDefault();
        const newErrors = findResetPasswordFormErrors()

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {

        }
    }

    const findResetPasswordFormErrors = () => {
        const { password, confirmPassword } = form
        console.log('password:', password)
        console.log('confirmPassword:', confirmPassword)

        const newErrors = {}
        // password errors
        if (!password || password === '') newErrors.password = 'Password is required !'
        if (!confirmPassword || confirmPassword === '') newErrors.confirmPassword = 'confirmPassword is required !'
        else if (password !== confirmPassword) newErrors.confirmPassword = 'Password dose not match'

        return newErrors
    }

    return (
        <Layout>
            <div className={styles.card}>
                <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
                    Reset Password
                </h2>
                <Form style={{ marginBottom: "20px" }} onSubmit={resetPassword}>
                    <Form.Group controlId="validationPassword">
                        <Form.Label>New Password *</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="New Password"
                            onChange={(e) => setField('password', e.target.value)}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>

                    </Form.Group>
                    <Form.Group controlId="validationConfirmPassword">
                        <Form.Label>Confirm Password *</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            onChange={(e) => setField('confirmPassword', e.target.value)}
                            isInvalid={!!errors.confirmPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit" className={styles.button_reset_password} >
                        Change Password
                    </Button>
                </Form>
            </div>
        </Layout>
    )
}