import Head from "next/head";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Header from "../../../components/header/Header";
import styles from '../../../styles/Profile.module.scss';
import { makeInvoiceRequest, pendingRequest, userProfileRequest } from '../../../lib/requests';
import PendingItem from "../../../components/requests/PendingItem";
import Router from "next/router";
import Popup from "../../../components/popup/Popup";
import InputField from "../../../components/microComponents/inputField/InputField";
import { Female, Male } from "../../../components/microComponents/icons/Icons";

export default function Pending() {
    const title = 'ثبت نهایی درخواست';

    const Map = dynamic(() => import("../../../components/map/Map"), {
        ssr: false
    });

    const [pageState, setPageState] = useState('setInfo');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nationalCode, setNationalCode] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState([35.6892, 51.3890]);
    const [gender, setGender] = useState('male');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const getUser = async () => {
            const response = await userProfileRequest();
            if (response.status === 'ok') {
                const user = response.result.user;
                const location = JSON.parse(user.address.location);
                setFirstName(user.first_name || (''));
                setLastName(user.last_name || (''));
                setNationalCode(user.national_code || (''));
                setMobile(user.mobile || (''));
                location && (setLocation(location));
                setAddress(user.address.description);
            }
        }
        getUser();
        updatePending();
        setPageState('setInfo');
    }, []);

    const [pending, setPending] = useState([]);
    const [priceSum, setPriceSum] = useState(0);

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

    const makeInvoice = async (e) => {
        e.preventDefault();
        const factors = {
            first_name: firstName,
            last_name: lastName,
            national_code: nationalCode,
            operator: gender,
            description,
            mobile,
            address,
            location: location.lat ?
                JSON.stringify([location.lat, location.lng]) :
                JSON.stringify(location)
        }
        const response = await makeInvoiceRequest(factors);
        if (response.status === 'ok') {
            const paymentLink = response.result.transaction.link;
            Router.push(paymentLink);
        }
    }

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
                        <button onClick={() => setPageState('location')} className={styles.location}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12.243" height="16.469" viewBox="0 0 12.243 16.469">
                                <path id="Path_442" data-name="Path 442" d="M15.607,8.971a2.253,2.253,0,1,0,2.253,2.253A2.253,2.253,0,0,0,15.607,8.971Zm0,3.379a1.126,1.126,0,1,1,1.126-1.126,1.126,1.126,0,0,1-1.126,1.126Z" transform="translate(-9.486 -5.1)" />
                                <path id="Path_443" data-name="Path 443" d="M16.077,3.03A6.122,6.122,0,0,0,6.619,10.7l4.256,6.533a1.043,1.043,0,0,0,1.747,0L16.878,10.7a6.122,6.122,0,0,0-.8-7.67Zm-.143,7.056-4.186,6.426L7.562,10.085a5,5,0,1,1,8.371,0Z" transform="translate(-5.627 -1.238)" />
                            </svg>
                            <span>موقعیت مکانی</span>
                        </button>
                        <div className={styles.gender}>
                            <span>انجام درخواست توسط</span>
                            <div className={styles.genderIconContainer}>
                                <button className={styles.genderIcon + ' ' + (gender === 'female' ? styles.activeGender : '')}
                                    onClick={() => setGender('female')}>
                                    <Female />
                                </button>
                                <button
                                    className={styles.genderIcon + ' ' + (gender === 'male' ? styles.activeGender : '')}
                                    onClick={() => setGender('male')}>
                                    <Male />
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
                    <button onClick={() => setPageState('pendingItems')} className={styles.togglePage}>ثبت و مشاهده لیست خدمات درخواستی</button>
                </main>
            )}
            {pageState === 'location' && (
                <div>
                    <div className={styles.mapContainer}>
                        <div className={styles.mapTitle}>موقعیت مورد نظرتان را روی نقشه مشخص کنید</div>
                        <Map
                            location={location}
                            setLocation={setLocation}
                            setPageState={setPageState}
                            submitStyle={styles.togglePage}
                            locateStyle={styles.mapLocate}
                        />
                    </div>
                </div>
            )}
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
                        <button onClick={makeInvoice} className={styles.submit}>پرداخت</button>
                        <button onClick={() => Router.push('/services')} className={styles.cancel}>لغو درخواست</button>
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