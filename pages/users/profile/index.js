import Head from "next/head";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Header from "../../../components/header/Header";
import styles from '../../../styles/Profile.module.scss';
import { setUserProfile, userProfileRequest } from '../../../lib/requests';
import Router from "next/router";
import Popup from "../../../components/popup/Popup";
import InputField from "../../../components/microComponents/inputField/InputField";
import { Female, Male } from "../../../components/microComponents/icons/Icons";
import Layout from "../../../components/layout/Layout";

export function getStaticProps() {
    return { props: { title: 'پروفایل', layout: { header: true, bottomNav: false } } }
}

export default function Profile() {
    const title = 'پروفایل';

    const Map = dynamic(() => import("../../../components/map/Map"), {
        ssr: false
    });

    const [pageState, setPageState] = useState('setInfo');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nationalCode, setNationalCode] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState([35.6892, 51.3890]);
    const [tempLocation, setTempLocation] = useState();
    const [gender, setGender] = useState('male');

    useEffect(() => {
        const getUser = async () => {
            const response = await userProfileRequest();
            if (response.status === 'ok') {
                const user = response.result.user;
                const location = JSON.parse(user.address && user.address.location);
                setFirstName(user.first_name || (''));
                setLastName(user.last_name || (''));
                setNationalCode(user.national_code || (''));
                setMobile(user.mobile || (''));
                setEmail(user.email || (''));
                setGender(user.gender || '');
                location && (setLocation(location));
                setAddress(user.address && user.address.description);
            }
        }
        getUser();
    }, []);

    const updateProfile = async (event) => {
        event.preventDefault();
        const user = {
            first_name: firstName,
            last_name: lastName,
            national_code: nationalCode,
            location: tempLocation ?
                (tempLocation.lat ?
                    JSON.stringify([tempLocation.lat, tempLocation.lng]) : null)
                :
                JSON.stringify(location),
            gender,
            email,
            mobile,
            address
        }
        const response = await setUserProfile(user);
        if (response.status === 'ok') {
            Router.push('/services');
        }
    }

    return (
        <div>
            {pageState === 'setInfo' && (
                <Layout name='profile_setInfo'>
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
                            label='ایمیل'
                            value={email}
                            onChange={setEmail}
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
                            <span>جنسیت</span>
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
                    </div>
                    <button onClick={updateProfile} className={styles.togglePage}>ثبت</button>
                </Layout>
            )}
            {pageState === 'location' && (
                <div>
                    <div className={styles.mapContainer}>
                        <div className={styles.mapTitle}>موقعیت مورد نظرتان را روی نقشه مشخص کنید</div>
                        <Map
                            location={location}
                            setLocation={setTempLocation}
                            setPageState={setPageState}
                            submitStyle={styles.togglePage}
                            locateStyle={styles.mapLocate}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}