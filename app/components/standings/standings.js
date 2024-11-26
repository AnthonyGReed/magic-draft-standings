'use client';

import { useState, useEffect } from 'react';

export default function Standings() {
    const [standings, setStandings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/league.json')
            const data = await response.json();
            setStandings(data);
        };
        fetchData();
    }, []);

    return (
        <div style={{ padding: '1rem' }}>
            <h1>League Standings</h1>
            <table border='1' cellPadding="10">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Record</th>
                        <th>Bonus Points</th>
                        <th>League Points</th>
                    </tr>
                </thead>
                <tbody>
                    {standings
                        .sort((a, b) => (((b.wins * 2) + b.attendance + b.bonus) - ((a.wins * 2) + a.attendance + a.bonus)))
                        .map((player, index) => (
                            <tr key={player.id}>
                                <td>{index + 1}</td>
                                <td>{player.name}</td>
                                <td>{player.wins + "-" + player.losses + "-" + player.draws}</td>
                                <td>{player.attendance + player.bonus}</td>
                                <td>{(player.wins * 2) + player.attendance + player.bonus}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}