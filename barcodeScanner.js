// create button
//var input = document.createElement("input");
//input.id = "btn";

//scanner
var _scannerIsRunning = false;

function startScanner() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#scanner-container'),
            constraints: {
                width: 480,
                height: 320,
                facingMode: "environment"
            },
        },
        decoder: {
            readers: [
                "code_128_reader",
                "ean_reader",
                "ean_8_reader",
                "code_39_reader",
                "code_39_vin_reader",
                "codabar_reader",
                "upc_reader",
                "upc_e_reader",
                "i2of5_reader"
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
        console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
        var upc = document.createElement("P");
        var t = document.createTextNode("Barcode Number: " + result.codeResult.code); //result.codeResult.code;
        upc.appendChild(t);
        document.body.appendChild(upc);
        if (true) {
            var color = document.createElement("div");
            var div1 = document.createElement("div");
            div1.innerText = "Safe";
            var div2 = document.createElement("div");
            div2.innerText = "Unsure";
            var div3 = document.createElement("div");
            div3.innerText = "Avoid";
            div3.style.backgroundColor = "#c52020"
            color.className = "flex-container";
            color.appendChild(div1);
            color.appendChild(div2);
            color.appendChild(div3);
            document.body.appendChild(color);
        }
        _scannerIsRunning = false;
        Quagga.stop();

        var videoBox = document.createElement("div");
        videoBox.id = "scanner-container";
        var oldBox = document.getElementById("scanner-container");
        console.log(oldBox)
        oldBox.parentNode.replaceChild(videoBox,oldBox);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if ( request.readyState === 4 && request.status === 200 ) {
            var my_JSON_object = JSON.parse(request.responseText);
            console.log(my_JSON_object);
        }
    };
    request.open("GET", "database.json", true);
    request.send();
    });
}


// Start/stop scanner
document.getElementById("btn").addEventListener("click", function () {
    if (_scannerIsRunning) {
        Quagga.stop();
        _scannerIsRunning = false;
        var videoBox = document.createElement("div");
        videoBox.id = "scanner-container";
        var oldBox = document.getElementById("scanner-container");
        console.log(oldBox)
        oldBox.parentNode.replaceChild(videoBox,oldBox);
    } else {
        startScanner();
    }
}, false);
