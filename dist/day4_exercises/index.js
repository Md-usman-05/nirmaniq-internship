const myNewProject = {
    name: "Apollo Base",
    budget: 5000
};
console.log("Exercise 1 Output:");
console.log(myNewProject);
const handleResponse = (response) => {
    switch (response.status) {
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
            const _exhaustiveCheck = response;
            return _exhaustiveCheck;
    }
};
const fakeApiData = {
    status: 'success',
    data: ["User1", "User2"]
};
console.log("\nExercise 2 Output:");
handleResponse(fakeApiData);
export {};
