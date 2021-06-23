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
            <div class="col-md-4">
                <a href="${recipe.url}" style = "text-decoration: none; color: black;">
                    <div class="row g-0 border rounded flex-md-row mb-4 shadow-sm position-relative" style = "border-color: #E3E8E6 !important; box-shadow: 0 2px 5px 0 rgba(227, 232, 230, 1), 0 5px 15px 0 rgba(227, 232, 230,.1) !important;">
                        <img class = "pull-right img-fluid" src="${recipe.image}" alt="Recipe image" style = "max-width: 100%; height: auto;">
                        <div style="position: absolute; top: 10%; width: 90%">
                          <p style="font-size: 30px; color: white; text-shadow: 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000; text-align: center; font-weight: 900; padding-left: 10%">${recipe.title.toUpperCase()}</p>
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
