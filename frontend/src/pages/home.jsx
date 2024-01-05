import React from 'react';
import BTimport from '../elements/BTimport/BTimport.jsx'
import NavBarbt from '../elements/NavBar/navbarbt.jsx'
import UncontrolledCarousel from '../elements/Carousel/Carousel.jsx'
import Box from '../elements/InformationBox/Box.jsx'
import Badge from 'react-bootstrap/Badge';

const BoxInformationTextCBASS = "A portable experimental system to run standardized short-term acute heat stress assays. CBASS assays allow determination of the ED50, the standardized temperature threshold at which 50% of initial photosystem efficiency is lost.";
const BoxRefTextCBASS = "Some Refs"


function Home() {
 return (
    <div className="App">
      <NavBarbt/>
      <BTimport/>
      <div style={{marginBottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
       <UncontrolledCarousel/>
      </div>
      <div style={{padding: '30px',margin: '20px'}}>
        <h1>
          CBASS System <Badge bg="secondary">New</Badge>
        </h1>
        <Box information={BoxInformationTextCBASS}  Refs={BoxRefTextCBASS}/>
      </div>
    </div>
 );
}

export default Home;