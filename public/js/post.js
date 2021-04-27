const createBlog = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#blog-title").value.trim();
    const content = document.querySelector("#blog-content").value.trim();
    const username = localStorage.getItem("username");

    if (title && content) {
        console.log(title)
        console.log("This is working!")
        fetch ('/api/post', {
            method: 'POST',
            body: JSON.stringify({ title, content, username }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => {
            console.log(response);
            if (response.ok) {
                alert("You have successfully posted your content!");
                document.location.replace('/dash');
                return response.json();
            } else {
                alert("Post failed!");
            }
        })
    
    }
}

document
    .querySelector(".post-tech")
    //we are running this in our dash.handlebars
    .addEventListener('submit', createBlog)