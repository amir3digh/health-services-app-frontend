import axios from "axios";
import { getCookies } from "cookies-next";

const request = axios.create({
    baseURL: 'http://37.152.179.2/api/',
    // timeout: 5000,
    headers: {
        'Content-type': 'application/json'
    },
    responseType: 'json'
})

export async function servicesRequest() {
    const response = await request.get('services/');
    return response.data;
}

export async function serviceDataRequest(slug) {
    const token = getCookies('jwtToken').jwtToken;
    const options = {
        headers: {
            'jwt': token
        }
    };
    const response = await request.get('services/' + slug, options);
    return response.data;
}
export async function pendingRequest(serviceId, data, action) {
    const token = getCookies('jwtToken').jwtToken;
    const options = {
        method: action,
        data: JSON.stringify(data),
        headers: {
            'jwt': token
        }
    };
    const response = await request('services/pending/' + serviceId, options);
    return response.data;
}
export async function imageUploadRequest({ name, file }) {
    const token = getCookies('jwtToken').jwtToken;
    const requestData = {
        type: 'photo',
        section: 'prescriptions',
        name: name,
        file: file
    }
    const options = {
        method: 'post',
        data: JSON.stringify(requestData),
        headers: {
            'jwt': token
        }
    }
    const response = await request('files/upload/', options);
    return response.data;
}