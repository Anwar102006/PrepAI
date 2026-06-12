 
async function testAdmin() {
  console.log('Testing /api/admin/stats...');
  
  const res = await fetch('http://localhost:3001/api/admin/stats');
  
  console.log('Status:', res.status);
  if (res.status !== 401) {
    console.log('Response:', await res.text());
  }
}

testAdmin();
