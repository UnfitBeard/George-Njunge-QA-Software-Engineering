document.getElementById("registerForm").addEventListener("submit", async()=>{
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, email, password})
    });

    const result = await response.json();
    document.getElementById("message").innerText = result.message;
})