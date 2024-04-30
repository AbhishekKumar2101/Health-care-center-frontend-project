var loggedIn=false;
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission
  
    const form = e.target; // Get the form element
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;
  
    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      
      const data = await response.json();
       if(response.status==201){
        alert("User not registered")
        return;
       }
       localStorage.setItem("isLoggedIn", "true");
       alert("Logged in Successfully")// You can handle the response data here
       window.location.href = "index.html";
      // Optionally, redirect to a new page after successful login
      // window.location.href = '/dashboard.html';
    } catch (error) {
      console.error('Error:', error.message);
      alert('Failed to login');
    }
  });
  
