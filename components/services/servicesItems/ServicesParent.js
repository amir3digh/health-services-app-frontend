import { useState } from 'react';
import ServicesChildren from './ServicesChildren';
import styles from './ServicesItems.module.scss';

export default function ServicesParent(props) {
    const title = props.title;
    const services = props.child;
    const prescription = props.prescription;
    const [clicked, setClicked] = useState(false);
    // const [childList, setChildList] = useState();
    const clickHandler = (event) => {
        event.preventDefault();
        setClicked((prev) => {
            return prev ? false : true;
        });
    }
    return (
        <div>
            <div className={styles.container + ' global-container'}>
                <div onClick={clickHandler} className={styles.parentBox + ' ' + (clicked ? styles.parentBoxClicked : '')}>
                    <div className={styles.servicesTitle}>{title}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25.023" height="14.199" viewBox="0 0 25.023 14.199">
                        <path fill="none" stroke={clicked ? "#fff" : "#117c6f"} id="chevron-back" d="M12.938,7.875,23.063,18l-4.219,4.219-5.906,5.906" transform="translate(30.511 -10.552) rotate(90)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.375" />
                    </svg>
                </div>
            </div>
            <div className={styles.servicesChildList + ' ' + (clicked ? styles.opened : styles.closed)}>
                {services.map(el =>
                    <ServicesChildren
                        service={el}
                        key={el.id}
                        update={props.update}
                        prescription={prescription}
                    />
                )}
            </div>
        </div>
    )
}