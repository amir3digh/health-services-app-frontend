import { useState, useEffect } from 'react';
import { pendingRequest } from '../../../lib/requests';
import RadioBtn from '../../microComponents/radioButton/RadioBtn';
import styles from './ServicesItems.module.scss';
import { motion } from 'framer-motion';

export default function ServicesChildren(props) {
    const service = props.service;
    const id = service.id;
    const title = service.title;
    const price = service.price;
    const prescription = props.prescription;

    const update = props.update;

    const [pending, setPending] = useState(service.pending);
    useEffect(() => {
        setPending(service.pending);
    }, [service]);

    const [loading, setLoading] = useState(false);

    const handleClick = async (event) => {
        event.preventDefault();
        console.log('clicked');
        setLoading(true);
        const serviceId = event.currentTarget.id;
        const requestAction = pending ? 'delete' : 'post';
        const resData = await pendingRequest(serviceId, prescription, requestAction);
        update();
        setLoading(false);
    }

    return (
        <button id={id} onClick={handleClick} disabled={loading} className={styles.childContainer}>
            <RadioBtn checked={pending} />
            <div className={styles.childBox}>
                <div className={styles.servicesTitle}>{title}</div>
                <div className={styles.servicesPrice}>
                    <span>قیمت:</span>
                    <span>{price}</span>
                    <span>تومان</span>
                </div>
                {loading &&
                    <div className={styles.loadingAnimation}>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto' }} width="25px" height="25px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <circle cx="50" cy="50" fill="none" stroke="#117C6F" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
                                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                            </circle>
                        </svg>
                    </div>
                }
            </div>
        </button>
    )
}