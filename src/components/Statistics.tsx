import { useEffect, useState } from 'react';
import '../scss/Statistics.scss';

import guildIcon from '../images/guild_icon.png';
import userIcon from '../images/user_icon.png';
import commandIcon from '../images/command_icon.png';

const Statistics = () => {
    const [statistics, setStatistics] = useState({
        guildCount: 'loading..',
        userCount: 'loading..',
        commandCount: 'loading..',
    });

    useEffect(() => {
        const fetching = async () => {
            const req = await fetch('/api/hinaweb/statistics');
            const stats = await req.json();

            setStatistics(stats);
        };
        fetching();
    }, []);

    return (
        <div className="Statistics">
            <div>
                <img src={guildIcon} alt="server icon" />
                <p>
                    is in <b>{statistics.guildCount}</b> servers!
                </p>
            </div>
            <div className="user-stats">
                <img src={userIcon} alt="user icon" />
                <p>
                    serving approximately <b>{statistics.userCount}</b> unique users!
                </p>
            </div>
            <div>
                <img src={commandIcon} alt="command icon" />
                <p>
                    has <b>{statistics.commandCount}</b> commands!
                </p>
            </div>
        </div>
    );
};
export default Statistics;
