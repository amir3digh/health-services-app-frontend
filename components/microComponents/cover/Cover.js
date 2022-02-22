import styles from './Cover.module.scss';

export default function Cover(props) {
    const handler = props.handler;

    return <div onClick={() => handler('close')} className={styles.container}></div>
}