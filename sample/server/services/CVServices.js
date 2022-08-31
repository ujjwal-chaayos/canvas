


// function will return the coordinate of all blocks provided in template
const getCoordinates = (template, cv) => {

    // converting template into Gray Scale for processing.
    cv.cvtColor(template, template, cv.COLOR_RGBA2GRAY)

    // Finding the Threshold image which which will define our contours.
    cv.threshold(template, template, 120, 200, cv.THRESH_BINARY);

    // defining storage to store contours and hierarchy.
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();

    // finding contours in template
    cv.findContours(
        template,
        contours,
        hierarchy,
        cv.RETR_CCOMP,
        cv.CHAIN_APPROX_SIMPLE
    );

    // stroing coordinates of each blocks define by contour in format of [{x,y,w,h}] , (x,y) are the coordinate of top left corner of blocks
    // and w,h are the height and width of respective block.
    const coordinates = [];
    for (let i = 0; i < contours.size(); ++i){
        const ci = contours.get(i);
        let rect = cv.boundingRect(ci);
        let p = {};
        p.x = rect.x;
        p.y = rect.y;
        p.w = rect.width;
        p.h = rect.height;
        coordinates.push(p);
    }

    // returning determined coordinates
    return coordinates;

}

// This function will draw bounded reactangle with dashed line over the block on canvas(Screen).
const drawContours = (points, cv, screen) => {

    // this will set the width of line to 2.
    screen.lineWidth = "5";

    // this will set thw width of dashes to 4.
    screen.setLineDash([2]);

    // this will define the colour of bounded reactangle to blue.
    screen.strokeStyle = "black";
    
    // this will draw the rectangle over the provided block on canvas.
    screen.rect(parseInt(points.x),parseInt(points.y),parseInt(points.w), parseInt(points.h));
    screen.stroke();

}

// This function will return the resized Image matrix.
const reSize = (image, width, height, cv) => {
    // definig storage to store resized image
   // let finalImage = new cv.Mat();
    let finalImage = new cv.Mat();

    // definig the size of final image.
    let finalImageSize = new cv.Size(width, height);

    // check whether the image is shrinking or expanding.
    if ((width * height) < (image.size().width * image.size().height))
        cv.resize(image, finalImage, finalImageSize, 0, 0, cv.INTER_AREA);
    else
        cv.resize(image, finalImage, finalImageSize, 0, 0, cv.INTER_LINEAR);

    // returning the final image.
    return finalImage
}

// This function will convert image matrix into image data.
// and after converting to Imagedata return the imagedata.
const matrixToImgData = (image) => {
    // var tempImg = new cv.Mat(image.size().width, image.size().height, cv.CV_8UC4, new cv.Scalar(0, 0, 0, 0));
    // var depth = image.type() % 8;
    // var scale = depth <= cv.CV_8S ? 1 : depth <= cv.CV_32S ? 1 / 256 : 255;
    // var shift = depth === cv.CV_8S || depth === cv.CV_16S ? 128 : 0;
    // image.convertTo(tempImg, cv.CV_8UC4, scale, shift);
    // switch (tempImg.type())=>{
    //     case cv.CV_8UC1:
    //         cv.cvtColor(tempImg, tempImg, cv.COLOR_GRAY2RGBA);
    //         break;
    //     case cv.CV_8UC3:
    //         cv.cvtColor(tempImg, tempImg, cv.COLOR_RGB2RGBA);
    //         break;
    //     case cv.CV_8UC4:
    //         cv.cvtColor(tempImg, tempImg, cv.COLOR_RGB2RGBA);
    //         break;
    //     default:
    //         throw new Error("Bad number of channels (Source image must have 1, 3 or 4 channels)");
    //         return;
    // }
    var imgData = new ImageData(new Uint8ClampedArray(image.data), image.cols, image.rows);
    //tempImg.delete();
    return imgData;
}

// This function will put the image onto the canvas(screen).
const drawImage=(screen, image, block)=>{
    
    // this will put the image at specified position.
    screen.drawImage(image,block['x'],block['y'],block['w'],block['h']);
    // save the screen.

}

// This function will put the image data onto the canvas(screen).
const drawImageData=(screen, image, points)=>{
    
    // this will put the image at specified position.
    screen.putImageData(image,points['x'],points['y']);
    // save the screen.
  
}

// This function will put Text on the screen.
const drawText=(screen,text,points,style)=>{
    // This will define the Font to text to be showwn.
     console.log(text,style);
    screen.font = style;
    // Putting the text on the screen.
    screen.fillText(text,parseInt(points.x),parseInt(points.y));

}

// This function will draw Line below the Title.
const drawLine=(screen,sourcePoint,destinationPoint,style)=>{

    // defining the width of line equal to 20.
    screen.lineWidth = 10;
    
    // defining starting point of line.
    screen.moveTo(parseInt(sourcePoint.x), parseInt(sourcePoint.y));

    // defining the ending point of line.
    screen.lineTo(parseInt(destinationPoint.x), parseInt(destinationPoint.y));

    // defining the color of line and finally draw it then save it.
    screen.strokeStyle = "#376902";
    screen.stroke();

}

// This will download the final screen as png.
const downloadImage=(screen)=>{
    // getting the URL of image and return that URL.
    let imageURL = screen.toDataURL("image/png");
    return imageURL;
}


// This function will find the coordinates of sub-blocks within a given block.
const subBlockCoordinates=(points,headingHeight,priceWidth)=>{
    // to store final coordinates of sub-block.
    let finalCoordinates = {}
    // to store the coordinates of heading. 
    let heading ={};
    // to store the coordinates of priceList.
    let priceList = {};
    // to store the coordinates of itemList.
    let itemList={};

    // finding the coordinates of heading i.e x,y,w,h.
    heading.x = parseInt(points.x);
    heading.y = parseInt(points.y);
    heading.w = parseInt(points.w);
    heading.h = headingHeight;


    // finding the coordinates of priceList i.e x,y,w,h.
    priceList.x = parseInt(points.x) + (parseInt(points.w)-priceWidth);
    priceList.y = parseInt(points.y) + headingHeight;
    priceList.w = priceWidth;
    priceList.h = parseInt(points.h) - headingHeight;

    // finding the coordinates of itemList i.e x,y,w,h.
    itemList.x = parseInt(points.x);
    itemList.y = parseInt(points.y) + headingHeight;
    
    itemList.w = parseInt(points.w) - priceWidth;
    itemList.h = parseInt(points.h) - headingHeight;

    // puting all sub-block's coordinates into finalcoordinate lsit.
    finalCoordinates.title = heading;
    finalCoordinates.items = itemList;
    finalCoordinates.price = priceList;
    // returning the final coordinates list.
    return finalCoordinates;

}

// This function will sort the coordinates so that they are arrange in the order from left to right then top to bottom.
const sortCoordinates=(coordinates)=>{
    let sortedCoordinates = [];

    // sorting according to distance from top left corner.
    coordinates.sort((a, b) => Math.hypot(a.x, a.y) - Math.hypot(b.x, b.y));
    coordinates.sort((a, b) => a.y - b.y);

    for(let i=0;i<coordinates.length;i++){
        coordinates[i]["block_id"]=i;
        sortedCoordinates.push(coordinates[i]);

    }
    // returning the final sorted coordinates.
    sortedCoordinates.shift();
    return sortedCoordinates;
}

const roundedRect=(screen,point, r,style)=>{
    if (point.w < 2 * r) r = point.w / 2;
    if (point.h < 2 * r) r = point.h / 2;
    screen.beginPath();
    screen.moveTo(point.x+r, point.y);
    screen.arcTo(point.x+point.w, point.y,   point.x+point.w, point.y+point.h, r);
    screen.arcTo(point.x+point.w, point.y+point.h, point.x,   point.y+point.h, r);
    screen.arcTo(point.x,   point.y+point.h, point.x,   point.y,   r);
    screen.arcTo(point.x,   point.y,   point.x+point.w, point.y,   r);
    screen.closePath();
    screen.fillStyle = style;
    screen.fill();
  
}

const newItemRect=(screen,point, r,style1,style2)=>{
    if (point.w < 2 * r) r = point.w / 2;
    if (point.h < 2 * r) r = point.h / 2;
    screen.beginPath();
    screen.moveTo(point.x+r, point.y);
    screen.arcTo(point.x+point.w, point.y,   point.x+point.w, point.y+point.h, r);
    screen.arcTo(point.x+point.w, point.y+point.h, point.x,   point.y+point.h, r);
    screen.arcTo(point.x,   point.y+point.h, point.x,   point.y,   r);
    screen.arcTo(point.x,   point.y,   point.x+point.w, point.y,   r);
    screen.closePath();
    screen.fillStyle = style1;
    screen.fill();


    screen.beginPath();
    screen.moveTo(point.x+Math.ceil(point.w*0.75), point.y);
    screen.arcTo(point.x+point.w, point.y,   point.x+point.w, point.y+point.h, r);
    screen.arcTo(point.x+point.w, point.y+point.h, point.x,   point.y+point.h, r);
    screen.arcTo(point.x+Math.ceil(point.w*0.70),   point.y+point.h, point.x,   point.y,   r);
   
    screen.closePath();
    screen.fillStyle = style2;
    screen.fill();
    


};









  module.exports={getCoordinates,drawContours,reSize,matrixToImgData,drawImage,drawImageData,drawText,drawLine,downloadImage,subBlockCoordinates,sortCoordinates,roundedRect,newItemRect}
