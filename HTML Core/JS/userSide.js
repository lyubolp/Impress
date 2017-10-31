/*
userSlide.js

Това е файл, съдържащ главните функции по обектите в слайдовете.
Написан от: Любослав Карев
*/

//Променливи
var slides = 0; //Брой слайдове
var curSlide; //Номер на текущ слайд
var slideObjCount = 0; //Брой на обекти в текущия слайд

var slideObjs = []; //Обект, съдържащ слайдовете
var textObjs = []; //Обект съдържащ текстовите полета

var curClickedObj; //Текущия натиснат обект
var installedFonts = []; //Списъл с инсталираните шрифтове
var installedFontsCount = 0; //Броя на инсталираните шрифтове

//Променливи за откриване на viewport-width и viewport-height
var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

$(function () {
    $(".textInputWrapper").draggable();
});
//Слайдовете са в масив, за по-лесен достъп. Броенето започва от 1! 



//*----------------------------------------*
//Функции на слайдовете
//*----------------------------------------*


//Функция, която се стартира при нова презентация. Добавя първи слайд и го изчертава на екран
function startNew() {
    //Тестов код - добавят се два слайда, един син и един червен. Добавя текст към единия слайд. 
    slides = 1;
    slideObjs[slides] = new slide(1, "#3399ff", 0, 2, 1);


    slideObjCount++;
    textObjs[slideObjCount] = new textObj(slideObjCount, "Щракнете два пъти за да добавите текст", 10, 5, "Consolas", 3, 0, 0, 13, 15, "text", "#B40000");
    slideObjs[1].items[0] = textObjs[slideObjCount];


    // slideObjCount++;
    // textObjs[slideObjCount] = new textObj(slideObjCount,"Secondary text!",20,5,0,0,0,0,15,10);
    // slideObjs[1].items[1] = textObjs[slideObjCount];    
    //slideObjs[1].itemCount = 2;
    slideObjs[1].itemCount = 1;

    //addNewSlide();
    drawSlide(slideObjs[1]);
    loadFonts();
}
function initSlide(idS) {

}
//Функция за преминаване към предишния слайд
function prevSlide() {
    if (curSlide > 1) {
        curSlide--;
        drawSlide(slideObjs[curSlide]);
        document.getElementById("curSlideNum").innerText = curSlide; //Временен код, който показва номера на текущия слайд
    }

}
//Функция за преминаване към следващия слайд
function nextSlide() {
    if (slides != curSlide) {
        textBoxLoseFocus();
        curSlide++;
        drawSlide(slideObjs[curSlide]);
        document.getElementById("curSlideNum").innerText = curSlide; //Временен код, който показва номера на текущия слайд

    }
}
//Изчертава текущия слайд на екрана
function drawSlide(slideObjToDraw) {
    var curSlideObj = document.getElementById("curSlide");
    curSlideObj.innerText = "";
    curSlideObj.style.backgroundColor = slideObjToDraw.backColor;
    curSlide = slideObjToDraw.id;
    document.getElementById("curSlideNum").innerText = curSlide; //Временен код, който показва номера на текущия слайд

    //Код за анимациите на преминаване между слайдовете
    if (slideObjs[curSlide].transition == 1) {
        $("#" + curSlideObj.id).hide();
        $("#" + curSlideObj.id).fadeIn();
    }
    else if (slideObjs[curSlide].transition == 2) {
        var x = curSlideObj.clientWidth;
        x = (x / w) * 100;
        curSlideObj.style.width = "0px";
        $("#" + curSlideObj.id).animate({ width: x + "vw" });
    }

    document.getElementById("curSlideNum").innerText = curSlide; //Временен код, който показва номера на текущия слайд
    drawText(slideObjToDraw);
    drawImg(slideObjToDraw);

    //Код за скриване на специализираните менюта за обекти
    $("#textTools").hide();
    $("#imgTools").hide();
}
//Добавя нов слайд-обект към колекцията слайдове
function addNewSlide() {
    slides++;
    slideObjs[slides] = new slide(slides, "#ffffff", 0, 0, 0);
    drawSlide(slideObjs[slides]);
}

//Функция за фокусиране върху слайд, чрез премахване на фокуса от другите обекти
function focusOnSlide() {
    textBoxLoseFocus();
}

//Функция за преизчертаване на слайд
function redrawSlide() {
    //Тестова функция
    document.getElementById("curSlide").innerHTML = "";

    drawSlide(slideObjs[curSlide]);
}

//Функция за унищожаване на текуща презентация и всичко обекти свързани с нея
function nukeSlides() {
    slides = 0;
    curSlide = 0;
    slideObjCount = 0;

    slideObjs = [];
    textObjs = [];
    document.getElementById("curSlide").innerHTML = "";
}

//Функция за промяна фоновия цвят на слайд
function changeBGColor() {
    var colorObj = document.createElement("input");
    colorObj.type = "color";
    colorObj.id = "colorChoose";
    colorObj.name = "clrC";
    colorObj.value = slideObjs[curSlide].backColor;
    colorObj.hidden = true;

    document.getElementById("curSlide").appendChild(colorObj);
    document.getElementById('colorChoose').click();

    document.getElementById('colorChoose').onchange = function (evt) {
        document.getElementById("curSlide").style.backgroundColor = colorObj.value;
        slideObjs[curSlide].backColor = colorObj.value;
    }
    document.getElementById('colorChoose').remove();

}
//*----------------------------------------*
//Функции на текстовото поле
//*----------------------------------------*
//Функция за добавяне на текстово поле от потребителя
function addTextField() {
    slideObjCount++;
    textObjs[slideObjCount] = new textObj(slideObjCount, "Click for text", 20, 15, "Segoe UI", 3, 0, 0, 13, 15, "text", "#000000");
    slideObjs[curSlide].items[slideObjs[curSlide].itemCount] = textObjs[slideObjCount];
    slideObjs[curSlide].itemCount++;
    drawSlide(slideObjs[curSlide]);
}
//Функция за чертане на текст върху слайд
function drawText(slideObjsTextDraw) {
    var curSlideObj = document.getElementById("curSlide");


    for (i = 0; i < slideObjsTextDraw.itemCount; i++) {
        if (slideObjsTextDraw.items[i].type == "text") {
            var textDiv = document.createElement("div");

            textDiv.id = "text_s" + slideObjsTextDraw.id + "_t" + slideObjsTextDraw.items[i].id;
            textDiv.classList.add("staticText");

            textDiv.style.fontSize = slideObjsTextDraw.items[i].fontSize + "vw";
            textDiv.style = "position:absolute;left:" + slideObjsTextDraw.items[i].positionL + "vw;top:" + slideObjsTextDraw.items[i].positionT +
                "vw;right:" + slideObjsTextDraw.items[i].positionR +
                "vw;bottom:" + slideObjsTextDraw.items[i].positionB + "vw;" + "font-family:" + slideObjsTextDraw.items[i].fontFamily + ";" +
                "width:" + slideObjsTextDraw.items[i].widthO + "vw;" + "height:" + slideObjsTextDraw.items[i].heightO + "vh;" +
                "word-wrap: break-word;" + "color:" + slideObjsTextDraw.items[i].fontColor;
            //"max-width:" + slideObjsTextDraw.items[i].widthO + "vw;" +
            textDiv.innerHTML = slideObjsTextDraw.items[i].textC;

            textDiv.onmousedown = textBoxClicked;
            //textDiv.onblur = textBoxLoseFocus;
            //textDiv.tabIndex = 1;

            curSlideObj.appendChild(textDiv);
        }
    }

}

//Функция за трансформиране на текстово поле в поле за редакция на текст
function textBoxClicked(textBoxObj) {
    if (textBoxObj.target.classList.contains("textInputWrapper") == false && textBoxObj.target.classList.contains("staticText") == true) {

        $("#slideTools").fadeOut();
        $("#textTools").fadeIn();
        $("#imgTools").fadeOut();
        //Създава input полето, което се използва за въвеждане на текст
        var editTextPrototype = document.createElement("textarea");

        editTextPrototype.classList.add("textBox");
        editTextPrototype.value = textBoxObj.target.innerText;
        editTextPrototype.onblur = textBoxLoseFocus;
        editTextPrototype.autofocus = true;


        editTextPrototype.style = "width:" + textBoxObj.target.style.width + "; height:" + textBoxObj.target.style.height + ";" +
            "margin:0px;" + "font-family:" + textBoxObj.target.style.fontFamily + ";";

        //С textBoxObj.target се достига до текущия натиснат обект

        textBoxObj.target.childNodes[0].nodeValue = ""; //.innerHTML прави проблеми
        textBoxObj.target.classList.add("textInputWrapper");
        textBoxObj.target.classList.add("editText");
        textBoxObj.target.classList.remove("staticText");

        textBoxObj.target.tabIndex = 1;
        //textBoxObj.target.onblur = textBoxLoseFocus;

        $(".textInputWrapper").draggable();

        textBoxObj.target.appendChild(editTextPrototype);
        textOn = false;

        curClickedObj = textBoxObj.target.id;
        //textBoxObj.target.children[0].select();

        var selectObjL = document.getElementById("selectFont");

        for (i = 0; i < selectObjL.options.length; i++) {
            if (selectObjL.options[i].value.toString().slice(0, -1) == textBoxObj.target.style.fontFamily) {
                selectObjL.options[i].selected = true;
            }
        }
    }

}

//Функция за трансформиране на поле за редакция на текст в обикновенно текстово поле
function textBoxLoseFocus(clickedObj) {
    var x = document.getElementById("curSlide").children;
    for (i = 0; i < x.length; i++) //Преминава през всички елементи в текущия слайд, x[i] е обект в слайда
    {
        if (x[i].classList.contains("editText") == true) //Ако текущия обект е текстово поле за редакция
        {


            var curObjW, curObjH, curObjText, curObjT, curObjL;

            if (x[i].children[0].style.width.slice(-2) == "vw") {
                curObjW = x[i].children[0].style.width.slice(0, 2);
                curObjH = x[i].children[0].style.height.slice(0, 2);
            }
            else if (x[i].children[0].style.width.slice(-2) == "px") {
                curObjW = ((x[i].children[0].style.width.slice(0, -2)) / w) * 100;
                curObjH = ((x[i].children[0].style.height.slice(0, -2)) / h) * 100;
            }


            curObjText = x[i].children[0].value;
            curObjT = (x[i].offsetTop / w) * 100;
            curObjL = (x[i].offsetLeft / w) * 100;

            for (j = 0; j < slideObjs[curSlide].itemCount; j++) {
                if (x[i].id == "text_s" + slideObjs[curSlide].id + "_t" + slideObjs[curSlide].items[j].id && slideObjs[curSlide].items[j].type == "text") {
                    slideObjs[curSlide].items[j].widthO = curObjW;
                    slideObjs[curSlide].items[j].heightO = curObjH;
                    slideObjs[curSlide].items[j].textC = curObjText;
                    slideObjs[curSlide].items[j].positionL = curObjL;
                    slideObjs[curSlide].items[j].positionT = curObjT;
                }
            }
            //Код за премахване на текстовото поле и съответните класове
            x[i].classList.remove("textInputWrapper");
            x[i].classList.remove("editText");
            x[i].classList.add("staticText");

            x[i].style.width = x[i].children[0].style.width;
            x[i].style.height = x[i].children[0].style.height;

            x[i].removeChild(x[i].children[0]);

            x[i].innerText = curObjText;

            $("#slideTools").fadeIn();
            $("#textTools").fadeOut();
            $("#imgTools").fadeOut();
            curClickedObj = "";
        }
    }
}

function changeFontColor() {
    var colorObj = document.createElement("input");
    colorObj.type = "color";
    colorObj.id = "colorChooseFont";
    colorObj.name = "clrCF";
    colorObj.value = slideObjs[curSlide].backColor;
    colorObj.hidden = true;

    document.getElementById("curSlide").appendChild(colorObj);
    document.getElementById('colorChooseFont').click();

    document.getElementById('colorChooseFont').onchange = function (evt) {
        document.getElementById(curClickedObj).style.color = colorObj.value;

        //slideObjs[curSlide].backColor = colorObj.value;
        for (j = 0; j < slideObjs[curSlide].itemCount; j++) {
            if (x[i].id == "text_s" + slideObjs[curSlide].id + "_t" + slideObjs[curSlide].items[j].id && slideObjs[curSlide].items[j].type == "text") {
                slideObjs[curSlide].items[j].fontColor = colorObj.value;
            }
        }
    }
    document.getElementById('colorChooseFont').remove();

}

function changeFont() {
    var selectObjL = document.getElementById("selectFont");
    var x = document.getElementById("curSlide").children;

    document.getElementById(curClickedObj).style.fontFamily = selectObjL.value;
    document.getElementById(curClickedObj).children[0].style.fontFamily = selectObjL.value;

    //slideObjs[curSlide].backColor = colorObj.value;
    for (j = 0; j < slideObjs[curSlide].itemCount; j++) {
        if (x[i].id == "text_s" + slideObjs[curSlide].id + "_t" + slideObjs[curSlide].items[j].id && slideObjs[curSlide].items[j].type == "text") {
            slideObjs[curSlide].items[j].fontColor = colorObj.value;
        }
    }
}

function resizeableBox() {
    alert("1");
}

//Функция за премахване на текстов обект
function removeText() {
    var x = document.getElementById("curSlide").children; //Текущите обекти в слайда, x[i] е обект
    //Функцията ще претърси всичките обекти и ще открие записа в БД, съответсващ на обекта
    for (i = 0; i < slideObjs[curSlide].itemCount; i++) {
        if (curClickedObj == "text_s" + slideObjs[curSlide].id + "_t" + slideObjs[curSlide].items[i].id) {
            //При откриване на съвпадение, премахва HTML обекта заедно с елемента от масива, отговарящ на този обект и прекъсва цикъла
            document.getElementById("text_s" + slideObjs[curSlide].id + "_t" + slideObjs[curSlide].items[i].id).remove();
            slideObjs[curSlide].items.splice(i, 1);
            break;
        }
    }
    slideObjs[curSlide].itemCount--; //Намалява броя на елементите в слайда
}

//*----------------------------------------*
//Функции на изображение
//*----------------------------------------*

function addImage() {
    var imgUrl;
    var inputObj = document.createElement("input");
    inputObj.type = "file";
    inputObj.id = "tempInput";
    inputObj.hidden = true;

    document.getElementById("curSlide").appendChild(inputObj);

    document.getElementById("tempInput").click();

    slideObjs[curSlide].itemCount++;
    console.log(slideObjs[curSlide].itemCount);
    var imgHolder = document.createElement("img");
    imgHolder.id = "img_s" + slideObjs[curSlide].id + "_t" + slideObjs[curSlide].itemCount;
    imgHolder.classList.add("imgContained");

    var imgDivContainer = document.createElement("div");
    imgDivContainer.id = "imgD_s" + slideObjs[curSlide].id + "_t" + slideObjs[curSlide].itemCount;

    imgDivContainer.appendChild(imgHolder);

    imgDivContainer.classList.add("staticImg");
    document.getElementById("curSlide").appendChild(imgDivContainer);

    document.getElementById('tempInput').onchange = function (evt) {
        var tgt = evt.target || window.event.srcElement,
            files = tgt.files;

        // FileReader support
        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function () {

                imgUrl = fr.result;
                //imgHolder.src = fr.result;
                imgHolder.src = fr.result;
                imgDivContainer.onmousedown = imgClicked;
                imgDivContainer.onblur = imgLoseFocus;
                imgDivContainer.tabIndex = 1;
                imgDivContainer.style.width = imgHolder.clientWidth + "px";



                imgDivContainer.style.height = "400px";
                console.log(imgHolder.clientHeight);
                //CHANGED HERE

                //imgHolder.classList.add("staticImg");
                //$("#" + imgDivContainer.id).draggable();

                var imgObjS = new imgObj(slideObjs[curSlide].itemCount, imgHolder.src, 0, 0, 0, (imgHolder.clientWidth / w) * 100, (imgHolder.clientHeight / h) * 100);
                slideObjs[curSlide].items[slideObjs[curSlide].itemCount - 1] = imgObjS;

                console.log(imgObjS);
            }
            fr.readAsDataURL(files[0]);


        }

        // Not supported
        else {
            // fallback -- perhaps submit the input to an iframe and temporarily store
            // them on the server until the user's session ends.
        }
    }


}
function drawImg(slideObjsTextDraw) {
    var curSlideObj = document.getElementById("curSlide");


    for (i = 0; i < slideObjsTextDraw.itemCount; i++) {
        if (slideObjsTextDraw.items[i].type == "img") {

            console.log(slideObjs[1]);
            console.log(curSlide);
            var imgDivContainer = document.createElement("div");
            imgDivContainer.id = "imgD_s" + slideObjs[curSlide].id + "_t" + slideObjs[curSlide].itemCount;
            imgDivContainer.style = "position:absolute;left:" + slideObjsTextDraw.items[i].positionL + "vw;top:" + slideObjsTextDraw.items[i].positionT +
                "vh;width:" + slideObjsTextDraw.items[i].widthO + "vw;" + "height:" + slideObjsTextDraw.items[i].heightO + "vh;"

            console.log(slideObjsTextDraw.items[i].widthO);
            var imgHolder = document.createElement("img");
            imgHolder.id = "img_s" + slideObjs[curSlide].id + "_t" + slideObjs[curSlide].itemCount;
            imgHolder.src = slideObjsTextDraw.items[i].imgUrl;
            imgHolder.classList.add("imgContained");

            imgDivContainer.onmousedown = imgClicked;
            imgDivContainer.onblur = imgLoseFocus;
            imgDivContainer.classList.add("staticImg");

            imgDivContainer.tabIndex = 1;



            imgDivContainer.appendChild(imgHolder);

            curSlideObj.appendChild(imgDivContainer);
        }
    }
}

function imgClicked(imgObjClick) {
    var x = imgObjClick.target.parentNode.classList.length;

    if (imgObjClick.target.parentNode.classList.contains("staticImg") == true || imgObjClick.target.parentNode.classList.item(x - 1) == "staticImg") {

        imgObjClick.target.parentNode.classList.add("editImg");
        imgObjClick.target.parentNode.classList.remove("staticImg");


        $("#" + imgObjClick.target.parentNode.id).draggable();
        $("#" + imgObjClick.target.parentNode.id).resizable();


        $("#" + imgObjClick.target.parentNode.id).on("dragstop", function (event, ui) { imgLoseFocus(); });
    }

    imgObjClick.target.parentNode.onblur = imgLoseFocus;
    imgObjClick.target.parentNode.tabIndex = 1;

    curClickedObj = imgObjClick.target.parentNode.id;
    
    $("#slideTools").fadeOut();
    $("#textTools").fadeOut();
    $("#imgTools").fadeIn();
}

function imgLoseFocus() {

    var x = document.getElementById("curSlide").children;
    for (i = 0; i < x.length; i++) //Преминава през всички елементи в текущия слайд, x[i] е обект в слайда
    {
        if (x[i].classList.contains("editImg") == true) //Ако текущия обект е текстово поле за редакция
        {
            var curObjW, curObjH, curObjT, curObjL;



            curObjT = (x[i].offsetTop / h) * 100;
            curObjL = (x[i].offsetLeft / w) * 100;

            if (x[i].style.width.slice(-2) == "vw") {
                curObjW = x[i].style.width.slice(0, 2);
                curObjH = x[i].style.height.slice(0, 2);
            }
            else if (x[i].style.width.slice(-2) == "px") {
                curObjW = ((x[i].style.width.slice(0, -2)) / w) * 100;
                curObjH = ((x[i].style.height.slice(0, -2)) / h) * 100;
            }
            for (j = 0; j < slideObjs[curSlide].itemCount; j++) {

                if (x[i].id == "imgD_s" + slideObjs[curSlide].id + "_t" + slideObjs[curSlide].items[j].id && slideObjs[curSlide].items[j].type == "img") {

                    slideObjs[curSlide].items[j].widthO = curObjW;
                    slideObjs[curSlide].items[j].heightO = curObjH;
                    slideObjs[curSlide].items[j].positionL = curObjL;
                    slideObjs[curSlide].items[j].positionT = curObjT;
                }
            }

            x[i].classList.add("staticImg");
            x[i].classList.remove("editImg");
            x[i].onblur = imgLoseFocus;
            x[i].tabIndex = 1;

        }

    }
}

//Функция за премахване на обект изображение
function removeImg() {
    
    var x = document.getElementById("curSlide").children; //Текущите обекти в слайда, x[i] е обект
    //Функцията ще претърси всичките обекти и ще открие записа в БД, съответсващ на обекта
    console.log(x[3]);
    for (i = 0; i < slideObjs[curSlide].itemCount; i++) {
        console.log(slideObjs[curSlide].items[i].id);
        if (curClickedObj == "imgD_s" + slideObjs[curSlide].id + "_t" + slideObjs[curSlide].items[i].id) {
            console.log(i);
            //При откриване на съвпадение, премахва HTML обекта заедно с елемента от масива, отговарящ на този обект и прекъсва цикъла
            document.getElementById("img_s" + slideObjs[curSlide].id + "_t" + slideObjs[curSlide].items[i].id).remove();
            slideObjs[curSlide].items.splice(i, 1);
            break;
        }
    }
    slideObjs[curSlide].itemCount--; //Намалява броя на елементите в слайда
}

