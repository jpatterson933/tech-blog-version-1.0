async function fetchNewComment(comment, username, post_id) {
    try {
        const response = fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ comment, username, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });
        return response;
    } catch (err) {
        console.error(err);
    };
};

//this function is reponsible for creating our comments and storing them in our database
const createComment = async (event) => {
    event.preventDefault();

    const element = document.getElementById("new-blog-content");
    const comment = element.value;

    //we store our username to be rendered elsewhere
    const username = localStorage.getItem("username");
    const post_id = element.dataset.postid;

    if (comment) {
        let response = await fetchNewComment(comment, username, post_id);
        if (response.ok) {
            alert("Your comment has been posted!");
            document.location.reload();
            return response.json();
        } else {
            alert("Comment failed!");
        };
    };
};

document
    .querySelector(".comment")
    .addEventListener('submit', createComment)