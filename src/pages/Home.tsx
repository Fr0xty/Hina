import '../scss/Home.scss';

import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Statistics from '../components/Statistics';

const Home = () => {
    return (
        <div className="home">
            <Navbar currentPage="home" />
            <Hero />
            <Statistics />
        </div>
    );
};

export default Home;
