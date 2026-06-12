 

async function testCoding() {
  console.log('Testing /api/coding/execute...');
  
  // Note: Since this endpoint is protected by NextAuth, we would normally need a session token.
  // Instead, let's just make sure it returns 401 Unauthorized if no session, or if we mock a session.
  
  const res = await fetch('http://localhost:3001/api/coding/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      language: 'javascript',
      code: 'console.log("Hello, World!");'
    })
  });
  
  console.log('Status:', res.status);
  if (res.status !== 401) {
    console.log('Response:', await res.text());
  }
}

testCoding();
