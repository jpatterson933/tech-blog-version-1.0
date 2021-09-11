//this function is responsible for creating a new blog post
const createBlog = async (event) => {


    event.preventDefault();

    const title = document.querySelector("#blog-title").value.trim();
    const content = document.querySelector("#blog-content").value.trim();
    const username = localStorage.getItem("username");

    try {
        if (title && content) {
            fetch('/api/post', {
                method: 'POST',
                body: JSON.stringify({ title, content, username }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(response => {
                    if (response.ok) {
                        alert("You have successfully posted your content!");
                        document.location.replace('/dash');
                        return response.json();
                    } else {
                        alert("Post failed!");
                    }
                })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);

    }
}

document
    .querySelector(".post-tech")
    .addEventListener('submit', createBlog)