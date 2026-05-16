const tabs = document.querySelectorAll('.admin-tab')
const sections = document.querySelectorAll('.admin-section')

tabs.forEach(tab =>{
    tab.addEventListener('click',function(){
        tabs.forEach(t => t.classList.remove('active'))
        sections.forEach(s => s.classList.remove('active'))

        this.classList.add('active');
        let tabid = this.dataset.tab;
        document.querySelector('#' + tabid).classList.add('active')
    })
})


document.querySelector('#login-btn').addEventListener('click', function(){
    let password = document.querySelector('#password-input').value

    if(password === 'cricket123'){
        document.querySelector('#login-section').style.display = 'none'
        document.querySelector('#dashboard-section').style.display = 'block'
    }
    else{
        document.querySelector('#error-msg').style.display = 'block'
        document.querySelector('#password-input').value = ''
    }
})

document.querySelector('#add-team-btn').addEventListener('click', function(){
    let name = document.querySelector('#team-name').value;
    let won = document.querySelector('#team-won').value;
    let lost = document.querySelector('#team-lost').value;
    let points = document.querySelector('#team-points').value;
    let nrr = document.querySelector('#team-nrr').value;
    let position = document.querySelector('#team-position').value;
    let played = document.querySelector('#team-played').value;

    fetch('http://127.0.0.1:5000/api/add-team', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify([{
            name : name,
            won : won,
            lost : lost,
            points :  points,
            nrr : nrr,
            position : position,
            played : played
        }])
    })
    .then(response => response.json())
    .then(data => {
        alert('Team Added')
    })
})


document.querySelector('#add-player-btn').addEventListener('click', function(){
    let playerName = document.querySelector('#player-name').value;
    let teamId = Number(document.querySelector('#player-team-id').value);
    let role = document.querySelector('#player-role').value;
    let matches = Number(document.querySelector('#player-matches').value);
    let runs = Number(document.querySelector('#player-runs').value);
    let avg = Number(document.querySelector('#player-avg').value);
    let sr = Number(document.querySelector('#player-sr').value);
    let fifties = Number(document.querySelector('#player-fifties').value);
    let hundreds = Number(document.querySelector('#player-hundreds').value);
    let wickets = Number(document.querySelector('#player-wickets').value);
    let economy = Number(document.querySelector('#player-economy').value);

    console.log({
    name: playerName,
    team_id: teamId,
    role: role,
    matches: matches,
    runs: runs,
    avg: avg,
    sr: sr,
    fifties: fifties,
    hundreds: hundreds,
    wickets: wickets,
    economy: economy
})

    fetch('http://127.0.0.1:5000/api/add-players', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify([{
            name : playerName,
            team_id : teamId,
            role : role,
            matches : matches,
            runs :  runs,
            avg : avg,
            sr : sr,
            fifties : fifties,
            hundreds : hundreds,
            wickets : wickets,
            economy : economy
        }])
    })
    .then(response => response.json())
    .then(data => {
        alert('Player Added')
    })
})

document.querySelector('#add-match-btn').addEventListener('click', function(){
    let matchNumber = Number(document.querySelector('#match-match-number').value);
    let team1 = document.querySelector('#match-team1').value;
    let team2 = document.querySelector('#match-team2').value;
    let score1 = document.querySelector('#match-score1').value;
    let score2 = document.querySelector('#match-score2').value;
    let overs1 = document.querySelector('#match-overs1').value;
    let overs2 = document.querySelector('#match-overs2').value;
    let status = document.querySelector('#match-status').value;
    let result = document.querySelector('#match-result').value;

    fetch('http://127.0.0.1:5000/api/add-matches', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify([{
            match_number : matchNumber,
            team1 : team1,
            team2 : team2,
            score1 : score1,
            score2 : score2,
            overs1 :  overs1,
            overs2 :  overs2,
            status : status,
            result : result,
        }])
    })
    .then(response => response.json())
    .then(data => {
        alert('Match Added')
    })
})

function loadTeams(){
    fetch('http://127.0.0.1:5000/api/teams')
        .then(response => response.json())
        .then(teams => {
            let select = document.querySelector('#player-team-id')
            teams.forEach(team => {
                select.innerHTML += `<option value="${team.id}">${team.name}</option>`
            })
        })
}
loadTeams()

function loadTeamList(){
    fetch('http://127.0.0.1:5000/api/teams')
    .then(response => response.json())
    .then(teams => {
        let html = ''
        teams.forEach(team => {
            html += `<div class='list-item'>
                <span>${team.name}</span>
                <button onclick="deleteTeam(${team.id})">Delete</button>
            </div>`
        })
        document.querySelector('#teams-list').innerHTML = html
    })
}
loadTeamList()

function deleteTeam(id){
    fetch(`http://127.0.0.1:5000/api/delete-team/${id}`,{
        method : 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert('Team Deleted')
        loadTeamList()
    })
}


function loadPlayerList(){
    fetch('http://127.0.0.1:5000/api/players')
    .then(response => response.json())
    .then(players => {
        let html = ''
        players.forEach(player => {
            html += `<div class='list-item'>
                <span>${player.name}</span>
                <button onclick="deletePlayer(${player.id})">Delete</button>
            </div>`
        })
        document.querySelector('#players-list').innerHTML = html
    })
}
loadPlayerList()

function deletePlayer(id){
    fetch(`http://127.0.0.1:5000/api/delete-player/${id}`,{
        method : 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert('Player Deleted')
        loadPlayerList()
    })
}


function loadMatchList(){
    fetch('http://127.0.0.1:5000/api/matches')
    .then(response => response.json())
    .then(matches => {
        let html = ''
        matches.forEach(match => {
            html += `<div class='list-item'>
                <span>${match.team1} vs ${match.team2}</span>
                <button onclick="deleteMatch(${match.id})">Delete</button>
            </div>`
        })
        document.querySelector('#matches-list').innerHTML = html
    })
}
loadMatchList()

function deleteMatch(id){
    fetch(`http://127.0.0.1:5000/api/delete-match/${id}`,{
        method : 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert('Match Deleted')
        loadMatchList()
    })
}