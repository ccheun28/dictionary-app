import "./style.css";

const dictionaryAPI = "https://api.dictionaryapi.dev/api/v2/entries/en_US/";

const searchWord = async (word) => {
  try {
    const response = await fetch(`${dictionaryAPI}${word}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data from the API");
  }
};

searchWord("hello")
  .then((data) => {
    console.log(data);
  }).catch((error) => {
    console.error("Error: ", error);
  });

  const inputWord = document.getElementById("input");
const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", (event) => {
  const word = inputWord.value.trim();
  if (!word) return;

  searchWord(word)
    .then((data) => {
      const meanings = extractWordDefinitions(data);
+     displayWordDefinition(meanings);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
});

const extractWordDefinitions = (data) => {
  if (data && Array.isArray(data)) {
    if (data[0].meanings && Array.isArray(data[0].meanings)) {
      return data[0].meanings;
    }
  }
};

const displayWordDefinition = (meanings) => {
  const definitionsSection = document.getElementById("definitions");
  definitionsSection.innerHTML = "";

  const definitionsHeading = document.createElement("h1");
  definitionsHeading.classList.add("text-2xl", "font-semibold");
  definitionsHeading.innerText = "Definitions";
  definitionsSection.appendChild(definitionsHeading);

  meanings.forEach((meaning) => {
    const definitionDiv = document.createElement("div");
    definitionDiv.classList.add("bg-sky-50");
    definitionsSection.appendChild(definitionDiv);

    const { partOfSpeech, definitions } = meaning;
    console.log({ partOfSpeech, definitions });

    const partOfSpeechName = document.createElement("p");
    partOfSpeechName.classList.add(
      "px-4",
      "py-2",
      "font-semibold",
      "text-white",
      "bg-sky-600",
    );
    partOfSpeechName.innerText = partOfSpeech;
    definitionDiv.appendChild(partOfSpeechName);

    const definitionsList = document.createElement("ul");
    definitionsList.classList.add(
      "p-2",
      "ml-6",
      "font-light",
      "list-disc",
      "text-sky-700",
    );
    definitionDiv.appendChild(definitionsList);

    definitions.forEach((definitionObj) => {
      const definitionsItem = document.createElement("li");
      definitionsItem.innerText = definitionObj.definition;
      definitionsList.appendChild(definitionsItem);
    });
  });
};