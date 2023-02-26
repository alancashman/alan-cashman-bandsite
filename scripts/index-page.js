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
    displayComment(comment);
  });
});

// COMMENTS LIST //

const commentsListEl = document.querySelector(".comments-list");
const formEl = document.querySelector(".comments-form");

function displayComment(comment) {
  // Create comment element
  const commentEl = document.createElement("li");
  commentEl.classList.add("comment");

  // Add comment ID and likes
  const commentId = comment.id;
  const commentLikes = comment.likes;

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
  const relativeDateString = getRelativeTimestamp(comment.timestamp);
  commentDateEl.innerText = relativeDateString;
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
  // const commentDeleteBtn = document.createElement("button");
  // commentDeleteBtn.classList.add("comment__delete-button");
  // commentDeleteBtn.innerText = "Delete Comment";
  const commentDeleteBtn = document.createElement("img");
  commentDeleteBtn.src = "../assets/icons/icon-delete.svg";
  commentDeleteBtn.classList.add("comment__delete-button");

  // Add comment like container
  const commentLikeContainer = document.createElement(
    "comment__likes-container"
  );
  commentLikeContainer.classList.add("comment__likes-container");

  // Add comment like button
  const commentLikeBtn = document.createElement("img");
  commentLikeBtn.src = "../assets/icons/icon-like.svg";
  commentLikeBtn.classList.add("comment__like-button");

  // Add comment like counter
  const commentLikeCounter = document.createElement("p");
  commentLikeCounter.classList.add("comment__like-counter");
  commentLikeCounter.innerText = commentLikes;

  // Append contents to comment options row
  commentLikeContainer.append(commentLikeBtn);
  commentLikeContainer.append(commentLikeCounter);
  commentOptionsRow.append(commentDeleteBtn);
  commentOptionsRow.append(commentLikeContainer);
  commentRightEl.append(commentOptionsRow);

  // Append comment <li> to comments <ul>
  commentsListEl.prepend(commentEl);

  // Add delete button functionality
  commentDeleteBtn.addEventListener("click", () => {
    deleteComment(commentEl, commentId);
  });

  // Add like button functionality
  commentLikeBtn.addEventListener("click", () => {
    likeComment(commentEl, commentId);
  });
}

// LIKE COMMENT

function likeComment(commentEl, commentId) {
  // Increment like counter
  const commentLikeCounter = commentEl.querySelector(".comment__like-counter");
  commentLikeCounter.innerText++;

  // Like comment on server
  axios
    .put(`${apiUrl}/${commentId}/like?api_key=${apiKey}`)
    .then((response) => console.log(response));
}

// DELETE COMMENT

function deleteComment(commentEl, commentId) {
  // Remove DOM Element
  const comment = commentEl.closest(".comment");
  comment.remove();

  // Delete comment from server
  axios
    .delete(`${apiUrl}/${commentId}?api_key=${apiKey}`)
    .then((response) => console.log(response));
}

// GET RELATIVE TIMESTAMP

function getRelativeTimestamp(timestamp) {
  const currentDate = new Date();
  const currentTimestamp = currentDate.getTime();

  const differenceInSeconds = (currentTimestamp - timestamp) / 1000;
  let output = ``;
  if (differenceInSeconds <= 0) {
    // comment was just posted
    output = `Just now`;
  } else if (differenceInSeconds < 60) {
    // less than a minute has passed
    Math.floor(differenceInSeconds) === 1
      ? (output = `${Math.floor(differenceInSeconds)} second ago`)
      : (output = `${Math.floor(differenceInSeconds)} seconds ago`);
  } else if (differenceInSeconds < 3600) {
    // less than an hour has passed
    Math.floor(differenceInSeconds / 60) === 1
      ? (output = `${Math.floor(differenceInSeconds / 60)} minute ago`)
      : (output = `${Math.floor(differenceInSeconds / 60)} minutes ago`);
  } else if (differenceInSeconds < 86400) {
    // less than a day has passed
    Math.floor(differenceInSeconds / 3600) === 1
      ? (output = `${Math.floor(differenceInSeconds / 3600)} hour ago`)
      : (output = `${Math.floor(differenceInSeconds / 3600)} hours ago`);
  } else if (differenceInSeconds < 2620800) {
    // less than a month has passed
    Math.floor(differenceInSeconds / 86400) === 1
      ? (output = `${Math.floor(differenceInSeconds / 86400)} day ago`)
      : (output = `${Math.floor(differenceInSeconds / 86400)} days ago`);
  } else if (differenceInSeconds < 31449600) {
    // less than a year has passed
    Math.floor(differenceInSeconds / 2620800) === 1
      ? (output = `${Math.floor(difference / 2620800)} month ago`)
      : (output = `${Math.floor(difference / 2620800)} months ago`);
  } else {
    // more than a year has passed
    Math.floor(differenceInSeconds / 31449600) === 1
      ? (output = `${Math.floor(differenceInSeconds / 31449600)} year ago`)
      : (output = `${Math.floor(differenceInSeconds / 31449600)} years ago`);
  }
  return output;
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
    displayComment(data);
  });
});
