import RadioBtn from '../../microComponents/radioButton/RadioBtn';
import styles from './ServicesHead.module.scss';

export default function ServicesHead(props) {
    const prescription = props.prescription;
    const setPrescription = props.setPrescription;
    const prescriptionSynced = props.prescriptionSynced;

    const deletePrescription = (event) => {
        event.preventDefault();
        setPrescription(null);
    }
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
                        checked={prescription}
                    />
                    <RadioBtn
                        checkLabel='خیر'
                        checked={!prescription}
                    />
                </div>
            </div>
            {prescription ? (
                <div className='global-container'>
                    <div className={styles.prescription}>
                        <span>نسخه {prescription.prescription ? 'تصویری' : 'الکترونیک'}  ثبت شد</span>
                        <svg onClick={deletePrescription} xmlns="http://www.w3.org/2000/svg" width="12.534" height="13.565" viewBox="0 0 12.534 13.565">
                            <path id="Path_533" data-name="Path 533" d="M14.248,6.642V5.928A1.411,1.411,0,0,0,12.856,4.5H8.678A1.411,1.411,0,0,0,7.285,5.928v.714H5.2a.714.714,0,0,0,0,1.428h.7v7.854a2.116,2.116,0,0,0,2.089,2.142h5.57a2.116,2.116,0,0,0,2.089-2.142V8.07h.7a.714.714,0,0,0,0-1.428Zm-1.393-.714H8.678v.714h4.178ZM14.248,8.07H7.285v7.854a.705.705,0,0,0,.7.714h5.57a.705.705,0,0,0,.7-.714Z" transform="translate(-4.5 -4.5)" fillRule="evenodd" />
                        </svg>
                    </div>
                </div>
            ) : (
                ''
            )}

        </div>
    )
}