import PendingItem from '../../components/requests/PendingItem';
import { useEffect, useState } from 'react';
import { paidServicesRequest, pendingRequest } from '../../lib/requests';
import styles from './RequestsPage.module.scss';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import Popup from '../../components/popup/Popup';
import { useAnimation } from 'framer-motion';

export function getStaticProps() {
    return { props: { title: 'درخواست ها', layout: { header: true, bottomNav: true } } }
}

export default function RequestPage() {
    const [show, setShow] = useState('pending');

    useEffect(() => {
        updatePending();
        updatePaid();
    }, []);
    const [pending, setPending] = useState([]);
    const updatePending = async () => {
        const response = await pendingRequest('', null, 'get');
        if (response.status === 'ok') {
            const result = response.result;
            setPending(result);
        }
    }
    const [paid, setPaid] = useState([]);
    const updatePaid = async () => {
        const response = await paidServicesRequest();
        if (response.status === 'ok') {
            const result = response.result;
            setPaid(result);
        }
    }
    const popupControls = useAnimation();
    const [popup, setPopup] = useState({ opened: false });
    const [deleteData, setDeleteData] = useState({});

    const deleteHandler = (serviceId, pendingServiceId) => {
        setDeleteData({ serviceId, pendingServiceId });
        popupHandler('open');
    }
    const popupHandler = async (action) => {
        const animationState = ((action === 'close') && ('hidden')) || ((action === 'open') && ('visible'));
        console.log(animationState);
        action === 'open' && setPopup({ opened: true });
        await popupControls.start(animationState);
        action === 'close' && setPopup({ opened: false });
    }
    const deletePending = async ({ serviceId, pendingServiceId }) => {
        const response = await pendingRequest(serviceId + '/' + pendingServiceId, null, 'delete');
        if (response.status === 'ok') {
            await updatePending();
        }
    }

    return (
        <Layout name='requests'>
            <div className={styles.toggleBtnContainer}>
                <button onClick={() => setShow('pending')} className={styles.toggleBtn + ' ' + (show === 'pending' && styles.enabled)}>
                    درخواست های فعال
                </button>
                <button onClick={() => setShow('paid')} className={styles.toggleBtn + ' ' + (show === 'paid' && styles.enabled)}>
                    درخواست های پیشین
                </button>
            </div>
            <div className="global-container">
                <div className={styles.title}>لیست درخواست های {show === 'pending' ? 'فعال' : 'پیشین'}</div>
                {show === 'pending' && pending.map(el => (
                    <PendingItem
                        key={el.pending_service_id}
                        title={el.title}
                        serviceId={el.service_id}
                        pendingServiceId={el.pending_service_id}
                        price={el.price}
                        deletePending={deleteHandler}
                    />
                ))}
                {(show === 'pending' && pending.length) ?
                    <Link href={'services/pending'}>
                        <a className={styles.saveBtn}>ثبت نهایی درخواست های فعال</a>
                    </Link>
                    : ''
                }
                {show === 'paid' && paid.map(el => (
                    <PendingItem
                        key={el.paid_service_id}
                        title={el.title}
                        serviceId={el.service_id}
                        price={el.price}
                    />
                ))}
            </div>
            <Popup
                opened={popup.opened}
                popupControls={popupControls}
                handler={popupHandler}
                popupAction={deletePending}
                deleteData={deleteData}
                message='آیا از حذف درخواست خود اطمینان دارید؟'
            />
        </Layout>
    )
}