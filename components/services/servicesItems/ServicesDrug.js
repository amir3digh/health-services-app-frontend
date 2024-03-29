import { useEffect, useState } from 'react';
import DrugPending from '../drug/DrugPending';
import styles from './ServicesItems.module.scss';

export default function ServicesDrug(props) {
    const title = props.title;
    const addTitle = props.addTitle;
    const pending = props.pending;
    const type = props.type;

    const clickHandler = (event) => {
        event.preventDefault();
        props.onClick(event);
    }
    return (
        <div className={styles.parentContainer}>
            <div onClick={clickHandler} className={styles.parentBox}>
                <div className={styles.servicesTitle}>
                    {title}
                </div>
                <div className={styles.addDrug}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13.439" height="12.76" viewBox="0 0 13.439 12.76">
                        <g id="Group_97" data-name="Group 97" transform="translate(-122 -216.236)">
                            <path id="Path_491" data-name="Path 491" d="M-4930-24233.5h11.439" transform="translate(5053 24456.025)" fill="none" stroke="#707070" strokeLinecap="round" strokeWidth="2" />
                            <path id="Path_492" data-name="Path 492" d="M-4924.28-24240.346v10.76" transform="translate(5053 24457.582)" fill="none" stroke="#707070" strokeLinecap="round" strokeWidth="2" />
                        </g>
                    </svg>
                    <span>{addTitle}</span>
                </div>
            </div>
            <div className={styles.servicesChildList}>
                {pending.map(parent => {
                    const childArray =
                        type === 'prescription' && parent.id === 54 ?
                            parent.pending_services :
                            type === 'product' && parent.id === 55 ?
                                parent.pending_services :
                                [];

                    return childArray ? childArray.map(child => (
                        <DrugPending
                            type={type}
                            prescriptionType={child.prescription_type}
                            key={child.id}
                            serviceId={parent.id}
                            pendingServiceId={child.id}
                            deletePending={props.deletePending}
                        />
                    )) : '';
                })}
            </div>
        </div>
    )
}