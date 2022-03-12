import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Statistics from '../components/Statistics';

const Home = () => {
    return (
        <div className="Home">
            <Navbar />
            <Hero />
            <Statistics />
        </div>
    );
};

export default Home;
