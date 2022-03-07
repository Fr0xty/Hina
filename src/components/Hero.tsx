import '../scss/Hero.scss';

const Hero = () => {
    return (
        <div className="Hero">
            <div className="main">
                <h1>Welcome to HinaWeb!</h1>
                <p>
                    Do you want more help on command usages? Or you want to know more about Hina?
                    Maybe get started by:
                </p>
                <button>
                    <a href="/commandhelp">Command Help</a>
                </button>
                <button>
                    <a href="/serverinvite">Join Server</a>
                </button>
            </div>
        </div>
    );
};

export default Hero;
