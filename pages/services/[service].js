import Head from "next/head";
import Header from "../../components/header/Header";
import ServicesHead from '../../components/services/servicesHead/ServicesHead';
import ServicesChildren from '../../components/services/servicesItems/ServicesChildren';
import ServicesParent from "../../components/services/servicesItems/ServicesParent";
import { serviceDataRequest, servicesRequest } from "../../lib/requests";
import { useEffect, useState } from 'react';
import ServicesSubmit from "../../components/services/servicesSubmit/ServicesSubmit";
import Prescription from "../../components/prescription/Prescription";

export async function getStaticPaths() {
    const data = await servicesRequest();
    const paths = data.result.map(el => {
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
            />
            {services.map(el =>
                el.children.length
                    ?
                    <ServicesParent
                        key={el.id}
                        title={el.title}
                        child={el.children}
                        update={updateServices}
                    />
                    :
                    <ServicesChildren
                        service={el}
                        key={el.id}
                        update={updateServices}
                    />
            )}
            <ServicesSubmit />
            <Prescription
                opened={popup.state === 'opened'}
                popupHandler={popupHandler}
            />
        </main>
    )
}