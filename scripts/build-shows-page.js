const apiKey = "bd3f5686-62d3-4ebd-b365-a72d11dae6aa";
const apiUrl = "https://project-1-api.herokuapp.com/showdates";

const showsArray = [
  {
    id: 0,
    date: "Mon Sept 06 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    id: 1,
    date: "Tue Sept 21 2021",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    id: 2,
    date: "Fri Oct 15 2021",
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    id: 3,
    date: "Sat Nov 06 2021",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    id: 4,
    date: "Fri Nov 26 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    id: 5,
    date: "Wed Dec 15 2021",
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];

// POPULATE SHOWS LIST FUNCTION
function renderShows(date, venue, location, container) {
  // Create list item
  const showEl = document.createElement("li");
  showEl.classList.add("shows__item");

  // Create date section
  const showDateSection = document.createElement("div");
  showDateSection.classList.add("shows__info");

  // Populate date section
  const dateHeaderEl = document.createElement("h6");
  dateHeaderEl.innerText = "Date";
  dateHeaderEl.classList.add("shows__subheading");

  const dateEl = document.createElement("p");
  dateEl.innerText = new Date(date).toLocaleDateString("en-us");
  dateEl.classList.add("shows__text--date");
  dateEl.classList.add("shows__text");

  showDateSection.appendChild(dateHeaderEl);
  showDateSection.appendChild(dateEl);

  // Create venue section
  const showVenueSection = document.createElement("div");
  showVenueSection.classList.add("shows__info");

  // Populate venue section
  const venueHeaderEl = document.createElement("h6");
  venueHeaderEl.innerText = "Venue";
  venueHeaderEl.classList.add("shows__subheading");

  const venueEl = document.createElement("p");
  venueEl.innerText = venue;
  venueEl.classList.add("shows__text");

  showVenueSection.appendChild(venueHeaderEl);
  showVenueSection.appendChild(venueEl);

  // Create location section
  const showLocationSection = document.createElement("div");
  showLocationSection.classList.add("shows__info");

  // Populate location section
  const locationHeaderEl = document.createElement("h6");
  locationHeaderEl.innerText = "Location";
  locationHeaderEl.classList.add("shows__subheading");

  const locationEl = document.createElement("p");
  locationEl.innerText = location;
  locationEl.classList.add("shows__text");

  showLocationSection.appendChild(locationHeaderEl);
  showLocationSection.appendChild(locationEl);

  // Create 'Buy Tickets' button
  const ticketsButtonEl = document.createElement("a");
  ticketsButtonEl.innerText = "Buy Tickets";
  ticketsButtonEl.classList.add("shows__button");

  // Append show data to <li>
  showEl.appendChild(showDateSection);
  showEl.appendChild(showVenueSection);
  showEl.appendChild(showLocationSection);
  showEl.appendChild(ticketsButtonEl);

  // Append <li> to showsList <ul>
  container.appendChild(showEl);
}

// GET SHOWS FROM API //

axios
  .get(`${apiUrl}?api_key=${apiKey}`)
  .then((response) => {
    const data = response.data;
    console.log(data);

    const showsList = document.querySelector(".shows__list");
    data.forEach((show) => {
      renderShows(show.date, show.place, show.location, showsList);
    });
  })
  .then((response) => {
    console.log(response);
    for (let i = 0; i < showEls.length; i++) {
      showEls[i].addEventListener("click", function () {
        showEls.forEach((show) => {
          show.classList.remove("shows__item--selected");
        });
        showEls[i].classList.toggle("shows__item--selected");
      });
    }
  })
  .catch((error) => {
    console.error("Error! ", error);
  });

// POPULATE SHOWS LIST //

// function populateShowsList() {
//   // Get show list <ul> element
//   const showsList = document.querySelector(".shows__list");

//   // Loop through showsArray
//   for (let i = 0; i < showsArray.length; i++) {
//     // Create list item
//     const showEl = document.createElement("li");
//     showEl.classList.add("shows__item");

//     // Create date section
//     const showDateSection = document.createElement("div");
//     showDateSection.classList.add("shows__info");

//     // Populate date section
//     const dateHeaderEl = document.createElement("h6");
//     dateHeaderEl.innerText = "Date";
//     dateHeaderEl.classList.add("shows__subheading");

//     const dateEl = document.createElement("p");
//     dateEl.innerText = showsArray[i].date;
//     dateEl.classList.add("shows__text--date");
//     dateEl.classList.add("shows__text");

//     showDateSection.appendChild(dateHeaderEl);
//     showDateSection.appendChild(dateEl);

//     // Create venue section
//     const showVenueSection = document.createElement("div");
//     showVenueSection.classList.add("shows__info");

//     // Populate venue section
//     const venueHeaderEl = document.createElement("h6");
//     venueHeaderEl.innerText = "Venue";
//     venueHeaderEl.classList.add("shows__subheading");

//     const venueEl = document.createElement("p");
//     venueEl.innerText = showsArray[i].venue;
//     venueEl.classList.add("shows__text");

//     showVenueSection.appendChild(venueHeaderEl);
//     showVenueSection.appendChild(venueEl);

//     // Create location section
//     const showLocationSection = document.createElement("div");
//     showLocationSection.classList.add("shows__info");

//     // Populate location section
//     const locationHeaderEl = document.createElement("h6");
//     locationHeaderEl.innerText = "Location";
//     locationHeaderEl.classList.add("shows__subheading");

//     const locationEl = document.createElement("p");
//     locationEl.innerText = showsArray[i].location;
//     locationEl.classList.add("shows__text");

//     showLocationSection.appendChild(locationHeaderEl);
//     showLocationSection.appendChild(locationEl);

//     // Create 'Buy Tickets' button
//     const ticketsButtonEl = document.createElement("a");
//     ticketsButtonEl.innerText = "Buy Tickets";
//     ticketsButtonEl.classList.add("shows__button");

//     // Append show data to <li>
//     showEl.appendChild(showDateSection);
//     showEl.appendChild(showVenueSection);
//     showEl.appendChild(showLocationSection) /
//       showEl.appendChild(ticketsButtonEl);

//     // Append <li> to showsList <ul>
//     showsList.appendChild(showEl);
//   }
// }

// // populateShowsList();

// let showEls = document.querySelectorAll(".shows__item");

// SELECTION FUNCTIONALITY //

for (let i = 0; i < showEls.length; i++) {
  showEls[i].addEventListener("click", function () {
    showEls.forEach((show) => {
      show.classList.remove("shows__item--selected");
    });
    showEls[i].classList.toggle("shows__item--selected");
  });
}
