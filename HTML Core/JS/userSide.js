/*
userSlide.js

Това е файл, съдържащ главните функции по обектите в слайдовете.
Съдържание:

Функции на слайдове:
    startNew()
    prevSlide()
    nextSlide()
    drawSlide()
    addNewSlide()
    focusOnSlide()
    redrawSlide()
    nukeSlides()
    changeBGColor()


Функции на текстово поле:
    addTextField()
    drawText()
    drawCaptionOnSlide()
    textBoxClicked()
    textBoxLoseFocus()
    changeFontColor()
    changeFont()
    removeText()


Функции на изображение:
    addImage()
    drawImage()
    imgClicked()
    imgLoseFocus()
    removeImg()
    imgAddCaption()
    
Важни особености:
1. Всички слайдове за обект (структура, дефинирана в objectTypes.js) съдържащ свойствата на слайда, и различните обекти по самия слайд. 
2. Всеки обект по слайда (текстово поле, изображение, т.н.) отново е обект (структура дефинирана в objectTypes.js) заедно със съответните свойства.
3. slideObjs[] е главния масив, който съдържа всички обекти. ПЪРВИЯ ЕЛЕМЕНТ Е С ИНДЕКС 1, А НЕ 0 !!!
4. slideObjs[] служи за изчертването на всички елементи по цялата презентация. Всяко едно нещо, което трябва да е на слайда, трябва да е в този масив.
5. Всеки обект има две състояния - фокусиран и не-фокусиран (пример - textBoxClicked() дава фокус на текстовото поле и дава възможност на потребителя да го променя,
    textBoxLoseFocus() - текстовото поле вече не е фокусирано, т.е. вече не може да се редактира текста в него.) Функцията за загуба на фокус на обект също така
    изпраща и текущите стойности от DOM към масива slideObjs[].

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

//Променливи за откриване на viewport-width и viewport-height (размера на прозореца)
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
    //Код за начало на презентация - добавя се един слайд, със син фон и едно текстово поле
    slides = 1; //Слайдоветет стават 1
    slideObjs[slides] = new slide(1, "#3399ff", 0, 2, 1); //Инициализация на нов слайд със съответните му параметри

    slideObjCount++; //Увеличаване на броя на обектите в самия слайд
    //Инициалзирация на ново текстово поле в масива с текстовите полета. 
    textObjs[slideObjCount] = new textObj(slideObjCount, "Щракнете два пъти за да добавите текст", 10, 5, "Segoe UI", 1, 0, 0, 13, 15, "text", "#000000", "none");
    slideObjs[1].items[0] = textObjs[slideObjCount]; //Добавяне на обекта към масива за текущия слайд
    slideObjs[1].itemCount = 1; //Броя на обектите в слайда става 1 

    drawSlide(slideObjs[1]); //Изчертаване на първия слайд
    //loadFonts();
}
//Функция за преминаване към предишния слайд
function prevSlide() {
    if (curSlide > 1) { //Проверка дали не сме на първия слайд
        curSlide--; //Намаляме индекса на текущия слайд с 1
        drawSlide(slideObjs[curSlide]); //Изчертаване на новия слайд
        document.getElementById("curSlideNum").innerText = curSlide; //Временен код, който показва номера на текущия слайд
    }
}
//Функция за преминаване към следващия слайд
function nextSlide() {
    if (slides != curSlide) { //Проверка дали не сме на последния слайд
        textBoxLoseFocus(); //Изключваме фокуса над всички обекти
        curSlide++; //Увеличаваме индекса на текущия слайда с 1
        drawSlide(slideObjs[curSlide]); //Изчертаване на новия слайд
        document.getElementById("curSlideNum").innerText = curSlide; //Временен код, който показва номера на текущия слайд

    }
}
//Изчертава текущия слайд на екрана
function drawSlide(slideObjToDraw) {

    var curSlideObj = document.getElementById("curSlide");  //Намираме слайда от DOM
    curSlideObj.innerText = ""; //Задаваме му текста да е празен
    curSlideObj.style.backgroundColor = slideObjToDraw.backColor; //Добавяме стойност за цвят на фона от масива с данни
    curSlide = slideObjToDraw.id; //Задава индекса на текущия слайд да е id-то му в масива с данни
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
    drawText(slideObjToDraw); //Изчертаваме текстовите обекти в текущия слайд
    drawImg(slideObjToDraw); //Изчертаваме изображенията в текущия слайд

    //Код за скриване на специализираните менюта за обекти
    $("#textTools").hide();
    $("#imgTools").hide();
}
//Добавя нов слайд-обект към колекцията слайдове
function addNewSlide() {
    slides++; //Увеличаваме слайдовете с едно
    slideObjs[slides] = new slide(slides, "#ffffff", 0, 0, 0); //Добавяне нов слайд
    drawSlide(slideObjs[slides]); //Изчертаваме новия слайд
}

//Функция за фокусиране върху слайд, чрез премахване на фокуса от другите обекти
function focusOnSlide() {
    textBoxLoseFocus(); 
}

//Функция за преизчертаване на слайд
function redrawSlide() {
    //Тестова функция
    document.getElementById("curSlide").innerHTML = ""; //Изчиства DOM обекта

    drawSlide(slideObjs[curSlide]); //Изчертава текущия слайд
}

//Функция за унищожаване на текуща презентация и всичко обекти свързани с нея
function nukeSlides() {
    slides = 0; //Занулява броя на слайдовете
    curSlide = 0; //Занулява индекса на текущия слайд
    slideObjCount = 0; //Занулавя броя на обектите в текущия слайд

    slideObjs = []; //Занулява обекта за обекти на слайда
    textObjs = []; //Занулява обекта за текстове в слайда
    document.getElementById("curSlide").innerHTML = ""; //Занулява текста в DOM-а
}

//Функция за промяна фоновия цвят на слайд
function changeBGColor() {

    //Извиква colorDialog от приложението, което връща избрания цвят в hex формат

    var colorString = cefCustomObject.colorDialogFun(); //Присвоява резултата от функцията colorDialogFun();

    document.getElementById("curSlide").style.backgroundColor = colorString; //Задава цвета на фона на база на потребителския избор
    slideObjs[curSlide].backColor = colorString; //Записва стойността в масива 

}
//*----------------------------------------*
//Функции на текстовото поле
//*----------------------------------------*
//Функция за добавяне на текстово поле от потребителя
function addTextField() {
    slideObjCount++; //Увеличаване на идекса, отговарящ за броя на обектите в слайда
    textObjs[slideObjCount] = new textObj(slideObjCount, "Click for text", 20, 15, "Segoe UI", 1, 0, 0, 13, 15, "text", "#000000", "none");
    //Генериране на нов текстов обект със свойствата по подразбиране
    slideObjs[curSlide].items[slideObjs[curSlide].itemCount] = textObjs[slideObjCount]; //Добавяне на текстовото поле към масива с данни
    slideObjs[curSlide].itemCount++; //Увеличване на броя на елементите с 1
    drawSlide(slideObjs[curSlide]); //Изчертаване на слайда
}
//Функция за чертане на текст върху слайд
function drawText(slideObjsTextDraw) {
    var curSlideObj = document.getElementById("curSlide"); //Намиране на текущия DOM обект

    for (i = 0; i < slideObjsTextDraw.itemCount; i++) { //Цикъл за преминаване през всеки обект на слайда
        if (slideObjsTextDraw.items[i].type == "text") { //Проверка за типа на обекта
            var textDiv = document.createElement("div"); //Създаване на DOM обект

            textDiv.id = "text_s" + slideObjsTextDraw.id + "_t" + slideObjsTextDraw.items[i].id; //Присвояване на атрибути
            textDiv.classList.add("staticText"); //и класове

            textDiv.style = "position:absolute;left:" + slideObjsTextDraw.items[i].positionL + "vw;top:" + slideObjsTextDraw.items[i].positionT +
                "vw;right:" + slideObjsTextDraw.items[i].positionR +
                "vw;bottom:" + slideObjsTextDraw.items[i].positionB + "vw;" + "font-family:" + slideObjsTextDraw.items[i].fontFamily + ";" +
                "width:" + slideObjsTextDraw.items[i].widthO + "vw;" + "height:" + slideObjsTextDraw.items[i].heightO + "vh;" +
                "word-wrap: break-word;" + "color:" + slideObjsTextDraw.items[i].fontColor;
            //Стойностите на текстовото поле е от масива с данни 

            if (slideObjsTextDraw.items[i].backColor != "none") { //Ако текстово поле трябва да има цвят за фон, го добавя
                textDiv.style.backgroundColor = slideObjsTextDraw.items[i].backColor;
            }
            textDiv.style.fontSize = slideObjsTextDraw.items[i].fontSize + "vw";

            //"max-width:" + slideObjsTextDraw.items[i].widthO + "vw;" +
            textDiv.innerHTML = slideObjsTextDraw.items[i].textC; //Добавяне на текста

            textDiv.onmousedown = textBoxClicked; //Добавяне на събития
            //textDiv.onblur = textBoxLoseFocus;
            //textDiv.tabIndex = 1;

            curSlideObj.appendChild(textDiv); //Добавяне на DOM обекта към DOM-а на слайда
        }
    }
}

//Функция за чертане на caption върху слайд
function drawCaptionOnSlide(captionObjsTextDraw) {

    //Кода за caption е почти идентичен с този за чертане на текстово поле
    var curSlideObj = document.getElementById("curSlide"); //Намиране на текущия DOM обект
    if (captionObjsTextDraw.type == "caption") { //Проверка за типа
        var textDiv = document.createElement("div"); //Създаване на DOM обект

        textDiv.id = "text_s" + captionObjsTextDraw.id + "_t" + captionObjsTextDraw.id; //Присвояване на атрибути
        textDiv.classList.add("staticText"); //и класове

        textDiv.style = "position:absolute;left:" + captionObjsTextDraw.positionL + "vw;top:" + captionObjsTextDraw.positionT +
            "vw;right:" + captionObjsTextDraw.positionR +
            "vw;bottom:" + captionObjsTextDraw.positionB + "vw;" + "font-family:" + captionObjsTextDraw.fontFamily + ";" +
            "width:" + captionObjsTextDraw.widthO + "vw;" + "height:" + captionObjsTextDraw.heightO + "vh;" +
            "word-wrap: break-word;" + "color:" + captionObjsTextDraw.fontColor;
        //Стойностите са от масива с данни
        if (captionObjsTextDraw.backColor != "none") { //Чертане на фон
            textDiv.style.backgroundColor = captionObjsTextDraw.backColor;
        }
        textDiv.style.fontSize = captionObjsTextDraw.fontSize + "vw"; //Размер на шрифт
        //"max-width:" + captionObjsTextDraw.items[i].widthO + "vw;" +
        textDiv.innerHTML = captionObjsTextDraw.textC; //Добавяне на текста

        textDiv.onmousedown = textBoxClicked; //Добавяне на събития
        //textDiv.onblur = textBoxLoseFocus;
        //textDiv.tabIndex = 1;

        curSlideObj.appendChild(textDiv); //Добавяне на DOM обекта към DOM-а на слайда
    }
}

//Функция за трансформиране на текстово поле в поле за редакция на текст
function textBoxClicked(textBoxObj) {
    //textBoxObj.target - обектът, върху който е мишката
    if (textBoxObj.target.classList.contains("textInputWrapper") == false && textBoxObj.target.classList.contains("staticText") == true) {
        //Проверка дали текущия натиснат обект съдържа класовете, които сигнализират за текстово поле

        //Анимации за показване на допълнителните менюта
        $("#slideTools").fadeOut();
        $("#textTools").fadeIn();
        $("#imgTools").fadeOut();

        //Създава input полето, което се използва за въвеждане на текст
        var editTextPrototype = document.createElement("textarea");

        editTextPrototype.classList.add("textBox"); //Добавяне на необходимите класове
        editTextPrototype.value = textBoxObj.target.innerText; //Добавяне на текста
        editTextPrototype.onblur = textBoxLoseFocus; //Добавяне на събития
        editTextPrototype.autofocus = true;


        editTextPrototype.style = "width:" + textBoxObj.target.style.width + "; height:" + textBoxObj.target.style.height + ";" +
            "margin:0px;" + "font-family:" + textBoxObj.target.style.fontFamily + ";";

        //С textBoxObj.target се достига до текущия натиснат обект

        textBoxObj.target.childNodes[0].nodeValue = ""; //.innerHTML прави проблеми
        textBoxObj.target.classList.add("textInputWrapper"); //Добавяне на необходимите класове
        textBoxObj.target.classList.add("editText");
        textBoxObj.target.classList.remove("staticText");

        textBoxObj.target.tabIndex = 1; //Задаване на tabIndex, с цел да работи loseFocus()
        //textBoxObj.target.onblur = textBoxLoseFocus;
 
        $(".textInputWrapper").draggable(); //Възможност обекта да се мести с jQuery Drag&Drop API

        textBoxObj.target.appendChild(editTextPrototype); //Добавяме обекта към DOM на главния текстов обект
        textOn = false;

        curClickedObj = textBoxObj.target.id;
        //textBoxObj.target.children[0].select();

        var selectObjL = document.getElementById("selectFont"); //Намираме диалога за избор на шрифт

        for (i = 0; i < selectObjL.options.length; i++) { //Спрямо стойността на шрифт от масива с данни, избираме шрифта в select диалога
            if (selectObjL.options[i].value.toString().slice(0, -1) == textBoxObj.target.style.fontFamily) {
                selectObjL.options[i].selected = true;
            }
        }
    }

}

//Функция за трансформиране на поле за редакция на текст в обикновенно текстово поле
function textBoxLoseFocus(clickedObj) {
    var x = document.getElementById("curSlide").children; //x са елеме
    for (i = 0; i < x.length; i++) //Преминава през всички елементи в текущия слайд, x[i] е обект в слайда
    {
        if (x[i].classList.contains("editText") == true) //Ако текущия обект е текстово поле за редакция
        {
            var curObjW, curObjH, curObjText, curObjT, curObjL; //Позиция и размер на обекта

            //В зависимост от това, дали обекта е бил с променен размер, понякога размера се връща или в px или в vw
            //Спрямо това, се определя размера на обекта в vw
            if (x[i].children[0].style.width.slice(-2) == "vw") {
                curObjW = x[i].children[0].style.width.slice(0, 2);
                curObjH = x[i].children[0].style.height.slice(0, 2);
            }
            else if (x[i].children[0].style.width.slice(-2) == "px") {
                curObjW = ((x[i].children[0].style.width.slice(0, -2)) / w) * 100;
                curObjH = ((x[i].children[0].style.height.slice(0, -2)) / h) * 100;
            }


            curObjText = x[i].children[0].value; //Намираме текста от textarea 
            curObjT = (x[i].offsetTop / w) * 100; //Намираме и позицията на обекта в vw
            curObjL = (x[i].offsetLeft / w) * 100;

            for (j = 0; j < slideObjs[curSlide].itemCount; j++) { //Преминаваме през всички обекти в масива от данни
                if (x[i].id == "text_s" + slideObjs[curSlide].id + "_t" + slideObjs[curSlide].items[j].id && slideObjs[curSlide].items[j].type == "text") {
                    //Ако текущия обект съвпада с някой от записите в масива, то на него се прехвърлят стойностите от DOM-а
                    slideObjs[curSlide].items[j].widthO = curObjW;  //Ширина
                    slideObjs[curSlide].items[j].heightO = curObjH; //Височина
                    slideObjs[curSlide].items[j].textC = curObjText; //Текст
                    slideObjs[curSlide].items[j].positionL = curObjL; //Позиция
                    slideObjs[curSlide].items[j].positionT = curObjT; //Позиция
                }
            }
            //Код за премахване на текстовото поле и съответните класове
            x[i].classList.remove("textInputWrapper");
            x[i].classList.remove("editText");
            x[i].classList.add("staticText");

            //Разширяваме div-а, който ще държи готовия текст, спрямо размера на textarea-та
            x[i].style.width = x[i].children[0].style.width;
            x[i].style.height = x[i].children[0].style.height;

            x[i].removeChild(x[i].children[0]); //Премахваме textarea

            x[i].innerText = curObjText; //Прехвърляме текста

            //Анимации за доплънителните менюта
            $("#slideTools").fadeIn();
            $("#textTools").fadeOut();
            $("#imgTools").fadeOut();
            curClickedObj = ""; //Зануляваме натиснатия обект
        }
    }
}

function changeFontColor() {
    //TODO:
    //Да се пренапише, чрез WinForms API
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

//Функция за промянв на шрифта
function changeFont() {
    var selectObjL = document.getElementById("selectFont"); //Намира DOM обекта, отговарящ за избор на шрифт
    var x = document.getElementById("curSlide").children; //Прехвърля всички шрифтове към масив

    document.getElementById(curClickedObj).style.fontFamily = selectObjL.value; //Задава текущия шрифт, който е избран в селектора за шрифт
    document.getElementById(curClickedObj).children[0].style.fontFamily = selectObjL.value; //Ако обекта за текст е активиран, задава шрифта в textarea-та

    //slideObjs[curSlide].backColor = colorObj.value;
    //Преминаваме през всички елементи на масива с данни и търсим къде се намира в масива текущия DOM обект
    for (j = 0; j < slideObjs[curSlide].itemCount; j++) {
        if (x[i].id == "text_s" + slideObjs[curSlide].id + "_t" + slideObjs[curSlide].items[j].id && slideObjs[curSlide].items[j].type == "text") {
            slideObjs[curSlide].items[j].fontColor = colorObj.value; //Задаваме му стойността от fontDialog-а
        }
    }
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
    var imgUrl; //Променлива, която ще съдържа адреса на изображението
    var inputObj = document.createElement("input");  //Създаване на формата за избиране на изображение
    inputObj.type = "file"; //Тип на файла
    inputObj.id = "tempInput"; //ID 
    inputObj.hidden = true; //Да е скрит за потребителя

    document.getElementById("curSlide").appendChild(inputObj); //Добавяме го към DOM-а

    document.getElementById("tempInput").click(); //Показване на формата

    slideObjs[curSlide].itemCount++; //Увеличаваме броя на обектите в слайда
    var imgHolder = document.createElement("img"); //Създаване на img тага
    imgHolder.id = "img_s" + slideObjs[curSlide].id + "_t" + slideObjs[curSlide].itemCount; //Задаване на стойностите
    imgHolder.classList.add("imgContained"); //Добавяне на класове

    //Към този div контейнер се добавят събития, resize и dragDrop
    var imgDivContainer = document.createElement("div"); //Създаване на div контейнер
    imgDivContainer.id = "imgD_s" + slideObjs[curSlide].id + "_t" + slideObjs[curSlide].itemCount;

    imgDivContainer.appendChild(imgHolder); //Добавяме изображението към контейнера

    imgDivContainer.classList.add("staticImg"); //Класове
    document.getElementById("curSlide").appendChild(imgDivContainer); //Добавяне към DOM-а

    document.getElementById('tempInput').onchange = function (evt) { //След приключване на диалога за избор на файл се извиква тази функция
        var tgt = evt.target || window.event.srcElement,
            files = tgt.files; //Имаме target, спрямо резултата

        // Проверка за подръжка на FileReader
        if (FileReader && files && files.length) { 
            var fr = new FileReader(); //Нов обект fileReader
            fr.onload = function () { //След зареждане на fileReader се изпълнява следния код

                imgUrl = fr.result; //Намира се URL-а на изображението
                //imgHolder.src = fr.result;
                imgHolder.src = fr.result; //Типа се връща като base64/img - DataURL
                imgDivContainer.onmousedown = imgClicked; //Задаваме събития на обекта
                imgDivContainer.onblur = imgLoseFocus;
                imgDivContainer.tabIndex = 1; //TabIndex с цел да работи loseFocus();
                imgDivContainer.style.width = imgHolder.clientWidth + "px"; //Задаваме размера спрямо контейнера



                imgDivContainer.style.height = "400px"; //Този код трябва да се пипне
                //CHANGED HERE

                //imgHolder.classList.add("staticImg");
                //$("#" + imgDivContainer.id).draggable();


                var imgObjS = new imgObj(slideObjs[curSlide].itemCount, imgHolder.src, 0, 0, 0, (imgHolder.clientWidth / w) * 100, 
                (imgHolder.clientHeight / h) * 100, "none");
                slideObjs[curSlide].items[slideObjs[curSlide].itemCount - 1] = imgObjS;

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
//Функция за изчертаване на изображение
function drawImg(slideObjsTextDraw) {
    var curSlideObj = document.getElementById("curSlide"); //Намираме текущия DOM обект


    for (i = 0; i < slideObjsTextDraw.itemCount; i++) { //Преминаваме през всички обекти в масива с данни
        if (slideObjsTextDraw.items[i].type == "img") { //Ако типа на обекта е изображение, преминава към изчертаването му

            var imgDivContainer = document.createElement("div"); //Създаваме контейнер за изображението
            imgDivContainer.id = "imgD_s" + slideObjs[curSlide].id + "_t" + slideObjs[curSlide].itemCount;
            imgDivContainer.style = "position:absolute;left:" + slideObjsTextDraw.items[i].positionL + "vw;top:" + slideObjsTextDraw.items[i].positionT +
                "vh;width:" + slideObjsTextDraw.items[i].widthO + "vw;" + "height:" + slideObjsTextDraw.items[i].heightO + "vh;"

            var imgHolder = document.createElement("img");
            imgHolder.id = "img_s" + slideObjs[curSlide].id + "_t" + slideObjs[curSlide].itemCount;
            imgHolder.src = slideObjsTextDraw.items[i].imgUrl;
            imgHolder.classList.add("imgContained");

            imgDivContainer.onmousedown = imgClicked;
            imgDivContainer.onblur = imgLoseFocus;
            imgDivContainer.classList.add("staticImg");

            imgDivContainer.tabIndex = 1;

            if (slideObjsTextDraw.items[i].captionO != "none") {
                drawCaptionOnSlide(slideObjsTextDraw.items[i].captionO);
            }
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

            $("#slideTools").fadeIn();
            $("#textTools").fadeOut();
            $("#imgTools").fadeOut();
        }

    }
}

//Функция за премахване на обект изображение
function removeImg() {

    var x = document.getElementById("curSlide").children; //Текущите обекти в слайда, x[i] е обект
    //Функцията ще претърси всичките обекти и ще открие записа в БД, съответсващ на обекта
    for (i = 0; i < slideObjs[curSlide].itemCount; i++) {
        if (curClickedObj == "imgD_s" + slideObjs[curSlide].id + "_t" + slideObjs[curSlide].items[i].id) {
            //При откриване на съвпадение, премахва HTML обекта заедно с елемента от масива, отговарящ на този обект и прекъсва цикъла
            document.getElementById("img_s" + slideObjs[curSlide].id + "_t" + slideObjs[curSlide].items[i].id).remove();
            slideObjs[curSlide].items.splice(i, 1);
            break;
        }
    }
    slideObjs[curSlide].itemCount--; //Намалява броя на елементите в слайда
}

//Функция за добавяне заглавие под картинка
function imgAddCaption() {
    var x = document.getElementById("curSlide").children; //Текущите обекти в слайда, x[i] е обект
    var objDb = document.getElementById(curClickedObj); //Обект, който ще съдържа записа на текущото изображение в списъка с обекти

    var curObjW, curObjH, curObjT, curObjL; //Променливи съдържащи размера и позицията на обекта

    curObjT = (objDb.offsetTop / h) * 100;
    curObjL = (objDb.offsetLeft / w) * 100;

    if (objDb.style.width.slice(-2) == "vw") {
        curObjW = objDb.style.width.slice(0, 2);
        curObjH = objDb.style.height.slice(0, 2);
    }
    else if (objDb.style.width.slice(-2) == "px") {
        curObjW = ((objDb.style.width.slice(0, -2)) / w) * 100;
        curObjH = ((objDb.style.height.slice(0, -2)) / h) * 100;
    }



    var captionObj = new textObj(("c" + slideObjs[curSlide].itemCount), "Щракнете два пъти за да добавите текст", curObjT + ((curObjH * (9 / 16)) / 2.5), curObjL + (curObjW) / 2.5, "Segoe UI",
        1, 0, 0, 20, 5, "caption", "#B40000", "none");
    //Прототип на caption обекта


    for (var i = 1; i < slideObjs[curSlide].itemCount; i++) {

        //slideObjs[curSlide].items[i].id == curClickedObj
        if (curClickedObj == "imgD_s" + slideObjs[curSlide].id + "_t" + slideObjs[curSlide].items[i].id) {
            console.log("1");
            slideObjs[curSlide].items[i].captionO = captionObj;
        }
    }
    //curClickedObj.caption = captionObj; //Слага обекта caption като стойност на изображението
    drawCaptionOnSlide(captionObj); //Изчертата обекта



}