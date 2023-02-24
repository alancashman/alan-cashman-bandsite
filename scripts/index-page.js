const apiKey = "bd3f5686-62d3-4ebd-b365-a72d11dae6aa";
const apiUrl = "https://project-1-api.herokuapp.com/comments";

// GET COMMENTS FROM API //
axios.get(`${apiUrl}?api_key=${apiKey}`).then((response) => {
  const data = response.data;
  //   Sort comments by date
  const sortedData = data.sort((a, b) => {
    return a.timestamp - b.timestamp;
  });
  //  Render comments to page
  sortedData.forEach((comment) => {
    console.log(comment);
    loadComment(comment);
  });
});

// COMMENTS LIST //

const commentsListEl = document.querySelector(".comments-list");
const formEl = document.querySelector(".comments-form");

function loadComment(comment) {
  // Set date format options
  const dateOptions = {
    month: "2-digit",
    year: "numeric",
    day: "2-digit",
  };
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

  // Add comment ID
  const commentId = comment.id;
  console.log(commentEl.id);

  // Add comment date
  const commentDateEl = document.createElement("p");
  commentDateEl.innerText = new Date(comment.timestamp).toLocaleDateString(
    "en-us",
    dateOptions
  );
  commentDateEl.classList.add("comment__date");
  commentRightHeader.appendChild(commentDateEl);

  // Add comment body
  const commentTextEl = document.createElement("p");
  commentTextEl.innerText = comment.comment;
  commentTextEl.classList.add("comment__text");
  commentRightEl.appendChild(commentTextEl);

  // Add comment options row
  const commentOptionsRow = document.createElement("div");
  commentOptionsRow.classList.add("comment__header-row");
  commentOptionsRow.classList.add("comment__options-row");

  // Add comment delete button
  const commentDeleteBtn = document.createElement("button");
  commentDeleteBtn.classList.add("comment__delete-button");
  commentDeleteBtn.innerText = "Delete Comment";

  // Add comment like container
  const commentLikeContainer = document.createElement(
    "comment__likes-container"
  );
  commentLikeContainer.classList.add("comment__likes-container");

  // Add comment like button
  const commentLikeBtn = document.createElement("button");
  commentLikeBtn.classList.add("comment__like-button");
  commentLikeBtn.innerText = "👍";

  // Add comment like counter
  const commentLikeCounter = document.createElement("p");
  commentLikeCounter.classList.add("comment__like-counter");
  commentLikeCounter.innerText = 0;

  // Append contents to comment options row
  commentLikeContainer.append(commentLikeBtn);
  commentLikeContainer.append(commentLikeCounter);
  commentOptionsRow.append(commentDeleteBtn);
  commentOptionsRow.append(commentLikeContainer);
  commentRightEl.append(commentOptionsRow);

  // Append comment <li> to comments <ul>
  commentsListEl.prepend(commentEl);

  // Add delete button functionality
  commentDeleteBtn.addEventListener("click", function () {
    // Remove DOM element
    const comment = this.closest(".comment");
    console.log(comment.dataset);
    comment.remove();

    // Delete comment from server
    axios
      .delete(`${apiUrl}/${commentId}?api_key=${apiKey}`)
      .then((response) => {
        console.log(response);
      });
  });
}

// FORM //

const formNameField = document.querySelector(".comments-form__field--name");
const formCommentField = document.querySelector(
  ".comments-form__field--comment"
);

formEl.addEventListener("submit", (e) => {
  // Prevent form submission
  e.preventDefault();

  // Form validation
  if (e.target.name.value === "") {
    formNameField.classList.add("comments-form__field--invalid");
    formNameField.setAttribute("placeholder", "Please input your name.");

    return;
  }

  if (e.target.comment.value === "") {
    formCommentField.classList.add("comments-form__field--invalid");
    formCommentField.setAttribute(
      "placeholder",
      "Please add a comment to be posted."
    );

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
    comment: e.target.comment.value,
  };
  // Clear form inputs
  e.target.reset();

  // POST comment to API
  axios.post(`${apiUrl}?api_key=${apiKey}`, comment).then((response) => {
    // console.log(response);
    const data = response.data;
    console.log(data);
    loadComment(data);
  });
});

// DELETE BUTTON

// function deleteComment(comment) {
//   // Remove DOM element
//   console.log(this.closest(".comment"));
//   const comment = this.closest(".comment");
//   comment.remove();
// }
