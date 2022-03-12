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
        <div className="Hero">
            <div className="main">
                <h1>Welcome to HinaWeb!</h1>
                <p>
                    Hina is a multi-purpose Discord bot. You can get help on command usages and
                    other information about Hina here.
                    <br />
                    <br />
                    You might want:
                </p>
                <div className="hero-btns">
                    <button>
                        <a href="/commandhelp">Command Help</a>
                    </button>
                    <button>
                        <a href="https://discord.gg/VtQRrVCxg8" target="_blank">
                            Join Server
                        </a>
                    </button>
                </div>
            </div>
            <img src={heroImage} alt="hero image" />
        </div>
    );
};

export default Hero;
