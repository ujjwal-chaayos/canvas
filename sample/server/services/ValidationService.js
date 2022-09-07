const { createCanvas, Image, loadImage } = require("canvas");

const heightValidation = (block, txt, font, spacing) => {
  var txtHeight;
  if (Array.isArray(txt)) {
    txtHeight = (parseInt(font.height) + parseInt(font.spacing)) * txt.length;
  } else {
    txtHeight = parseInt(font.height);
  }
  return txtHeight < block.h ? true : false;
};
const widthValidation = (block, txt, font) => {
  let screen = new createCanvas(3840, 2160).getContext("2d");
  screen.font = font.height + " " + font.style;
  screen.save();
  var txtWidth = 0;
  if (Array.isArray(txt)) {
    for (let i = 0; i < txt.length; i++) {
      txtWidth = Math.max(
        txtWidth,
        Math.floor(screen.measureText(txt[i].value).width)
      );
    }
  } else {
    txtWidth = Math.floor(screen.measureText(txt).width);
  }
  return txtWidth < block.w ? true : false;
};
// const wrapValidation = (block, txt, font) => {
//   var txtHeight;
//   var txtWidth;
//   let screen = new createCanvas(3840, 2160).getContext("2d");
//   if (Array.isArray(txt)) {
//     txtHeight = (font.height + font.spacing) * txt.length;
//   }
//   for (let i = 0; i < txt.length; i++) {
//     txtWidth = Math.max(txtWidth, Math.floor(screen.measureText(txt[i]).width));
//   }
//   if (txtHeight / 2 < block.height && txtWidth * 2 < block.width * 0.2)
//     return true;
//   else return false;
// };


const wrapValidation = (block, txt, font,style) => {
  var txtWidth = 0;
  let screen = new createCanvas(3840, 2160).getContext("2d");
  screen.font = style;
  var blockWidth =  Math.ceil((block.w*100)/80) - 0.4*Math.ceil((block.w*100)/80);
  var blockHeight = block.h;
  var txtHeight = font.height + font.spacing;
  var totatNumberitem = Math.floor(blockHeight/txtHeight);

  for (let i = 0; i < txt.length; i++) {
    txtWidth = Math.max(txtWidth, Math.floor(screen.measureText(txt[i].value).width));
  }
  console.log(txtWidth);
  console.log(txtWidth*2);
  console.log(blockWidth);
  if((txt.length > totatNumberitem+1)  && ((txtWidth*2)<=Math.ceil(blockWidth))){
    return true;
  }
  else {
    return false
  };


  
};

module.exports = { heightValidation, widthValidation, wrapValidation };
