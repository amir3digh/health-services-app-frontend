const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8zNy4xNTIuMTc5LjIiLCJpYXQiOjE2NDI0MTY4NTksImV4cCI6MTY0MzI4MDg1OSwibmJmIjoxNjQyNDE2ODU5LCJqdGkiOiJUdFVGY05PNHlMa3lrNkZ0Iiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.Oitn7rYj4RP2M9GB-xiZqhPMoGwgBXEbTMBWnRuJuM4';

export async function servicesRequest() {
    const response = await fetch('http://37.152.179.2/api/services/');
    const data = await response.json();
    return data;
}

export async function serviceDataRequest(slug) {
    const options = {
        method: 'GET',
        headers: {
            'jwt': token
        }
    }
    const response = await fetch('http://37.152.179.2/api/services/' + slug, options);
    const data = await response.json();
    return data;
}
export async function pendingRequest(serviceId, prescription, action) {
    const options = {
        method: action,
        headers: {
            'Content-Type': 'application/json',
            'jwt': token
        },
        body: JSON.stringify(prescription)
    }
    const response = await fetch('http://37.152.179.2/api/services/pending/' + serviceId, options);
    const data = await response.json();
    return data;
}