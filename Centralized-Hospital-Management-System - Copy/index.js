let  doctors = document.querySelectorAll(".team");
let  card = document.querySelectorAll(".card");

let count = 0;

doctors.forEach((card, index)=>{
    card.style.left = `${index * 100}%`
})

const myFun = () =>{
    doctors.forEach((curValue)=>{
        curValue.style.transform=`translateX(-${count * 100}%)`
    })
}

setInterval(()=>{
    count++;
    if(count == doctors.length){
        count=0;
    }
    myFun();
}, 3000);

card.forEach((curCard)=>{
    curCard.addEventListener("click", function(){
        console.log(curCard);
        let div = document.createElement("div");
        div.classList.add("detailCard")
        div.innerHTML=`
        
         <div>
         <i id="icon" class="fa-solid fa-xmark"></i>
         <img src=${curCard.firstElementChild.src} alt="">
         <h2>${curCard.lastElementChild.innerHTML}</h2>
         <p>The chest and respiratory system play crucial roles in maintaining our overall health and well-being. The chest houses vital organs such as the lungs, heart, and major blood vessels, while the respiratory system is responsible for the exchange of oxygen and carbon dioxide in the body.</p>
         </div>
        `
        document.querySelector("body").appendChild(div);
        document.getElementById("icon").addEventListener("click", function(){
            div.remove();
        })
    })
})



document.addEventListener('DOMContentLoaded', () => {
    
    const appointmentForm = document.getElementById('appointmentForm');

    appointmentForm.addEventListener('submit', async (event) => {
        var isLoggedIn = checkLoggedIn();
        if(!isLoggedIn){
           
            window.location.href = "login.html";
            alert("Please Login First")
          
        }
        event.preventDefault(); // Prevent default form submission

        // Get form input values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('number').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        // Create JSON object with form data
        const formData = {
            name,
            phone,
            appointmentDate: date,
            appointmentTime: time
        };

        // Send JSON data to the server
        try {
            const response = await fetch('http://localhost:3000/appointments/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
           
            alert(data.message)
            console.log(data); // Log the response from the server
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

function logout() {
    localStorage.setItem("isLoggedIn", "false");
    // Update the UI
    updateLoginStatus();

    // Send a POST request to localhost:3000/user/logout
    fetch('http://localhost:3000/user/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add any additional headers as needed
        },
        // You can include a body with the POST request if needed
        // body: JSON.stringify({ /* data to send */ }),
    })
    .then(response => {
        // Handle the response if needed
        console.log('Logout successful');
    })
    .catch(error => {
        // Handle any errors
        console.error('Error logging out:', error);
    });
}

function checkLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "true";
}
// Function to show or hide login/signup/logout links based on user login status
function updateLoginStatus() {
    var isLoggedIn = checkLoggedIn();
    var loginLink = document.querySelector("a[href='login.html']");
    var signupLink = document.querySelector("a[href='signup.html']");
    var logoutLink = document.querySelector("#logoutLink");
     console.log(isLoggedIn)
    if (isLoggedIn) {
        // User is logged in, hide login/signup links and show logout link
        if (loginLink) loginLink.style.display = "none";
        if (signupLink) signupLink.style.display = "none";
        if (logoutLink) logoutLink.style.display = "block";
    } else {
        // User is not logged in, show login/signup links and hide logout link
        if (loginLink) loginLink.style.display = "block";
        if (signupLink) signupLink.style.display = "block";
        if (logoutLink) logoutLink.style.display = "none";
    }
}

// Call updateLoginStatus when the page loads
document.addEventListener("DOMContentLoaded", function() {
    updateLoginStatus();
});
