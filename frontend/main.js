let login_button = document.getElementById('login-btn')
let logout_button = document.getElementById('logout-btn')

let token = sessionStorage.getItem('token')

if(token){
    logout_button.remove()
}else{
    login_button.remove()
}

logout_button.addEventListener('click', (e) =>{
    e.preventDefault()
    sessionStorage.removeItem('token')
    window.location = 'file:///C:/Users/georg/Desktop/my_projects/Django/DjangoDevsearch/frontend/login.html'
})


let projects_url = 'http://127.0.0.1:8000/api/projects/'

let get_projects = () => {
    fetch(projects_url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            build_projects(data)
        })
}

let build_projects = (projects) => {
    let projects_wrapper = document.getElementById('projects--wrapper')
    projects_wrapper.innerHTML = ''

    for (let i = 0; projects.length > i; i++){
        let project = projects[i]

        let project_card = `
        <div class="project--card">
            <img src="http://127.0.0.1:8000${project.featured_image}"/>
            <div>
                <div class="card--header">
                    <h3>${project.title}</h3>
                    <strong class="vote--option" data-vote="up" data-project="${project.id}">&#43</strong>
                    <strong class="vote--option" data-vote="down" data-project="${project.id}">&#8722</strong>
                </div>
                <i>${project.vote_ration}% Positive Feedback</i>
                <p>${project.description.substring(0,150)}</p>
            </div>
        </div>
`
        projects_wrapper.innerHTML += project_card
    }

    add_vote_events()
    //Add an event listener

}

let add_vote_events = () => {
    let vote_buttons = document.getElementsByClassName('vote--option')
    for (let i = 0; vote_buttons.length > i; i++){
        vote_buttons[i].addEventListener('click', (e) => {
            let token = sessionStorage.getItem('token')
            console.log('TOKEN:', token)
            let vote = e.target.dataset.vote
            let project = e.target.dataset.project

            fetch(`http://127.0.0.1:8000/api/projects/${project}/vote/`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({'value': vote})
            })
                .then(response => response.json())
                .then(data => {
                    console.log('SUCCCESS:', data)
                    get_projects()
                })
        })
    }
}

get_projects()
