fetch('https://openlibrary.org/search.json?q=javascript')
.then(res => res.json())
.then(data => console.log(data));