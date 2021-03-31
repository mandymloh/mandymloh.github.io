const recipesList = document.getElementById('recipesList');
const searchBar = document.getElementById('searchBar');
let daRecipes = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredRecipes = daRecipes.filter((recipe) => {
        return (
            recipe.content_type.toLowerCase().includes(searchString) ||
            recipe.title.toLowerCase().includes(searchString) ||
            recipe.flavor.toLowerCase().includes(searchString) ||
            recipe.ingredients.toLowerCase().includes(searchString)            
        );
    });
    displayRecipes(filteredRecipes);
});

const loadRecipes = async () => {
    try {
        const res = await fetch('search_cards.json');
        daRecipes = await res.json();
        displayRecipes(daRecipes);
    } catch (err) {
        console.error(err);
    }
};

        

const displayRecipes = (recipes) => {
    const htmlString = recipes
        .map((recipe) => {
            return `
            <div class="col-md-6">
                <a href="${recipe.url}" style = "text-decoration: none; color: black;">
                    <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative" style = "border-color: #e8d6d6 !important; box-shadow: 0 2px 5px 0 rgba(232, 214, 214, 1), 0 5px 15px 0 rgba(232, 214, 214,.1) !important;">
                    <div class="col p-4 d-flex flex-column position-static" style="width: 50%">
                        <strong class="d-inline-block mb-2 text-primary" style="color: #c95b3d !important;">Recipe</strong>
                        <h5 class="mb-0" style="padding-right: 10px; z-index: 1; word-wrap: break-word; hyphens: auto">${recipe.title}</h5>
                        <hr style = "color: #c95b3d !important; width: 80%;">
                    </div>
                    <div class="col-auto d-lg-block" style="width: 50%">
                        <img class = "pull-right" src="${recipe.image}" alt="Plated sesame spinach noodles, topped with ground soy sauce chicken and garnished with greens" width="200" height="250">
                    </div>
                    </div>
                </a> 
            </div>
        `;
        })
        .join('');
    recipesList.innerHTML = htmlString;
};

loadRecipes();
