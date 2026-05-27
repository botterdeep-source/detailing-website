const packageData = {
  "Basic Package": {
    price: 60,
    time: "45 minutes",
    includes: ["Exterior hand wash", "Wheels cleaned", "Windows cleaned","Interior Wipe Down", "Light Vaccum"],
    type: "detailing"
  },
  "Deep Clean Interior Package": {
    price: 40,
    time: "1 hour",
    includes: ["Deep vacuum", "Plastic and trim shining", "Steamed Carpets & Seats", "Door jambs"],
    type: "detailing"
  },
  "Premium Package": {
    price: 120,
    time: "5 hours",
    includes: ["Full Interior detail", "Full Exterior wash", "Wheel cleaning", "Small Stain Removal", "Wax protection"],
    type: "detailing"
  },
  "Lawn Mowing": {
    price: 40,
    time: "Time varies",
    includes: ["Basic lawn mowing", "Clean cut finish", "Placeholder pricing until final quote"],
    type: "gardening"
  },
  "String Trimming": {
    price: 25,
    time: "Time varies",
    includes: ["Edges around fences and walkways", "Hard-to-reach grass trimming", "Placeholder pricing until final quote"],
    type: "gardening"
  },
  "Bush Trimming": {
    price: 45,
    time: "Time varies",
    includes: ["Bush and shrub trimming", "Cleaned up shape", "Placeholder pricing until final quote"],
    type: "gardening"
  },
  "Weed Removal": {
    price: 35,
    time: "Time varies",
    includes: ["Weed removal from garden beds", "Weed cleanup along edges", "Placeholder pricing until final quote"],
    type: "gardening"
  },
  "Mulch Installation": {
    price: 75,
    time: "Time varies",
    includes: ["Fresh mulch installation", "Garden bed cleanup", "Placeholder pricing until final quote"],
    type: "gardening"
  },
  "Pavement Cleanup": {
    price: 30,
    time: "Time varies",
    includes: ["Clean weeds and debris from pavement", "Walkway and edge cleanup", "Placeholder pricing until final quote"],
    type: "gardening"
  },
  "Plant Planting": {
    price: 50,
    time: "Time varies",
    includes: ["Plant flowers or small plants", "Basic planting setup", "Placeholder pricing until final quote"],
    type: "gardening"
  }
};

const vehicleUpcharge = {
  "Sedan": 0,
  "SUV": 15,
  "Minivan": 20,
  "Pickup Truck": 25,
  "Van": 25,
  "Full-Size Truck": 40
};

const gardenSizeUpcharge = {
  "Small Yard": 0,
  "Medium Yard": 25,
  "Large Yard": 50,
  "Extra Large Yard": 75
};

const gardenServicePrices = {
  "Lawn Mowing": 40,
  "Mulch Installation": 75,
  "Bush Trimming": 45,
  "Pavement Cleanup": 30,
  "Weed Removal": 35,
  "String Trimming": 25,
  "Plant Planting": 50
};

function toggleMenu() {
  document.getElementById("nav").classList.toggle("open");
}

function openPackage(name) {
  const data = packageData[name];

  document.getElementById("modalTitle").textContent = name;
  document.getElementById("modalPrice").textContent = "Starting price: $" + data.price;
  document.getElementById("modalTime").textContent = "Estimated time: " + data.time;

  const list = document.getElementById("modalIncludes");
  list.innerHTML = "";

  data.includes.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });

  const modalBookButton = document.getElementById("modalBookButton");

  if (data.type === "gardening") {
    modalBookButton.href = "#gardening-quote";
    modalBookButton.textContent = "Book Gardening Service";
    modalBookButton.classList.remove("btn-primary");
    modalBookButton.classList.add("btn-green");
  } else {
    modalBookButton.href = "#quote";
    modalBookButton.textContent = "Book This Package";
    modalBookButton.classList.remove("btn-green");
    modalBookButton.classList.add("btn-primary");
  }

  document.getElementById("modal").classList.add("active");
}

function closeModal() {
  document.getElementById("modal").classList.remove("active");
}

function updateQuote() {
  const vehicle = document.getElementById("vehicle").value;
  const selectedPackage = document.getElementById("package").value;

  let packagePrice = selectedPackage ? packageData[selectedPackage].price : 0;
  let vehiclePrice = vehicle ? vehicleUpcharge[vehicle] : 0;

  let addonTotal = 0;
  document.querySelectorAll("#quote .addon input:checked").forEach(addon => {
    addonTotal += Number(addon.dataset.price);
  });

  let total = packagePrice + vehiclePrice + addonTotal;
  let duration = selectedPackage ? packageData[selectedPackage].time : "0 hrs";

  document.getElementById("sumVehicle").textContent = vehicle || "Not selected";
  document.getElementById("sumPackage").textContent = selectedPackage || "Not selected";
  document.getElementById("sumAddons").textContent = "$" + addonTotal;
  document.getElementById("sumDuration").textContent = duration;
  document.getElementById("sumTotal").textContent = "$" + total;

  const hiddenTotal = document.getElementById("hiddenTotal");
  const hiddenDuration = document.getElementById("hiddenDuration");
  const hiddenAddonTotal = document.getElementById("hiddenAddonTotal");

  if (hiddenTotal) hiddenTotal.value = "$" + total;
  if (hiddenDuration) hiddenDuration.value = duration;
  if (hiddenAddonTotal) hiddenAddonTotal.value = "$" + addonTotal;
}

function updateGardeningQuote() {
  const yardSize = document.getElementById("gardenSize").value;
  const service = document.getElementById("gardenService").value;

  let sizePrice = yardSize ? gardenSizeUpcharge[yardSize] : 0;
  let servicePrice = service ? gardenServicePrices[service] : 0;

  let addonTotal = 0;
  document.querySelectorAll("#gardening-quote .addon input:checked").forEach(addon => {
    addonTotal += Number(addon.dataset.price);
  });

  let total = sizePrice + servicePrice + addonTotal;

  document.getElementById("gardenSumSize").textContent = yardSize || "Not selected";
  document.getElementById("gardenSumService").textContent = service || "Not selected";
  document.getElementById("gardenSumAddons").textContent = "$" + addonTotal;
  document.getElementById("gardenSumTotal").textContent = "$" + total;

  const gardenHiddenTotal = document.getElementById("gardenHiddenTotal");
  const gardenHiddenAddonTotal = document.getElementById("gardenHiddenAddonTotal");

  if (gardenHiddenTotal) gardenHiddenTotal.value = "$" + total;
  if (gardenHiddenAddonTotal) gardenHiddenAddonTotal.value = "$" + addonTotal;
}

const reviewForm = document.getElementById("reviewForm");

if (reviewForm) {
  reviewForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const data = {
      name: document.getElementById("reviewName").value,
      rating: document.getElementById("reviewRating").value,
      review: document.getElementById("reviewText").value
    };

    try {
      await fetch("https://script.google.com/macros/s/AKfycbz1XaO3hP2b2hyt6SJs3yTQ94cwnfpwocxC69n7FtQFCHukMr5U3b-WGr2Nd9FiZXwriQ/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      document.getElementById("reviewMessage").textContent = "Review submitted. Thank you!";
      reviewForm.reset();

    } catch (error) {
      document.getElementById("reviewMessage").textContent = "Something went wrong. Please try again.";
    }
  });
}

// Before and after image sliders
document.querySelectorAll(".before-after-slider").forEach(slider => {
  const range = slider.querySelector(".slider-range");
  const afterImg = slider.querySelector(".after-img");

  function updateSlider() {
    const value = range.value;
    afterImg.style.clipPath = `inset(0 0 0 ${value}%)`;
    slider.style.setProperty("--slider-position", value + "%");
  }

  range.addEventListener("input", updateSlider);
  updateSlider();
});
