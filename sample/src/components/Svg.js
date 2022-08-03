import React from "react";
import text2Svg  from 'text-svg';


function Svg() {
  function trnsfrm() {
    let res =text2Svg('Hello!', {color: 'blue',output:'dataURL'});
    document.getElementById("link").setAttribute("href",res);
  }
  
  return <div>
<button onClick={trnsfrm}>Test</button>
<a id ="link"href=""  download="image.png">click</a>
  </div>;
}

export default Svg;
