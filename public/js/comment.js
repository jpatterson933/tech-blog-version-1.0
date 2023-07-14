//this function is reponsible for creating our comments and storing them in our database
const createComment = async (event) => {
    event.preventDefault();

    const element = document.getElementById("new-blog-content");
    const comment = element.value;

    // const comment = document.querySelector("#new-blog-content").value;
    // const post_id = document.get
    //we store our username to be rendered elsewhere
    const username = localStorage.getItem("username");
    const post_id = element.dataset.postid;

    if (comment) {
        fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ comment, username, post_id }),
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