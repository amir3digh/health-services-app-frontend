import axios from "axios";
import { getCookies } from "cookies-next";
import Router from 'next/router';

const request = axios.create({
    baseURL: 'https://api.doctorkhoneh.ir/',
    // timeout: 5000,
    headers: {
        'Content-type': 'application/json'
    },
    responseType: 'json'
});
// request.interceptors.response.use(response => response, (error) => {
//     // whatever you want to do with the error
//     // console.log(error.response);
//     if (error.response.status === 401) {
//         Router.push({query: {auth: false}});
//         throw 'wrongToken';
//     }
//     throw error;
// });
request.interceptors.request.use((config) => {
    const token = getCookies('jwtToken').jwtToken;
    if (token) {
        config.headers.jwt = token;
    }
    return config;
})

export async function servicesRequest() {
    const response = await request.get('services/');
    return response.data;
}

export async function serviceDataRequest(slug) {
    const response = await request.get('services/' + slug);
    return response.data;
}
export async function pendingRequest(serviceId, data, action) {
    const options = {
        method: action,
        data: JSON.stringify(data),
    };
    const response = await request('services/pending/' + serviceId, options);
    return response.data;
}
export async function imageUploadRequest({ name, file }) {
    const requestData = {
        type: 'photo',
        section: 'prescriptions',
        name: name,
        file: file
    }
    const options = {
        method: 'post',
        data: JSON.stringify(requestData),
    }
    const response = await request('files/upload/', options);
    return response.data;
}

export async function userProfileRequest() {
    const response = await request.get('users/profile');
    return response.data;
}

export async function setUserProfile(data) {
    const options = {
        method: 'put',
        data: JSON.stringify(data)
    };
    const response = await request('users/profile', options);
    return response.data;
}

export async function makeInvoiceRequest(data) {
    const options = {
        method: 'post',
        data: JSON.stringify(data)
    };
    const response = await request('factors/', options);
    return response.data;
}

export async function paymentVerificationRequest(data) {
    const options = {
        method: 'post',
        data: JSON.stringify(data)
    };
    const response = await request('bank-callback/', options);
    return response.data;
}

export async function paidServicesRequest() {
    const response = await request.get('services/paid');
    return response.data;
}