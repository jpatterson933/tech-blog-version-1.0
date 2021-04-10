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
            if (response.ok) {
                alert("this worked!");
                document.location.replace('/dash');
                console.log(response);
                // return response.json();
            } else {
                alert("Post failed!");
            }


        })
    
    }
}

//this is where we are going to put the javascript function to edit our posts
//--------------------------------------------------here we will add our edit post function---------------------
async function editPostHandler(event) {
    event.preventDefault();
    const title = document.querySelector("#blog-title").value.trim();
    const content = document.querySelector("#blog-content").value.trim();
    const username = localStorage.getItem("username");

  
  // window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    // The Controller will handle this 'put' request.
  
    const response = await fetch(`/api/post/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    // If the response is ok, that means that the dish was updated successfully. 
    if (response.ok) {
      document.location.replace(`/dash`);
    } else {
      alert('Failed to edit post');
    }
  }
//--------------------------------------------------here we will add our edit post function---------------------
document
  .querySelector(".update-post")
  .addEventListener('submit', editPostHandler)

document
    .querySelector(".post-tech")
    //we are running this in our dash.handlebars
    .addEventListener('submit', createBlog)