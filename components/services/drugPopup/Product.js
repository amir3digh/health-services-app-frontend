import styles from './DrugPopup.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import Loading from '../../loading/Loading';
import { imageUploadRequest } from '../../../lib/requests';

export default function Product(props) {
    const opened = props.opened;
    const serverSync = props.serverSync;
    const setServerSync = props.setServerSync;
    const setProduct = props.setProduct;

    const [productImg, setproductImg] = useState({ file: '/images/prescription_logo.png' });
    const handleImageChange = (event) => {
        let files = event.target.files;
        if (!files) { return }
        const fileName = event.target.files[0].name;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            setproductImg({ file: e.target.result, name: fileName });
        }
    }

    const [title, setTitle] = useState();
    const handleTitleChange = (event) => {
        const value = event.target.value;
        setTitle(value);
    }

    const [count, setCount] = useState();
    const handleCountChange = (event) => {
        const value = event.target.value;
        setCount(value);
    }

    const [dose, setDose] = useState();
    const handleDoseChange = (event) => {
        const value = event.target.value;
        setDose(value);
    }
    const [description, setDescription] = useState();
    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value);
    }

    const submit = async (event) => {
        event.preventDefault();
        setServerSync(false);

        let product = {};
        // const uploadResponse = imageUploadRequest(productImg);

        product = {
            count: count,
            dose: dose,
            title: title,
            description: description,
            // product_img: await uploadResponse.then(res => { return res.result.file.id })
        }
        setProduct(product);
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
                        <div className={styles.productTop}>
                            <div className={styles.title}>سفارش محصول بهداشتی یا دارو بدون نسخه</div>
                            <div className={styles.description}>نام و مشخصات محصول/ محصولات مورد نظر را وارد کنید</div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="270.506" height="3.506" viewBox="0 0 270.506 3.506">
                                <line id="Line_28" data-name="Line 28" x1="267.5" y2="0.5" transform="translate(1.503 1.503)" fill="none" stroke="#e2e2e2" strokeLinecap="round" strokeWidth="3" />
                            </svg>
                        </div>
                        <div className={styles.product}>
                            <div className={styles.firstRow}>
                                <label className={styles.fieldContainer}>
                                    <span className={styles.labelText}>* نام محصول مورد نظر</span>
                                    <input
                                        className={styles.idInput}
                                        type='text'
                                        onChange={handleTitleChange}
                                        value={title}
                                    />
                                </label>
                                <div className={styles.image}>
                                    <label className={styles.fileContainer}>
                                        <div className={styles.button}>
                                            <Image
                                                width={42}
                                                height={42}
                                                src={productImg.file}
                                                alt='add image logo'
                                            />
                                        </div>
                                        <input
                                            type='file'
                                            className={styles.fileInput}
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className={styles.secondRow}>
                                <label className={styles.fieldContainer}>
                                    <span className={styles.labelText}>* تعداد</span>
                                    <input
                                        className={styles.idInput}
                                        type='text'
                                        onChange={handleCountChange}
                                        value={count}
                                    />
                                </label>
                                <label className={styles.fieldContainer}>
                                    <span className={styles.labelText}>دوز</span>
                                    <input
                                        className={styles.idInput}
                                        type='text'
                                        onChange={handleDoseChange}
                                        value={dose}
                                    />
                                </label>
                            </div>
                            <div className={styles.thirdRow}>
                                <label className={styles.fieldContainer}>
                                    <span className={styles.labelText}>توضیحات تکمیلی</span>
                                    <textarea
                                        className={styles.idInput}
                                        onChange={handleDescriptionChange}
                                        value={description}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className={styles.productBottom}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="136" height="3" viewBox="0 0 136 3">
                                <line id="Line_27" data-name="Line 27" x1="133" transform="translate(1.5 1.5)" fill="none" stroke="#e2e2e2" strokeLinecap="round" strokeWidth="3" />
                            </svg>
                            <span>هزینه تهیه نسخه: {123} تومان</span>
                            <span>مبلغ نسخه پس از بررسی اعلام خواهد شد</span>
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