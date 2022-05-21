import styles from './Requests.module.scss';

export default function PendingItem(props) {
    const serviceId = props.serviceId;
    const pendingServiceId = props.pendingServiceId;
    const title = props.title;
    const price = props.price;
    const deletePending = props.deletePending;

    const handleDeleteClick = e => {
        e.preventDefault();
        deletePending(serviceId, pendingServiceId);
    }

    const stylizePrice = (price) => {
        var formatter = new Intl.NumberFormat('fa-IR', {
            currency: 'IRR',
        });
        return formatter.format(price);
    }
    return (
        <div className={`item-box ${styles.items}`}>
            <div className="title">
                <div>{title}</div>
                <div className="subtitle">قیمت: {stylizePrice(price)} تومان</div>
            </div>
            {deletePending && <div onClick={handleDeleteClick} className='button'>
                <svg id="trash-empty" xmlns="http://www.w3.org/2000/svg" width="10.516" height="11.382" viewBox="0 0 10.516 11.382">
                    <path id="Path_533" data-name="Path 533" d="M12.679,6.3V5.7a1.184,1.184,0,0,0-1.168-1.2H8.005A1.184,1.184,0,0,0,6.837,5.7v.6H5.084a.6.6,0,0,0,0,1.2h.584v6.589a1.775,1.775,0,0,0,1.753,1.8h4.674a1.775,1.775,0,0,0,1.753-1.8V7.5h.584a.6.6,0,0,0,0-1.2Zm-1.168-.6H8.005v.6h3.505Zm1.168,1.8H6.837v6.589a.592.592,0,0,0,.584.6h4.674a.592.592,0,0,0,.584-.6Z" transform="translate(-4.5 -4.5)" fillRule="evenodd" />
                </svg>
                <span>حذف</span>
            </div>}
        </div>
    )
}