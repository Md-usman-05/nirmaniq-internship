export {};
interface ProjectResponse {
  id:string;
  name:string;
  budget:number;
  createdAt:Date;
  updatedAt:Date;
}
type CreateProjectDto=Omit<ProjectResponse,'id'|'createdAt'|'updatedAt'>;
const myNewProject:CreateProjectDto={
  name:"Apollo Base",
  budget: 5000
};
console.log("Exercise 1 Output:");
console.log(myNewProject);
interface SuccessResponse{status:'success';data:string[];}
interface ErrorResponse{status:'error';message:string;}
interface ValidationError {status:'validation';invalidFields:string[];}
type APIResponse=SuccessResponse|ErrorResponse|ValidationError;

const handleResponse=(response:APIResponse):void=>{
  switch (response.status){
    case 'success':
      console.log(response.data);
      break;
    case 'error':
      console.log(response.message);
      break;
    case 'validation':
      console.log(response.invalidFields);
      break;
    default:
      const _exhaustiveCheck:never=response;
      return _exhaustiveCheck;
  }
};
const fakeApiData:APIResponse={ 
  status:'success', 
  data:["User1","User2"] 
};
console.log("\nExercise 2 Output:");
handleResponse(fakeApiData);