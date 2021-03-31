import React , {useEffect , useState} from 'react'
import Recipe from './Recipe';
import './App.css'; 

function App() {
  const APP_ID= "71cd5225";
  const APP_KEY = "c9def1ca0adf8be852b61502379f3df4";

  const[recipes,setRecipes] = useState([]);
  const[search , setSearch] =useState('');
  const[query , setQuery] = useState('chicken');

    
  useEffect(() => {
    getRecipe();
  },[query]);

  const getRecipe = async()=>{
    const response = await fetch( `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits)
    console.log(data.hits)
  };

  const updateSearch = (e) =>{
    setSearch(e.target.value);
  }

  const getSearch= e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search}  onChange={updateSearch}/>
        <button className="search-btn" type="submit">Search</button>
      </form>
      <div className="recipe">
      {recipes.map(recipe => (
        <Recipe
         key={recipe.recipe.label}
         title={recipe.recipe.label}
         calories={recipe.recipe.calories}
         img={recipe.recipe.image}
         ingredients={recipe.recipe.ingredients}
         />
      ))};
      </div>
    </div>
  );
}

export default App;
