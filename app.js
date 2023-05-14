// Houses data
const houses = [
    {
      id: 1,
      name: "Modern House with Garden",
      location: "Los Angeles, California",
      price: 8500,
      img: "1.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum mi id urna bibendum, ac faucibus eros tristique. Cras at velit sed felis dictum malesuada. Ut in fringilla odio. Vestibulum et volutpat libero.",
      size: 2500,
      bedrooms: 10,
    },
    {
      id: 2,
      name: "Beach House with Ocean View",
      location: "Miami Beach, Florida",
      price: 5000,
      img: "2.png",
      description:
        "Aliquam erat volutpat. Integer ut diam blandit, cursus metus non, ullamcorper ex. Curabitur id ipsum elit. Sed euismod sed mi id luctus. Morbi eget fermentum enim, sed ultricies magna.",
      size: 3000,
      bedrooms: 4,
    },
    {
      id: 3,
      name: "Luxury Villa with Pool",
      location: "Beverly Hills, California",
      price: 7500,
      img: "3.png",
      description:
        "Duis sit amet sem volutpat, accumsan lacus vel, ullamcorper tellus. Etiam et aliquet enim. Nulla nec eros ultricies, laoreet purus ut, consectetur velit. Donec ac lacinia arcu. Sed varius tellus vitae ipsum varius luctus.",
      size: 5000,
      bedrooms: 6,
    },
    {
      id: 4,
      name: "Normal Villa without Pool",
      location: "Beverly Hills, California",
      price: 1500,
      img: "3.png",
      description:
        "Duis sit amet sem volutpat, accumsan lacus vel, ullamcorper tellus. Etiam et aliquet enim. Nulla nec eros ultricies, laoreet purus ut, consectetur velit. Donec ac lacinia arcu. Sed varius tellus vitae ipsum varius luctus.",
      size: 1000,
      bedrooms: 2,
    },
    {
      id: 5,
      name: "Luxury Villa without Pool",
      location: "Kolkata",
      price: 4500,
      img: "3.png",
      description:
        "Duis sit amet sem volutpat, accumsan lacus vel, ullamcorper tellus. Etiam et aliquet enim. Nulla nec eros ultricies, laoreet purus ut, consectetur velit. Donec ac lacinia arcu. Sed varius tellus vitae ipsum varius luctus.",
      size: 1500,
      bedrooms: 1,
    }
  ];
  
  // Display all houses on index.html
  //const houseContainer = document.querySelector("#property-container");
  //const displayHouses = (houses) => {
  //  let output = "";
  //  if (houses.length === 0) {
  //    output = "<p>No houses found</p>";
  //  } else {
  //    houses.forEach((house) => {
  //      output += `
  //        <div class="house">
  //          <img src="img/${house.img}" alt="${house.name}" />
  //          <div class="house-info">
  //          <h2>${house.name}</h2>
  //          <h3>Location: ${house.location}</h3>
  //          <h4>Price: $${house.price.toLocaleString()}</h4>
  //          <h4>Bedrooms: ${house.bedrooms}</h4>
  //          <h4>Size: ${house.size}</h4>
  //          <p>${house.description}</p>
  //            <a href="house.html?id=${house.id}" class="house-link">View Details</a>
  //          </div>
  //        </div>
  //      `;
  //    });
  //  }
  //  houseContainer.innerHTML = output;
  //};
  const propertyContainer = document.getElementById("property-container");
  function displayHouses(houses) {
    // Clear existing property cards
    propertyContainer.innerHTML = "";
    // Loop through rental properties and create a property card for each one
    houses.forEach(function(property) {
      const propertyCard = document.createElement("div");
      propertyCard.classList.add("property-card");
      propertyCard.innerHTML = `
        <img src="img/${property.img}" alt="${property.name}">
        <h2>${property.name}</h2>
        <p>${property.location}</p>
        <p>${property.price}/night</p>
        <p>Size: ${property.size}</p>
        <p>Bedrooms: ${property.bedrooms}</p>
        <p>${property.description}</p>
      `;
      propertyContainer.appendChild(propertyCard);
    });
  }
  displayHouses(houses);

  
const searchInput = document.querySelector("#search-txt");
//const searchprice = document.querySelector("#search_price");
const searchBtn = document.querySelector("#search-btn");
const searchpriceBtn = document.querySelector("#search_price-btn");

searchBtn.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const filteredHouses = houses.filter(
    (house) =>
      house.name.toLowerCase().includes(searchTerm) ||
      house.location.toLowerCase().includes(searchTerm)
  );
  displayHouses(filteredHouses);
});
searchpriceBtn.addEventListener("click", () => {
  //event.preventDefault();
  const searchprice = document.getElementById('search_price')
  const price = searchprice.value;
  if (price==0) {
    displayHouses(houses);
  return; };
  const filteredProperties = houses.filter((house) => house.price <= price);
    displayHouses(filteredProperties);
  
});
//displayHouses(houses);

// TOPSIS  
// Retrieve the weights and impact values
const calcBtn = document.getElementById("calculate-button");
//const impactInput = document.getElementById("impact");

//const weights = weightsInput.value.split(",").map(Number);
//const impacts = impactInput.value.split(",");

// Add an event listener to the Calculate button
//const calculateButton = document.getElementById("calculate-button");
// Define the weights for each criteria (location, price, size, bedrooms)
//const weights = [1, 10.3, 100.2, 20.1];

// Define the impacts for each criteria (location, price, size, bedrooms)
const impacts = ['+', '-', '-'];

calcBtn.addEventListener("click", () => {
  // const weightsInput = document.getElementById("weights");
  // const weights = weightsInput.value.split(",").map(Number);
  price_weight = document.getElementById("weight-price").value;
  size_weight = document.getElementById("weight-size").value;
  bedrooms_weight = document.getElementById("weight-bedrooms").value;
  weights = [price_weight, size_weight, bedrooms_weight];
  console.log(weights);
  topsis(houses, weights, impacts);
});

const topsis = (houses, weights, impacts) => {
  const maxPrice = 50000;
  const maxSize = 15000;
  const maxBedrooms = 50;
  const normalizedMatrix = houses.map((house) => {
    return [
      house.price / maxPrice,
      house.size / maxSize,
      house.bedrooms / maxBedrooms
    ];
  });
  
  // calculate the weighted normalized matrix
  const weightedNormalizedMatrix = normalizedMatrix.map((row) => {
    return row.map((value, index) => {
      return value * weights[index];
    });
  });
  
  // calculate the ideal and negative-ideal solutions
  const idealSolution = [];
  const negativeIdealSolution = [];
  for (let i = 0; i < weights.length; i++) {
    if (impacts[i] === '+') {
      idealSolution.push(Math.max(...weightedNormalizedMatrix.map(row => row[i])));
      negativeIdealSolution.push(Math.min(...weightedNormalizedMatrix.map(row => row[i])));
    } else {
      idealSolution.push(Math.min(...weightedNormalizedMatrix.map(row => row[i])));
      negativeIdealSolution.push(Math.max(...weightedNormalizedMatrix.map(row => row[i])));
    }
  }
  
  // calculate the distance to ideal and distance to negative-ideal for each house
  const distanceToIdeal = [];
  const distanceToNegativeIdeal = [];
  for (let i = 0; i < houses.length; i++) {
    const house = houses[i];
    let distIdeal = 0;
    let distNegativeIdeal = 0;
    for (let j = 0; j < weights.length; j++) {
      distIdeal += weights[j] * (idealSolution[j] - normalizedMatrix[i][j]) ** 2;
      distNegativeIdeal += weights[j] * (normalizedMatrix[i][j] - negativeIdealSolution[j]) ** 2;
    }
    distanceToIdeal.push(Math.sqrt(distIdeal));
    distanceToNegativeIdeal.push(Math.sqrt(distNegativeIdeal));
  }
  
  // calculate the performance score for each house
  const performanceScores = [];
  for (let i = 0; i < houses.length; i++) {
    performanceScores.push(distanceToNegativeIdeal[i] / (distanceToIdeal[i] + distanceToNegativeIdeal[i]));
  }
  
  // sort the houses by their performance score in descending order
  const sortedHouses = houses.map((house, index) => [house, performanceScores[index]])
    .sort((a, b) => b[1] - a[1])
    .map((item) => item[0]);
  
  console.log(sortedHouses);
  displayHouses(sortedHouses);
};
