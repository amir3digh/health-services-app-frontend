import styles from './Header.module.scss'
import * as Icons from '../microComponents/icons/Icons.js'

export default function Header(props) {
    return (
        <header className={styles.container + ' global-container'}>
            <div className={styles.right}>
                <Icons.Menu />
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