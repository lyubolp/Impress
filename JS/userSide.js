var slides = 0;
var curSlide;
var slideObjs = [];
function slide(idObj,backColorV,backImgV,transitionV,itemCountV) {
    this.id = idObj;
    this.backColor = backColorV;
    this.backImg = backImgV;
    this.transition = transitionV;
    this.itemCount = itemCountV;
    this.items = [];
}

//Слайдовете са в масив, за по-лесен достъп. Броенето започва от 1! 

//Функция, която се стартира при нова презентация. Добавя първи слайд и го изчертава на екран
function startNew() 
{
    //Тестов код - добавят се два слайда, един син и един червен.
    slides = 1;
    slideObjs[slides] = new slide(1,"#3399ff",0,0,0); 
    
    slides = 2;
    slideObjs[slides] = new slide(slides,"#B60303",0,0,0);
    
    
    //addNewSlide();
    drawSlide(slideObjs[1]);
}
function initSlide(idS)
{
    
}
//Функция за преминаване към предишния слайд
function prevSlide()
{
    curSlide--;
    drawSlide(slideObjs[curSlide]);
}
//Функция за преминаване към следващия слайд
function nextSlide()
{
    curSlide++;
    drawSlide(slideObjs[curSlide]);
}
//Изчертава текущия слайд на екрана
function drawSlide(slideObjToDraw)
{
    var curSlideObj = document.getElementById("curSlide");
    curSlideObj.style.backgroundColor = slideObjToDraw.backColor;
    curSlide = slideObjToDraw.id;
}
//Добавя нов слайд-обект към колекцията слайдове
function addNewSlide()
{
    slides++;
    slideObjs[slides] = new slide(slides,"#ffffff",0,0,0);
}