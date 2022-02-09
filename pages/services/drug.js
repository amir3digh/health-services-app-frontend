import Head from "next/head";
import Header from "../../components/header/Header";
import { pendingRequest, serviceDataRequest } from "../../lib/requests";
import ServicesHead from "../../components/services/servicesHead/ServicesHead";
import headStyles from '../../components/services/servicesHead/ServicesHead.module.scss';
import ServicesSubmit from "../../components/services/servicesSubmit/ServicesSubmit";
import ServicesDrug from "../../components/services/servicesItems/ServicesDrug";
import Prescription from "../../components/drugPopup/Prescription";
import { useEffect, useState } from "react";
import Product from "../../components/drugPopup/Product";

export default function Drug() {
    const title = 'دریافت نسخه دارو درب منزل';

    useEffect(() => {
        updatePending();
    }, []);

    const [pending, setPending] = useState([]);
    const updatePending = async () => {
        const response = await serviceDataRequest('drug');
        if (response.status = 'ok') {
            const prescriptionData = response.result[0].children;
            const productData = response.result[1];

            const imagePres = prescriptionData[0];
            const imagePending = imagePres;

            const electronicPres = prescriptionData[1].children;
            const taminPres = electronicPres[0];
            const salamatPres = electronicPres[1];

            const pending = [imagePending, taminPres, salamatPres, productData];
            setPending(pending);
        }
    }

    const [popup, setPopup] = useState('closed');

    const [prescription, setPrescription] = useState();
    const [serverSync, setServerSync] = useState(true);
    useEffect(() => {
        const prescriptionRequest = async (action) => {
            if (prescription) {
                let serviceId;
                (prescription.type === 'image') && (serviceId = 55);
                (prescription.type === 'tamin') && (serviceId = 57);
                (prescription.type === 'salamat') && (serviceId = 58);

                const response = await pendingRequest(serviceId, prescription, action);
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

    const [product, setProduct] = useState({});
    useEffect(() => {
        const productRequest = async (action) => {
            if(product) {
                const response = await pendingRequest(59, product, action);
                if(response.status === 'ok'){
                    await updatePending();
                    setServerSync(true);
                    setPopup('closed');
                }
                setProduct();
            }
        }
        productRequest('post');
    }, [product])

    const productClick = e => {
        e.preventDefault();
        setPopup('product');
    }
    const productPopupHandler = (action) => {
        action === 'close' ? setPopup('closed') : setPopup('product')
    }

    return (
        <main>
            <Head>
                <title>{title}</title>
            </Head>
            <Header
                pageTitle={title}
            />
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
        </main>
    )
}