import styles from './DrugPopup.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import Loading from '../../loading/Loading';
import RadioBtn from '../../microComponents/radioButton/RadioBtn';
import { imageUploadRequest } from '../../../lib/requests';

export default function Prescription(props) {
  const opened = props.opened;
  const serverSync = props.serverSync;
  const setServerSync = props.setServerSync;

  const [type, setType] = useState('image');
  const typeChange = (targetName) => {
    setType(targetName);
  }

  const [insurance, setInsurance] = useState('tamin');
  const insuranceChange = (targetName) => {
    setInsurance(targetName);
  };

  const [prescriptionImg, setPrescriptionImg] = useState({ file: '/images/prescription_logo.png' });
  const handleImageChange = (event) => {
    let files = event.target.files;
    if (!files) { return }
    const fileName = event.target.files[0].name;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      setPrescriptionImg({ file: e.target.result, name: fileName });
    }
  }

  const [nationalCode, setNationalCode] = useState('0123456789');
  const handleNationalCodeChange = (event) => {
    const value = event.target.value;
    setNationalCode(value);
  }

  const [refCode, setRefCode] = useState('0123456789');
  const handleRefCodeChange = (event) => {
    const value = event.target.value;
    setRefCode(value);
  }

  const submit = async (event) => {
    event.preventDefault();
    setServerSync(false);

    let prescription = {};
    if (type === 'image') {
      const uploadResponse = imageUploadRequest(prescriptionImg);
      prescription = {
        prescription_image: await uploadResponse.then(res => { return res.result.file.id }),
        prescription_type: 1
      };
    }
    if (type === 'electronic') {
      prescription = {
        prescription_type: insurance === 'tamin' ? 2 : 3,
        national_code: nationalCode,
        ref_code: refCode
      }
    }
    console.log(prescription);
    props.setPrescription(prescription);
  }

  const closeHandler = (event) => {
    event.preventDefault();
    props.popupHandler('close');
  }
  return (
    opened ?
      <div className={styles.container}>
        <form className={styles.form} onSubmit={submit}>
          <div className={styles.detail}>
            <Loading onload={!serverSync} />
            <div className={styles.cover}></div>
            <div className={styles.image}>
              <div className={styles.choice}>
                <RadioBtn
                  name='image'
                  checked={type === 'image'}
                  onClick={typeChange}
                />
                <span className={styles.title}>آپلود نسخه پزشک</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="137" height="3" viewBox="0 0 136 3">
                <line x1="134" transform="translate(1.5 1.5)" fill="none" stroke="#e2e2e2" strokeLinecap="round" strokeWidth="3" />
              </svg>
              <span className={styles.description} disabled={type !== 'image'}>نسخه پزشک خود را جهت بررسی و ثبت درخواست آپلود نمایید:</span>
              <div disabled={type !== 'image'}>
                <label className={styles.fileContainer}>
                  <div className={styles.button}>
                    <Image
                      width={42}
                      height={42}
                      src={prescriptionImg.file}
                      alt='add image logo'
                    />
                  </div>
                  <input type='file' className={styles.fileInput} onChange={handleImageChange} />
                </label>
              </div>
            </div>
            <div className={styles.electronic}>
              <div className={styles.choice}>
                <RadioBtn
                  name='electronic'
                  checked={type === 'electronic'}
                  onClick={typeChange}
                />
                <span className={styles.title}>نسخه الکترونیک</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="137" height="3" viewBox="0 0 136 3">
                <line x1="134" transform="translate(1.5 1.5)" fill="none" stroke="#e2e2e2" strokeLinecap="round" strokeWidth="3" />
              </svg>
              <span className={styles.description} disabled={type !== 'electronic'}>لطفا نوع بیمه خود را جهت بررسی و ثبت درخواست وارد نمایید:</span>
              <div className={styles.insurance} disabled={type !== 'electronic'}>
                <div className={styles.choice}>
                  <RadioBtn
                    name='tamin'
                    checked={insurance === 'tamin'}
                    onClick={insuranceChange}
                  />
                  <span className={styles.title}>بیمه تامین اجتماعی</span>
                </div>
                <div className={styles.choice}>
                  <RadioBtn
                    name='salamat'
                    checked={insurance === 'salamat'}
                    onClick={insuranceChange}
                  />
                  <span className={styles.title}>بیمه سلامت</span>
                </div>
              </div>
              <div className={styles.data} disabled={type !== 'electronic'}>
                <label>
                  <span className={styles.labelText}>کدملی</span>
                  <input className={styles.idInput} type='text' onChange={handleNationalCodeChange} value={nationalCode} />
                </label>
                <label>
                  <span className={styles.labelText}>کد رهگیری</span>
                  <input className={styles.idInput} type='text' onChange={handleRefCodeChange} value={refCode} />
                </label>
              </div>
            </div>
          </div>
          <div className={styles.action}>
            <input className={styles.submit} type='submit' value='ثبت' />
            <button className={styles.close} onClick={closeHandler} >لغو</button>
          </div>
        </form>
      </div>
      :
      ''
  );
}