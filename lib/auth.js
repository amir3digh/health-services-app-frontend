import axios from "axios";

const request = axios.create({
    baseURL: 'http://37.152.179.2/api/users/',
    // timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export async function sendSmsRequest(phoneNumber, action) {
    const requestData = {
        "mobile": phoneNumber
    }
    try {
        const response = await request.post(action + '/send-sms/', JSON.stringify(requestData));
        const data = response.data;
        if (data.status === 'ok') {
            return data.res;
        }
        if (data.status === 'error') {
            if (data.res[0] === "The mobile has already been taken.") {
                throw "isRegistered"
            } else {
                throw "unknownError"
            }
        }
    } catch (error) {
        return error;
    }
}

export async function verifySmsRequest(token) {
    try {
        const response = await request.post('login/verify-sms/', JSON.stringify(token));
        const data = response.data;
        if (data.status === 'ok') {
            return data.res;
        }
        if (data.status === 'error') {
            if (data.res === "Token doesn't matched.") {
                throw 'wrongToken';
            } else {
                throw data.res;
            }
        }
    } catch (error) {
        return error;
    }
}