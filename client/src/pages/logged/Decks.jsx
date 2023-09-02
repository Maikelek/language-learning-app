import React from 'react';
import Navbar from '../components/Navbar';

import flag from "../../data/flags/flag_de.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus} from '@fortawesome/free-solid-svg-icons';

const Decks = () => {
  return (
    <>
    
        <Navbar />

        <div className="container">
          
          <div className="deck">
            <div className="flag-holder">
              <img src={flag} alt="flag" />
            </div>
            <h3>German</h3>
          </div>

          <div className='plus'>
            <FontAwesomeIcon icon={faCirclePlus}/>
          </div>
        </div>

    </>
  )
}

export default Decks;