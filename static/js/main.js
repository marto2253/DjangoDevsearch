// get search form and page links
    let search_form = document.getElementById('search_form')
    let page_link = document.getElementsByClassName('page-link')

    // ensure search form exists

    if(search_form){
        for(let i = 0; page_link.length > i; i++){
            page_link[i].addEventListener('click', function (e) {
                e.preventDefault()

                // get the data atribute

                let page = this.dataset.page
                console.log('Page:', page)

                // add hidden search input to form
                search_form.innerHTML += `<input value=${page} name='page' hidden/>`;

                search_form.submit();
            })
        }
    }