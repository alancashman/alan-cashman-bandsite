const commentsArray = [
    {
        name: 'Miles Acosta',
        date: '12/20/2020',
        commentText: "I can't stop listening.  Every time I hear one of their songs - the vocals - it gives me goosebumps.  Shivers straight down my spine.  What a beautiful expression of creativity.  Can't get enough."
    },
    {
        name: 'Emilie Beach',
        date: '01/09/2021',
        commentText: 'I feel blessed to have seen them in person.  What a show!  They were just perfection. If there was one day of my life I could relive, this would be it.  What an incredible day.'
    },
    {
        name: 'Connor Walton',
        date: '02/17/2021',
        commentText: 'This is art.  This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence.  Let us appreciate this for what it is and what it contains.'
    },
]


const commentsListEl = document.querySelector('.comments-list')

function loadComments() {
    for(let i = 0; i < commentsArray.length; i++) {
        // Create comment element
        const commentEl = document.createElement('li')
        commentEl.classList.add('comment');
       

        // Create left side of comment element content
        const commentLeftEl = document.createElement('div');
        commentLeftEl.classList.add('comment__left');
        commentEl.appendChild(commentLeftEl)

            // Add comment image
            const commentImg = document.createElement('img');
            commentImg.classList.add('comment__img');
            commentLeftEl.appendChild(commentImg)

        // Create right side of comment element content
        const commentRightEl = document.createElement('div');
        commentRightEl.classList.add('comment__right');
        commentEl.appendChild(commentRightEl)

        // Create header-row for right side of comment element
        const commentRightHeader = document.createElement('div')
        commentRightHeader.classList.add('comment__header-row')
        commentRightEl.appendChild(commentRightHeader)

            // Add comment name
            const commentNameEl = document.createElement('h5');
            commentNameEl.innerText = commentsArray[i].name
            commentNameEl.classList.add('comment__name')
            commentRightHeader.appendChild(commentNameEl)

            // Add comment date
            const commentDateEl = document.createElement('p');
            commentDateEl.innerText = commentsArray[i].date;
            commentDateEl.classList.add('comment__date')
            commentRightHeader.appendChild(commentDateEl)

            // Add comment body
            const commentTextEl = document.createElement('p');
            commentTextEl.innerText = commentsArray[i].commentText;
            commentTextEl.classList.add('comment__text')
            commentRightEl.appendChild(commentTextEl)

        // Append comment <li> to comments <ul>
        commentsListEl.prepxend(commentEl)
    }
}

function loadComment(comment) {
     // Create comment element
     const commentEl = document.createElement('li')
     commentEl.classList.add('comment');
    

     // Create left side of comment element content
     const commentLeftEl = document.createElement('div');
     commentLeftEl.classList.add('comment__left');
     commentEl.appendChild(commentLeftEl)

         // Add comment image
         const commentImg = document.createElement('img');
         commentImg.classList.add('comment__img');
         commentLeftEl.appendChild(commentImg)

     // Create right side of comment element content
     const commentRightEl = document.createElement('div');
     commentRightEl.classList.add('comment__right');
     commentEl.appendChild(commentRightEl)

     // Create header-row for right side of comment element
     const commentRightHeader = document.createElement('div')
     commentRightHeader.classList.add('comment__header-row')
     commentRightEl.appendChild(commentRightHeader)

      // Add comment name
      const commentNameEl = document.createElement('h5');
      commentNameEl.innerText = comment.name
      commentNameEl.classList.add('comment__name')
      commentRightHeader.appendChild(commentNameEl)

      // Add comment date
      const commentDateEl = document.createElement('p');
      commentDateEl.innerText = comment.date;
      commentDateEl.classList.add('comment__date')
      commentRightHeader.appendChild(commentDateEl)

      // Add comment body
      const commentTextEl = document.createElement('p');
      commentTextEl.innerText = comment.commentText;
      commentTextEl.classList.add('comment__text')
      commentRightEl.appendChild(commentTextEl)

      // Append comment <li> to comments <ul>
      commentsListEl.prepend(commentEl)

}

const formEl = document.querySelector('.comments-form');

formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const comment = {
        name: e.target.name.value,
        date: new Date(Date.now()).toLocaleDateString('en-us'),
        commentText: e.target.comment.value
    }

    commentsArray.push(comment)
    loadComment(comment);
})

for(let i = 0; i < commentsArray.length; i++ ) {
    loadComment(commentsArray[i])
}