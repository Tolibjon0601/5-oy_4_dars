function getElement(selector, parent = document) {
	return parent.querySelector(selector);
}

const pokemonCards = [
	{
		id: 1,
		title: "Pokemons",
		img: "./img/item_img_1.png",
		categories: ["Grass", "Poison"],
		weight: "8.9kg",
		age: 10,
		price: "$10",
		isFavorite: false,
	},
	{
		id: 2,
		title: "Pokemons2",
		img: "./img/item_img_1.png",
		categories: ["Grass", "Poison"],
		weight: "8.9kg",
		age: 20,
		price: "$20",
		isFavorite: false,
	},
	{
		id: 3,
		title: "Pokemons3",
		img: "./img/item_img_1.png",
		categories: ["Grass", "Poison"],
		weight: "8.9kg",
		age: 30,
		price: "$30",
		isFavorite: true,
	},
	{
		id: 4,
		title: "Pokemons4",
		img: "./img/item_img_1.png",
		categories: ["Grass", "Poison"],
		weight: "8.9kg",
		age: 40,
		price: "$40",
		isFavorite: true,
	},
	{
		id: 50,
		title: "Pokemons5",
		img: "./img/item_img_1.png",
		categories: ["Grass", "Poison"],
		weight: "8.9kg",
		age: 60,
		price: "$50",
		isFavorite: true,
	},
	{
		id: 70,
		title: "Pokemons6",
		img: "./img/item_img_1.png",
		categories: ["Grass", "Poison"],
		weight: "8.9kg",
		age: 70,
		price: "$60",
		isFavorite: true,
	},
	{
		id: 7,
		title: "Pokemons7",
		img: "./img/item_img_1.png",
		categories: ["Grass", "Poison"],
		weight: "8.9kg",
		age: 80,
		price: "$70",
		isFavorite: false,
	},
	{
		id: 8,
		title: "Pokemons8",
		img: "./img/item_img_1.png",
		categories: ["Grass", "Poison"],
		weight: "8.9kg",
		age: 99,
		price: "$80",
		isFavorite: true,
	},
];

const categories = ["Grass", "Pokemon", "Poison"];
const sectionEl = document.querySelector(".row");
const template = document.querySelector("template");

const elCategories = getElement("#categories-list");
const elSearchInput = getElement("#search");
const elSubmitBtn = getElement("#submit-btn");
const drawer = getElement("#drawer");
const closeBtn = getElement("#close");
const heartIcon = getElement("#heart");
const elOrderSelect = getElement("#order-select");

elOrderSelect.addEventListener("change", () => {
	const sortBy = elOrderSelect.value;
	let sortedArray = [...pokemonCards];

	if (sortBy === "age") {
		sortedArray.sort((a, b) => a.age - b.age);
	} else if (sortBy === "price") {
		sortedArray.sort((a, b) => parseFloat(a.price.substring(1)) - parseFloat(b.price.substring(1)));
	} else if (sortBy === "weight") {
		sortedArray.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight));
	}

	displayPokemonCard(sortedArray);
});

elSubmitBtn.addEventListener("click", () => {
	const query = elSearchInput.value.toLowerCase();
	const filteredArray = pokemonCards.filter((item) => item.title.toLowerCase().includes(query));
	displayPokemonCard(filteredArray);
});

window.addEventListener("DOMContentLoaded", function () {
	displayPokemonCard(pokemonCards);

	categories.forEach((category) => {
		const newOption = document.createElement("option");
		newOption.value = category;
		newOption.textContent = category;
		elCategories.appendChild(newOption);
	});
});

elCategories.addEventListener("change", () => {
	const filteredArray = pokemonCards.filter((item) => item.categories.includes(elCategories.value));
	displayPokemonCard(filteredArray);
});

function displayPokemonCard(menuItems) {
	sectionEl.textContent = null;
	menuItems.forEach((item) => {
		const newElement = template.content.cloneNode(true);
		const topImg = getElement(".card-img-top", newElement);
		const title = getElement(".card-title", newElement);
		const weight = getElement(".card-weight", newElement);
		const age = getElement(".card-age", newElement);
		const price = getElement(".card-price", newElement);
		const categories = getElement(".categories", newElement);
		const likeBtn = getElement(".card-like", newElement);

		likeBtn.dataset.id = item.id;
		if (item.isFavorite) {
			likeBtn.src = "../img/favorite.png";
		}

		topImg.src = item.img;
		title.textContent = item.title;
		weight.textContent = item.weight;
		age.textContent = `${item.age} age`;
		price.textContent = item.price;

		item.categories.forEach((category, i) => {
			const newLi = document.createElement("li");
			const span = document.createElement("span");
			if (item.categories.length - 1 !== i) {
				span.textContent = ", ";
			}
			newLi.textContent = category;
			categories.appendChild(newLi);
			categories.appendChild(span);
		});
		sectionEl.appendChild(newElement);
	});
}

heartIcon.addEventListener("click", () => {
	drawer.classList.toggle("open");
});

closeBtn.addEventListener("click", () => {
	drawer.classList.remove("open");
});
sectionEl.addEventListener("click", (evt) => {
	if (evt.target.className === "card-like") {
			const id = Number(evt.target.dataset.id);

			for (let i = 0; i < pokemonCards.length; i++) {
					if (pokemonCards[i].id === id) {
							pokemonCards[i].isFavorite = !pokemonCards[i].isFavorite;
					}
			}
			console.log(pokemonCards);
			displayPokemonCard(pokemonCards);
	}
});