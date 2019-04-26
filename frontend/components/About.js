import React, { Component } from 'react';
import styled from 'styled-components';

const AboutPage = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  justify-self: center;
  align-self: center;
  div {
    ul {
      list-style: '🌹';
    }
    max-width: ${props => props.theme.maxWidth};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin: 2rem 10vw;
    padding: 5rem;
    justify-self: center;
    align-self: center;
    justify-content: center;
    font-weight: lighter;
    font-size: 1.8rem;
  }
  .paper {
    padding: 2rem;
    text-align: left;
    position: relative;
    z-index: 2;

    &::after,
    ::before {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      position: absolute;
      content: '';
      background: #fff;
      transform: rotate(2deg);
      display: block;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      z-index: -2;
    }
    &::before {
      background: #fff;

      transform: rotate(0deg);
      z-index: -1;
    }
  }
  @media (${props => props.theme.phoneView}) {
    div {
      font-size: 1.2rem;
    }
  }
`;

const About = () => {
  return (
    <AboutPage>
      <div className="paper">
        <p>Hi there! I’m Michelle Eggers 😊,</p>
        <p>
          I started seriously crafting in May 2018, after my boyfriend, San,
          kept insisting I start, (He’s my biggest fan for my brand), Honeyfield
          Artistry. As a crafter, I’ve always loved working with different art
          mediums:
        </p>
        <ul>
          <li>Watercolor</li>
          <li>Crochet</li>
          <li>Acrylic paint</li>
          <li>Modern calligraphy</li>
        </ul>

        <p>
          Now, with the addition of my cricut, I can mix wood, vinyl, and glass
          into my crafts…the sky’s the limit! Some of my crafts include
          arrangements, wreaths, signs, and jewelry. But, what makes Honeyfield
          Artistry unique is the handmade felt flowers featured in my craft
          designs. Every felt flower that I make is hand cut to perfection!
        </p>

        <p>
          When I’m not crafting at the table by night, I’m working as a speech
          therapist by day at a SoCal school district. I occasionally pick up
          hours with private therapy students and clients at a nursing home. I
          also spend time with my pitt mix, Mumford (my 2nd biggest fan) No
          order is too arduous or challenging. I love to take on new projects
          and do custom work, including helping execute a client’s craft vision.
          I hope you enjoy my work and I would love to hear from you!
        </p>
      </div>
    </AboutPage>
  );
};

export default About;
