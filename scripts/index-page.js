const apiKey = "bd3f5686-62d3-4ebd-b365-a72d11dae6aa";
const apiUrl = "https://project-1-api.herokuapp.com/comments/";

const commentsArray = [
  {
    name: "Miles Acosta",
    date: "12/20/2020",
    commentText:
      "I can't stop listening.  Every time I hear one of their songs - the vocals - it gives me goosebumps.  Shivers straight down my spine.  What a beautiful expression of creativity.  Can't get enough.",
  },
  {
    name: "Emilie Beach",
    date: "01/09/2021",
    commentText:
      "I feel blessed to have seen them in person.  What a show!  They were just perfection. If there was one day of my life I could relive, this would be it.  What an incredible day.",
  },
  {
    name: "Connor Walton",
    date: "02/17/2021",
    commentText:
      "This is art.  This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence.  Let us appreciate this for what it is and what it contains.",
  },
];

// COMMENTS LIST //

const commentsListEl = document.querySelector(".comments-list");
const formEl = document.querySelector(".comments-form");

function loadComment(comment) {
  // Create comment element
  const commentEl = document.createElement("li");
  commentEl.classList.add("comment");

  // Create left side of comment element content
  const commentLeftEl = document.createElement("div");
  commentLeftEl.classList.add("comment__left");
  commentEl.appendChild(commentLeftEl);

  // Add comment image
  const commentImg = document.createElement("img");
  commentImg.classList.add("comment__img");
  commentLeftEl.appendChild(commentImg);

  // Create right side of comment element content
  const commentRightEl = document.createElement("div");
  commentRightEl.classList.add("comment__right");
  commentEl.appendChild(commentRightEl);

  // Create header-row for right side of comment element
  const commentRightHeader = document.createElement("div");
  commentRightHeader.classList.add("comment__header-row");
  commentRightEl.appendChild(commentRightHeader);

  // Add comment name
  const commentNameEl = document.createElement("h5");
  commentNameEl.innerText = comment.name;
  commentNameEl.classList.add("comment__name");
  commentRightHeader.appendChild(commentNameEl);

  // Add comment date
  const commentDateEl = document.createElement("p");
  commentDateEl.innerText = comment.date;
  commentDateEl.classList.add("comment__date");
  commentRightHeader.appendChild(commentDateEl);

  // Add comment body
  const commentTextEl = document.createElement("p");
  commentTextEl.innerText = comment.commentText;
  commentTextEl.classList.add("comment__text");
  commentRightEl.appendChild(commentTextEl);

  // Append comment <li> to comments <ul>
  commentsListEl.prepend(commentEl);
}

// FORM //

const formNameField = document.querySelector(".comments-form__field--name");
const formCommentField = document.querySelector(
  ".comments-form__field--comment"
);

formEl.addEventListener("submit", (e) => {
  // Prevent form submission
  e.preventDefault();
  // Clear existing comments
  commentsListEl.innerText = "";

  // Form validation
  if (e.target.name.value === "") {
    formNameField.classList.add("comments-form__field--invalid");
    formNameField.setAttribute("placeholder", "Please input your name.");
    commentsArray.forEach((comment) => {
      loadComment(comment);
    });
    return;
  }

  if (e.target.comment.value === "") {
    formCommentField.classList.add("comments-form__field--invalid");
    formCommentField.setAttribute(
      "placeholder",
      "Please add a comment to be posted."
    );
    commentsArray.forEach((comment) => {
      loadComment(comment);
    });
    return;
  } else {
    formNameField.classList.remove("comments-form__field--invalid");
    formNameField.setAttribute("placeholder", "Enter your name");
    formCommentField.classList.remove("comments-form__field--invalid");
    formCommentField.setAttribute("placeholder", "Add a new comment");
  }

  // Build new comment object
  const comment = {
    name: e.target.name.value,
    date: new Date(Date.now()).toLocaleDateString("en-us"),
    commentText: e.target.comment.value,
  };
  // Clear form inputs
  e.target.reset();

  // Push new comment to commentsArray
  commentsArray.push(comment);
  // Loop through commentsArray and render to page
  for (let i = 0; i < commentsArray.length; i++) {
    loadComment(commentsArray[i]);
  }
});

// Initialize comments on page load
for (let i = 0; i < commentsArray.length; i++) {
  loadComment(commentsArray[i]);
}
