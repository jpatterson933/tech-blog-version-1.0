const createComment = async (event) => {
    event.preventDefault();
    
    const comment = document.querySelector("#new-blog-content").value;
    const username = localStorage.getItem("username");

    if (comment) {
        console.log(comment)
        console.log("This is working!")
        fetch ('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ comment, username }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => {
            if (response.ok) {
                alert("Your comment has been posted!");
                document.location.reload();
                   console.log(response);
                return response.json();
            } else {
                alert("Comment failed!");
            }
        })
    }
}

document
    .querySelector(".comment")
    .addEventListener('submit', createComment)