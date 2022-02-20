import styles from './RadioBtn.module.scss';

export default function RadioBtn(props) {
    const checkLabel = props.checkLabel;
    const name = props.name;
    const radioClick = (event) => {
        event.preventDefault();
        const id = event.currentTarget.id;
        props.onClick ? props.onClick(id) : '';
    }
    const check = (
        <svg className={styles.check} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="21.624" height="19.963" viewBox="0 0 21.624 19.963">
            <defs>
                <filter id="Path_520" x="0" y="0" width="21.624" height="19.963" filterUnits="userSpaceOnUse">
                    <feOffset dy="1" input="SourceAlpha" />
                    <feGaussianBlur stdDeviation="1" result="blur" />
                    <feFlood floodOpacity="0.161" />
                    <feComposite operator="in" in2="blur" />
                    <feComposite in="SourceGraphic" />
                </filter>
            </defs>
            <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_520)">
                <path id="Path_520-2" data-name="Path 520" d="M22.666,7.914a1.248,1.248,0,1,1,1.783,1.748L15.787,21.1a1.249,1.249,0,0,1-1.8.033l-4.4-4.4a1.249,1.249,0,1,1,1.764-1.764l3.486,3.483,7.8-10.5a.393.393,0,0,1,.033-.036Z" transform="translate(-6.18 -5.54)" fill="#117c6f" fillRule="evenodd" />
            </g>
        </svg>
    );
    return (
        <button id={name} onClick={radioClick} className={styles.container}>
            {checkLabel ? <span className={styles.checkLabel}>{checkLabel}</span> : ''}
            <div className={styles.checkContainer}>
                {props.checked ? check : ''}
            </div>
        </button>
    )
}