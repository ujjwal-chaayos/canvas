import React, { useEffect } from "react";
import { saveAs } from "file-saver";
import Canvas from 'react-canvas-component'

import SvgText from "svg-text";

const Svg = () => {

  function drawCanvas({ctx, time}) {
    const {width, height} = ctx.canvas
    ctx.save()
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = 'black'
    ctx.translate(width / 2, height / 2)
    ctx.rotate(((time / 10) % 360) * Math.PI / 180)
    ctx.fillRect(-1 * width / 4, -1 * height / 4, width / 2, height / 2)
    ctx.restore()
}

  // let image = document.querySelector("svg");
  // function download(href, name) {
  //   console.log(href, name);
  //   var link = document.createElement("a");
  //   link.download = name;
  //   link.style.opacity = "0";
  //   let hell = document.getElementById("download");
  //   hell.append(link);
  //   link.href = href;

  //   link.click();
  // }

  // function gross() {
  //   // const svg = document.querySelector("svg");

  //   // const text = new SvgText({
  //   //   text: "Hello, world!",
  //   //   element: svg,
  //   //   style: {
  //   //     fontFamily: "Helvetica",
  //   //     fontWeight: "bold",
  //   //   },
  //   // });

  //   var svgElement = document.querySelector("svg");
  //   console.log(svgElement);
  //   let { width, height } = svgElement.getBBox();
  //   console.log(width, height);
  //   let clonedSvgElement = svgElement.cloneNode(true);
  //   console.log(clonedSvgElement);

  //   let outerHTML = clonedSvgElement.outerHTML,
  //     blob = new Blob([outerHTML], { type: "image/svg+xml;charset=utf-8" });
  //   let URL = window.URL || window.webkitURL || window;
  //   let blobURL = URL.createObjectURL(blob);

  //   console.log(blobURL);
  //   let image = new Image();

  //   let canvas = document.createElement("canvas");
  //   console.log("wgy");
  //   canvas.widht = width;

  //   canvas.height = height;
  //   let context = canvas.getContext("2d");
  //   // draw image in canvas starting left-0 , top - 0
  //   context.drawImage(image, 0, 0, width, height);

  //   image.src = blobURL;
  //   //  downloadImage(canvas); need to implement
  //   let png = canvas.toDataURL(); // default png
  //   let jpeg = canvas.toDataURL("image/jpg");
  //   let webp = canvas.toDataURL("image/webp");

  //   console.log(png);

  //   download(png, "image.png");
  // }

  //console.log(image.src);

  //       var svg=document.getElementById("text");
  //       var element = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  // element.setAttributeNS(null, 'x', 5);
  // element.setAttributeNS(null, 'y', 15);
  // var txt = document.createTextNode("Hello World");
  // element.appendChild(txt);
  // svg.append(element);

  //   canvas.toBlob(function(blob) {
  //     saveAs(blob, "pretty image.svg");
  // });

  return (
    <div>
      <div id="download">Svg</div>
      <div id="img"></div>
      <svg
		viewBox="0 0 24 24"
		xmlns="<http://www.w3.org/2000/svg>"
	>
		<circle
			cx="12" cy="12" r="8"
			stroke-width="4" stroke="tomato"
			fill="none"
		/>

	</svg>
      {/* <button onClick={gross}>Hello</button> */}
      <Canvas draw={drawCanvas} width={400} height={400} realtime/>
    </div>
  );
};

export default Svg;
