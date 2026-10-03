const handleResponse = (response) => {
    switch (response.status) {
        case 'success':
            console.log("Success! Data:", response.data);
            break;
        case 'error':
            console.log("Fatal Error:", response.message);
            break;
        case 'validation':
            console.log("Bad Inputs:", response.invalidFields);
            break;
        default:
            const _exhaustiveCheck = response;
            return _exhaustiveCheck;
    }
};
const myResponse = { status: 'validation', invalidFields: ['email', 'password'] };
handleResponse(myResponse);
export {};
