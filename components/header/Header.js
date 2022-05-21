import styles from './Header.module.scss';
import Image from 'next/image';
import Link from 'next/link'
import Menu from '../menu/Menu';
import { useState, useEffect } from 'react';
import { userProfileRequest } from '../../lib/requests.js'
import { useAnimation } from 'framer-motion';
import { CallBtnHeader, Logo, MenuIcon, NavRequest, Request } from '../microComponents/icons/Icons.js';

export default function Header(props) {

    const [menu, setMenu] = useState({ closed: true });
    const menuControls = useAnimation();

    const menuHandler = async (action) => {
        const animationState = ((action === 'close') && ('hidden')) || ((action === 'open') && ('visible'));
        action === 'open' && setMenu({ closed: false });
        await menuControls.start(animationState);
        action === 'close' && setMenu({ closed: true });
    }

    const [user, setUser] = useState();
    useEffect(() => {
        const getUser = async () => {
            const response = await userProfileRequest();
            if (response.status === 'ok') {
                setUser(response.result.user);
            }
        }
        getUser();
    }, []);

    return (
        <>
            <div className={`${styles.topbar} global-container`}>
                <Link href='/'>
                    <a className={styles.logoContainer}>
                        <Image
                            width={70}
                            height={90}
                            src='/images/logo.png'
                            alt='doctorkhooneh logo'
                        />
                    </a>
                </Link>

                <Link href='tel:09121234567'>
                    <a className={`${styles.topbarCall}`}>
                        <div className={`${styles.topbarCallBox} item-box`}>
                            <Link href='tel:09121234567'>
                                <a>تماس با ما</a>
                            </Link>
                        </div>
                        <div className={styles.topbarCallIcon}>
                            <CallBtnHeader />
                            <svg className={styles.callBtnCircle} xmlns="http://www.w3.org/2000/svg" width="64" height="65" viewBox="0 0 64 65">
                                <ellipse id="Ellipse_141" data-name="Ellipse 141" cx="30.5" cy="31" rx="30.5" ry="31" transform="translate(1.5 1.5)" fill="none" stroke="#107a6d" strokeWidth="3" />
                            </svg>
                        </div>
                    </a>
                </Link>
            </div>
            <header className={`${styles.desktopHeader} global-container`}>
                <div className={styles.right}>
                    <button onClick={() => menuHandler('open')}>
                        <MenuIcon />
                    </button>
                    <Link href=''>
                        <a>
                            خانه
                        </a>
                    </Link>
                    <Link href=''>
                        <a>
                            خدمات پزشکی
                        </a>
                    </Link>
                    <Link href=''>
                        <a>
                            درباره ما
                        </a>
                    </Link>
                </div>
                <div className={styles.left}>
                    <Link href=''>
                        <a>
                            <NavRequest />
                            <span>
                                درخواست ها
                            </span>
                        </a>
                    </Link>
                    <Link href=''>
                        <a>
                            ورود / ثبت نام
                        </a>
                    </Link>
                </div>
            </header>
            <header className={styles.mobileHeader + ' global-container'}>
                <div className={styles.right}>
                    <button onClick={() => menuHandler('open')}>
                        <MenuIcon />
                    </button>
                </div>
                <div className={styles.middle}>
                    {props.pageTitle}
                </div>
                <div className={styles.left}>
                    <Logo />
                    {props.pageName !== 'requests' ? <Request /> : ''}
                </div>
            </header>
            <Menu
                closed={menu.closed}
                handler={menuHandler}
                user={user}
                menuControls={menuControls}
            />
        </>
    )
}