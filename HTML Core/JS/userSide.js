var slides = 0;
var curSlide;
var slideObjCount = 0;

var slideObjs = [];
var textObjs = [];

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

    slides = 2;
    slideObjs[slides] = new slide(slides, "#B60303", 0, 1, 0);

    slideObjCount++;
    textObjs[slideObjCount] = new textObj(slideObjCount, "Hello world! This is a very long paragrah. This is used to test some things! ", 10, 5, 0, 3, 0, 0, 13, 15, "text");
    slideObjs[1].items[0] = textObjs[slideObjCount];


    // slideObjCount++;
    // textObjs[slideObjCount] = new textObj(slideObjCount,"Secondary text!",20,5,0,0,0,0,15,10);
    // slideObjs[1].items[1] = textObjs[slideObjCount];    
    //slideObjs[1].itemCount = 2;
    slideObjs[1].itemCount = 1;

    //addNewSlide();
    drawSlide(slideObjs[1]);
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
    
    if (slideObjs[curSlide].transition == 1) {
        $("#" + curSlideObj.id).hide();
        $("#" + curSlideObj.id).fadeIn();
    }
    else if (slideObjs[curSlide].transition == 2) {
        var x = curSlideObj.clientWidth;
        console.log(x);
        curSlideObj.style.width = "0px";
        $("#" + curSlideObj.id).animate({width:x + "px"});
    }
    document.getElementById("curSlideNum").innerText = curSlide; //Временен код, който показва номера на текущия слайд
    drawText(slideObjToDraw);
    drawImg(slideObjToDraw);

}
//Добавя нов слайд-обект към колекцията слайдове
function addNewSlide() {
    slides++;
    slideObjs[slides] = new slide(slides, "#ffffff", 0, 0, 0);
    drawSlide(slideObjs[slides]);

}

function focusOnSlide() {
    textBoxLoseFocus();
}

function redrawSlide() {
    //Тестова функция
    document.getElementById("curSlide").innerHTML = "";

    drawSlide(slideObjs[curSlide]);
}
function nukeSlides() {
    slides = 0;
    curSlide = 0;
    slideObjCount = 0;

    slideObjs = [];
    textObjs = [];
    document.getElementById("curSlide").innerHTML = "";
}

//*----------------------------------------*
//Функции на текстовото поле
//*----------------------------------------*
//Функция за добавяне на текстово поле от потребителя
function addTextField() {
    slideObjCount++;
    textObjs[slideObjCount] = new textObj(slideObjCount, "Click for text", 20, 15, 0, 3, 0, 0, 13, 15, "text");
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
                "vw;bottom:" + slideObjsTextDraw.items[i].positionB + "vw;" +
                "width:" + slideObjsTextDraw.items[i].widthO + "vw;" + "height:" + slideObjsTextDraw.items[i].heightO + "vh;" +
                "word-wrap: break-word;";
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

        //Създава input полето, което се използва за въвеждане на текст
        var editTextPrototype = document.createElement("textarea");

        editTextPrototype.classList.add("textBox");
        editTextPrototype.value = textBoxObj.target.innerText;
        editTextPrototype.onblur = textBoxLoseFocus;
        editTextPrototype.autofocus = true;


        editTextPrototype.style = "width:" + textBoxObj.target.style.width + "; height:" + textBoxObj.target.style.height + ";" +
            "margin:0px;";

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
        //textBoxObj.target.children[0].select();
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

            //x[i].onmousedown = textBoxClicked;
            //x[i].onblur = textBoxLoseFocus;
            //x[i].tabIndex = 1;


            // textDiv.onmousedown = textBoxClicked;
            //textDiv.onblur = textBoxLoseFocus;
            //-------------------//
            //LEGACY CODE

            /*var findTextInput = x[i].children[0];
            
            for (j = 0; j<slideObjs[curSlide].itemCount;j++)
            {
                if(x[i].id == "text_s" +slideObjs[curSlide].id + "_t" + slideObjs[curSlide].items[j].id)
                {
                    console.log(x[i].offsetTop/h);

                    slideObjs[curSlide].items[j].widthO = (x[i].children[0].style.width/w)*100;
                    slideObjs[curSlide].items[j].heightO = (x[i].children[0].style.height/w)*100;
                    slideObjs[curSlide].items[j].positionL =  (x[i].offsetLeft/w)*100;
                    slideObjs[curSlide].items[j].positionT =  (x[i].offsetTop/w)*100;
                    
                }
            }
            
            x[i].innerText = findTextInput.value;
            
            // x[i].style = "color:white;"+
            // "width:" + (findTextInput.style.width)+
            // "height:"+(findTextInput.style.height);

            x[i].style.width = findTextInput.style.width;
            //x[i].style.height = (findTextInput.style.height/w)*100 + "vw;";
            
            //Тестов код
            var a = findTextInput.style.width;
            console.log(a);

            x[i].classList.remove("textInputWrapper");
            x[i].classList.remove("editText");
            x[i].classList.add("staticText");

            //Не винаги съществува текстовото поле, при което кода дава грешка
            try 
            {
                x[i].removeChild(findTextInput);
            }
            catch(err) 
            {
                //Да се оправи тоя код
                console.log("Грешка при Try Catch на x[i].removeChild()");
            }
            */
            //------------------------//



            //Какво трябва да прави тази функция ?

            //1. Да запазва, записва и прехвърля стойностите от текстовото поле - текст, позиция и размер
            //2. Да премахвам текстовото поле и съотвените класове
            //3. Да връща класовете от текстовия стикер (явно така ще се нарича нередактируемото текстово поле)


        }
    }
}



function resizeableBox() {
    alert("1");
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
