import styles from './Users.module.scss';
import Image from 'next/image';
import RadioBtn from '../../components/microComponents/radioButton/RadioBtn'
import { useState } from 'react';
import { sendSmsRequest, verifySmsRequest } from '../../lib/auth';
import ReactCodeInput from 'react-verification-code-input';
import { setCookies } from 'cookies-next';
import Router from 'next/router';
import { motion } from 'framer-motion';


export default function Register() {

    const [pageState, setPageState] = useState('inputPhoneNumber');
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState({ value: '', format: false });
    const [rulesChecked, setRulesChecked] = useState(false);

    const phoneNumberChange = (event) => {
        event.preventDefault();
        const reg = new RegExp('09([0-9])-?[0-9]{8}');
        const value = event.target.value;
        setPhoneNumber({ format: reg.test(value), value });
    }

    const deletePhoneNumber = (event) => {
        event.preventDefault();
        setPhoneNumber({ format: false, value: '' });
    }

    const [verifyCode, setVerifyCode] = useState();
    const [verifyToken, setVerifyToken] = useState({});
    const [authAction, setAuthAction] = useState('register');

    const verifyCodeChange = (event) => {
        const value = event.split('');
        setVerifyCode(value);
    }

    const submitUser = async (event) => {
        event.preventDefault();
        if (!phoneNumber.format) {
            setError([{ id: 1, message: 'شماره موبایل وارد شده صحیح نمی باشد.' }]);
            return;
        }
        if (!rulesChecked) {
            setError([{ id: 2, message: 'برای ثبت نام باید قوانین برنامه را بپذیرید.' }]);
            return;
        }
        setError([]);
        setLoading(true);
        let response = await sendSmsRequest(phoneNumber.value, 'register');
        if (response === 'isRegistered') {
            response = await sendSmsRequest(phoneNumber.value, 'login');
            setAuthAction('login');
        }
        setLoading(false);
        if (response === 'unknownError') {
            setError([{ id: 3, message: 'خطای سرور. لطفا دوباره تلاش کنید.' }]);
            return;
        }
        setVerifyToken({
            mobile: phoneNumber.value,
            token_id: response.sms_token.id
        });
        setPageState('verification');
    }

    const submitVerifyCode = async (token) => {
        setLoading(true);
        const smsToken = {
            ...verifyToken,
            token: token
        }
        const response = await verifySmsRequest(smsToken, authAction);
        console.log(response);
        setLoading(false);
        if (response === 'wrongToken') {
            return;
        }
        if (response === 'unknown') {
            return;
        }
        setCookies('jwtToken', response.jwt, { maxAge: 60 * 60 * 24 * 10 });
        Router.push('/services');
    }

    const SubmitButton = (props) => {
        const onClick = props.onClick;
        const label = props.label;

        return (
            <motion.button
                className={styles.submit}
                onClick={onClick}
                type='submit'
                animate={loading && 'loading'}
                initial='loaded'
                variants={{
                    loading: { width: '20%' },
                    loaded: { width: '100%' }
                }}
                transition={{ ease: 'easeInOut' }}
                disabled={loading}
            >
                {loading ?
                    <motion.div>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto' }} width="25px" height="25px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <circle cx="50" cy="50" fill="none" stroke="#ffffff" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
                                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                            </circle>
                        </svg>
                    </motion.div>
                    :
                    <span>{label}</span>
                }
            </motion.button>
        )
    }

    return (
        <div className={styles.container}>
            <div className='global-container'>
                <div className={styles.logo}>
                    <Image
                        src='/images/logo.png'
                        width={1080}
                        height={1330}
                        alt='logo'
                    />
                </div>
                {pageState === 'inputPhoneNumber' &&
                    <div className={styles.registerForm}>
                        <div className={styles.title}>
                            <span>لطفا شماره موبایل خود را وارد نمایید</span>
                            {error.map(el => (
                                <span key={el.id} className={styles.error}>{el.message}</span>
                            ))}
                        </div>
                        <form>
                            <div className={styles.userInput + ((!phoneNumber.format && phoneNumber.value.length) ? (' wrongInput') : '')}>
                                <svg onClick={deletePhoneNumber} xmlns="http://www.w3.org/2000/svg" width="15.556" height="15.556" viewBox="0 0 15.556 15.556">
                                    <path id="plus-round" d="M14.623,9.083H10.917V5.377a.918.918,0,0,0-1.833,0V9.083H5.377a.918.918,0,0,0,0,1.833H9.083v3.707a.918.918,0,0,0,1.833,0V10.917h3.707a.918.918,0,0,0,0-1.833Z" transform="translate(-6.364 7.778) rotate(-45)" fill="#262626" />
                                </svg>
                                <input id='phoneNumber' onChange={phoneNumberChange} type='text' placeholder='09121234567' value={phoneNumber.value} />
                                <svg xmlns="http://www.w3.org/2000/svg" width="17.753" height="28.405" viewBox="0 0 17.753 28.405">
                                    <path id="Path_446" data-name="Path 446" d="M20.952,1.775H10.3A1.775,1.775,0,0,0,8.525,3.551v21.3A1.775,1.775,0,0,0,10.3,26.629H20.952a1.775,1.775,0,0,0,1.775-1.775V3.551A1.775,1.775,0,0,0,20.952,1.775ZM10.3,0A3.551,3.551,0,0,0,6.75,3.551v21.3A3.551,3.551,0,0,0,10.3,28.4H20.952A3.551,3.551,0,0,0,24.5,24.854V3.551A3.551,3.551,0,0,0,20.952,0Z" transform="translate(-6.75)" fill="#6a6a6a" fillRule="evenodd" />
                                    <path id="Path_447" data-name="Path 447" d="M17.525,30.551a1.775,1.775,0,1,0-1.775-1.775A1.775,1.775,0,0,0,17.525,30.551Z" transform="translate(-8.649 -5.697)" fill="#6a6a6a" fillRule="evenodd" />
                                </svg>
                            </div>
                            <SubmitButton
                                label='ارسال کد تایید'
                                onClick={submitUser}
                            />
                            <div className={styles.rules}>
                                <span>قوانین و مقررات برنامه را خوانده و قبول دارم *</span>
                                <RadioBtn
                                    onClick={() => setRulesChecked(prev => prev ? false : true)}
                                    filled={rulesChecked}
                                    big
                                />
                            </div>
                        </form>
                    </div>
                }
                {pageState === 'verification' ?
                    <div className={styles.verifyForm}>
                        <div className={styles.title}>
                            <span>لطفا کد پیامک شده به تلفن همراهتان را وارد نمایید</span>
                            {error.map(el => (
                                <span key={el.id} className={styles.error}>{el.message}</span>
                            ))}
                        </div>
                        <form onSubmit={e => e.preventDefault()}>
                            <div className={styles.userInput + ' ' + styles.verifyCode}>
                                <ReactCodeInput
                                    type='number'
                                    fields={4}
                                    fieldWidth={'25%'}
                                    className={styles.codeInput}
                                    onChange={verifyCodeChange}
                                    values={verifyCode}
                                    onComplete={submitVerifyCode}
                                />
                                <div className={styles.verifyCodeContainer}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="1" viewBox="0 0 43 1">
                                        <line id="Line_4" data-name="Line 4" x2="43" transform="translate(0 0.5)" fill="none" stroke="#707070" strokeWidth="1" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="1" viewBox="0 0 43 1">
                                        <line id="Line_4" data-name="Line 4" x2="43" transform="translate(0 0.5)" fill="none" stroke="#707070" strokeWidth="1" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="1" viewBox="0 0 43 1">
                                        <line id="Line_4" data-name="Line 4" x2="43" transform="translate(0 0.5)" fill="none" stroke="#707070" strokeWidth="1" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="1" viewBox="0 0 43 1">
                                        <line id="Line_4" data-name="Line 4" x2="43" transform="translate(0 0.5)" fill="none" stroke="#707070" strokeWidth="1" />
                                    </svg>
                                </div>
                            </div>
                            <SubmitButton
                                label='اعتبارسنجی'
                                onClick={submitVerifyCode}
                            />
                            <div className={styles.rules}>
                                <button onClick={e => { e.preventDefault(); setPageState('inputPhoneNumber') }}>تغییر شماره تلفن</button>
                                <span>پیامک اعتبار سنجی دریافت نکردید؟ (ارسال مجدد)</span>
                            </div>
                        </form>
                    </div>
                    : ''}
            </div>
        </div>
    )
}