import styles from './Header.module.scss';
import * as Icons from '../microComponents/icons/Icons.js';
import Menu from '../menu/Menu';
import Cover from '../microComponents/cover/Cover';
import { useState } from 'react';

export default function Header(props) {

    const [menu, setMenu] = useState({ closed: false });
    const menuHandler = (action) => {
        action === 'close' && setMenu({ closed: true });
        action === 'open' && setMenu({ closed: false });
    }

    return (
        <header className={styles.container + ' global-container'}>
            <Menu
                closed={menu.closed}
                handler={menuHandler}
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