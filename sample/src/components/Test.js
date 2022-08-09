import React from 'react'
import screen1 from "../data/templates/screen1.png";
import screen2 from "../data/templates/screen2.png";
import { getCoordinates } from '../Services/CVServices';
import sortCoordinates from '../Services/CVServices';
import { createCoordinateJSON } from '../Services/JSONConverter';

function Test() {

    function testFunction(){
        
    } 

  return (
    <div>
      <button onClick={testFunction}>Test</button>
    </div>
  )
}

export default Test
