import Tweeter from "./model.js";
import renderPosts from "./render.js";

document.addEventListener("DOMContentLoaded", () => {
  const model = new Tweeter();
  renderPosts(model.getPosts());

  const twit = document.getElementById("submit-btn");
  twit.onclick = () => {
    const input = document.getElementById("input");
    const text = input.value;
    input.value = "";
    model.addPost(text);
    renderPosts(model.getPosts());
  };
});
