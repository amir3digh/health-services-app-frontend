import Image from 'next/image'
// import styles from '../../styles/Services.module.scss'
import Link from 'next/link'
import { servicesRequest } from '../../lib/requests'
import Layout from '../../components/layout/Layout'

import { className, styles } from '../../styles/Services.styles'

export async function getStaticProps() {
    const response = await servicesRequest();
    return response.status === 'ok' ?
        {
            props:
            {
                servicesData: response.result,
                title: 'دکترخونه',
                layout: { header: true, bottomNav: true }
            }
        }
        : 'error';
}

export default function Services({ servicesData }) {
    console.log(styles);
    return (
        <Layout name='services'>
            <section className={`${className} banner`}>
                <div className={`${className} bannerTitle`}>دکتر خونه</div>
                <div className={`${className} bannerImg`}>
                    <Image
                        width={397.72}
                        height={162.25}
                        src='/images/home_page_header.svg'
                        alt='doctor services'
                    />
                </div>
            </section>
            <section className='global-container'>
                {servicesData.map((el) => {
                    const small = (el.icon_size === 'small');
                    const slug = el.slug;
                    return (
                        <Link href={'/services' + '/' + el.slug} key={el.id}>
                            <a className={small ? `${className} servicesItemSmall` : `${className} servicesItemBig`}>
                                <div className={`${className} link`}>
                                    {small ? <div className={`${className} fixTitle`}>خدمات</div> : ''}
                                    <div className={`${className} serviceTitle`}>{el.title}</div>
                                </div>
                                <div className={`${className} serviceIcon`}>
                                    <Image
                                        width={60}
                                        height={60}
                                        src={'/images/services/' + slug + '.svg'}
                                        alt='service icon'
                                    />
                                </div>
                            </a>
                        </Link>
                    )
                }
                )}
            </section>
            {styles}
        </Layout>
    )
}