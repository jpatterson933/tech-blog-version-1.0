async function fetchNewPost(title, content, username) {
    try {
        const response = fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ title, content, username }),
            headers: { 'Content-Type': 'application/json' },
        });
        return response;
    } catch (err) {
        console.error(err);
    };
};

//this function is responsible for creating a new blog post
const createBlog = async (event) => {

    event.preventDefault();

    const title = document.querySelector("#blog-title").value.trim();
    const content = document.querySelector("#blog-content").value.trim();
    const username = localStorage.getItem("username");

    try {
        if (title && content) {
            let response = await fetchNewPost(title, content, username);
            if (response.ok) {
                alert("You have successfully posted your content!");
                document.location.replace('/dash');
                return response.json();
            } else {
                alert("Post failed!");
            }
        }
    } catch (err) {
        console.error(err);
    };
};

document
    .querySelector(".post-tech")
    .addEventListener('submit', createBlog)