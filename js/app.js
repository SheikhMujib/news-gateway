const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
}

const displayCategories = categories => {

    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        const categoryLi = document.createElement('li');
        categoryLi.classList.add('nav-item');
        categoryLi.innerHTML = `
        <a onclick="loadNews('${category.category_id}')" class="nav-link px-3" href="#">${category.category_name}</a>
        `;
        categoriesContainer.appendChild(categoryLi);
    });
    // console.log(categories);
}

const loadNews = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
}

// const displayNews = news =>{

// }
// loadNews();


loadCategories();

// <a onclick="loadNews(${category.category_id})" class="nav-link px-3" href="#">${category.category_name}</a>
//<button onclick="loadNews('${category.category_id}')" class="nav-link px-3">${category.category_name}</button>