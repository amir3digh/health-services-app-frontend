import Link from 'next/link';
import styles from './ContactItems.module.scss';

export default function ContactItems(props) {
    const label = props.label;
    const icon = props.icon;
    const sub = props.sub;
    const href = props.href;

    return (
        <Link href={href}>
            <a className={styles.container}>
                {icon}
                <div className={styles.label}>
                    <span>{label}</span>
                    <span className={styles.sub}>{sub}</span>
                </div>
            </a>
        </Link>

    )
}