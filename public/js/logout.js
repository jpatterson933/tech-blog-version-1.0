//this function is responsible for loging the user out
const logout = async () => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => {
            if (!response.ok) {
                document.location.replace('/login');
                alert('You have logged out!!');
            } else {
                alert('Failed to log out');
            }
        })
        .catch(err => {
            console.log(err);
        })
};

document
    .querySelector('#logout')
    .addEventListener('click', logout);