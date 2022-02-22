import styles from './Menu.module.scss';
import Cover from '../microComponents/cover/Cover';
import Link from 'next/link';
import { Back, Exit, FemaleAvatar, Information, MaleAvatar, Privacy, Rules, Share } from '../microComponents/icons/Icons';

export default function Menu(props) {
    const name = 'امیرحسین صدیق';
    const mobile = '09127338186';
    const handler = props.handler;
    const closed = props.closed;

    const items = [
        {
            id: 1,
            label: 'درباره ما',
            href: '/aboutUs',
            icon: <Information />
        },
        {
            id: 2,
            label: 'قوانین و مقررات',
            href: '/rules',
            icon: <Rules />
        },
        {
            id: 3,
            label: 'حریم شخصی',
            href: '/privacy',
            icon: <Privacy />
        },
        {
            id: 4,
            label: 'معرفی به دوستان',
            href: '',
            icon: <Share />
        },
        {
            id: 5,
            label: 'خروج از حساب کاربری',
            href: '/users/logout',
            icon: <Exit />
        }
    ]
    
    const MenuItems = props => {
        const label = props.label;
        const icon = props.icon;
        const href = props.href;
        return (
            <Link href={href}>
                <a className={styles.item}>
                    {icon}
                    <span>{label}</span>
                </a>
            </Link>
        )
    }

    return (
        <div className={styles.container + ((closed) ? (' ' + styles.closed) : '')}>
            <Cover
                handler={handler}
            />
            <div className={styles.menu}>
                <div className={styles.head}>
                    <div className={styles.detail}>
                        <div className={styles.name}>{name.length > 20 ? name.slice(0, 17) + '...' : name}</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="93" height="3" viewBox="0 0 93 3">
                            <line id="Line_20" data-name="Line 20" x1="90" transform="translate(1.5 1.5)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="3" />
                        </svg>
                        <div className={styles.mobile}>{mobile}</div>
                    </div>
                    <div className={styles.avatar}>
                        <MaleAvatar />
                    </div>
                </div>
                <div className={styles.items}>
                    {items.map(item => {
                        return (
                            <MenuItems
                                key={item.id}
                                label={item.label}
                                href={item.href}
                                icon={item.icon}
                            />
                        )
                    }
                    )}
                </div>
            </div>
        </div>
    )
}