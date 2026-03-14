let vehicles = []

fetch("units.csv")
.then(response => response.text())
.then(text => {

    const rows = text.split("\n")

    rows.forEach(row => {

        const columns = row.split(",")

        const name = columns[0]

        if(name && name !== "English"){
            vehicles.push(name.trim())
        }

    })

})

const searchInput = document.getElementById("search")
const suggestions = document.getElementById("suggestions")

searchInput.addEventListener("input", function(){

    const value = this.value.toLowerCase()

    suggestions.innerHTML = ""

    if(value.length === 0) return

    const matches = vehicles
        .filter(v => v.toLowerCase().includes(value))
        .slice(0,10)

    matches.forEach(vehicle => {

        const div = document.createElement("div")

        div.className = "suggestion"
        div.textContent = vehicle

        div.onclick = () => {

            searchInput.value = vehicle
            suggestions.innerHTML = ""

        }

        suggestions.appendChild(div)

    })

})
