import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "./Notify.module.scss";

export default function Notify(props) {
    const title = props.title;
    const message = props.message;

    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='global-container'>
                <div className={styles.logo}>
                    <Image
                        src='/images/logo.png'
                        width={1080}
                        height={1330}
                        alt='logo'
                    />
                </div>
                <div className={styles.message}>
                    <div className={styles.summary}>{message.summary}</div>
                    <div className={styles.detail}>{message.detail}</div>
                </div>
            </div>
            <div className='global-container'>
                <Link href={'/services'}>
                    <a className={styles.back}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="27.339" height="27.657" viewBox="0 0 27.339 27.657">
                            <path id="Path_515" data-name="Path 515" d="M-105.9,158.259V145.971a1.172,1.172,0,0,1,.37-.85l10.877-10.345a1.3,1.3,0,0,1,1.744-.03l11.446,10.14a1.171,1.171,0,0,1,.4.881l-.011,12.492a1.231,1.231,0,0,1-1.258,1.2h-5.849a1.231,1.231,0,0,1-1.259-1.2v-7.488a1.231,1.231,0,0,0-1.283-1.2l-5.269.1a1.229,1.229,0,0,0-1.232,1.2v7.387a1.231,1.231,0,0,1-1.259,1.2h-6.161A1.23,1.23,0,0,1-105.9,158.259Z" transform="translate(107.15 -133.053)" fill="none" stroke="#117c6f" strokeMiterlimit="10" strokeWidth="2.5" />
                        </svg>
                        <div>بازگشت به صفحه اصلی</div>
                    </a>
                </Link>
            </div>
        </div>
    )
}