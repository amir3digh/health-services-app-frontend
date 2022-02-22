import styles from './Header.module.scss';
import * as Icons from '../microComponents/icons/Icons.js';
import Menu from '../menu/Menu';
import Cover from '../microComponents/cover/Cover';
import { useState, useEffect } from 'react';
import { userProfileRequest } from '../../lib/requests.js'

export default function Header(props) {

    const [menu, setMenu] = useState({ closed: true });
    const menuHandler = (action) => {
        action === 'close' && setMenu({ closed: true });
        action === 'open' && setMenu({ closed: false });
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
        <header className={styles.container + ' global-container'}>
            <Menu
                closed={menu.closed}
                handler={menuHandler}
                user={user}
            />
            <div className={styles.right}>
                <button onClick={() => menuHandler('open')}>
                    <Icons.Menu />
                </button>
            </div>
            <div className={styles.middle}>
                {props.pageTitle}
            </div>
            <div className={styles.left}>
                <Icons.Logo />
                {props.pageName !== 'requests' ? <Icons.Request /> : ''}
            </div>
        </header>
    )
}