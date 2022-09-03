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
        <button onclick="loadNews('${category.category_id}')" class="nav-link px-3">${category.category_name}</button>
        `;
        categoriesContainer.appendChild(categoryLi);
    });
    // console.log(categories);
}

const loadNews = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
    console.log(data.data);
}

const displayNews = cards => {

    const newsContainer = document.getElementById('news-container');
    cards.forEach(card => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card', 'mb-4');
        newsDiv.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${card.thumbnail_url}" class="img-fluid rounded-start p-3" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${card.title}</h5>
                    <p class="card-text">${card.details}</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
    });
    // console.log(data);
}

// loadNews();


loadCategories();

// <a onclick="loadNews(${category.category_id})" class="nav-link px-3" href="#">${category.category_name}</a>
//<button onclick="loadNews('${category.category_id}')" class="nav-link px-3">${category.category_name}</button>