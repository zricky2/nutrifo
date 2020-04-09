// Get the modal
var modal = document.getElementById("livestream_scanner");

// Get the <span> element that closes the modal
var x = document.getElementsByClassName("close")[0];

var close = document.getElementsByClassName("btn btn-primary")[0];

//barcodes
var items = {
    "item":[
    {"id": "028400310413", "name": "Lay's Classic Potato Chips, Party Size, 13 oz Bag", "ingredients" : ["POTATOES", "VEGETABLE OIL", "SALT"] },
    {"id": "038000219856", "name": "Kellogg's Apple Jacks Cereal", "ingredients" : ["Whole grain wheat" , "sugar", "brownrice syrup", "gelatin", "BHT"]},
    {"id": "030000012000", "name": "Quaker Oats", "ingredients": 	["100 Natural Whole Grain Quaker Quality Rolled Oats"]},
    {"id": "722252318237", "name": "Cliff Bar Coconut Almond Butter",	"ingredients" : ["NUT BUTTER BLEND* (ALMOND BUTTER*, CASHEW BUTTER*), BROWN RICE SYRUP*, ROLLED OATS*, OAT FLOUR*, PEA PROTEIN*, DATE PASTE*, CANE SYRUP*, RICE STARCH*, PALM OIL*, TAPIOCA SYRUP*, CANE SUGAR*, HIGH OLEIC SUNFLOWER OIL*, RICE FLOUR*, VEGETABLE GLYCERIN, COCONUT*, VIRGIN COCONUT OIL*, SEA SALT, NATURAL FLAVORS, COCOA*, NATURAL FLAVORS*, SUNFLOWER LECITHIN, MIXED TOCOPHEROLS (ANTIOXIDANT)"]},
    {"id": "070404001354", "name": "Pompeian Pomegranate Infused Red Wine Vinegar", "ingredients": 	["RED WINE VINEGAR REDUCED WITH WATER TO 5% ACIDITY"]}
]}

var additives = ["Potassium bromate","Propyl paraben", "Butylated hydroxyanisole", "BHA", "Butylated hydroxytoluene", "BHT", "Propyl gallate", 
    "Theobromine", "Secret flavor ingredients", "Artificial colors", "Diacetyl", "Phosphate-based food additives",
    "Aluminum-based additives"]
//scanner
var _scannerIsRunning = false;

function startScanner() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('modal-body'),
            constraints: {
                width: 640,
                height: 480,
                facingMode: "environment"
            },
        },
        decoder: {
            readers: [
                //"code_128_reader",
                //"ean_reader",
                //"ean_8_reader",
                //"code_39_reader",
                //"code_39_vin_reader",
                //"codabar_reader",
                "upc_reader",
                //"upc_e_reader",
                //"i2of5_reader"
            ],
            debug: {
                showCanvas: true,
                showPatches: true,
                showFoundPatches: true,
                showSkeleton: true,
                showLabels: true,
                showPatchLabels: true,
                showRemainingPatchLabels: true,
                boxFromPatches: {
                    showTransformed: true,
                    showTransformedBox: true,
                    showBB: true
                }
            }
        },
        locator: {
            patchSize: "medium",
            halfSample: true
        },
        numOfWorkers: 2,
        locate: true,

    }, function (err) {
        if (err) {
            console.log(err);
            return
        }

        console.log("Initialization finished. Ready to start");
        Quagga.start();

        // Set flag to is running
        _scannerIsRunning = true;
    });

    Quagga.onProcessed(function (result) {
        console.log("Scanner Processing");
        var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                result.boxes.filter(function (box) {
                    return box !== result.box;
                }).forEach(function (box) {
                    Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
                });
            }

            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
            }

            if (result.codeResult && result.codeResult.code) {
                Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
            }
        }
    });


    Quagga.onDetected(function (result) {
        //var oldCode = document.getElementById("barcode");
        //if (typeof (oldCode) != 'undefined' && oldCode != null) {
        //    document.removeChild(oldCode);
        //}
        console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
        var oldResult = document.getElementById("result");
        var newResult = document.createElement("div");
        newResult.className = "result";
        newResult.id = "result";
        oldResult.parentNode.replaceChild(newResult, oldResult);
        var upc = document.createElement("P");
        upc.id = "barcode"
        var t = document.createTextNode("Barcode Number: " + result.codeResult.code); //result.codeResult.code;
        upc.appendChild(t);
        var ing = document.createElement("P");
        ing.id = "ing"
        var ingt = document.createTextNode("Unknown Product");
        var addCount = 0;
        for (i in items.item) {
            if (items.item[i].id == result.codeResult.code) {
                for (x in items.item[i].ingredients) {
                    for (y in additives) {
                        if (x == y) {
                            addCount ++;
                        }
                    }
                }
                ingt.textContent = "Name: " + items.item[i].name + " Ingredients: " + items.item[i].ingredients;
                ing.appendChild(ingt);
            }
            
                
        }

        document.getElementById("result").appendChild(upc);
        document.getElementById("result").appendChild(ing);

         
        var color = document.createElement("div");
        color.className = "flex-container";
        console.log(addCount);
        if (addCount <= 4) {
        var label1 = document.createElement("span");
        label1.className = "label1";
        label1.innerText = "Safe";
        color.appendChild(label1);
        } else if (addCount <= 8) {
        var label2 = document.createElement("span");
        label2.className = "label2";
        label2.innerText = "Unsure";
        color.appendChild(label2);
        } else {
        var label3 = document.createElement("span");
        label3.className = "label3";
        label3.innerText = "Avoid";
        color.appendChild(label3);
        }
        
        document.getElementById("result").appendChild(color);
        Quagga.offProcessed();
        Quagga.offDetected();
        Quagga.stop();
        _scannerIsRunning = false;
        console.log("Scanner Stopped");
        modal.style.display = "none";
        
    });
}

//var xmlhttp = new XMLHttpRequest();
//xmlhttp.open("GET", "https://spreadsheets.google.com/feeds/cells/1OLWDqMnjsZV9EjUcoF_gmAWAsnL7KLmy8JV7KuJTTuo/1/public/full?alt=json", true);
//xmlhttp.onreadystatechange = function() {
//  if (this.readyState == 4 && this.status == 200) {
//    var data = JSON.parse(this.responseText);
    //document.getElementById("result").innerHTML = this.responseText[0];
//  }
//};
//xmlhttp.send();


// Start/stop scanner
document.getElementById("scan").addEventListener("click", function () {
    if (!_scannerIsRunning) {
        modal.style.display = "block";
        startScanner();
    }
}, false);

x.onclick = function () {
    Quagga.stop();
    modal.style.display = "none";
    console.log("Scanner Stopped");
    _scannerIsRunning = false;
}

close.onclick  = function () {
    Quagga.stop();
    modal.style.display = "none";
    console.log("Scanner Stopped");
    _scannerIsRunning = false;
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        Quagga.stop();
        modal.style.display = "none";
        console.log("Scanner Stopped");
        _scannerIsRunning = false;
    }
}
