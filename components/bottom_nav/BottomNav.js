import Link from 'next/link'
import { Contact, Home, NavRequest, Profile, Request } from '../microComponents/icons/Icons'
import styles from './BottomNav.module.scss'

export default function BottomNav() {
    return (
        <div className={styles.container + ' global-container'}>
            <Link href='/services'>
                <a className={styles.navItems}>
                    <Home />
                    <span>
                        خانه
                    </span>
                </a>
            </Link>

            <Link href={'/requests'}>
                <a className={styles.navItems}>
                    <NavRequest />
                    <span>
                        درخواست ها
                    </span>
                </a>
            </Link>
            <Link href={'/contact'}>
                <a className={styles.navItems}>
                    <Contact />
                    <span>
                        پشتیبانی
                    </span>
                </a>
            </Link>
            <Link href={'/users/profile'}>
                <a className={styles.navItems}>
                    <Profile />
                    <span>
                        پروفایل
                    </span>
                </a>
            </Link>
        </div>
    )
}