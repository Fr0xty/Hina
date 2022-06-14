import { useEffect, useState } from 'react';
import '../scss/Hero.scss';

const Hero = () => {
    const [heroImage, setHeroImage] = useState();

    useEffect(() => {
        const fetchImage = async () => {
            const image = await fetch(
                'https://api.waifu.im/random/?selected_tags=waifu&is_nsfw=false'
            );
            const imageJSON = await image.json();
            setHeroImage(imageJSON.images[0].url);
        };
        fetchImage();
    }, []);

    return (
        <div className="hero no-select">
            <div className="content">
                <div className="texts">
                    <h1>
                        Welcome To <br />
                        <span>TajiMisé</span> Store!
                    </h1>
                    <p>
                        Quality, Custom-Tailored Art is our raison d'être. <i>Anime</i>,{' '}
                        <i>Manga</i> or <i>Game</i> characters you ruminate, why not bring them to
                        reality?
                    </p>
                    <div className="action-row">
                        <a href={'hi'}>
                            <button>{'a'}</button>
                        </a>
                        <pre>{'a'}</pre>
                    </div>
                </div>
                <img className="hero-visual" src={heroImage} alt="visual" />
            </div>
        </div>
    );
};

export default Hero;
