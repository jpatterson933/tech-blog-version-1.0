//this function is reponsible for creating our comments and storing them in our database
const createComment = async (event) => {
    event.preventDefault();
    
    const comment = document.querySelector("#new-blog-content").value;
    //we store our username to be rendered elsewhere
    const username = localStorage.getItem("username");

    if (comment) {
        fetch ('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ comment, username }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => {
            if (response.ok) {
                alert("Your comment has been posted!");
                document.location.reload();
                return response.json();
            } else {
                alert("Comment failed!");
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
}

document
    .querySelector(".comment")
    .addEventListener('submit', createComment)