import Tweeter from "./model.js";
import renderPosts from "./render.js";

document.addEventListener("DOMContentLoaded", () => {
  const model = new Tweeter();
  renderPosts(model.getPosts());

  // adding click events to the entire document
  // delete comment
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName !== "BUTTON") return;

    const postSubmitButton = "post-submit-button";
    const postDeleteButton = "post-delete-button";
    const commentSubmitButton = "comment-submit-button";
    const commentDeleteButton = "comment-delete-button";

    switch (target.className) {
      case postSubmitButton: {
        const input = document.getElementById("input");
        const text = input.value;
        input.value = "";
        model.addPost(text);
        break;
      }
      case postDeleteButton: {
        const postID = target.getAttribute("data-id");
        model.removePost(postID);
        break;
      }
      case commentSubmitButton: {
        const postID = target.getAttribute("data-id");
        const input = document.getElementById(`input-${postID}`);
        model.addComment(postID, input.value);
        break;
      }
      case commentDeleteButton: {
        const commentID = target.getAttribute("data-id");
        const postID =
          target.parentNode.parentNode.parentNode.getAttribute("data-id");

        model.removeComment(postID, commentID);
        break;
      }
      default: {
        return;
      }
    }
    renderPosts(model.getPosts());
  });
});
