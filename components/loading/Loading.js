import styles from './Loading.module.scss';

export default function Loading(props){
    const onload = props.onload;

    return (
        onload ?
        <div className={styles.container}>
            <div className={styles.loadingAnimation}>
                <div className={styles.outerCircle}>
                    <div className={styles.innerCircle}>
                        
                    </div>
                </div>
            </div>
        </div>
        :
        ''
    )
}