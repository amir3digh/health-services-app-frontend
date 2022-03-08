import Head from 'next/head'
import Router from 'next/router'
import Link from 'next/link';
import { getCookies } from 'cookies-next';
import Image from 'next/image';
import styles from './users/introduction/Introduction.module.scss'
export function getStaticProps() {
  return { props: { title: 'دکترخونه', layout: { header: false, bottomNav: false } } }
}
export default function Home() {
  const token = getCookies('jwtToken');
  if (token.jwtToken) {
    Router.push('/services');
  }
  const title = 'دکترخونه';

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.top + ' global-container'}>
          <div>
            <Image
              width={96}
              height={122}
              src='/images/logo.png'
              alt='doctorkhooneh logo'
            />
          </div>
          <div className={styles.title}>درخواست آسان خدمات پزشکی در منزل</div>
        </div>
        <div className={styles.middle + ' global-container'}>
          <div className={styles.mainImage}>
            <Image
              width={714}
              height={590}
              src='/images/introduction_1.svg'
              alt='introduction image'
            />
          </div>
        </div>
        <div className={styles.bottom + ' global-container'}>
          <div className={styles.withLogin}>
            <Link href='/users/'>
              <a>
                ثبت نام و ورود به اپلیکیشن
              </a>
            </Link>
          </div>
          <div className={styles.withoutLogin}>
            <Link href='/services/'>
              <a>
                ورود بدون ثبت نام
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
