import axios from "axios";
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8zNy4xNTIuMTc5LjJcL2FwaVwvdXNlcnNcL3JlZ2lzdGVyXC92ZXJpZnktc21zIiwiaWF0IjoxNjQzNDQ3NDYyLCJleHAiOjE2NDQzMTE0NjIsIm5iZiI6MTY0MzQ0NzQ2MiwianRpIjoidVpjM3c5SXNtWWdyaHZ6ViIsInN1YiI6MTAyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.PL3Gv6hrfN_l2w73iif07Kd_CeX7sMHe67ACLT48Muo';

const request = axios.create({
    baseURL: 'http://37.152.179.2/api/',
    // timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'jwt': token
    }
})
export async function servicesRequest() {
    const response = await request.get('services/');
    return response.data;
}

export async function serviceDataRequest(slug) {
    const response = await request.get('services/' + slug);
    return response.data;
}
export async function pendingRequest(serviceId, prescription, action) {
    const response = await request('services/pending/' + serviceId,
        {
            method: action,
            data: JSON.stringify(prescription)
        }
    );
    return response.data;
}
export async function imageUploadRequest({ name, file }) {
    const requestData = {
        type: 'photo',
        section: 'prescriptions',
        name: name,
        file: file
    }
    const response = await request.post('files/upload/', JSON.stringify(requestData));
    return response.data;
}