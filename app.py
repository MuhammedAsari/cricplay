from flask import Flask,jsonify,request,render_template
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('cric.html')

@app.route('/admin')
def admin():
    return render_template('admin.html')

def get_db():
    conn = sqlite3.connect('cricket.db')
    return conn
def init_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
                    CREATE TABLE IF NOT EXISTS teams(
                        id INTEGER PRIMARY KEY,
                        name TEXT,
                        won INTEGER,
                        lost INTEGER,
                        points INTEGER,
                        nrr REAL,
                        position INTEGER,
                        played INTEGER
                    )
                """)
    
    cursor.execute("""
                    CREATE TABLE IF NOT EXISTS players(
                        id INTEGER PRIMARY KEY,
                        name TEXT,
                        team_id INTEGER,
                        role TEXT,
                        matches INTEGER,
                        runs INTEGER,
                        wickets INTEGER,
                        avg REAL,
                        sr REAL,
                        fifties INTEGER,
                        hundreds INTEGER,
                        economy REAL
                    )
                """)
    
    cursor.execute("""
                    CREATE TABLE IF NOT EXISTS matches(
                        id INTEGER PRIMARY KEY,
                        match_number INTEGER,
                        team1 TEXT,
                        team2 TEXT,
                        score1 TEXT,
                        score2 TEXT,
                        overs1 TEXT,
                        overs2 TEXT,
                        status TEXT,
                        result TEXT
                    )
                """)
    
    cursor.execute("""
                    CREATE TABLE IF NOT EXISTS scorecards(
                        id INTEGER PRIMARY KEY,
                        match_id INTEGER,
                        player_id INTEGER,
                        runs INTEGER,
                        balls INTEGER,
                        wickets INTEGER,
                        overs text
                    )
                """)
    
    conn.commit()
    conn.close()

@app.route('/api/delete-team/<int:id>',methods=['DELETE'])
def delete_team(id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM teams WHERE id=?",(id,))

    conn.commit()
    conn.close()
    return jsonify({'message' : 'team deleted'})


@app.route('/api/delete-player/<int:id>',methods=['DELETE'])
def delete_player(id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM players WHERE id=?",(id,))

    conn.commit()
    conn.close()
    return jsonify({'message' : 'player deleted'})


@app.route('/api/delete-match/<int:id>',methods=['DELETE'])
def delete_match(id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM matches WHERE id=?",(id,))

    conn.commit()
    conn.close()
    return jsonify({'message' : 'match deleted'})

@app.route('/api/teams')
def get_teams():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM teams")
    rows = cursor.fetchall()

    teams = []
    for row in rows:
        teams.append({
            'id' : row[0],
            'name' : row[1],
            'won' : row[2],
            'lost' : row[3],
            'points' : row[4],
            'nrr' : row[5],
            'position' : row[6],
            'played' : row[7]
        })

    conn.close()
    return jsonify(teams)

@app.route('/api/players')
def get_players():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""SELECT players.*, teams.name as team_name
    FROM players
    JOIN teams ON players.team_id = teams.id""")
    rows = cursor.fetchall()

    players = []
    for row in rows:
        players.append({
            'id' : row[0],
            'name' : row[1],
            'team_id' : row[2],
            'role' : row[3],
            'matches' : row[4],
            'runs' : row[5],
            'wickets' : row[6],
            'avg' : row[7],
            'sr' : row[8],
            'fifties' : row[9],
            'hundreds' : row[10],
            'economy' : row[11],
            'team' : row[12]
        })

    conn.close()
    return jsonify(players)

@app.route('/api/matches')
def get_matches():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM matches")
    rows = cursor.fetchall()

    matches = []
    for row in rows:
        matches.append({
            'id' : row[0],
            'matchNumber' : row[1],
            'team1' : row[2],
            'team2' : row[3],
            'score1' : row[4],
            'score2' : row[5],
            'overs1' : row[6],
            'overs2' : row[7],
            'status' : row[8],
            'result' : row[9],
        })

    conn.close()
    return jsonify(matches)

@app.route('/api/add-team', methods=['POST'])
def add_team():
    conn = get_db()
    cursor = conn.cursor()
    data = request.json

    for team in data:
        name = team['name']
        won = team['won']
        lost = team['lost']
        points = team['points']
        nrr = team['nrr']
        position = team['position']
        played = team['played']
        cursor.execute(" INSERT INTO teams (name,won,lost,points,nrr,position,played) VALUES(?,?,?,?,?,?,?)",
                    (name,won,lost,points,nrr,position,played))
    
    conn.commit()
    conn.close()

    return jsonify({'message' : 'team added'})

@app.route('/api/add-players', methods = ['POST'])
def add_players():
    conn = get_db()
    cursor = conn.cursor()
    data = request.json

    for player in data:
        name = player['name']
        team_id = player['team_id']
        role = player['role']
        matches = player['matches']
        runs = player['runs']
        wickets = player['wickets']
        avg = player['avg']
        sr = player['sr']
        fifties = player['fifties']
        hundreds = player['hundreds']
        economy = player['economy']

        cursor.execute(" INSERT INTO players (name,team_id,role,matches,runs,wickets,avg,sr,fifties,hundreds,economy)VALUES(?,?,?,?,?,?,?,?,?,?,?)",
                    (name,team_id,role,matches,runs,wickets,avg,sr,fifties,hundreds,economy))
    
    conn.commit()
    conn.close()

    return jsonify({'message' : 'players added'})

@app.route('/api/add-matches', methods = ['POST'])
def add_matches():
    conn = get_db()
    cursor = conn.cursor()
    data = request.json

    for match in data:
        match_number = match['match_number']
        team1 = match['team1']
        team2 = match['team2']
        score1 = match['score1']
        score2 = match['score2']
        overs1 = match['overs1']
        overs2 = match['overs2']
        status = match['status']
        result = match['result']

        cursor.execute(" INSERT INTO matches (match_number,team1,team2,score1,score2,overs1,overs2,status,result)VALUES(?,?,?,?,?,?,?,?,?)",
                    (match_number,team1,team2,score1,score2,overs1,overs2,status,result))
    
    conn.commit()
    conn.close()

    return jsonify({'message' : 'matches added'})

init_db()

if __name__ == '__main__':
    app.run(debug=True)