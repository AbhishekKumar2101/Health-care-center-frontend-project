document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission
  
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const dateOfBirth = document.getElementById('dob').value;
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
    const formData = {
        fullname,
        email,
        dateOfBirth,
        age,
        gender,
        address,
        phone,
        password


    }
    // Check if passwords match
    console.log(formData)
   
    try {
      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
     
  
      const data = await response.json();
      if(response.status===201){
        alert("User already exist")
        return
      }
      if(response.status===200){
        alert("User created successfully")
        window.location.href="login.html"
        
      }
      console.log(data); // You can handle the response data here
  
      // Optionally, redirect to a new page after successful signup
      // window.location.href = '/success.html';
    } catch (error) {
      console.error('Error:', error.message);
      alert('Failed to sign up');
    }
  });
  