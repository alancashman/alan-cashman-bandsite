const apiKey = "bd3f5686-62d3-4ebd-b365-a72d11dae6aa";
const apiUrl = "https://project-1-api.herokuapp.com/showdates";

// renderShows FUNCTION

function renderShows(date, venue, location, container) {
  // Create date render format
  const dateOptions = {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  };
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
  dateEl.innerText = new Date(date).toLocaleDateString("en-us", dateOptions);
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

  //   Add selection functionality
  //   showEl.addEventListener("click", function () {
  //     showEl.classList.toggle("shows__item--selected");
  //   });

  // Append <li> to showsList <ul>
  container.appendChild(showEl);
}

// addSelectionListeners FUNCTION

function addSelectionListeners(items) {
  items.forEach((item) => {
    item.addEventListener("click", function () {
      items.forEach((item) => {
        item.classList.remove("shows__item--selected");
      });
      item.classList.toggle("shows__item--selected");
    });
  });
}

// GET SHOWS FROM API //

axios
  .get(`${apiUrl}?api_key=${apiKey}`)
  .then((response) => {
    const data = response.data;
    console.log(data);
    // Sort concerts by date
    const sortedData = data.sort((a, b) => {
      return a.date - b.date;
    });
    // Get shows list
    const showsList = document.querySelector(".shows__list");
    // Render shows to list
    sortedData.forEach((show) => {
      renderShows(show.date, show.place, show.location, showsList);
    });
    //   Add selection functionality
    const showEls = document.querySelectorAll(".shows__item");
    addSelectionListeners(showEls);
  })
  .catch((error) => {
    console.error("Error! ", error);
  });
