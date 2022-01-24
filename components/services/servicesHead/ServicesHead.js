import RadioBtn from '../../microComponents/radioButton/RadioBtn';
import styles from './ServicesHead.module.scss';

export default function ServicesHead(props) {
    const prescriptionClick = (event) => {
        props.popupHandler('open');
    }
    return (
        <div className={styles.container}>
            <div className={styles.detailsContainer + ' global-container'}>
                <div className={styles.title}>{props.pageTitle}</div>
                <div className={styles.description}>از لیست زیر خدمات مورد نظر را انتخاب کنید</div>
            </div>
            <div className=' global-container'>
                <div className={styles.noskhehText}>
                    آیا نسخه پزشک دارید؟
                </div>
                <div className={styles.checkContainer}>
                    <RadioBtn
                        onClick={prescriptionClick}
                        checkLabel='بله'
                    />
                    <RadioBtn
                        checkLabel='خیر'
                        checked
                    />
                </div>
            </div>
        </div>
    )
}