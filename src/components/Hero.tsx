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
                        <span>HinaWeb</span>!
                    </h1>
                    <p>
                        Hina is a multi-purpose Discord bot. You can get help on command usages and
                        other information about Hina here.
                    </p>
                    <div className="action-row">
                        <a href="/command">
                            <button>Commands</button>
                        </a>
                        <a href="/discord">
                            <button>Discord Server</button>
                        </a>
                    </div>
                </div>
                <img className="hero-visual" src={heroImage} alt="visual" />
            </div>
        </div>
    );
};

export default Hero;
