import Link from "next/link"
import styles from './servicesList.module.scss'

export default function ServicesList() {
    const servicesData = [
        {
            id: 1,
            link: '/medical',
            title: 'پزشکی درب منزل',
            size: 'small',
            logo: '/'
        },
        {
            id: 2,
            link: '/nursing',
            title: 'پرستاری درب منزل',
            size: 'small'
        },
        {
            id: 3,
            link: '/physiotherapy',
            title: 'فیزیوتراپی درب منزل',
            size: 'small'
        },
        {
            id: 4,
            link: '/laboratory',
            title: 'آزمایشگاهی درب منزل',
            size: 'small'
        },
        {
            id: 5,
            link: '/drug',
            title: 'دریافت نسخه دارو درب منزل',
            size: 'big'
        },
        {
            id: 6,
            link: '/equipments',
            title: 'تجهیزات پزشکی',
            size: 'big'
        },
    ];
    const output = servicesData.map((el) => {
        return (
            <div className={el.size === 'small' ? styles.servicesItemSmall : styles.servicesItemBig} key={el.id}>
                <Link href={el.link}>
                    <a className={styles.link}>
                        {el.size === 'small' ? <div>خدمات</div> : <></>}
                        <div>{el.title}</div>
                    </a>
                </Link>
            </div>
        )
    }
    );
    console.log(output);
    return (
        <section className={styles.servicesList + ' global-container'}>
            {output}
        </section>
    )
}