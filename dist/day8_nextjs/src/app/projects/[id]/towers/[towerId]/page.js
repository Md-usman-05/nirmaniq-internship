export const instant = false;
export default async function TowerDetail({ params }) {
    const resolvedParams = await params;
    return (<div>
      <h1>Tower Details</h1>
      <p>Project: {resolvedParams.id}</p>
      <p>Tower: {resolvedParams.towerId}</p>
    </div>);
}
