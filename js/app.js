// Load Categories
const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategories(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }

}

// Display Categories
const displayCategories = categories => {
    const categoriesContainer = document.getElementById('categories-container');

    categories.forEach(category => {
        console.log(category);
        const categoryLi = document.createElement('li');
        categoryLi.classList.add('nav-item');
        categoryLi.innerHTML = `
        <button onclick="loadNews('${category.category_id}')" class="nav-link px-3">${category.category_name}</button>
        `;
        categoriesContainer.appendChild(categoryLi);
    });

    // console.log(categories);
}

// Load News
const loadNews = async (category_id) => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data);
    }
    catch (error) {
        console.log(error);
    }

}

// Display News
const displayNews = allNews => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;

    //Display No News Found Message
    const noNews = document.getElementById('no-news');
    if (allNews.length === 0) {
        noNews.classList.remove('d-none');
    }
    else {
        noNews.classList.add('d-none');
    }

    //To show news numbers
    const newsNumberDiv = document.getElementById('news-numbers-container');
    newsNumberDiv.innerHTML = `<h3 class="text-warning text-center">${allNews.length} items found for this category. </h3>`

    //Sort news by most views
    allNews.sort((a, b) => {
        return b.total_view - a.total_view
    });

    // Display all news
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
                <p class="card-text">${news.details.slice(0, 900)}</p>
            </div>
            <div class="row row-cols-4 pt-3 d-flex justify-content-between">
                <div class="col">
                    <div class="row">
                        <div class="col">
                           <img src="${news.author.img}" class="img-fluid rounded-circle">
                        </div>
                        <div class="col">
                            ${news.author.name ? news.author.name : 'No data available'}
                        </div>
                    </div>
                </div>
                <div class="col">${news.total_view ? news.total_view : 'No data available'}</div>
                
                <div class="col">
                    <button onclick="loadNewsDetails('${news._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#NewsDetailsModal" href="#">
                        News Details
                    </button>
                </div>
            </div>
        </div>
    </div>
        `;
        newsContainer.appendChild(newsDiv);
    });
    // console.log(data);
    toggleSpinner(false);           //Stop Spinner
}

const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if (isLoading) {
        spinnerSection.classList.remove('d-none')
    }
    else {
        spinnerSection.classList.add('d-none');
    }
}
// loadNews();

// Load News Details
const loadNewsDetails = async news_id => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data[0]);
    }
    catch (error) {
        console.log(error);
    }
}

//Display News Details in Modal
const displayNewsDetails = news => {
    console.log(news);
    const modalTitle = document.getElementById('NewsDetailsModalLabel');
    modalTitle.innerText = news.title;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
    <p><span>Author: ${news.author.name ? news.author.name : 'No data available'}</span> <span>Total Views: ${news.total_view ? news.total_view : 'No data available'}</span></p>
    <p>${news.details}</p>
    `
}

loadCategories();
loadNews('08')
