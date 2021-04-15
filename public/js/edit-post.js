//--------------------------------------------------here we will add our edit post function---------------------
const editPostHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#edit-title").value.trim();
  const content = document.querySelector("#edit-content").value.trim();

  // window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  console.log(id)

  // The Controller will handle this 'put' request.
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
//--------------------------------------------------here we will add our edit post function---------------------
document
  .querySelector(".update-post")
  .addEventListener('submit', editPostHandler)
