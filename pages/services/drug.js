import Head from "next/head";
import Header from "../../components/header/Header";
import { serviceDataRequest } from "../../lib/requests";
import ServicesHead from "../../components/services/servicesHead/ServicesHead";
import headStyles from '../../components/services/servicesHead/ServicesHead.module.scss';
import ServicesSubmit from "../../components/services/servicesSubmit/ServicesSubmit";
import ServicesDrug from "../../components/services/servicesItems/ServicesDrug";

export default function Drug() {
    const title = 'دریافت نسخه دارو درب منزل';
    

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
                title={title}
            />
            <ServicesSubmit />
        </main>
    )
}