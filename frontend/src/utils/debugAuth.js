// Debug utility to test authentication
export const debugAuth = () => {
  const tokenLS = localStorage.getItem('token');
  const tokenSS = sessionStorage.getItem('token');
  const userLS = localStorage.getItem('user');
  const userSS = sessionStorage.getItem('user');
  const roleLS = localStorage.getItem('role');
  const roleSS = sessionStorage.getItem('role');

  console.log('=== AUTH DEBUG INFO ===');
  console.log('localStorage token:', tokenLS);
  console.log('sessionStorage token:', tokenSS);
  console.log('localStorage user:', userLS);
  console.log('sessionStorage user:', userSS);
  console.log('localStorage role:', roleLS);
  console.log('sessionStorage role:', roleSS);
  
  // Test API call
  const token = tokenLS || tokenSS;
  if (token) {
    console.log('Testing API call with token...');
    fetch('http://localhost:5000/api/complaints/admin/list', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Response status:', response.status);
      return response.text();
    })
    .then(data => {
      console.log('Response data:', data);
      try {
        const json = JSON.parse(data);
        console.log('Parsed JSON:', json);
      } catch (e) {
        console.log('Response is not JSON:', data);
      }
    })
    .catch(err => {
      console.error('Fetch error:', err);
    });
  } else {
    console.log('No token found!');
  }
};

// Usage: In browser console, type: debugAuth()
window.debugAuth = debugAuth;