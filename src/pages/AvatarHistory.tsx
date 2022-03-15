import { ImgHTMLAttributes, ReactElement, ReactHTMLElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { JsxSelfClosingElement } from 'typescript';

const AvatarHistory = () => {
    const { userId } = useParams();
    const [images, setImages] = useState('loading..');

    useEffect(() => {
        const fetching = async () => {
            const req = await fetch(`/api/fetch-avatar-history/${userId}`);
            if (req.status === 404) return <p>User is not recorded / invalid userId.</p>;
            var avatars: string[] = await req.json();

            const images: any[] = [];
            avatars.map((avatar) => images.push(<img src={avatar} />));
            setImages(images.join());
        };
        fetching();
    }, []);

    return <div className="AvatarHistory">{images}</div>;
};

export default AvatarHistory;
