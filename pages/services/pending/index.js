import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../../../components/header/Header";
import styles from './Pending.module.scss';
import { pendingRequest } from '../../../lib/requests';
import PendingItem from "../../../components/requests/PendingItem";
import Router from "next/router";
import Popup from "../../../components/popup/Popup";

export default function Pending() {
    const title = 'لیست خدمات درخواستی';
    const [pending, setPending] = useState([]);
    const [priceSum, setPriceSum] = useState(0);
    useEffect(() => {
        updatePending();
    }, []);

    const updatePending = async () => {
        const response = await pendingRequest('', null, 'get');
        if (response.status === 'ok') {
            const result = response.result;
            let sum = 0;
            result.forEach(el => {
                const price = el.price;
                sum += price;
            });
            setPending(result);
            setPriceSum(sum);
        }
    }

    const [popup, setPopup] = useState('closed');
    const [itemToDelete, setItemToDelete] = useState()

    const deletePending = async (serviceId, pendingServiceId) => {
        const response = await pendingRequest(serviceId + '/' + pendingServiceId, null, 'delete');
        if (response.status === 'ok') {
            await updatePending();
        }
    }

    const stylizePrice = (price) => {
        var formatter = new Intl.NumberFormat('fa-IR', {
            currency: 'IRR',
        });
        return formatter.format(price);
    }

    const handleCancelClick = e => {
        e.preventDefault();
        Router.push('/services');
    }
    return (
        <main>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header
                pageTitle={title}
            />
            <div className={'global-container'}>
                <div className={styles.description}>
                    کاربر گرامی پس از ثبت نهایی درخواست شما، کارشناسان ما در اولین فرصت با شما تماس خواهند گرفت.
                </div>
                <div className={styles.title}>
                    لیست خدمات درخواستی
                </div>
            </div>
            <div className="global-container">
                {pending.map(el => (
                    <PendingItem
                        key={el.pending_service_id}
                        title={el.title}
                        serviceId={el.service_id}
                        pendingServiceId={el.pending_service_id}
                        price={el.price}
                        deletePending={deletePending}
                    />
                ))}
            </div>
            <div className="global-container">
                <div className={styles.sum}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="180.75" height="3" viewBox="0 0 180.75 3">
                        <line id="Line_12" data-name="Line 12" x1="177.75" transform="translate(1.5 1.5)" fill="none" stroke="#e2e2e2" strokeLinecap="round" strokeWidth="3" />
                    </svg>
                    <div>مجموع هزینه قابل پرداخت: {stylizePrice(priceSum)} تومان</div>
                </div>
            </div>
            <div className={styles.action + " global-container"}>
                <button className={styles.submit}>پرداخت</button>
                <button onClick={handleCancelClick} className={styles.cancel}>لغو درخواست</button>
            </div>
            <Popup
                opened={popup === 'opened'}
                setPopup={setPopup}
            />
        </main>
    )
}