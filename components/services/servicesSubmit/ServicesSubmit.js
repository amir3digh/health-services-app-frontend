import Link from 'next/link';
import styles from './ServicesSubmit.module.scss';


export default function ServicesSubmit() {
    return (
        <div className={styles.container}>
            <Link href='/'>
                <a className={styles.button + ' ' + styles.rightBtn}>ثبت نهایی و پرداخت</a>
            </Link>
            <Link href='/services'>
                <a className={styles.button + ' ' + styles.leftBtn}>ثبت و ادامه فرآیند</a>
            </Link>
        </div>
    )
}