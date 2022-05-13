let form = document.getElementById('login-form')

form.addEventListener('submit', (e) =>{
    e.preventDefault()  // this prevents the page from refreshing so that we could add other functionalities.

    // takes the username and password from the html form.
    let form_data = {
        'username':form.username.value,
        'password': form.password.value
    }

    fetch('http://127.0.0.1:8000/api/users/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form_data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('DATA:', data.access)
            if(data.access){
                sessionStorage.setItem('token', data.access)
                window.location = 'file:///C:/Users/georg/Desktop/my_projects/Django/DjangoDevsearch/frontend/projects-list.html'
            }else(
                alert('Username or Password is incorrect.')
            )
        })
})