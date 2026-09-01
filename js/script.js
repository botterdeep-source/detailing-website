const packageData = {
  "Basic Package": { price: 60, time: "45 minutes", includes: ["Exterior hand wash", "Wheels cleaned", "Windows cleaned","Interior Wipe Down", "Light Vaccum"], type: "detailing" },
  "Deep Clean Interior Package": { price: 40, time: "1 hour", includes: ["Deep vacuum", "Plastic and trim shining", "Steamed Carpets & Seats", "Door jambs"], type: "detailing" },
  "Premium Package": { price: 120, time: "1 hour", includes: ["Full Interior detail", "Full Exterior wash", "Wheel cleaning", "Small Stain Removal", "Wax protection"], type: "detailing" },
  "Lawn Mowing": { price: 40, time: "Time varies", includes: ["Basic lawn mowing", "Clean cut finish", "Placeholder pricing until final quote"], type: "gardening" },
  "String Trimming": { price: 25, time: "Time varies", includes: ["Edges around fences and walkways", "Hard-to-reach grass trimming", "Placeholder pricing until final quote"], type: "gardening" },
  "Bush Trimming": { price: 45, time: "Time varies", includes: ["Bush and shrub trimming", "Cleaned up shape", "Placeholder pricing until final quote"], type: "gardening" },
  "Weed Removal": { price: 35, time: "Time varies", includes: ["Weed removal from garden beds", "Weed cleanup along edges", "Placeholder pricing until final quote"], type: "gardening" },
  "Mulch Installation": { price: 75, time: "Time varies", includes: ["Fresh mulch installation", "Garden bed cleanup", "Placeholder pricing until final quote"], type: "gardening" },
  "Pavement Cleanup": { price: 30, time: "Time varies", includes: ["Clean weeds and debris from pavement", "Walkway and edge cleanup", "Placeholder pricing until final quote"], type: "gardening" },
  "Plant Planting": { price: 50, time: "Time varies", includes: ["Plant flowers or small plants", "Basic planting setup", "Placeholder pricing until final quote"], type: "gardening" }
};

const vehicleUpcharge = { "Sedan": 0, "SUV": 15, "Minivan": 20, "Pickup Truck": 25, "Van": 25, "Full-Size Truck": 40 };
const gardenSizeUpcharge = { "Small Yard": 0, "Medium Yard": 25, "Large Yard": 50, "Extra Large Yard": 75 };
const gardenServicePrices = { "Lawn Mowing": 40, "Mulch Installation": 75, "Bush Trimming": 45, "Pavement Cleanup": 30, "Weed Removal": 35, "String Trimming": 25, "Plant Planting": 50 };

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
  modalBookButton.href = "#quote"; // Everything links to the unified quote section now
  modalBookButton.textContent = "Book This Package";

  document.getElementById("modal").classList.add("active");
}

function closeModal() {
  document.getElementById("modal").classList.remove("active");
}

function toggleFormFields() {
  const category = document.getElementById("serviceCategory").value;
  const detailingFields = document.getElementById("detailingFields");
  const gardeningFields = document.getElementById("gardeningFields");
  const sharedFields = document.getElementById("sharedFields");
  const detailingInputs = document.querySelectorAll(".detailing-input");
  const gardeningInputs = document.querySelectorAll(".gardening-input");

  document.getElementById("sumSelection").textContent = "Not selected";
  document.getElementById("sumAddons").textContent = "$0";
  document.getElementById("sumTotal").textContent = "$0";

  if (category === "Auto Detailing") {
    document.getElementById("sumCategory").textContent = "Auto Detailing";
    detailingFields.style.display = "block";
    gardeningFields.style.display = "none";
    sharedFields.style.display = "block";
    detailingInputs.forEach(i => i.required = true);
    gardeningInputs.forEach(i => i.required = false);
    document.getElementById("formSubject").value = "New Detailing Booking Request";
  } else if (category === "Lawn & Gardening") {
    document.getElementById("sumCategory").textContent = "Lawn & Gardening";
    detailingFields.style.display = "none";
    gardeningFields.style.display = "block";
    sharedFields.style.display = "block";
    detailingInputs.forEach(i => i.required = false);
    gardeningInputs.forEach(i => i.required = true);
    document.getElementById("formSubject").value = "New Gardening Booking Request";
  } else {
    document.getElementById("sumCategory").textContent = "Not selected";
    detailingFields.style.display = "none";
    gardeningFields.style.display = "none";
    sharedFields.style.display = "none";
    detailingInputs.forEach(i => i.required = false);
    gardeningInputs.forEach(i => i.required = false);
  }
}

function updateUnifiedQuote() {
  const category = document.getElementById("serviceCategory").value;
  let basePrice = 0, addonTotal = 0, selectionText = "None";

  if (category === "Auto Detailing") {
    const pkg = document.getElementById("package").value;
    const vehicle = document.getElementById("vehicle").value;
    if (pkg) {
      basePrice = packageData[pkg].price + (vehicle ? vehicleUpcharge[vehicle] : 0);
      selectionText = `${vehicle || 'Vehicle'} - ${pkg}`;
    }
    document.querySelectorAll('#detailingFields .addon input:checked').forEach(addon => {
      addonTotal += Number(addon.dataset.price);
    });
  } else if (category === "Lawn & Gardening") {
    const size = document.getElementById("gardenSize").value;
    const service = document.getElementById("gardenService").value;
    if (size || service) {
      basePrice = (size ? gardenSizeUpcharge[size] : 0) + (service ? gardenServicePrices[service] : 0);
      selectionText = `${size || 'Yard'} - ${service || 'Service'}`;
    }
    document.querySelectorAll('#gardeningFields .addon input:checked').forEach(addon => {
      addonTotal += Number(addon.dataset.price);
    });
  }

  const total = basePrice + addonTotal;

  document.getElementById("sumSelection").textContent = selectionText !== "None" ? selectionText : "Not selected";
  document.getElementById("sumAddons").textContent = "$" + addonTotal;
  document.getElementById("sumTotal").textContent = total > 0 ? "$" + total : "$0";

  const hiddenTotal = document.getElementById("hiddenTotal");
  if (hiddenTotal) hiddenTotal.value = "$" + total;
}

const reviewForm = document.getElementById("reviewForm");
if (reviewForm) {
  reviewForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", document.getElementById("reviewName").value);
    formData.append("rating", document.getElementById("reviewRating").value);
    formData.append("review", document.getElementById("reviewText").value);

    await fetch("https://script.google.com/macros/s/AKfycbzV_--eM3NaQjH77sCGpV7GgvdlYgbWpHHM9e8q3mODgQhOnza7E0KZQix2Vhv0Is1exA/exec", {
      method: "POST",
      mode: "no-cors",
      body: formData
    });
    document.getElementById("reviewMessage").textContent = "Review submitted. Thank you!";
    reviewForm.reset();
  });
}

document.querySelectorAll(".before-after-slider").forEach(slider => {
  const range = slider.querySelector(".slider-range");
  const afterImg = slider.querySelector(".after-img");
  if (!range || !afterImg) return;
  function updateSlider() {
    const value = range.value;
    afterImg.style.clipPath = `inset(0 0 0 ${value}%)`;
    slider.style.setProperty("--slider-position", value + "%");
  }
  range.addEventListener("input", updateSlider);
  updateSlider();
});
