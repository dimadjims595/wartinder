let vehicles = []

function normalize(text){
    return text
        .toLowerCase()
        .replace(/[-–—]/g,"")
        .replace(/\s/g,"")
}

fetch("units.csv")
.then(response => response.text())
.then(text => {

    const rows = text.split("\n")

    rows.forEach(row => {

        const columns = row.split(",")

        const id = columns[0]
        const english = columns[1]

        if(id && english){

            vehicles.push({
                id: id.trim(),
                name: english.trim()
            })

        }

    })

})

const searchInput = document.getElementById("search")
const suggestions = document.getElementById("suggestions")

searchInput.addEventListener("input", function(){

    const value = normalize(this.value)

    suggestions.innerHTML = ""

    if(value.length === 0) return

    const matches = vehicles
        .filter(v =>
            normalize(v.name).includes(value) &&
            v.id.includes("_shop")
        )
        .slice(0,10)

    matches.forEach(vehicle => {

        const div = document.createElement("div")

        div.className = "suggestion"
        div.textContent = vehicle.name

        div.onclick = () => {
            searchInput.value = vehicle.name
            suggestions.innerHTML = ""
        }

        suggestions.appendChild(div)

    })

})
