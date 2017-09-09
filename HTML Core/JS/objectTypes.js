var textOn = true; //Тестов код


function slide(idObj,backColorV,backImgV,transitionV,itemCountV) {
    this.id = idObj;
    this.backColor = backColorV;
    this.backImg = backImgV;
    this.transition = transitionV;
    this.itemCount = itemCountV;
    this.items = [];
}

function textObj(idObj,textContent,positionTV,positionLV,fontFamilyV,fontSizeV,fontParamsV, textEffectV,widthV,heightV,typeV,fontColorV)
{
    //fontParams - Bold,Italic,Underline - B/I/U
    //position - top/left/right/bottom
    this.id = idObj;
    this.textC = textContent;
    this.positionT = positionTV;
    this.positionL = positionLV;
    this.fontColor = fontColorV;
    this.fontFamily = fontFamilyV;
    this.fontSize = fontSizeV;
    this.fontParams = fontParamsV;
    this.textEffect = textEffectV;
    this.widthO = widthV;
    this.heightO = heightV;
    this.type = typeV;

}


function imgObj(idObj, imgUrlV, positionTV, positionLV, effectV, widthV, heightV )
{
    this.id = idObj;
    this.imgUrl = imgUrlV;
    this.positionT = positionTV;
    this.positionL = positionLV;
    this.effect = effectV;
    this.widthO = widthV;
    this.heightO = heightV;
    this.type = "img";
}
//