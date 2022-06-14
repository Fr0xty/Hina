import '../scss/Navbar.scss';
import hina_pfp from '../images/hina_pfp.png';
import { useEffect } from 'react';

const Navbar = ({ currentPage }: { currentPage?: 'home' | 'about' | 'products' }) => {
    useEffect(() => {
        if (!currentPage) return;
        document.querySelector(`.navbar a.${currentPage}-nav`)?.classList.add('current-page');
    }, []);

    return (
        <div className="navbar-wrapper">
            <div className="mobile-menu-backgrounds">
                <div className="background-1" />
                <div className="background-2" />
                <div className="background-3" />
            </div>
            <div className="navbar no-select">
                <a href="/">
                    <h1>HinaWeb</h1>
                    <img src={hina_pfp} alt="tajimise logo" />
                </a>

                <nav>
                    <a href="/" className="home-nav">
                        Home
                    </a>
                    <a href="/invite">Invite</a>
                    <a href="/repository">Repository</a>
                    <a target="_blank" rel="noreferrer" href="/discord">
                        Discord_Server
                    </a>
                </nav>

                <div
                    className="burger-menu"
                    onClick={() =>
                        document.querySelector('.navbar-wrapper')?.classList.toggle('open-nav')
                    }
                >
                    <span />
                    <span />
                    <span />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
