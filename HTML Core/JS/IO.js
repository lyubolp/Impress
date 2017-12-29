function saveData(slidesObjs) {
    var dataToSend = [];
    var curLines = 0;
    console.log("Status - start save");
    console.log("Number of slides " + (slideObjs.length - 1));
    console.log("Status - transfer")
    var numbSlides = slideObjs.length;

    for (i = 1; i < numbSlides; i++) {
        dataToSend[curLines] = "//Begin slide";
        curLines++;

        dataToSend[curLines] = slideObjs[i].id;
        curLines++;

        dataToSend[curLines] = slideObjs[i].backColor;
        curLines++;

        dataToSend[curLines] = slideObjs[i].backImg;
        curLines++;

        dataToSend[curLines] = slideObjs[i].transition;
        curLines++;

        dataToSend[curLines] = slideObjs[i].itemCount;
        curLines++;

        dataToSend[curLines] = "//Begin slide items";
        curLines++;

        for (j = 0; j < slideObjs[i].itemCount; j++) {
            console.log(slideObjs[i].items[j]);
            if (slideObjs[i].items[j].type == "text") {

                dataToSend[curLines] = "//Text object";
                curLines++;

                dataToSend[curLines] = slideObjs[i].items[j].id;
                curLines++;

                dataToSend[curLines] = slideObjs[i].items[j].textC;
                curLines++;

                dataToSend[curLines] = slideObjs[i].items[j].positionT;
                curLines++;

                dataToSend[curLines] = slideObjs[i].items[j].positionL;
                curLines++;

                dataToSend[curLines] = slideObjs[i].items[j].fontColor;
                curLines++;

                dataToSend[curLines] = slideObjs[i].items[j].fontFamily;
                curLines++;

                dataToSend[curLines] = slideObjs[i].items[j].fontSize;
                curLines++;

                dataToSend[curLines] = slideObjs[i].items[j].fontParams;
                curLines++;

                dataToSend[curLines] = slideObjs[i].items[j].textEffect;
                curLines++;

                dataToSend[curLines] = slideObjs[i].items[j].backColor;
                curLines++;

                dataToSend[curLines] = slideObjs[i].items[j].widthO;
                curLines++;

                dataToSend[curLines] = slideObjs[i].items[j].heightO;
                curLines++;

                dataToSend[curLines] = slideObjs[i].items[j].type;
                curLines++;
            }
            else if (slideObjs[i].items[j].type == "img") {
                dataToSend[curLines] = "//Img object";
                curLines++;

                dataToSend[curLines] = slideObjs[i].items[j].id;
                curLines++;

                dataToSend[curLines] = slideObjs[i].items[j].imgUrl;
                curLines++;

                dataToSend[curLines] = slideObjs[i].items[j].positionT;
                curLines++;

                dataToSend[curLines] = slideObjs[i].items[j].positionL;
                curLines++;

                dataToSend[curLines] = slideObjs[i].items[j].effect;
                curLines++;

                dataToSend[curLines] = slideObjs[i].items[j].widthO;
                curLines++;

                dataToSend[curLines] = slideObjs[i].items[j].heightO;
                curLines++;

                console.log(slideObjs[i].items[j].captionO);
                if (slideObjs[i].items[j].captionO != "none") {

                    dataToSend[curLines] = "//Caption object";
                    curLines++;

                    dataToSend[curLines] = slideObjs[i].items[j].captionO.id;
                    curLines++;

                    dataToSend[curLines] = slideObjs[i].items[j].captionO.textC;
                    curLines++;

                    dataToSend[curLines] = slideObjs[i].items[j].captionO.positionT;
                    curLines++;

                    dataToSend[curLines] = slideObjs[i].items[j].captionO.positionL;
                    curLines++;

                    dataToSend[curLines] = slideObjs[i].items[j].captionO.fontColor;
                    curLines++;

                    dataToSend[curLines] = slideObjs[i].items[j].captionO.fontFamily;
                    curLines++;

                    dataToSend[curLines] = slideObjs[i].items[j].captionO.fontSize;
                    curLines++;

                    dataToSend[curLines] = slideObjs[i].items[j].captionO.fontParams;
                    curLines++;

                    dataToSend[curLines] = slideObjs[i].items[j].captionO.textEffect;
                    curLines++;

                    dataToSend[curLines] = slideObjs[i].items[j].captionO.backColor;
                    curLines++;

                    dataToSend[curLines] = slideObjs[i].items[j].captionO.widthO;
                    curLines++;

                    dataToSend[curLines] = slideObjs[i].items[j].captionO.heightO;
                    curLines++;

                    dataToSend[curLines] = slideObjs[i].items[j].captionO.type;
                    curLines++;

                    dataToSend[curLines] = "//End caption";
                    curLines++;
                }
                else {
                    dataToSend[curLines] = "none";
                    curLines++;
                }

                dataToSend[curLines] = slideObjs[i].items[j].type;
                curLines++;
            }
        }
        dataToSend[curLines] = "//End slide";
        curLines++;
    }
    console.log("Status - transfer completed");
    console.log(dataToSend);

    cefCustomObject.saveImpress(dataToSend);

}

function openData() {
    var resultsArray = [];
    var arrayL = 0;
    var inputObj = document.createElement("input");
    var slideCounts = 0;
    var slideItemCounts = 0;
    inputObj.type = "file";
    inputObj.id = "tempInput";
    inputObj.hidden = true;

    document.getElementById("curSlide").appendChild(inputObj);

    document.getElementById("tempInput").click();

    document.getElementById('tempInput').onchange = function (evt) {
        var tgt = evt.target || window.event.srcElement,
            files = tgt.files;

        // FileReader support
        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function (е) {
                resultsArray = е.target.result.split("\n");
                arrayL = resultsArray.length;

                nukeSlides();

                for (i = 0; i < arrayL; i++) {

                    if (resultsArray[i].slice(0, -1).localeCompare("//Begin slide") == 0) {
                        slideItemCounts = 0;
                        slideCounts++;
                        slides = slideCounts;
                        slideObjs[slideCounts] = new slide(resultsArray[i + 1].slice(0, -1), resultsArray[i + 2].slice(0, -1), resultsArray[i + 3].slice(0, -1), resultsArray[i + 4].slice(0, -1), resultsArray[i + 5].slice(0, -1));
                    }

                    if (resultsArray[i].slice(0, -1).localeCompare("//Text object") == 0) {
                        slideObjCount++;
                        textObjs[slideObjCount] = new textObj(Number(resultsArray[i + 1]), resultsArray[i + 2].slice(0, -1), Number(resultsArray[i + 3]),
                            Number(resultsArray[i + 4]), resultsArray[i + 6].slice(0, -1),
                            Number(resultsArray[i + 7]), Number(resultsArray[i + 8]), Number(resultsArray[i + 9]), Number(resultsArray[i + 11]),
                            Number(resultsArray[i + 12]), resultsArray[i + 13].slice(0, -1), resultsArray[i + 5].slice(0, -1), resultsArray[i + 10].slice(0, -1));
                        slideObjs[slideCounts].items[slideItemCounts] = textObjs[slideObjCount];

                        slideItemCounts++;

                        slideObjs[slideCounts].itemCount = slideItemCounts;

                    }
                    if (resultsArray[i].slice(0, -1).localeCompare("//Img object") == 0) {

                        if (resultsArray[i + 8].slice(0, -1) == "none") {
                            var imgObjS = new imgObj(Number(resultsArray[i + 1]),
                                resultsArray[i + 2].slice(0, -1), Number(resultsArray[i + 3].slice(0, -1)), Number(resultsArray[i + 4].slice(0, -1)), Number(resultsArray[i + 5].slice(0, -1)),
                                Number(resultsArray[i + 6].slice(0, -1)), Number(resultsArray[i + 7].slice(0, -1)), "none");

                            slideObjs[slideCounts].items[slideItemCounts] = imgObjS;

                            slideItemCounts++;
                            slideObjs[slideCounts].itemCount = slideItemCounts;
                            
                        }
                        else {
                            console.log("Caption to load");
                            var captionObjF = new textObj(resultsArray[i + 9], resultsArray[i + 10].slice(0, -1), Number(resultsArray[i + 11]),
                                Number(resultsArray[i + 12]), resultsArray[i + 14].slice(0, -1),
                                Number(resultsArray[i + 15]), Number(resultsArray[i + 16]), Number(resultsArray[i + 17]), Number(resultsArray[i + 19]),
                                Number(resultsArray[i + 20]), resultsArray[i + 21].slice(0, -1), resultsArray[i + 13].slice(0, -1), resultsArray[i + 18].slice(0, -1));

                            var imgObjS = new imgObj(Number(resultsArray[i + 1]),
                                resultsArray[i + 2].slice(0, -1), Number(resultsArray[i + 3].slice(0, -1)), Number(resultsArray[i + 4].slice(0, -1)), Number(resultsArray[i + 5].slice(0, -1)),
                                Number(resultsArray[i + 6].slice(0, -1)), Number(resultsArray[i + 7].slice(0, -1)), "none");

                            imgObjS.captionO = captionObjF;
                            slideObjs[slideCounts].items[slideItemCount] = imgObjS;

                            slideItemCounts++;
                            slideObjs[slideCounts].itemCount = slideItemCounts;
                        }

                    }
                }
                console.log(slideItemCounts);
                drawSlide(slideObjs[1]);


            }
            fr.readAsText(files[0]);
            //fr.readAsDataURL(files[0]);


        }

        // Not supported
        else {
            // fallback -- perhaps submit the input to an iframe and temporarily store
            // them on the server until the user's session ends.
        }
    }
}

function loadFonts() {
    var filePath = window.location.href.slice(0, -10) + "fontsList.txt";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", filePath, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {

                installedFonts = rawFile.responseText.split("\n");
                installedFontsCount = installedFonts.length + 1;

            }
        }
    }
    rawFile.send(null);
    var fontsListObj = document.getElementById("selectFont");
    fontsListObj.onchange = changeFont;

    for (i = 0; i < installedFontsCount; i++) {

        var optionObj = document.createElement("option");
        var optionC = installedFonts[i];
        var fontsSizeObj = document.getElementById("selectFontSize");

        optionObj.textContent = optionC;
        optionObj.value = optionC;
        fontsSizeObj.onchange = changeFontSize;
    

        fontsListObj.appendChild(optionObj);
    }

}