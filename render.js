const renderComments = (comments) => {
  if (!comments || !Array.isArray(comments)) return undefined;
  const ul = document.createElement("ul");
  ul.setAttribute("class", "comments-container");
  comments.forEach((element) => {
    const div = document.createElement("div");
    div.setAttribute("id", element.id);
    div.setAttribute("data-id", element.id);

    const li = document.createElement("li");
    li.innerHTML = li.innerHTML = `${element.id}: ${element.text}`;
    div.appendChild(li);

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("data-id", element.id);
    div.setAttribute("class", "comment-container");
    deleteButton.textContent = `Delete Comment ${element.id}`;

    // delete comment
    deleteButton.onclick = () => {};
    div.appendChild(deleteButton);

    ul.appendChild(div);
  });

  return ul;
};

const renderPost = (element) => {
  const div = document.createElement("div");
  div.setAttribute("id", element.id);
  div.setAttribute("class", "post-container");
  div.setAttribute("data-id", element.id);

  const p = document.createElement("p");
  p.innerHTML = `${element.id}: ${element.text}`;
  div.appendChild(p);

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("data-id", element.id);
  deleteButton.textContent = `Delete Post ${element.id}`;
  div.appendChild(deleteButton);

  const comments = element.comments;
  if (comments) {
    const renderedComments = renderComments(comments);
    if (renderComments) {
      div.appendChild(renderedComments);
    }

    const addCommentContainer = document.createElement("div");
    addCommentContainer.setAttribute("class", "add-comment-container");

    const label = document.createElement("label");
    label.setAttribute("for", `input-${element.id}`);
    label.innerText = `Comment on Post ${element.id}`;
    addCommentContainer.appendChild(label);

    const br = document.createElement("br");
    addCommentContainer.appendChild(br);

    const input = document.createElement("input");
    input.setAttribute("id", `input-${element.id}`);
    input.setAttribute("type", "text");
    addCommentContainer.appendChild(input);

    const submitButton = document.createElement("button");
    submitButton.setAttribute("id", `submit-btn-${element.id}`);
    submitButton.setAttribute("data-ui", element.id);
    submitButton.innerText = "Submit";

    // submit commetn on post
    submitButton.onclick = () => {};
    addCommentContainer.appendChild(submitButton);

    div.appendChild(addCommentContainer);
  }

  return div;
};

// warning: no validation on posts and comments since we don't import those types
const renderPosts = (posts) => {
  if (posts && !Array.isArray(posts)) {
    throw new Error("What did you pass in here??! not posts, that's for sure!");
  }

  const renderedPosts = document.getElementById("posts");
  renderedPosts.innerHTML = "";
  posts.forEach((post) => {
    const renderedPost = renderPost(post);
    renderedPosts.appendChild(renderedPost);
  });

  const br = document.createElement("br");
  renderedPosts.appendChild(br);

  const inputDiv = document.createElement("div");
  inputDiv.setAttribute("id", "input-container");

  const label = document.createElement("label");
  label.setAttribute("for", "input");
  label.innerText = "Create New Twit";
  inputDiv.appendChild(label);

  const br2 = document.createElement("br");
  inputDiv.appendChild(br2);

  const input = document.createElement("input");
  input.setAttribute("id", "input");
  input.setAttribute("type", "text");
  inputDiv.appendChild(input);

  const submitButton = document.createElement("button");
  submitButton.setAttribute("id", "submit-btn");
  submitButton.innerText = "Submit";
  inputDiv.appendChild(submitButton);

  renderedPosts.appendChild(inputDiv);
};

export default renderPosts;
