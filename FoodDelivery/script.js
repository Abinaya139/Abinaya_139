function login(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Dummy validation - replace with actual validation
    if (username === "user" && password === "pass") {
        // Redirect to the restaurant page
        window.location.href = "restaurant.html"; // Ensure this path is correct
    } else {
        alert("Invalid credentials. Please try again.");
    }
}
