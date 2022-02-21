import Header from '../../components/header/Header';
import BottomNav from '../../components/bottom_nav/BottomNav';
import Head from 'next/head';
import ToggleBtn from '../../components/requests/ToggleBtn';
import PendingItem from '../../components/requests/PendingItem';
import { useEffect, useState } from 'react';
import { pendingRequest } from '../../lib/requests';
import styles from './RequestsPage.module.scss';
import Link from 'next/link';

export default function RequestPage() {
    const title = 'درخواست ها';
    const [pending, setPending] = useState([]);

    useEffect(() => {
        updatePending();
    }, []);

    const [show, setShow] = useState('pending');

    const updatePending = async () => {
        const response = await pendingRequest('', null, 'get');
        if (response.status === 'ok') {
            const result = response.result;
            setPending(result);
        }
    }
    const deletePending = async (serviceId, pendingServiceId) => {
        const response = await pendingRequest(serviceId + '/' + pendingServiceId, null, 'delete');
        if (response.status === 'ok') {
            await updatePending();
        }
    }

    return (
        <div>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header
                pageTitle={title}
                pageName='requests'
            />
            <main>
                <div className={styles.toggleBtnContainer}>
                    <div className={styles.toggleBtn + ' ' + (show === 'pending' && styles.enabled)}>
                        درخواست های فعال
                    </div>
                    <div className={styles.toggleBtn + ' ' + (show === 'paid' && styles.enabled)}>
                        درخواست های در انتظار
                    </div>
                    <div className={styles.toggleBtn + ' ' + (show === 'old' && styles.enabled)}>
                        درخواست های پیشین
                    </div>
                </div>
                <div className="global-container">
                    <div className={styles.title}>لیست درخواست های فعال</div>
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
                    {pending.length ?
                        <Link href={'services/pending'}>
                            <a className={styles.saveBtn}>ثبت نهایی درخواست های فعال</a>
                        </Link>
                        : ''
                    }
                </div>
            </main>
            <BottomNav />
        </div>
    )
}