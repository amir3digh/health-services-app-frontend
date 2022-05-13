import styles from './ServicesItems.module.scss';

export default function ServicesContainer(props) {
    const children = props.children;
    return (
        <div className={`${styles.container} global-container`}>
            {children}
        </div>
    )

}