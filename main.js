import Tweeter from "./model.js";
import renderPosts from "./render.js";

document.addEventListener("DOMContentLoaded", () => {
  const model = new Tweeter();
  renderPosts(model.getPosts);
});
