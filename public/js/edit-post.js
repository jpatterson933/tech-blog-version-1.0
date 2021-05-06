//this funciton is responsible for editing a post
const editPostHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#edit-title").value.trim();
  const content = document.querySelector("#edit-content").value.trim();

  // window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // The Controller will handle this 'put' request when editing a post
  const response = await fetch(`/dash/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    document.location.replace(`/dash`);
  } else {
    alert('Failed to edit post');
  }
}
//this funciton is repsonible for deleting posts
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/dash/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      document.location.replace('/dash');
      alert("Your post has been deleted!")
    } else {
      alert('Failed to delete post!');
    }
  }
};

document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler)
document
  .querySelector(".update-post")
  .addEventListener('submit', editPostHandler)
