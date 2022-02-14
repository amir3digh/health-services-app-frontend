import { useState } from 'react';
import styles from '../../styles/Popup.module.scss';
import Loading from '../loading/Loading';

export default function Popup(props) {
    const opened = props.opened;
    const serverSync = props.serverSync;
    const setPopup = props.setPopup;

    const submit = e => {
        e.preventDefault();
        setPopup('yes');
    }
    const closeHandler = e => {
        e.preventDefault();
        setPopup('no');
    }
    return (
        opened ?
          <div className={styles.container}>
            <form className={styles.form} onSubmit={submit}>
              <div className={styles.detail}>
                <Loading onload={true} />
              </div>
              <div className={styles.action}>
                <button className={styles.close} onClick={closeHandler} >خیر</button>
                <input className={styles.submit} type='submit' value='بله' />
              </div>
            </form>
          </div>
          :
          ''
      );
}