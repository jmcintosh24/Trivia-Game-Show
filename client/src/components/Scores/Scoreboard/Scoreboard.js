import React, { Component } from 'react';
import './Scoreboard.css';

class Scoreboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            submitted: false,
            scoreboardData: [],
        };
    }

    componentDidMount() {
        this.fetchScoreboardData();
    }

    fetchScoreboardData() {
        fetch('http://localhost:5000/api/getScoreboard')
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.setState({ scoreboardData: data });
        })
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    };

    handleSubmit = () => {
        this.setState({ submitted: true });

        fetch('http://localhost:5000/api/postScore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                score: this.props.score,
            }),
        })
        .then(response => {
            this.fetchScoreboardData();
            return response.json();
        })
    };

    render() {
        const players = this.state.scoreboardData.map((entry, index) => ({
            name: entry.username,
            score: entry.score,
            date: entry.date,
            key: index,
        }));

        players.sort((a, b) => (b.score > a.score) ? 1 : -1);

        return (
            <div className="scoreboard-container">
                Score: {this.props.score}
                <div className="username-input">
                    
                    <label>Enter Username: </label>
                    <input
                        type="text"
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                        disabled={this.state.submitted}
                    />
                    <button onClick={this.handleSubmit} disabled={this.state.submitted}>
                        Submit
                    </button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>PLAYER</th>
                            <th>SCORE</th>
                            <th>DATE PLAYED</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) => (
                            <tr key={player.key}>
                                <td>{player.name}</td>
                                <td>{player.score}</td>
                                <td>{player.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Scoreboard;
