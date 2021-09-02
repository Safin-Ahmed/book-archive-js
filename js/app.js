// Loading Spinner Toggle 
const toggleSpinner = display => {
    const spinnerBg = document.getElementById('spinner-overlay');
    const spinner = document.getElementById('spinner');
    spinnerBg.style.display = display;
    spinner.style.display = display;
}
// Get Search Field Value 
const getSearchText = () => {
    toggleSpinner('block');
    const errorContainer = document.getElementById('error');
    errorContainer.innerHTML = '';
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    searchField.value = '';
    loadData(searchFieldText);
}

// Load Data According To Search Value
const loadData = async data => {
   const getResponse = await fetch(`https://openlibrary.org/search.json?q=${data}`);
   const convertResponse = await getResponse.json();
   displayData(convertResponse);
}

// Display The Result in DOM 

const displayData = data => {
    console.log(data);
    const searchResults = document.getElementById('search-results');
    searchResults.textContent = '';
    const errorContainer = document.getElementById('error');
    if(data.numFound === 0 || !data){
        
        errorContainer.innerHTML = `
            <h3>Search Result Not Found! Please Try again</h3>
        `;
    }
    data.docs.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card shadow">
                <img src="https://covers.openlibrary.org/b/id/${element.cover_i ? element.cover_i : '404'}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-title">${element.title.slice(0, 50)}</h4>
                    <h6 class="card-title">Author Name: ${element.author_name ? element.author_name[0] : ''}</h6>
                    <h6 class="card-title">Publisher: ${element.publisher ? element.publisher[0] : ''}</h6>
                    <h6 class="card-title">First Published: ${element.publish_date ? element.publish_date[0] : ''}
                    </h6>
                </div>
            </div>
        `;
        searchResults.appendChild(div);
     });

     toggleSpinner('none');
}