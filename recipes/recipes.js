import recipes from './recipes.mjs';

// pick a random number from 0 to num - 1
function random(num) {
	return Math.floor(Math.random() * num);
}

// get a random item from a list
function getRandomListEntry(list) {
	return list[random(list.length)];
}

// make the html for the tags
function tagsTemplate(tags) {
	return tags.map((tag) => `<li class="tag">${tag}</li>`).join('');
}

// make the html for the star rating
function ratingTemplate(rating) {
	let html = `<span
		class="rating"
		role="img"
		aria-label="Rating: ${rating} out of 5 stars"
	>`;

	for (let i = 1; i <= 5; i++) {
		if (i <= rating) {
			html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
		} else {
			html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
		}
	}

	html += `</span>`;
	return html;
}

// make the html for one recipe card
function recipeTemplate(recipe) {
	return `<section class="recipe">
		<div class="recipe-image">
			<img src="${recipe.image}" alt="image of ${recipe.name}">
		</div>
		<div class="recipe-content">
			<ul class="recipe-tags">
				${tagsTemplate(recipe.tags)}
			</ul>
			<h2>${recipe.name}</h2>
			${ratingTemplate(recipe.rating)}
			<p class="description">${recipe.description}</p>
		</div>
	</section>`;
}

// put a list of recipes on the page
function renderRecipes(recipeList) {
	const outputElement = document.querySelector('#recipes');

	if (recipeList.length === 0) {
		outputElement.innerHTML = `<p class="no-results">No recipes found. Try another search.</p>`;
		return;
	}

	outputElement.innerHTML = recipeList.map(recipeTemplate).join('');
}

// find recipes that match the search in name, description, or tags
function filterRecipes(query) {
	const filtered = recipes.filter((recipe) => {
		return (
			recipe.name.toLowerCase().includes(query) ||
			recipe.description.toLowerCase().includes(query) ||
			recipe.tags.find((tag) => tag.toLowerCase().includes(query))
		);
	});

	// sort by recipe name
	const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));
	return sorted;
}

function searchHandler(event) {
	event.preventDefault();

	const searchInput = document.querySelector('#search');
	const query = searchInput.value.toLowerCase().trim();

	// if search is empty, just show a random recipe again
	if (query === '') {
		renderRecipes([getRandomListEntry(recipes)]);
		return;
	}

	renderRecipes(filterRecipes(query));
}

function init() {
	// show one random recipe when the page loads
	const recipe = getRandomListEntry(recipes);
	renderRecipes([recipe]);
}

init();

document.querySelector('.search').addEventListener('submit', searchHandler);
