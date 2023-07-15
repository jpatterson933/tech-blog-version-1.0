async function fetchLogout() {
    try {
        const response = await fetch('/api/user/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        return response;
    } catch (err) {
        console.log(err);
    };
};
//this function is responsible for loging the user out
const logout = async () => {
    let response = await fetchLogout();

    if (!response.ok) {
        document.location.replace('/login');
        alert('You have logged out!!');
    } else {
        alert('Failed to log out');
    };

};

document
    .querySelector('#logout')
    .addEventListener('click', logout);