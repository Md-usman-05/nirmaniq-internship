export const ProgressBar = ({ pct, risk }) => {
    const colors = { 'on-track': '#10b981', 'at-risk': '#f59e0b', 'high-risk': '#ef4444', 'critical': '#dc2626' };
    return (<div style={{ width: '300px', background: '#ddd', height: '20px' }}>
      <div style={{ width: `${pct}%`, background: colors[risk], height: '100%' }}/>
    </div>);
};
