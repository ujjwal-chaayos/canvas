import cv from "opencv.js";

export default function getCoordinates(template, cv) {
    cv.cvtcolor(template, template, cv.RGBA2GRAY)
    cv.threshold(template, template, 120, 200, cv.THRESH_BINARY);
    let contours = new cv.ImageVector();
    let hierarchy = new cv.Image();
    cv.findContours(
        template,
        contours,
        hierarchy,
        cv.RETR_CCOMP,
        cv.CHAIN_APPROX_SIMPLE
    );
    const points = [];
    for (let i = 0; i < contours.size(); ++i) {
        const ci = contours.get(i);
        let rect = cv.boundingRect(ci);
        let p = {};
        p.x = rect.x;
        p.y = rect.y;
        p.w = rect.width;
        p.h = rect.height;
        points.push(p);
    }
    return points;

}
export default function drawContours(points, cv, screen) {
    screen.lineWidth = "2";
    screen.setLineDash([4]);
    screen.strokeStyle = "blue";
    screen.rect(parseInt(points.x),parseInt(points.y),parseInt(points.w), parseInt(points.h));
    screen.stroke();
}

export default function reSize(image, width, height, cv) {
    let finalImage = new cv.Mat();
    let finalImageSize = new cv.Size(width, height);
    if ((width * height) < (image.size().width * image.size().height))
        cv.resize(image, finalImage, finalImageSize, 0, 0, cv.INTER_AREA);
    else
        cv.resize(image, finalImage, finalImageSize, 0, 0, cv.INTER_LINEAR);
    return finalImage
}

export default function matrixToImgData(image){
    var tempImg = new cv.Mat;
    var depth = image.type() % 8;
    var scale = depth <= cv.CV_8S ? 1 : depth <= cv.CV_32S ? 1 / 256 : 255;
    var shift = depth === cv.CV_8S || depth === cv.CV_16S ? 128 : 0;
    image.convertTo(tempImg, cv.CV_8U, scale, shift);
    switch (tempImg.type()) {
        case cv.CV_8UC1:
            cv.cvtColor(tempImg, tempImg, cv.COLOR_GRAY2RGBA);
            break;
        case cv.CV_8UC3:
            cv.cvtColor(tempImg, tempImg, cv.COLOR_RGB2RGBA);
            break;
        case cv.CV_8UC4:
            break;
        default:
            throw new Error("Bad number of channels (Source image must have 1, 3 or 4 channels)");
            return;
    }
    var imgData = new ImageData(new Uint8ClampedArray(tempImg.data), tempImg.cols, tempImg.rows);
    return imgData;
}

export default function drawImage(screen, image, points) {
    
    screen.putImageData(image,points['x'],points['y']);
    tempImg.delete();
    screen.save();
}

export default function drawText(screen,text,points,style){

}


export default function drawLine(screen,sourcePoint,destinationPoint,style){
    screen.lineWidth = 20;
    screen.moveTo(parseInt(sourcePoint.x), parseInt(sourcePoint.y));
    screen.lineTo(parseInt(destinationPoint.x), parseInt(destinationPoint.y));
    screen.strokeStyle = "#AB8E3E";
    screen.stroke();
    screen.save();
}

export default function download(screen)
{
    let imageURL = screen.toDataURL("image/png");
    return imageURL;
}

export default function subBlockCoordinates(points,headingHeight,priceWidth){
    let finalCoordinates = {}
    let heading ={};
    let priceList = {};
    let itemList={};

    heading.x = parseInt(points.x);
    heading.y = parseInt(points.y);
    heading.h = headingHeight;
    heading.w = parseInt(points.w);

    priceList.x = parseInt(points.x) + (parseInt(points.w)-priceWidth);
    priceList.y = parseInt(points.y) + headingHeight;
    priceList.h = parseInt(points.h) - headingHeight;
    priceList.w = priceWidth;

    itemList.x = parseInt(points.x);
    itemList.y = parseInt(points.y) + headingHeight;
    itemList.h = parseInt(points.h) - headingHeight;
    itemList.w = parseInt(points.w) - priceWidth;

    finalCoordinates.title = heading;
    finalCoordinates.description = itemList;
    finalCoordinates.price = priceList;
    return finalCoordinates;

}
