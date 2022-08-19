export function heightValidation(block,txt,font,spacing){
    var txtHeight;
    if(Array.isArray(txt)){
        txtHeight = (parseInt(font.height)+parseInt(font.spacing))*txt.length;
    }else{
        txtHeight = parseInt(font.height);
    }
    return txtHeight<block.h?true:false;
}
export function widthValidation(block,txt,font){
    let screen = new OffscreenCanvas(3840,2160).getContext("2d");
    screen.font = font.height + " " + font.style;
    screen.save();
    var txtWidth = 0;
    if(Array.isArray(txt)){
        for(let i =0;i<txt.length;i++){
            txtWidth = Math.max(txtWidth, Math.floor(screen.measureText(txt[i].value).width));
        }
    }else{
        txtWidth =  Math.floor(screen.measureText(txt).width);
    }
    return txtWidth<block.w?true:false;
}
export function wrapValidation(block,txt,font){
    var txtHeight;
     var txtWidth;
     let screen = new OffscreenCanvas(3840,2160).getContext("2d");
    if(Array.isArray(txt)){
        txtHeight = (font.height+font.spacing)*txt.length;
    }
    for(let i =0;i<txt.length;i++){
        txtWidth = Math.max(txtWidth, Math.floor(screen.measureText(txt[i]).width));
    }
    if(txtHeight/2 < block.height && txtWidth*2<block.width*0.2)
        return true;
    else
        return false;
}