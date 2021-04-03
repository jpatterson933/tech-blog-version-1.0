const userLogin = async (event) => {
    event.preventDefault();

    const userName = document.querySelector("#user-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (userName && password) {
        const response = await fetch('/api/')
    }
}