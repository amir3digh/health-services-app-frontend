import { useState,useEffect } from 'react';
import { pendingRequest } from '../../../lib/requests';
import RadioBtn from '../../microComponents/radioButton/RadioBtn';
import styles from './ServicesItems.module.scss';

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
    },[service])
    
    const handleClick = async (event) => {
        event.preventDefault();
        const serviceId = event.currentTarget.id;
        const requestAction = pending ? 'delete' : 'post';
        const resData = await pendingRequest(serviceId, prescription, requestAction);
        console.log(resData, prescription);
        update();
    }
    return (
        <div id={id} onClick={handleClick} className={styles.container + ' global-container'}>
            <RadioBtn checked={pending}/>
            <div className={styles.childBox}>
                <div className={styles.servicesTitle}>{title}</div>
                <div className={styles.servicesPrice}>
                    <span>قیمت:</span>
                    <span>{price}</span>
                    <span>تومان</span>
                </div>
            </div>
        </div>
    )
}