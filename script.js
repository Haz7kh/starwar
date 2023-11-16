document.addEventListener("DOMContentLoaded", function () {
  const fetchInfoElement = document.querySelector(".fetch-info");
  const characterListElement = document.querySelector(".character-list");

  fetch("https://swapi.dev/api/people/")
    .then((response) => response.json())
    .then((data) => {
      // names
      const characterNames = data.results.map((character) => character.name);
      characterListElement.innerHTML = characterNames
        .map((name) => `<div class="character-name">${name}</div>`)
        .join("");
      // Add click event listener to each character name
      document
        .querySelectorAll(".character-name")
        .forEach((nameElement, index) => {
          nameElement.addEventListener("click", function () {
            //  details
            fetch(data.results[index].url)
              .then((response) => response.json())
              .then((characterData) => {
                fetchInfoElement.innerHTML = `
            <h2>Details</h2
            <h2>${characterData.name}</h2>
            <p>Height: ${characterData.height} cm</p>
            <p>Mass: ${characterData.mass} kg</p>
            <p>Hair Color: ${characterData.hair_color}</p>
            <p>Skin Color: ${characterData.skin_color}</p>
          `;
              })
              .catch((error) => {
                console.error("Error fetching character details:", error);
              });
          });
        });
    })
    .catch((error) => {
      console.error("Error fetching character list:", error);
    });
});
