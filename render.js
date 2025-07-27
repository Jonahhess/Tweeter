// uses recursive structure of posts and comments to write some concise code
const renderElement = (element) => {
  const li = document.createElement("li");
  li.innerHTML = `${element.id}: ${element}.text}`;
  if (element.comments) {
    const ul = document.createElement("ul");
    element.comments.forEach((innerElement) => {
      ul.appendChild(renderElement(innerElement));
    });
    li.appendChild(ul); // interestingly, li elements can contain a list as an element.
  }
  return;
};

// warning: no validation on posts and comments since we don't import those types
const renderPosts = (posts) => {
  if (posts && !Array.isArray(posts)) {
    throw new Error("What did you pass in here??! not posts, that's for sure!");
  }

  const renderList = document.getElementById("#posts");
  renderList.innerHTML = "";
  posts.forEach((post) => {
    renderList.appendChild(renderElement(post));
  });
};

export default renderPosts;
