export {};
interface SuccessResponse{status:'success';data:string[];}
interface ErrorResponse{status:'error';message:string;}
interface ValidationError{status:'validation';invalidFields:string[];}
type APIResponse=SuccessResponse|ErrorResponse|ValidationError;
const handleResponse=(response: APIResponse): void => {
  switch (response.status) {
    case 'success':
      console.log("Success! Data:",response.data);
      break;
    case 'error':
      console.log("Fatal Error:",response.message);
      break;
    case 'validation':
      console.log("Bad Inputs:",response.invalidFields);
      break;
    default:
      const _exhaustiveCheck: never=response;
      return _exhaustiveCheck;
  }
};
const myResponse:APIResponse={status:'validation',invalidFields:['email','password']};
handleResponse(myResponse);