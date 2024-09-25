// Custom toast component that accepts and displays a message
const CustomToast = ({ closeToast, message }) => {
  return (
    <div style={{ backgroundColor: '#333', color: '#fff', padding: '10px', borderRadius: '5px' }}>
      <strong>{message}</strong>
      <button onClick={closeToast} style={{ background: 'red', color: 'white', padding: '5px', border: 'none', marginLeft: '10px' }}>
        Close
      </button>
    </div>
  );
};

export default CustomToast;