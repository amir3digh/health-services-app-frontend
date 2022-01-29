import Head from "next/head";
import Header from "../../components/header/Header";
import ServicesHead from '../../components/services/servicesHead/ServicesHead';
import ServicesChildren from '../../components/services/servicesItems/ServicesChildren';
import ServicesParent from "../../components/services/servicesItems/ServicesParent";
import { pendingRequest, serviceDataRequest, servicesRequest } from "../../lib/requests";
import { useEffect, useState } from 'react';
import ServicesSubmit from "../../components/services/servicesSubmit/ServicesSubmit";
import Prescription from "../../components/prescription/Prescription";

export async function getStaticPaths() {
    let data = await servicesRequest();
    data = data.result.filter(el => el.slug !== 'drug')
    const paths = data.map(el => {
        return {
            params: {
                service: el.slug,
            }
        }
    });
    return {
        paths,
        fallback: false
    }
}
export async function getStaticProps({ params }) {
    const slug = params.service;

    let response = await servicesRequest();
    const pageData = response.result.filter(el => el.slug === slug)[0];

    response = await serviceDataRequest(slug);
    const serviceData = response.result;

    return {
        props: {
            slug,
            pageData,
            serviceData
        }
    }
}
export default function Service(props) {
    const title = props.pageData.title;
    const slug = props.pageData.slug;

    const [services, setServices] = useState(props.serviceData);
    const [pendingServices, setPendingServices] = useState([]);

    useEffect(() => {
        const pendingServices = [];
        services.forEach(service => {
            service.children.length ?
                service.children.forEach(el => {
                    el.pending ? pendingServices.push(el) : ''
                }) :
                service.pending ? pendingServices.push(service) : '';
        });
        setPendingServices(pendingServices);
    }, [services]);

    const [prescriptionSynced, setPrescriptionSynced] = useState(true);
    const [prescription, setPrescription] = useState();

    useEffect(() => {
        const updatePending = async () => {
            await Promise.all(
                pendingServices.map(async pendingService => {
                    return await pendingRequest(pendingService.id, prescription, 'put');
                })
            );
            setPrescriptionSynced(true);
            popupHandler('close');
        }
        updatePending();
    }, [prescription, pendingServices]);

    const updateServices = async () => {
        const response = await serviceDataRequest(slug);
        setServices(response.result);
    }
    const [popup, setPopup] = useState({ state: 'closed' });

    const popupHandler = (action) => {
        action === 'close' ?
            setPopup({ state: 'closed' })
            :
            setPopup({ state: 'opened' });
    }


    return (
        <main className="container">
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header
                pageTitle={title}
            />
            <ServicesHead
                pageTitle={title}
                popupHandler={popupHandler}
                prescription={prescription}
                setPrescription={setPrescription}
                prescriptionSynced={prescriptionSynced}
            />
            <Prescription
                opened={popup.state === 'opened'}
                popupHandler={popupHandler}
                setPrescription={setPrescription}
                prescriptionSynced={prescriptionSynced}
                setPrescriptionSynced={setPrescriptionSynced}
            />
            {services.map(el =>
                el.children.length
                    ?
                    <ServicesParent
                        key={el.id}
                        title={el.title}
                        child={el.children}
                        update={updateServices}
                        prescription={prescription}
                    />
                    :
                    <ServicesChildren
                        service={el}
                        key={el.id}
                        update={updateServices}
                        prescription={prescription}
                    />
            )}
            <ServicesSubmit />

        </main>
    )
}