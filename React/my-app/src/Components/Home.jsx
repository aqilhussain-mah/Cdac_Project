import React , {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';
import { AppContext } from "./AppContext";

const Home = () => {
    const { role } = useContext(AppContext);

    return (
        <div className='Home-container'>
            <div className="container-fluid center">

                <div className="center">
                    <img src="/Home[1].png" alt="Welcome" className='img-size' />
                    <div className="overlay-text">
                        Let's Bring the Happiness Together
                    </div>
                    <button type="button" className="overlay-button">
                        {role === null || role === "none" ? (
                            <NavLink to="/Login" className="nav-link" activeClassName="active">
                                Book Now
                            </NavLink>
                        ) : (
                            <NavLink to="/Booking" className="nav-link" activeClassName="active">
                                Book Now
                            </NavLink>
                        )}
                    </button>
                </div>

                <div className="card">
                    <div id="scrolingimgs" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="2.jpg" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="Welcome.jpg" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="2.jpg" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="2.jpg" className="d-block w-100" alt="..." />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#scrolingimgs" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#scrolingimgs" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
