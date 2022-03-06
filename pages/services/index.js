import Image from 'next/image'
import styles from '../../styles/Services.module.scss'
import Link from 'next/link'
import { servicesRequest } from '../../lib/requests'
import Layout from '../../components/layout/Layout'

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
    return (
        <Layout name='services'>
            <section className={styles.banner}>
                <div className={styles.bannerTitle}>دکتر خونه</div>
                <div className={styles.bannerImg}>
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
                            <a className={small ? styles.servicesItemSmall : styles.servicesItemBig}>
                                <div className={styles.link}>
                                    {small ? <div className={styles.fixTitle}>خدمات</div> : ''}
                                    <div className={styles.serviceTitle}>{el.title}</div>
                                </div>
                                <div className={styles.serviceIcon}>
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
        </Layout>
    )
}