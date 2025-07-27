class Comment {
  constructor(id, text = "") {
    if (!id || typeof id !== "string" || id[0] !== "c") {
      throw new Error("id not valid. cannot construct comment");
    }
    if (text && typeof text !== "string") {
      throw new Error("text is not a string. cannot construct comment");
    }
    this.id = id;
    this.text = text;
  }
}

class Post {
  constructor(id, text = "", comments = []) {
    if (!id || typeof id !== "string" || id[0] !== "p") {
      throw new Error("id not valid. cannot construct post");
    }
    if (text && typeof text !== "string") {
      throw new Error("text is not a string. cannot construct post");
    }
    if (
      comments &&
      (!Array.isArray(comments) ||
        comments.some((c) => !(c instanceof Comment)))
    ) {
      throw new Error("comments not valid. cannot construct post");
    }
    this.id = id;
    this.text = text;
    this.comments = comments;
  }
}

class Tweeter {
  #posts;
  #postIdCounter;
  #commentIdCounter;

  constructor() {
    this.#posts = [
      new Post("p1", "First post!", [
        new Comment("c1", "First comment on first post!"),
        new Comment("c2", "Second comment on first post!!"),
        new Comment("c3", "Third comment on first post!!!"),
      ]),
      new Post("p2", "Aw man, I wanted to be first", [
        new Comment(
          "c4",
          "Don't worry second poster, you'll be first one day."
        ),
        new Comment("c5", "Yeah, believe in yourself!"),
        new Comment("c6", "Haha second place what a joke."),
      ]),
    ];
    this.#postIdCounter = 2;
    this.#commentIdCounter = 6;
  }

  getPosts() {
    return this.#posts;
  }

  addPost(text) {
    try {
      this.#posts.push(new Post(`p${this.#postIdCounter + 1}`, text));
      this.#postIdCounter++;
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  removePost(postID) {
    if (this.#posts.some((post) => post.id === postID)) {
      this.#posts = this.#posts.filter((post) => post.id !== postID);
      return true;
    }
    return false;
  }

  addComment(postID, text) {
    const post = this.#posts.find((post) => post.id === postID);
    if (!post) {
      return false;
    }

    try {
      const comment = new Comment(`c${this.#commentIdCounter + 1}`, text);
      post.comments.push(comment);
      this.#commentIdCounter++;
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  removeComment(postID, commentID) {
    const post = this.#posts.find((post) => post.id === postID);

    if (!post) {
      return false;
    }

    if (post.comments.some((comment) => comment.id === commentID)) {
      post.comments = post.comments.filter(
        (comment) => comment.id !== commentID
      );
      return true;
    }
    return false;
  }
}

// note: turns out there is a recursive structure we can use to clean up the code:
// posts is an array, and comments is an array.
// we can use two fns: findElement, and removeElement to cut down the code complexity

export default Tweeter;
