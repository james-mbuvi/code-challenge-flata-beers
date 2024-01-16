// Code here

document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "http://localhost:3000";
    const beerList = document.getElementById("beer-list");
    const beerName = document.getElementById("beer-name");
    const beerImage = document.getElementById("beer-image");
    const beerDescription = document.getElementById("beer-description");
    const reviewList = document.getElementById("review-list");
    const descriptionForm = document.getElementById("description-form");
    const reviewForm = document.getElementById("review-form");
  
    
    const fetchFirstBeerDetails = async () => {
      try {
        const response = await fetch(`${baseUrl}/beers/1`);
        const beerData = await response.json();
        displayBeerDetails(beerData);
      } catch (error) {
        console.error("Error fetching beer details:", error);
      }
    };
  
    
    const fetchAllBeers = async () => {
      try {
        const response = await fetch(`${baseUrl}/beers`);
        const beersData = await response.json();
        displayBeerMenu(beersData);
      } catch (error) {
        console.error("Error fetching beers:", error);
      }
    };
  

    const displayBeerDetails = (beerData) => {
      
      beerName.textContent = beerData.name;
      beerImage.src = beerData.image_url;
      beerDescription.textContent = beerData.description;
      
      
      displayReviews(beerData.reviews);
    };
  
    // Function to display beer menu on the page
    const displayBeerMenu = (beersData) => {
      // Clear existing beer list
      beerList.innerHTML = "";
  
      // Create a list item for each beer in the menu
      beersData.forEach((beer) => {
        const listItem = document.createElement("li");
        listItem.textContent = beer.name;
  
        // Add event listener to handle beer click
        listItem.addEventListener("click", () => {
          fetchBeerDetails(beer.id);
        });
  
        beerList.appendChild(listItem);
      });
    };
  
    // Function to display reviews on the page
    const displayReviews = (reviews) => {
      // Clear existing review list
      reviewList.innerHTML = "";
  
      // Create a list item for each review
      reviews.forEach((review) => {
        const listItem = document.createElement("li");
        listItem.textContent = review;
  
        // Bonus Deliverable: Add event listener to handle review click
        listItem.addEventListener("click", () => {
          removeReview(listItem);
        });
  
        reviewList.appendChild(listItem);
      });
    };
  
    // Function to remove a review from the page
    const removeReview = (reviewElement) => {
      // Bonus Deliverable: Implement logic to remove the review from the page
      // Note: No persistence is needed, so it's fine if the review shows up again on refresh
      reviewElement.remove();
    };
  
    // Event listener for description form submission
    descriptionForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const newDescription = document.getElementById("description").value;
  
      // Bonus Deliverable: Implement logic to update the beer's description on the server
      // Note: Update description on the page as well
      updateBeerDescription(newDescription);
    });
  
    // Function to update beer's description on the server and page
    const updateBeerDescription = async (newDescription) => {
      // Bonus Deliverable: Implement logic to update the beer's description on the server
      // Note: Update description on the page as well
      try {
        const response = await fetch(`${baseUrl}/beers/1`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description: newDescription }),
        });
  
        const updatedBeerData = await response.json();
        displayBeerDetails(updatedBeerData);
      } catch (error) {
        console.error("Error updating beer description:", error);
      }
    };
  
    // Event listener for review form submission
    reviewForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const newReview = document.getElementById("review").value;
  
      // Implement logic to add a new review to the page
      addNewReview(newReview);
    });
  
    // Function to add a new review to the page
    const addNewReview = (newReview) => {
      // Create a list item for the new review
      const listItem = document.createElement("li");
      listItem.textContent = newReview;
  
      // Bonus Deliverable: Add event listener to handle review click
      listItem.addEventListener("click", () => {
        removeReview(listItem);
      });
  
      // Append the new review to the review list
      reviewList.appendChild(listItem);
    };
  
    // Initial setup: Fetch the first beer's details and all beers
    fetchFirstBeerDetails();
    fetchAllBeers();
  });
  
