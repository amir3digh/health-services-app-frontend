import styles from '../../styles/Popup.module.scss';
import Cover from '../microComponents/cover/Cover';
import { motion } from 'framer-motion';

export default function Popup(props) {
  const opened = props.opened;
  const popupControls = props.popupControls;
  const handler = props.handler;
  const action = props.popupAction;
  const deleteData = props.deleteData;
  const message = props.message;

  const submit = (e) => {
    e.preventDefault();
    action(deleteData);
    handler('close');
  }
  const closeHandler = e => {
    e.preventDefault();
    handler('close');
  }
  return (
    <div className={styles.container} style={{ display: opened ? 'flex' : 'none' }}>
      <Cover
        handler={handler}
        menuControls={popupControls}
      />
      <motion.form
        initial='hidden'
        animate={popupControls}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 }
        }}
        transition={{ type: 'linear' }}
        className={styles.form}
        onSubmit={submit}
      >
        <div className={styles.detail}>{message}</div>
        {action && <div className={styles.action}>
          <button className={styles.close} onClick={closeHandler} >خیر</button>
          <input className={styles.submit} type='submit' value='بله' />
        </div>}
      </motion.form>
    </div>
  );
}