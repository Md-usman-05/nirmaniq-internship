const fs=require('fs/promises');
const fetchDataInParallel=async()=>{
  try{
    console.log("Starting parallel fetch...");
    const startTime=Date.now();
    const urls=[
      'https://jsonplaceholder.typicode.com/users/1',
      'https://jsonplaceholder.typicode.com/posts/1',
      'https://jsonplaceholder.typicode.com/todos/1'
    ];
    const fetchPromises=urls.map(url=>fetch(url));
    const responses=await Promise.all(fetchPromises);
    responses.forEach(res=>{
      if (!res.ok) throw new Error(`HTTP error! Status:${res.status}`);
    });
    const jsonPromises=responses.map(res=>res.json());
    const [user,post,todo]=await Promise.all(jsonPromises);

    const mergedData={
      timestamp:new Date().toISOString(),
      user:user,
      featuredPost:post,
      pendingTask:todo
    };
    await fs.writeFile('merged_data.json',JSON.stringify(mergedData,null,2));
    const duration=Date.now()-startTime;
    console.log(`Success!Data merged and saved to merged_data.json in ${duration}ms.`);
  } catch (error) {
    console.error("Critical Error during execution:",error.message);
  }
};
fetchDataInParallel();