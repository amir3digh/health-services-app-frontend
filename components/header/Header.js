import styles from './Header.module.scss'
import * as Icons from '../icons/Icons.js'

export function Header(props) {
    return (
        <header className={styles.container + ' global-container'}>
            <div className={styles.right}>
                <Icons.Menu />
            </div>
            <div className={styles.middle}>
                درباره ما
            </div>
            <div className={styles.left}>
                <Icons.Logo />
                <Icons.Request />
            </div>
        </header>
    )
}