import Head from "next/head";
import Header from "../../components/header/Header";
import { pendingRequest, serviceDataRequest } from "../../lib/requests";
import headStyles from '../../components/services/servicesHead/ServicesHead.module.scss';
import ServicesSubmit from "../../components/services/servicesSubmit/ServicesSubmit";
import ServicesDrug from "../../components/services/servicesItems/ServicesDrug";
import { useEffect, useState } from "react";
import Prescription from "../../components/services/drugPopup/Prescription";
import Product from "../../components/services/drugPopup/Product";
import Layout from "../../components/layout/Layout";

export function getStaticProps() {
    return { props: { title: 'دریافت نسخه دارو', layout: { header: true, bottomNav: false } } }
}

export default function Drug() {
    const title = 'دریافت نسخه دارو درب منزل';

    useEffect(() => {
        updatePending();
    }, []);

    const [pending, setPending] = useState([]);
    const updatePending = async () => {
        const response = await serviceDataRequest('drug');
        if (response.status = 'ok') {
            const prescriptionData = response.result[0];
            const productData = response.result[1];

            const pending = [prescriptionData, productData];
            setPending(pending);
        }
    }

    const [popup, setPopup] = useState('closed');

    const [prescription, setPrescription] = useState();
    const [serverSync, setServerSync] = useState(true);
    useEffect(() => {
        const prescriptionRequest = async (action) => {
            if (prescription) {
                const serviceId = 54;
                const response = await pendingRequest(serviceId, prescription, action);
                console.log(response);
                if (response.status === 'ok') {
                    await updatePending();
                    setServerSync(true);
                    setPopup('closed');
                }
                setPrescription();
            }
        }
        prescriptionRequest('post');
    }, [prescription]);

    const deletePending = async (serviceId, pendingServiceId) => {
        const response = await pendingRequest(serviceId + '/' + pendingServiceId, null, 'delete');
        if (response.status === 'ok') {
            await updatePending();
        }
    }

    const prescriptionClick = e => {
        e.preventDefault();
        setPopup('prescription');
    }
    const prescriptionPopupHandler = (action) => {
        action === 'close' ? setPopup('closed') : setPopup('prescription')
    }

    const [product, setProduct] = useState();
    useEffect(() => {
        const productRequest = async (action) => {
            if (product) {
                const response = await pendingRequest(55, product, action);
                if (response.status === 'ok') {
                    await updatePending();
                    setServerSync(true);
                    setPopup('closed');
                }
                setProduct();
            }
        }
        productRequest('post');
    }, [product]);

    const productClick = e => {
        e.preventDefault();
        setPopup('product');
    }
    const productPopupHandler = (action) => {
        action === 'close' ? setPopup('closed') : setPopup('product')
    }

    return (
        <Layout name='drug'>
            <div className={headStyles.container}>
                <div className={headStyles.detailsContainer + ' global-container'}>
                    <div className={headStyles.title}>{title}</div>
                    <div className={headStyles.description}>از لیست زیر خدمات مورد نظر را انتخاب کنید</div>
                </div>
            </div>
            <ServicesDrug
                type='prescription'
                title='دیافت دارو با نسخه'
                addTitle='آپلود نسخه جدید'
                onClick={prescriptionClick}
                pending={pending}
                deletePending={deletePending}
            />
            <ServicesDrug
                type='product'
                title={
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span>دریافت دارو بدون نسخه</span>
                        <span style={{ fontSize: 12 }}>و محصولات داروخانه ای</span>
                    </div>
                }
                addTitle='افزودن محصول'
                onClick={productClick}
                pending={pending}
                deletePending={deletePending}
            />
            <Prescription
                opened={popup === 'prescription'}
                popupHandler={prescriptionPopupHandler}
                setPrescription={setPrescription}
                serverSync={serverSync}
                setServerSync={setServerSync}
            />
            <Product
                opened={popup === 'product'}
                popupHandler={productPopupHandler}
                setProduct={setProduct}
                serverSync={serverSync}
                setServerSync={setServerSync}
            />
            <ServicesSubmit />
        </Layout>
    )
}