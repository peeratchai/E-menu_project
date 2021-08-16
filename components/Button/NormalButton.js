import { Button } from 'antd'
import styles from './NormalButton.module.css'

const NormalButton = ({ button_name, font_size = '12px', height = "32px", function_on_click = function(){} }) => {
    return (
        <Button className={styles.normalButton} style={{ fontSize: font_size, height: height }} onClick={() => function_on_click()}>
            {button_name}
        </Button>
    )
}

export default NormalButton