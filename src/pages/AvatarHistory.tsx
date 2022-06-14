import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../scss/AvatarHistory.scss';

const AvatarHistory = () => {
    const { userId } = useParams();
    const [avatars, setAvatars] = useState<string[]>([]);

    useEffect(() => {
        const fetching = async () => {
            const req = await fetch(`/api/fetch-avatar-history/${userId}`);
            if (req.status !== 200) return;

            const fetchedAvatars = await req.json();
            setAvatars([...fetchedAvatars]);
        };

        fetching();
    }, []);

    return (
        <div className="avatar-history">
            {avatars.length
                ? avatars.map((avatar) => (
                      <img
                          src={avatar}
                          className="avatar"
                          alt={`avatar ${avatars.indexOf(avatar)}`}
                      />
                  ))
                : 'User is not recorded / invalid userId.'}
        </div>
    );
};

export default AvatarHistory;
