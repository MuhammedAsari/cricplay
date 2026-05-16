const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.section');

tabs.forEach(tab =>{
    tab.addEventListener('click',function(){
        tabs.forEach(t => t.classList.remove('active'));

        sections.forEach(s => s.classList.remove('active'));

        this.classList.add('active');

        let tabid = this.dataset.tab;
        document.querySelector('#' + tabid).classList.add('active')
    })
})

function renderMatches(){
    fetch('https://web-production-03dfe.up.railway.app/api/matches')
         .then(response => response.json())
         .then(matches =>{
            let html = '';
            matches.forEach(match =>{
                html += `<div class= 'score-card'>
                    <div class='match-meta'>
                        <span>Match ${match.matchNumber}</span>
                        <span class = "${match.status === 'Live' ? 'status-live' : 'status-done'}">
                            ${match.status === 'Live' ? '●Live' : 'Completed'}
                        </span>
                    </div>
                    <div class='team-row'>
                        <span>${match.team1}</span>
                        <span>${match.score1} ${match.overs1} ov</span>
                    </div>
                    <div class='team-row'>
                        <span>${match.team2}</span>
                        <span>${match.score2} ${match.overs2} ov</span>
                    </div>
                    <p class='result-tag'>${match.result}</p>
                </div>`;
            })
            document.querySelector('#score-grid').innerHTML = html;
         })
}

renderMatches();

function renderBatters(){
    fetch('https://web-production-03dfe.up.railway.app/api/players')
        .then(response => response.json())
        .then(players =>{
            let batters = players.filter(p =>
                p.role === 'Batsman' || p.role === 'All-rounder'
            )

            let html = '';
            batters.forEach((batter,index) =>{
        html += `<tr>
                    <td>${index+1}</td>
                    <td>${batter.name}</td>
                    <td>${batter.team}</td>
                    <td>${batter.runs}</td>
                    <td>${batter.matches}</td>
                    <td>${batter.avg}</td>
                    <td>${batter.sr}</td>
                    <td>${batter.fifties}</td>
                    <td>${batter.hundreds}</td>
                 </tr>`
            })
            document.querySelector('#bat-body').innerHTML = html;
        })
}

renderBatters();

function renderBowlers(){
    fetch('https://web-production-03dfe.up.railway.app/api/players')
        .then(response => response.json())
        .then(players =>{
            let bowlers = players.filter(p =>
                p.role === 'Bowler' || p.role === 'All-rounder'
            )

            let html = '';
            bowlers.forEach((bowler,index) => {
                html += `<tr>
                    <td>${index+1}</td>
                    <td>${bowler.name}</td>
                    <td>${bowler.team}</td>
                    <td>${bowler.wickets}</td>
                    <td>${bowler.matches}</td>
                    <td>${bowler.overs}</td>
                    <td>${bowler.runs}</td>
                    <td>${bowler.avg}</td>
                    <td>${bowler.economy}</td>
                 </tr>`
            })
            document.querySelector('#bowl-body').innerHTML = html;
        })
}

renderBowlers();

function renderPlayers(){
    fetch('https://web-production-03dfe.up.railway.app/api/players')
        .then(response => response.json())
        .then(players =>{
            let html = '';
            
            players.forEach(player => {
                html += `<div class='player-card'>
                            <div class='player-header'>
                                <p class='player-name'>${player.name}</p>
                                <p class='player-role'>${player.role}</p>
                                <span class='player-team'>${player.team}</span>
                            </div>

                            <div class='player-stats'>
                                <div class='stat'>
                                    <span class='stat-value'>${player.matches}</span>
                                    <span class='stat-label'>Matches</span>
                                </div>
                                <div class='stat'>
                                    <span class='stat-value'>${player.runs}</span>
                                    <span class='stat-label'>Runs</span>
                                </div>
                                <div class='stat'>
                                    <span class='stat-value'>${player.wickets}</span>
                                    <span class='stat-label'>Wickets</span>
                                </div>
                            </div>
                        </div>`
            })

            document.querySelector('#player-grid').innerHTML = html;
        })
}

renderPlayers();

function renderRankings(){
    fetch('https://web-production-03dfe.up.railway.app/api/teams')
        .then(response => response.json())
        .then(teams => {
            let html = '';
            teams.forEach(team => {
                html += `<tr>
                    <td>${team.position}</td>
                    <td>${team.name}</td>
                    <td>${team.played}</td>
                    <td>${team.won}</td>
                    <td>${team.lost}</td>
                    <td>${team.points}</td>
                    <td class="${team.nrr >= 0 ? 'nrr-positive' : 'nrr-negative'}">
                        ${team.nrr}
                    </td>
                    <td>-</td>
                 </tr>`
            })
            document.querySelector('#rank-body').innerHTML = html;
        })
}

renderRankings();