import Head from "next/head";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Header from "../../../components/header/Header";
import styles from './Pending.module.scss';
import { pendingRequest } from '../../../lib/requests';
import PendingItem from "../../../components/requests/PendingItem";
import Router from "next/router";
import Popup from "../../../components/popup/Popup";
import InputField from "../../../components/microComponents/inputField/InputField";

export default function Pending() {
    const title = 'ثبت نهایی درخواست';

    const [pageState, setPageState] = useState('location');

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [nationalCode, setNationalCode] = useState();
    const [mobile, setMobile] = useState();
    const [address, setAddress] = useState();
    const [location, setLocation] = useState(null);
    const [gender, setGender] = useState('male');
    const [description, setDescription] = useState();

    const toggleGender = e => {
        e.preventDefault();
        gender === 'male' && setGender('female');
        gender === 'female' && setGender('male');
    }

    const [pending, setPending] = useState([]);
    const [priceSum, setPriceSum] = useState(0);
    useEffect(() => {
        updatePending();
    }, []);

    const updatePending = async () => {
        const response = await pendingRequest('', null, 'get');
        if (response.status === 'ok') {
            const result = response.result;
            let sum = 0;
            result.forEach(el => {
                const price = el.price;
                sum += price;
            });
            setPending(result);
            setPriceSum(sum);
        }
    }

    const [popup, setPopup] = useState('closed');
    const [itemToDelete, setItemToDelete] = useState()

    const deletePending = async (serviceId, pendingServiceId) => {
        const response = await pendingRequest(serviceId + '/' + pendingServiceId, null, 'delete');
        if (response.status === 'ok') {
            await updatePending();
        }
    }

    const stylizePrice = (price) => {
        var formatter = new Intl.NumberFormat('fa-IR', {
            currency: 'IRR',
        });
        return formatter.format(price);
    }

    const handleCancelClick = e => {
        e.preventDefault();
        Router.push('/services');
    }

    const Map = dynamic(() => import("../../../components/map/Map"), {
        ssr: false
    });

    return (
        <div>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header
                pageTitle={title}
            />
            {pageState === 'setInfo' && (
                <main>
                    <div className="global-container">
                        <div className={styles.title}>لطفا اطلاعات مورد نیاز جهت تکمیل درخواست را وارد نمایید</div>
                        <div className={styles.description}>کارشناسان ما در اولین فرصت درخواست شما را پیگیری خواهند کرد</div>
                    </div>
                    <div className="global-container">
                        <InputField
                            label='نام'
                            value={firstName}
                            onChange={setFirstName}
                        />
                        <InputField
                            label='نام خانوادگی'
                            value={lastName}
                            onChange={setLastName}
                        />
                        <InputField
                            label='کدملی'
                            value={nationalCode}
                            onChange={setNationalCode}
                        />
                        <InputField
                            label='تلفن همراه'
                            value={mobile}
                            onChange={setMobile}
                        />
                        <InputField
                            label='آدرس'
                            value={address}
                            onChange={setAddress}
                            textarea
                        />
                        <button className={styles.location}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12.243" height="16.469" viewBox="0 0 12.243 16.469">
                                <path id="Path_442" data-name="Path 442" d="M15.607,8.971a2.253,2.253,0,1,0,2.253,2.253A2.253,2.253,0,0,0,15.607,8.971Zm0,3.379a1.126,1.126,0,1,1,1.126-1.126,1.126,1.126,0,0,1-1.126,1.126Z" transform="translate(-9.486 -5.1)" />
                                <path id="Path_443" data-name="Path 443" d="M16.077,3.03A6.122,6.122,0,0,0,6.619,10.7l4.256,6.533a1.043,1.043,0,0,0,1.747,0L16.878,10.7a6.122,6.122,0,0,0-.8-7.67Zm-.143,7.056-4.186,6.426L7.562,10.085a5,5,0,1,1,8.371,0Z" transform="translate(-5.627 -1.238)" />
                            </svg>
                            <span>موقعیت مکانی</span>
                        </button>
                        <div className={styles.gender}>
                            <span>انجام درخواست توسط</span>
                            <div className={styles.genderIconContainer}>
                                <button
                                    className={styles.genderIcon + ' ' + (gender === 'female' ? styles.activeGender : '')}
                                    onClick={toggleGender}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="48" height="48" viewBox="0 0 48 48">
                                        <defs>
                                            <clipPath id="clip-path">
                                                <circle id="Ellipse_14" data-name="Ellipse 14" cx="24" cy="24" r="24" transform="translate(0 0)" fill="#fff" />
                                            </clipPath>
                                        </defs>
                                        <g id="Mask_Group_2" data-name="Mask Group 2" transform="translate(0 0)" clipPath="url(#clip-path)">
                                            <circle id="Ellipse_12" data-name="Ellipse 12" cx="24" cy="24" r="24" transform="translate(0 0)" fill="#fff" />
                                            <g id="Symbols" transform="translate(7.841 8.988)">
                                                <g id="Head_Front_Long" data-name="Head/Front/Long" transform="translate(0)">
                                                    <path id="Hair-Back" d="M73.883,36.267c1.762,6.436,4.059,20.9,1.715,23.17H60.773l0-.078A10.931,10.931,0,0,1,51,48.533V37.893A10.942,10.942,0,0,1,61.991,27h1.022A10.963,10.963,0,0,1,73.883,36.267Z" transform="translate(-43.843 -27)" fill="#191847" fillRule="evenodd" />
                                                    <g id="Head" transform="translate(8.691 2.027)">
                                                        <path id="Path_437" data-name="Path 437" d="M4.224,17.474A13.654,13.654,0,0,1,.54,7.613C1.308-3.23,16.537-.845,19.5,4.628s2.61,19.354-1.218,20.332c-1.527.39-4.78-.565-8.09-2.543l2.078,14.569H0Z" transform="translate(0 0)" fill="#b28b67" fillRule="evenodd" />
                                                    </g>
                                                    <path id="Hair-Front" d="M53.231,45.163c.565,6.018.339,12.89-1.346,14.522H37.06c-.826-14.224,7.157-8.716,7.157-22.107.5-.482.968-.959,1.433-1.37l-.016-.394Q49.485,28,55.4,28c5.92,0,7.789,2.73,9.379,5.048-1.19,4.046-5.807,4.646-9.909,7.167a2.8,2.8,0,1,0-1.772,4.95Z" transform="translate(-37 -27.493)" fill="#191847" fillRule="evenodd" />
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                                <button
                                    className={styles.genderIcon + ' ' + (gender === 'male' ? styles.activeGender : '')}
                                    onClick={toggleGender}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="48" height="48" viewBox="0 0 48 48">
                                        <defs>
                                            <clipPath id="clip-path">
                                                <circle id="Ellipse_15" data-name="Ellipse 15" cx="24" cy="24" r="24" fill="#fff" />
                                            </clipPath>
                                        </defs>
                                        <g id="Mask_Group_3" data-name="Mask Group 3" clipPath="url(#clip-path)">
                                            <circle id="Ellipse_13" data-name="Ellipse 13" cx="24" cy="24" r="24" fill="#fff" />
                                            <g id="Symbols" transform="translate(14.357 9.172)">
                                                <g id="Head_Front_Short-1" data-name="Head/Front/Short-1" transform="translate(0 0)">
                                                    <g id="Head" transform="translate(0.056 1.842)">
                                                        <path id="Path_436" data-name="Path 436" d="M4.186,17.475A13.725,13.725,0,0,1,.535,7.613C1.3-3.23,16.389-.845,19.325,4.628s2.587,19.354-1.207,20.332c-1.513.39-4.737-.565-8.018-2.543L12.16,36.986H0Z" transform="translate(0 0)" fill="#b28b67" fillRule="evenodd" />
                                                    </g>
                                                    <path id="Hair" d="M67.908,34.628c-1.65.923-2.824,2.653-4.238,4.921a3.04,3.04,0,0,0-3.236,5c-.7.993-1.492,2.03-2.4,3.1-3.371-2.022-5.878-7.917-2.66-13.607,2.769-11.4,18.461-4.323,21.48-6.246C77.519,31.937,75.391,35.272,67.908,34.628Z" transform="translate(-53.889 -27.364)" fill="#191847" fillRule="evenodd" />
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <InputField
                            label='توضیحات تکمیلی'
                            value={description}
                            onChange={setDescription}
                            textarea
                        />
                    </div>
                    <div className={styles.togglePage}>ثبت و مشاهده لیست خدمات درخواستی</div>
                </main>
            )}
            {pageState === 'location' && (
                <div>
                    <div className={styles.mapContainer}>
                        <div className={styles.mapTitle}>موقعیت مورد نظرتان را روی نقشه مشخص کنید</div>
                        <Map position={location} setLocation={setLocation}/>
                    </div>
                    <div className={styles.togglePage}>ثبت موقعیت مکانی مشخص شده</div>
                </div>
            )
            }
            {pageState === 'pendingItems' && (
                <main>
                    <div className={'global-container'}>
                        <div className={styles.description}>
                            کاربر گرامی پس از ثبت نهایی درخواست شما، کارشناسان ما در اولین فرصت با شما تماس خواهند گرفت.
                        </div>
                        <div className={styles.title}>
                            لیست خدمات درخواستی
                        </div>
                    </div>
                    <div className="global-container">
                        {pending.map(el => (
                            <PendingItem
                                key={el.pending_service_id}
                                title={el.title}
                                serviceId={el.service_id}
                                pendingServiceId={el.pending_service_id}
                                price={el.price}
                                deletePending={deletePending}
                            />
                        ))}
                    </div>
                    <div className="global-container">
                        <div className={styles.sum}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="180.75" height="3" viewBox="0 0 180.75 3">
                                <line id="Line_12" data-name="Line 12" x1="177.75" transform="translate(1.5 1.5)" fill="none" stroke="#e2e2e2" strokeLinecap="round" strokeWidth="3" />
                            </svg>
                            <div>مجموع هزینه قابل پرداخت: {stylizePrice(priceSum)} تومان</div>
                        </div>
                    </div>
                    <div className={styles.action + " global-container"}>
                        <button className={styles.submit}>پرداخت</button>
                        <button onClick={handleCancelClick} className={styles.cancel}>لغو درخواست</button>
                    </div>
                    <Popup
                        opened={popup === 'opened'}
                        setPopup={setPopup}
                    />
                </main>
            )}
        </div>
    )
}