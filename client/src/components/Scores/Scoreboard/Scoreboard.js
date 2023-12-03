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
        // Use fetch to get scoreboard info from the server
        fetch('http://localhost:5000/api/getScoreboard')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Scoreboard data:', data);
                this.setState({ scoreboardData: data });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    };

    handleSubmit = () => {
        // Update state to indicate that a submission has been made
        this.setState({ submitted: true });

        // Use fetch to send the username and score to the server
        fetch('http://localhost:5000/api/postScore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                score: this.props.score, // You can replace this with the actual score
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Server response:', data);
                // Fetch the updated scoreboard data after submission
                this.fetchScoreboardData();
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    render() {
        const players = this.state.scoreboardData.map((entry, index) => ({
            name: entry.username,
            score: entry.score,
            date: entry.date,
            key: index,
        }));

        // Sort the scoreboard based on scores
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
