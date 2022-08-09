export function heightValidation(block,txt,font,spacing){
    var txtHeight;
    if(Array.isArray(txt)){
        txtHeight = (font.height+font.spacing)*txt.length;
    }else{
        txtHeight = font.height;
    }
    return txtHeight<block.height?true:false;
}

export function widthValidation(block,txt,font){
    let screen = new OffscreenCanvas().getContext("2d");
    screen.font = font.height + " " + font.style;
    var txtWidth = 0;
    if(Array.isArray(txt)){
        for(let i =0;i<txt.length;i++){
            txtWidth = Math.max(txtWidth, Math.floor(screen.measureText(txt[i]).width));
        }
       
    }else{
        txtWidth =  Math.floor(screen.measureText(txt).width);
    }
    
    return txtWidth<block.width?true:false;
}

export function wrapValidation(block,txt){
    var txtHeight;
     var txtWidth;
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