import styles from './Drug.module.scss'

export default function DrugPending(props) {
    const pendingServiceId = props.pendingServiceId;
    const serviceId = props.serviceId;
    const deletePending = props.deletePending;
    const type = props.type;
    const prescriptionType = props.prescriptionType;

    const handleDelete = async (event) => {
        event.preventDefault();
        await deletePending(serviceId, pendingServiceId);
    }
    return (type === 'prescription' ?
        <div className={styles.prescription}>
            <span>نسخه {prescriptionType === 1 ? 'تصویری' : 'الکترونیک'}  ثبت شد</span>
            <div>
                <svg onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" width="12.534" height="13.565" viewBox="0 0 12.534 13.565">
                    <path id="Path_533" data-name="Path 533" d="M14.248,6.642V5.928A1.411,1.411,0,0,0,12.856,4.5H8.678A1.411,1.411,0,0,0,7.285,5.928v.714H5.2a.714.714,0,0,0,0,1.428h.7v7.854a2.116,2.116,0,0,0,2.089,2.142h5.57a2.116,2.116,0,0,0,2.089-2.142V8.07h.7a.714.714,0,0,0,0-1.428Zm-1.393-.714H8.678v.714h4.178ZM14.248,8.07H7.285v7.854a.705.705,0,0,0,.7.714h5.57a.705.705,0,0,0,.7-.714Z" transform="translate(-4.5 -4.5)" fillRule="evenodd" />
                </svg>
            </div>
        </div>
        :
        <div className={styles.prescription}>
            <span>محصول ثبت شد</span>
            <div>
                <svg onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" width="12.534" height="13.565" viewBox="0 0 12.534 13.565">
                    <path id="Path_533" data-name="Path 533" d="M14.248,6.642V5.928A1.411,1.411,0,0,0,12.856,4.5H8.678A1.411,1.411,0,0,0,7.285,5.928v.714H5.2a.714.714,0,0,0,0,1.428h.7v7.854a2.116,2.116,0,0,0,2.089,2.142h5.57a2.116,2.116,0,0,0,2.089-2.142V8.07h.7a.714.714,0,0,0,0-1.428Zm-1.393-.714H8.678v.714h4.178ZM14.248,8.07H7.285v7.854a.705.705,0,0,0,.7.714h5.57a.705.705,0,0,0,.7-.714Z" transform="translate(-4.5 -4.5)" fillRule="evenodd" />
                </svg>
            </div>
        </div>
    );
}