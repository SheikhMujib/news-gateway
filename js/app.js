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

const displayNews = allNews => {

    const newsContainer = document.getElementById('news-container');
    allNews.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card', 'mb-4');
        newsDiv.innerHTML = `
        <div class="row g-0">
        <div class="col-md-4">
            <img src="${news.thumbnail_url}" class="img-fluid rounded-start p-3" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text">${news.details}</p>
            </div>
            <div class="row row-cols-4 pt-3 d-flex justify-content-between">
                <div class="col">
                    <div class="row">
                        <div class="col">
                           <img src="${news.author.img}" class="img-fluid rounded-circle">
                        </div>
                        <div class="col">
                            ${news.author.name}
                        </div>
                    </div>
                </div>
                <div class="col">${news.total_view}</div>
                
                <div class="col">Read More Button</div>
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
