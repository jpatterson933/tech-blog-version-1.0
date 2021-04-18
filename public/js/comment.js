const createComment = async (event) => {
    event.preventDefault();

    
    const content = document.querySelector("#comment-content").value.trim();
    const username = localStorage.getItem("username");

    if (title && content) {
        console.log(title)
        console.log("This is working!")
        fetch ('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ content, username }),
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

document
    .querySelector(".comment")
    //we are running this in our dash.handlebars
    .addEventListener('submit', createComment)