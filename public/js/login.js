//this function is responsible for logging the user in
const userLogin = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#user-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
    const stayLogged = document.querySelector("#stay-logged").value;

    if (username && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ username, password, stayLogged }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            localStorage.setItem("username", username)
            document.location.replace('/');
        } else {
            alert("Failed to Login");
        }
    }
};
//this function is repsonible for creating a new user when they go to sign up
const signupForm = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#user-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    if (username && password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => {
                if (response.ok) {
                    localStorage.setItem("username", username)
                    alert("Congratulations, you have signed up!");
                    document.location.replace('/');
                } else {
                    alert("Signup failed!");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}

document
    .querySelector(".login-form")
    .addEventListener('submit', userLogin)

document
    .querySelector(".signup")
    .addEventListener('submit', signupForm)