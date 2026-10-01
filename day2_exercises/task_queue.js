const sleep=(ms)=>new Promise(resolve=>setTimeout(resolve,ms));
const processVideo=async(videoId)=>{
console.log(`[START] Processing Video ${videoId}...`);
const processingTime=Math.floor(Math.random()*1000)+500;
await sleep(processingTime);
console.log(`[END] Video ${videoId} finished in ${processingTime}ms.`);
return `Video_${videoId}_Done`;
};
const runTaskQueue=async(tasks,limit)=>{
const allResults=[];
const currentlyExecuting=new Set();
for(const task of tasks){
const promise=processVideo(task).then(result=>{
currentlyExecuting.delete(promise);
return result;
});
allResults.push(promise);
currentlyExecuting.add(promise);
if(currentlyExecuting.size>=limit){
await Promise.race(currentlyExecuting);
}
}
await Promise.all(allResults);
console.log("\nQueue complete! All videos processed.");
};
const videoQueue=[1,2,3,4,5,6,7,8];
console.log(`Starting queue for ${videoQueue.length} videos. Limit: 3 simultaneous tasks.\n`);
runTaskQueue(videoQueue,3);