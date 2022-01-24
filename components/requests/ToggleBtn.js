import styles from './Requests.module.scss';

export default function ToggleBtn(props){
    return (
        <div className={styles.toggleBtnContainer}>
            <div className={styles.toggleBtn}>
                درخواست های فعال
            </div>
            <div className={styles.toggleBtn}>
                درخواست های فعال
            </div>
            <div className={styles.toggleBtn}>
                درخواست های فعال
            </div>
            <div className={styles.toggleBtn}>
                درخواست های فعال
            </div>
        </div>
    )
}