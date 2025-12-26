import React from 'react'
import Nav from '../Components/Nav.jsx'
import Team from "./Team.jsx"
import Contact from './Contact.jsx'
import Events from './Events.jsx'
import Aboutus from './Aboutus.jsx'
import Main from '../Components/Main.jsx'
import Memories from './Memories.jsx'
const Home = () => {
  return (
    <div className="bg-white w-full overflow-hidden">
      <Nav />

      <section id="home" >
        <Main />
        
      </section>

      <section id="about">
        <Aboutus />
      </section>

      <section id="team">
        <Team />
      </section>

      <section id="events">
        <Events />
      </section>
      <section id="memories">
        <Memories />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default Home;


