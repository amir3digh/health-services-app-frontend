import { LoadingIcon } from '../microComponents/icons/Icons';
import styles from './Loading.module.scss';

export default function Loading(props) {
    const onload = props.onload;

    return (
        onload &&
        <div className={styles.container}>
            <div className={styles.loadingAnimation}>
                <LoadingIcon />
            </div>
        </div>
    )
}