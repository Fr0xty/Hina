import '../scss/Navbar.scss';

const Navbar = () => {
    return (
        <div className="Navbar">
            <div className="title">
                <h2>
                    <a href="/">HinaWeb</a>
                </h2>
            </div>
            <ul>
                <li>
                    <a href="/invite">Invite</a>
                </li>
                <li>
                    <a href="https://github.com/Fr0xty/Hina" target="_blank">
                        Repository
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
