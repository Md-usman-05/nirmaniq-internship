const sleep=(ms)=>new Promise(resolve=>setTimeout(resolve,ms));
const fetchWithRetry=async(url,maxRetries=3)=>{
for(let attempt=1;attempt<=maxRetries;attempt++){
try{
console.log(`Attempt ${attempt}: Fetching data...`);
const response=await fetch(url);
if(!response.ok){throw new Error(`Server returned status ${response.status}`);}
const data=await response.json();
console.log("Success! Data retrieved.");
return data;
}catch(error){
console.error(`Attempt ${attempt} failed: ${error.message}`);
if(attempt===maxRetries){throw new Error(`Request completely failed after ${maxRetries} attempts.`);}
const waitTime=Math.pow(2,attempt)*500;
console.log(`Waiting ${waitTime}ms before retrying...\n`);
await sleep(waitTime);
}
}
};
const testRetry=async()=>{
console.log("--- Testing with a BROKEN URL to force retries ---");
try{
await fetchWithRetry('https://jsonplaceholder.typicode.com/invalid-endpoint',3);
}catch(error){
console.log("Final Catch:",error.message);
}
};
testRetry();