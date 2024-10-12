Module.register("MMM-HolidayCountdown", {
    defaults: {
        trips: [
            { destination: "Tunisia", date: "2024-02-15" },
            { destination: "Reighton Sands", date: "2023-11-01" },
            // Add as many trips as you want here
        ],
    },

    start: function () {
        this.updateDom();  // Updates the DOM right after loading
    },

    getDom: function () {
        var wrapper = document.createElement("div");
        wrapper.className = "holiday-countdown";  // Ensure this class name is correct

        var header = document.createElement("header");
        header.innerHTML = "Holiday Countdown";
        wrapper.appendChild(header);

        var today = new Date();

        // Filter trips to only include upcoming trips (date >= today)
        var upcomingTrips = this.config.trips.filter(trip => {
            var tripDate = new Date(trip.date);
            return tripDate >= today;
        });

        // Sort trips by date (ascending order)
        upcomingTrips.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Limit to only the next 4 trips
        var limitedTrips = upcomingTrips.slice(0, 4);

        // Loop through the limited trips and display them
        limitedTrips.forEach(trip => {
            var tripElement = document.createElement("div");
            tripElement.className = "trip";

            // Create two separate divs for destination and days
            var destinationElement = document.createElement("div");
            destinationElement.className = "destination";
            destinationElement.innerHTML = trip.destination;

            var tripDate = new Date(trip.date);
            var daysRemaining = Math.floor((tripDate - today) / (1000 * 60 * 60 * 24));

            var daysElement = document.createElement("div");
            daysElement.className = "days";
            daysElement.innerHTML = `${daysRemaining} days`;

            // Append both elements to the tripElement
            tripElement.appendChild(destinationElement);
            tripElement.appendChild(daysElement);

            wrapper.appendChild(tripElement);
        });

        return wrapper;  // Return the wrapper with the limited trips
    },

    getStyles: function () {
        return ["MMM-HolidayCountdown.css"];  // Ensure the CSS is being loaded
    }
});
