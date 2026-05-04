const packageData = {
      "Basic Package": {
        price: 60,
        time: "1.5 hours",
        includes: ["Exterior hand wash", "Wheels cleaned", "Windows cleaned", "Light interior vacuum"]
      },
      "Basic Interior Package": {
        price: 75,
        time: "2 hours",
        includes: ["Vacuum", "Dash wipe down", "Cupholders cleaned", "Interior windows"]
      },
      "Deep Clean Package": {
        price: 120,
        time: "3 hours",
        includes: ["Deep vacuum", "Plastic and trim cleaning", "Carpet attention", "Door jambs"]
      },
      "Full Interior Package": {
        price: 150,
        time: "4 hours",
        includes: ["Full interior cleaning", "Seats cleaned", "Carpets cleaned", "Glass cleaned", "Interior dressing"]
      },
      "Premium Package": {
        price: 220,
        time: "5 hours",
        includes: ["Full interior detail", "Exterior wash", "Wheel cleaning", "Wax protection", "Final wipe down"]
      }
    };

    const vehicleUpcharge = {
      "Sedan": 0,
      "SUV": 20,
      "Minivan": 30,
      "Pickup Truck": 25,
      "Van": 35,
      "Full-Size Truck": 35
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
      document.querySelectorAll(".addon input:checked").forEach(addon => {
        addonTotal += Number(addon.dataset.price);
      });

      let total = packagePrice + vehiclePrice + addonTotal;
      let duration = selectedPackage ? packageData[selectedPackage].time : "0 hrs";

      document.getElementById("sumVehicle").textContent = vehicle || "Not selected";
      document.getElementById("sumPackage").textContent = selectedPackage || "Not selected";
      document.getElementById("sumAddons").textContent = "$" + addonTotal;
      document.getElementById("sumDuration").textContent = duration;
      document.getElementById("sumTotal").textContent = "$" + total;
      document.getElementById("hiddenTotal").value = "$" + total;
      document.getElementById("hiddenDuration").value = duration;
      document.getElementById("hiddenAddonTotal").value = "$" + addonTotal;
    }

    function bookService(event) {
      event.preventDefault();
      updateQuote();
      document.getElementById("bookingMessage").textContent =
        "Booking request submitted. Connect this form to email, Google Calendar, or a booking app before publishing.";
    }

    function submitReview(event) {
      event.preventDefault();
      document.getElementById("reviewMessage").textContent =
        "Review submitted. To make reviews public, connect this to a database or review app.";
      event.target.reset();
    }

    function sendContact(event) {
      event.preventDefault();
      document.getElementById("contactMessage").textContent =
        "Message ready. Connect this form to email before publishing.";
      event.target.reset();
    }
