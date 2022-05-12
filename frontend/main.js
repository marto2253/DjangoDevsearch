

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

    for (let i = 0; projects.length > i; i++){
        let project = projects[i]

        let project_card = `
        <div class="project--card">
            <img src="http://127.0.0.1:8000${project.featured_image}"/>
            <div>
                <div class="card--header">
                    <h3>${project.title}</h3>
                    <strong class="vote--option">&#43</strong>
                    <strong class="vote--option">&#8722</strong>
                </div>
                <i>${project.vote_ration}% Positive Feedback</i>
                <p>${project.description.substring(0,150)}</p>
            </div>
        </div>
`
        projects_wrapper.innerHTML += project_card
    }
}

get_projects()
