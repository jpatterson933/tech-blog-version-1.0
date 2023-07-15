async function fetchLogin(username, password, stayLogged) {
    try {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ username, password, stayLogged }),
            headers: { 'Content-Type': 'application/json' }
        });
        return response;
    } catch (err) {
        console.log(err);
    }
}


//this function is responsible for logging the user in
const userLogin = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#user-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
    const stayLogged = document.querySelector("#stay-logged").value;

    if (username && password) {
        let response = await fetchLogin(username, password, stayLogged);

        if (response.ok) {
            localStorage.setItem("username", username)
            document.location.replace('/');
        } else {
            alert("Failed to Login");
        }
    }
};

async function fetchSignup(username, password) {
    try {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        return response;
    } catch (err) {
        console.log(err);
    }
}
//this function is repsonible for creating a new user when they go to sign up
const signupForm = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#user-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    // This regex pattern makes sure that a provided string has at least 1 uppercase, lowercase, and number.
    const pattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$');
    if (username && password) {
        let response = await fetchSignup(username, password);
        if (response.ok) {
            localStorage.setItem("username", username)
            alert("Congratulations, you have signed up!");
            document.location.replace('/');
        } else {
            alert("Signup failed!");
        }
    }
}

document
    .querySelector(".login-form")
    .addEventListener('submit', userLogin)

document
    .querySelector(".signup")
    .addEventListener('submit', signupForm)