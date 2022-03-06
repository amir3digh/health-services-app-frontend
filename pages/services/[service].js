import Head from "next/head";
import Header from "../../components/header/Header";
import ServicesHead from '../../components/services/servicesHead/ServicesHead';
import ServicesChildren from '../../components/services/servicesItems/ServicesChildren';
import ServicesParent from "../../components/services/servicesItems/ServicesParent";
import { pendingRequest, serviceDataRequest, servicesRequest } from "../../lib/requests";
import { useEffect, useState } from 'react';
import ServicesSubmit from "../../components/services/servicesSubmit/ServicesSubmit";
import Prescription from "../../components/services/drugPopup/Prescription";
import Layout from "../../components/layout/Layout";

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

    return {
        props: {
            slug,
            pageData,
            layout: { header: true, bottomNav: false },
            title: pageData.title
        }
    }
}
export default function Service(props) {
    const title = props.pageData.title;
    const slug = props.pageData.slug;

    const [services, setServices] = useState([]);
    const [pagePrescription, setPagePrescription] = useState(null);

    const [serverSync, setServerSync] = useState(true);
    const [prescription, setPrescription] = useState();

    useEffect(() => {
        const updatePending = async () => {
            const serviceResponse = await serviceDataRequest(slug);
            const services = serviceResponse.status === 'ok' ? serviceResponse.result : [];
            const pendingServices = getPending(services);
            pendingServices[0] && setPagePrescription(pendingServices[0]);
            setServices(services);
            if (prescription) {
                const data = prescription === 'delete' ? null : prescription;
                if (!!pendingServices.length) {
                    const response = await Promise.all(
                        pendingServices.map(async pendingService => {
                            return await pendingRequest(pendingService.id, data, 'put');
                        }));
                }
                setPagePrescription(data);
                setPrescription(null);
            }
            setServerSync(true);
            popupHandler('close');
        }
        updatePending();
    }, [prescription, slug]);

    const getPending = servicesArray => {
        const pendingServices = [];
        servicesArray.forEach(service => {
            service.children.length ? service.children.forEach(el => {
                el.pending && (pendingServices.push(el))
            }) :
                service.pending && (pendingServices.push(service));
        });
        return pendingServices;
    }
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
        <Layout name='service'>
            <ServicesHead
                pageTitle={title}
                popupHandler={popupHandler}
                prescriptionType={pagePrescription && pagePrescription.prescription_type}
                setPrescription={setPrescription}
                setServerSync={setServerSync}
            />
            <Prescription
                opened={popup.state === 'opened'}
                popupHandler={popupHandler}
                setPrescription={setPrescription}
                serverSync={serverSync}
                setServerSync={setServerSync}
            />
            {services.map(el =>
                el.children.length
                    ?
                    <ServicesParent
                        key={el.id}
                        title={el.title}
                        child={el.children}
                        update={updateServices}
                        prescription={pagePrescription}
                    />
                    :
                    <ServicesChildren
                        service={el}
                        key={el.id}
                        update={updateServices}
                        prescription={pagePrescription}
                    />
            )}
            <ServicesSubmit />
        </Layout>
    )
}