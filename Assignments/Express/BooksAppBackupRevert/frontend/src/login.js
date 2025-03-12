document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("loginModal");
    const openBtn = document.getElementById("openLoginBtn");
    const closeBtn = document.querySelector(".close");

    openBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Handle form submission
    document.getElementById("loginForm").addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Login successful!");
                window.location.href = "./../index.html"; // Redirect on success
            } else {
                alert("Invalid credentials");
            }
        })
        .catch(error => console.error("Error:", error));
    });
});
