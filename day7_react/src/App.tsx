// 4. App.tsx
import{ProjectDashboard}from'./ProjectDashboard';
import{ActivitySearch}from'./ActivitySearch';
export default function App(){
  return(
    <div style={{padding:'20px',fontFamily:'sans-serif'}}>
      {/* <h2>Day 7: Hooks & Effects</h2> */}
      <ProjectDashboard/>
      <ActivitySearch/>
    </div>
  );
}