'use client';
export default function Error({ error, reset }) {
    return (<div style={{ color: 'red', padding: '20px', border: '1px solid red' }}>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()} style={{ padding: '10px', marginTop: '10px' }}>
        Try again
      </button>
    </div>);
}
