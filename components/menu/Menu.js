import styles from './Menu.module.scss';
import Cover from '../microComponents/cover/Cover';
import {
    Back, Exit, FemaleAvatar, Information,
    MaleAvatar, Privacy, Rules, Share, UnknownAvatar
}
    from '../microComponents/icons/Icons';
import Router from 'next/router';
import { motion } from 'framer-motion';

export default function Menu(props) {
    const handler = props.handler;
    const closed = props.closed;
    const menuControls = props.menuControls;
    const user = props.user;
    const firstName = user && user.first_name;
    const lastName = user && user.last_name;
    const mobile = user ? user.mobile : '';

    const CompleteProfile = () => {
        const clickHandler = (e) => {
            e.preventDefault();
            handler('close');
            Router.push('/users/profile');
        }
        return (
            <button onClick={clickHandler} className={styles.completeProfile}>
                <svg xmlns="http://www.w3.org/2000/svg" width="13.565" height="13.565" viewBox="0 0 13.565 13.565">
                    <path id="icons8-edit" d="M16.07,5.01a2.491,2.491,0,0,0-1.767.729l-7.9,7.9a1.25,1.25,0,0,0-.318.541l-1.059,3.71a.536.536,0,0,0,.662.662L9.394,17.5h0a1.252,1.252,0,0,0,.54-.317l7.9-7.9A2.5,2.5,0,0,0,16.07,5.01Zm0,1.065A1.422,1.422,0,0,1,17.08,6.5h0a1.42,1.42,0,0,1,0,2.02l-.693.693-2.02-2.02.693-.693A1.424,1.424,0,0,1,16.07,6.075Zm-2.46,1.871,2.02,2.02L9.176,16.42a.181.181,0,0,1-.077.045l-2.783.8.8-2.783h0a.175.175,0,0,1,.045-.077Z" transform="translate(-5.001 -5.01)" fill="#fff" />
                </svg>
                <span>تکمیل پروفایل</span>
            </button>
        )
    }
    const name = (firstName && lastName) ? (firstName + ' ' + lastName) : <CompleteProfile />;
    const gender = user && user.gender;

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
            href: '/',
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

        const clickHandler = e => {
            e.preventDefault();
            handler('close');
            Router.push(href);
        }
        return (
            <button onClick={clickHandler} className={styles.item}>
                {icon}
                <span>{label}</span>
            </button>
        )
    }
    return (
        <div className={styles.container}
            style={{ display: closed ? 'none' : 'flex' }}
        >
            <Cover
                handler={handler}
                menuControls={menuControls}
                closed={closed}
            />
            <motion.div
                className={styles.menu}
                initial='hidden'
                animate={menuControls}
                variants={{
                    visible: { x: 0 },
                    hidden: { x: "100%" }
                }}
                transition={{ type: 'linear' }}
            >
                <div className={styles.head}>
                    <div className={styles.detail}>
                        <div className={styles.name}>{name.length > 20 ? name.slice(0, 17) + '...' : name}</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="93" height="3" viewBox="0 0 93 3">
                            <line id="Line_20" data-name="Line 20" x1="90" transform="translate(1.5 1.5)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="3" />
                        </svg>
                        <div className={styles.mobile}>{mobile}</div>
                    </div>
                    <div className={styles.avatar}>
                        {gender ? gender === 'male' ? <MaleAvatar /> : <FemaleAvatar /> : <UnknownAvatar />}
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
            </motion.div>
        </div>
    )
}