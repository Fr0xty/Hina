import '../scss/Navbar.scss';
import hina_pfp from '../images/hina_pfp.png';
import { useEffect } from 'react';

const Navbar = ({ solidBackground }: { solidBackground?: boolean }) => {
    useEffect(() => {
        const navbar = document.querySelector('.Navbar');
        const burgerMenu = document.querySelector('input');

        if (solidBackground) {
            navbar!.classList.add('hasBackgroundColor');
            // @ts-ignore
            navbar!.style.position = 'relative';
            return;
        }

        document.addEventListener('wheel', () => {
            const navbarComponent = document.querySelector('.Navbar');
            window.scrollY >= 100
                ? navbarComponent!.classList.add('hasBackgroundColor')
                : navbarComponent!.classList.remove('hasBackgroundColor');
        });

        burgerMenu?.addEventListener('change', () => {
            navbar?.classList.toggle('toggleMobileMenu');
        });
    }, []);

    return (
        <div className="Navbar">
            <div className="main">
                <div className="title">
                    <h2>
                        <a href="/">HinaWeb</a>
                    </h2>
                    <img src={hina_pfp} alt="logo" />
                </div>
                <label className="burgerMenu" htmlFor="check">
                    <input type="checkbox" id="check" />
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>
            <ul>
                <li>
                    <a
                        href="https://discord.com/api/oauth2/authorize?client_id=769125937731338290&scope=bot+applications.commands&permissions=1099511627776"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Invite
                    </a>
                </li>
                <li>
                    <a
                        href="https://github.com/Fr0xty/Hina"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Repository
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
