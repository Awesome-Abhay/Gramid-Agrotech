document.getElementById("checkWeather").addEventListener("click", getWeather);
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("weatherModal").classList.add("hidden");
});

async function getWeather() {
    const region = document.getElementById("region").value;
    const days = parseInt(document.getElementById("days").value, 10);
    const output = document.getElementById("weatherOutput");

    if (!region || isNaN(days) || days <= 0) {
        alert("Please enter a valid city name and number of days!");
        return;
    }

    output.innerHTML = "<p class='text-gray-700'>Fetching weather data...</p>";

    let forecastHTML = `<p class="text-lg text-gray-700"><strong>City:</strong> ${region}</p>`;
    let remainingDays = days;
    let startDateIndex = 0;

    try {
        while (remainingDays > 0) {
            let fetchDays = Math.min(remainingDays, 3);
            let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=bfbd2bd196a242278cc143734252001&q=${region}&days=${fetchDays}`);
            let data = await response.json();

            if (data.error) {
                throw new Error(data.error.message);
            }

            data.forecast.forecastday.forEach((day, index) => {
                if (index >= startDateIndex) {
                    forecastHTML += `
                        <div class="flex items-center justify-between bg-gray-100 p-2 mt-2 rounded-lg">
                            <div>
                                <p class="text-gray-600">${day.date}</p>
                                <p class="text-gray-700"><strong>${day.day.condition.text}</strong></p>
                                <p class="text-gray-700"><strong>Temp:</strong> ${day.day.avgtemp_c}°C</p>
                            </div>
                            <img src="${day.day.condition.icon}" alt="Weather Icon" class="w-12 h-12">
                        </div>
                    `;
                }
            });

            remainingDays -= fetchDays;
            startDateIndex += fetchDays;
        }

        output.innerHTML = forecastHTML;
        document.getElementById("weatherModal").classList.remove("hidden");
    } catch (error) {
        output.innerHTML = `<p class="text-red-500">Error fetching data: ${error.message}</p>`;
        console.error(error);
    }
}
