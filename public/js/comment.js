const createComment = async (event) => {
    event.preventDefault();
    
    const comment = document.querySelector("#blog-content").trim();
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
                alert("this worked!");
                document.location.reload();
                console.log(response);
                return response.json();
            } else {
                alert("Comment failed!");
            }
        })
    }
}

console.log("comment.js status: connected, fileType: javascript");

document
    .querySelector(".comment")
    //we are running this in our dash.handlebars
    .addEventListener('submit', createComment)