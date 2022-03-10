import styles from './Cover.module.scss';
import { motion, useAnimation } from 'framer-motion';

export default function Cover(props) {
    const handler = props.handler;
    const menuControls = props.menuControls;

    const clickHandler = () => handler('close');
    return (
        <motion.div
            initial='hidden'
            animate={menuControls}
            variants={{
                visible: { opacity: 1 },
                hidden: { opacity: 0 }
            }}
            transition={{ type: 'linear' }}
            onClick={clickHandler}
            className={styles.container}
        >
        </motion.div>
    )
}