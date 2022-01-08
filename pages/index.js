import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { Header } from '../components/header/Header.js'
import BottomNav from '../components/bottom_nav/BottomNav'
import Link from 'next/link'
import ServicesList from '../components/servicesList'

export default function Home() {
  return (
    <div className='container'>
      <Head>
        <title>صفحه اول</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Header />
      <main>
        <section className={styles.banner}>
          <div className={styles.bannerTitle}>دکتر خونه</div>
          <div className={styles.bannerImg}>
            <Image
              width={397.72}
              height={162.25}
              src='/images/home_page_header.png'
              alt='doctor services'
            />
          </div>
        </section>
        <ServicesList />
      </main>
      <BottomNav />
    </div>
  )
}
