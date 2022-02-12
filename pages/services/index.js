import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Services.module.scss'
import Header from '../../components/header/Header'
import BottomNav from '../../components/bottom_nav/BottomNav'
import Link from 'next/link'
import { getCookies } from 'cookies-next'

export async function getServerSideProps() {
    const response = await fetch('http://37.152.179.2/api/services/');
    const data = await response.json();
    return data.status === 'ok' ? { props: { servicesData: data.result } } : 'error';
}

export default function Services({ servicesData }) {
    const title = 'دکترخونه';
    return (
        <div className='container'>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header
                pageTitle={title}
            />
            <main className={styles.main}>
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
            </main>
            <BottomNav />
        </div >
    )
}