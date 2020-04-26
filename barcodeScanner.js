// Get the modal
var modal = document.getElementById("livestream_scanner");

// Get the <span> element that closes the modal
var x = document.getElementsByClassName("close")[0];

var close = document.getElementsByClassName("btn btn-primary")[0];

// Get the result modal
var resultModal = document.getElementById("result");

// Get the <span> element that closes the modal
var resultExit = document.getElementById("resultExit");

var resultClose = document.getElementById("resultClose");


//barcodes
var items = {
    "item":[
    {"id": "028400310413", "name": "Lay's Classic Potato Chips, Party Size, 13 oz Bag", "ingredients" : ["Potatoes", " Vegetable Oil", " Salt"] },
    {"id": "038000219856", "name": "Kellogg's Apple Jacks Cereal", "ingredients" : ["Whole grain wheat", " sugar", " brownrice syrup", " gelatin" , " BHT"]},
    {"id": "030000012000", "name": "Quaker Oats", "ingredients": 	["100 Natural Whole Grain Quaker Quality Rolled Oats"]},
    {"id": "722252318237", "name": "Cliff Bar Coconut Almond Butter",	"ingredients" : ["NUT BUTTER BLEND", "ALMOND BUTTER", "CASHEW BUTTER", "BROWN RICE SYRUP", "ROLLED OATS", "OAT FLOUR", "PEA PROTEIN", "DATE PASTE", "CANE SYRUP", "RICE STARCH", "PALM OIL", "TAPIOCA SYRUP", "CANE SUGAR", "HIGH OLEIC SUNFLOWER OIL", "RICE FLOUR", "VEGETABLE GLYCERIN", "COCONUT", "VIRGIN COCONUT OIL", "SEA SALT", "NATURAL FLAVORS", "COCOA", "NATURAL FLAVORS", "SUNFLOWER LECITHIN", "MIXED TOCOPHEROLS (ANTIOXIDANT)"]},
    {"id": "656385363003", "name": "Mediterranean Sea Salt Mill", "ingredients": 	["Brittany Grey Sea Salt. Origin: France"]},
    {"id": "024100789382", "name": "Cheez it White Cheddar", "ingredients": 	["Enriched flour (wheat flour, niacin, reduced iron, vitamin B1 [thiamin mononitrate], vitamin B2 [riboflavin], folic acid), vegetable oil (soybean and palm oil with TBHQ for freshness), white cheddar cheese (milk, cheese cultures, salt, enzymes). Contains 2% or less of salt, whey, cheddar cheese (milk, cheese cultures, salt, enzymes), monosodium glutamate, whey protein concentrate, butter (cream, salt), baking soda, yeast, natural and artificial flavor, lactic acid, calcium lactate, disodium phosphate, citric acid, turmeric extract color, annatto extract color, soy lecithin"]},
    {"id": "041390050046", "name": "Kikkoman Panko Bread Crumbs", "ingredients": ["Wheat Flour, Sugar, Yeast, Salt"]},
    {"id": "044800001423", "name": "Parve Sugar in the Raw Turbinado Cane Sugar", "ingredients": ["Turbinado Sugar"]},
    {"id": "041196891027", "name": "Progresso Bread Crumbs Italian Style", "ingredients": 	["Breadcrumbs", "Enriched Flour", "Wheat Flour", "Malted Barley", " Niacin, Ferrous Sulfate", " Thiamin Mononitrate", " Riboflavin", " Folic Acid", "High Fructose Corn Syrup", "Corn Syrup", "Vegetable Oil", "Soybean and/or Cottonseed and/or Corn and/or Canola Oils", "Contains 2% or Less of:", "Salt", "Yeast", "Honey", "Molasses", "Sugar", "Wheat Gluten", "Whey", "Soy Flour", "Whole Wheat Flour", "Rye Flour", "White Corn Flour", "Oat Bran", "Rice Flour", "Potato Flour", "Butter", "Dough Conditioners", "Mono- and Diglycerides", "Sodium and/or Calcium Stearoyl Lactylate", "Soy Lecithin", "Calcium Carbonate", "Yeast Nutrients", "Ammonium Sulfate", "Calcium Sulfate", "Monocalcium Phosphate", "Distilled Vinegar", "Nonfat Milk", "Buttermilk", "Lactic Acid", "Calcium Propionate", "Potassium Sorbate", "Sesame Seeds", "Sunflower Seeds", "Egg", "Enriched Flour (Wheat Flour, Niacin, Iron, Thiamin Mononitrate, Riboflavin, Folic Acid)", "Salt", "Parsley", "Spice", "Onion Powder", "Garlic", "Natural Flavor", "Dried"]},
    {"id": "073575273346", "name": "Nakano Rice Vinegar Natural Mild & Mellow", "ingredients": 	["Rice Vinegar", "Invert Sugar", "Salt, Diluted With Water To 4% Acidity"]},
    {"id": "041390001055", "name": "Kikkoman Less Sodium Soy Sauce", "ingredients": 	["Water", "Wheat", "Soybeans", "Salt", "Lactic Acid", "Sodium Benzoate: Less than 1/10 of 1% as a Preservative"]},
    {"id": "011152068589", "name": "Imperial Dragon Sesame Seed Oil", "ingredients": 	["SESAME OIL"]},
    {"id": "016000160583", "name": "Nature Valley Crunchy Granola Bars Variety Pack (Oats 'N Honey, Peanut Butter)", "ingredients": ["Oats 'n Honey: Whole Grain Oats", "Sugar", "Canola Oil", "Rice Flour", "Honey", "Salt", "Brown Sugar Syrup", "Baking Soda", "Soy Lecithin", "Natural Flavor",  "Peanut Butter",  "Whole Grain Oats", "Sugar", "Canola Oil", "Peanut Butter", "Peanuts", "Salt", "Rice Flour", "Brown Sugar Syrup", "Salt", "Baking Soda", "Soy Lecithin"]},
    {"id": "041129077054", "name": "Classico Vodka Pasta Sauce", "ingredients": 	["Tomato Puree (Water, Tomato Paste)", "Diced Tomatoes In Juice", "Tomatoes", "Tomato Juice", "Citric Acid", "Calcium Chloride", "Cream", "Salted Vodka", "Contains Less Than 2% Of", "Parmesan Cheese (Cultured Part-Skim Milk, Salt, Enzymes)", "Water", "Sugar", "Salt", "Romano Cheese Made From Cow'S Milk (Milk, Cheese Cultures, Salt, Enzymes)", "Onions", "Basil", "Garlic", "Olive Oil", "Xanthan Gum", "Lactic Acid", "Spices", "Butter", "Sodium Phosphate", "Gum Arabic",  "Milk"]},
    {"id": "051000149817", "name": "Campbells Soup on the Go Creamy Tomato", "ingredients": 	["Water", "Tomato Puree (Water, Tomato Paste)", "High Fructose Corn Syrup", "Wheat Flour", "Contains Less Than 2% Of", "Salt", "Potassium Chloride", "Citric Acid", "Natural Flavoring", "Celery Extract", "Garlic Oil", "Wheat"]},
    {"id": "051000167217", "name": "Campbells Homestyle Chicken Noodle", "ingredients": 	["CHICKEN STOCK", "ENRICHED EGG NOODLES (WHEAT FLOUR, EGGS, EGG WHITES, NIACIN, FERROUS SULFATE, THIAMINE MONONITRATE, RIBOFLAVIN, FOLIC ACID)", "CHICKEN MEAT", "CONTAINS LESS THAN 2% OF:", "SALT", "VEGETABLE OIL", "POTATO STARCH", "CHICKEN FAT", "MONOSODIUM GLUTMATE", "WATER", "DEHYDRATED MECHANICALLY SEPARATED CHICKEN", "DEHYDRATED ONIONS", "MODIFIED FOOD STARCH", "YEAST EXTRACT", "SOY PROTEIN ISOLATE", "SODIUM PHOSPHATE", "FLAVORING", "DEHYDRATED GARLIC", "BETA CAROTENE FOR COLOR", "DEHYDRATED CHICKEN"]},
    {"id": "030100263517", "name": "Toasteds Crackers Party Pack: Toasted Sesame, Harvest Wheat, Buttercrisp", "ingredients": 	["ENRICHED FLOUR", "WHEAT FLOUR", " NIACIN"," REDUCED IRON", " THIAMIN MONONITRATE", " VITAMIN B1", "RIBOFLAVIN", "VITAMIN B2", "FOLIC ACID", " SOYBEAN OIL", " TBHQ", "WHOLE WHEAT FLOUR", "SUGAR", "TOASTED SESAME SEEDS", "CONTAINS TWO PERCENT OR LESS OF", " CORN SYRUP", "LEAVENING", "BAKING SODA", "SODIUM ACID PYROPHOSPHATE", "MONOCALCIUM PHOSPHATE", "CALCIUM SULFATE", "YEAST", "TOASTED DEFATTED WHEAT GERM", "MALT EXTRACT", "ONION", "BUTTER" ,"CREAM", "SALT", "GARLIC POWDER", "ANNATTO FOR COLOR", "SOY LECITHIN"]},
    {"id": "034000363957", "name": "Hershey's Milk Chocolate Heart", "ingredients": 	["Milk Chocolate", "Sugar", "Milk", "Chocolate", "Cocoa Butter", "Milk Fat", "Lecithin (Soy)", "Natural Flavor"]},
    {"id": "030100784586", "name": "Town House Pita Crackers Sea Salt", "ingredients": 	["Enriched flour" ," wheat flour" ," niacin", "reduced iron", "vitamin B1", "thiamin mononitrate", "vitamin B2", "riboflavin", "folic acid", "soybean oil",  "TBHQ", "rice", "flour", "sugar", "oat fiber", " sea salt", "Contains 2% or less of" , "yeast", "whey", "soy lecithin"]},
    {"id": "890000001110", "name": "GoGo Squeez Apple Strawberry", "ingredients": 	["Apple", "Apple Puree Concentrate", "Strawberry Blackcurrant"]},
    {"id": "031146250103", "name": "Nong Shim Hot & Spicy Noodles Bowl, 3.03 OZ", "ingredients": 	["Enriched Wheat Flour" , " Wheat Flour", " Niacin", " Reduced Iron", " Thiamine Mononitrate", " Riboflavin", " Folic Acid", " Palm Oil", " Potato Starch", " Modified Potato Starch", " Salt", " Hydrolyzed Soy Protein", " Contains Less than 2% of Each of the Following:", " Beef Extract (Powdered)", " Beef Fat (Powdered)", " Beef Stock (Powdered)", " Black Pepper (Powdered)", " Citric Acid", " Corn Syrup (Powdered)", " Dehydrated Vegetables" ," Green Onion", " Carrot", " Disodium Guanylate", " Disodium Inosinate", " Disodium Succinate", " Dried Fish Cake" ," Pollock", " Bream", " D-Sorbitol", " Modified Corn Starch", " Wheat Flour", " Sucrose Fatty Acid Esters", " Hydrolyzed Soy Protein", " Salt", " Sugar", " Color", " Garlic (Powdered)", " Ginger (Powdered)", " Maltodextrin", " Modified Tapioca Starch", " Natural flavor", " Onion (Powdered)", " Potassium carbonate", " Radish Extract (Powdered)", " Red Chili Pepper (Powdered)", " Riboflavin (Color)", " Rice (Powdered)", " Sodium Carbonate", " Sodium phosphate", " Soybeans (Powdered)", " Sugar", " Tocopherols (Antioxidant)", " Yeast Extract", " Yellow Corn Flour"]},
    {"id": "078742209975", "name": "Great Value Elbows Pasta, 16 oz", "ingredients": 	["DURUM SEMOLINA", "NIACIN", "FERROUS SULFATE (IRON)", "THIAMINE MONONITRATE", "RIBOFLAVIN, FOLIC ACID"]}
    
]}

var additives = [" Nitrate", " Nitrite", " Potassium bromate"," Propyl paraben", " Butylated hydroxyanisole", " BHA", " Butylated hydroxytoluene", " BHT", " Propyl gallate", 
    " Theobromine", " Natural flavor", " Artificial flavor", " Artificial color", " Diacetyl", " Phosphoric acid"," Sodium polyphosphate", " Pyrophosphate", " Sodium tripolyphosphate", " Polyphosphate", " Tricalcium phosphate", " Hexametaphosphate", " Trisodium phosphate", " Dicalcium phosphate",
    " Sodium phosphate", " Monocalcium phosphate", " Tetrasodium phosphate", " Aluminum phosphate", "Sodium aluminum phosphate", " Sodium aluminum sulfate" ]
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
        console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
        Quagga.offProcessed();
        console.log("Processing Stopped");
        Quagga.offDetected();
        console.log("Detetcting Stopped");
        Quagga.stop();
        _scannerIsRunning = false;
        console.log("Scanner Stopped");
        
        var oldResult = document.getElementById("rcontent");
        var newResult = document.createElement("div");
        newResult.className = "modal-body";
        newResult.id = "rcontent";
        oldResult.parentNode.replaceChild(newResult, oldResult);
        //barcode
        var number = document.createElement("P");
        number.id = "barcode"
        var barcode = document.createTextNode("UPC Number: " + result.codeResult.code); 
        number.appendChild(barcode);
        //product name
        var name = document.createElement("P");
        name.id = "name"
        name.innerHTML = "Unknown Product";
        //ingredients
        var ing = document.createElement("P");
        ing.id = "ing";
        ing.innerHTML = "Sorry this product is not in out database";
        var addit = [];
        //check for item
        var addCount = 0;
        for (i in items.item) {
            if (items.item[i].id == result.codeResult.code) {
                for (x in items.item[i].ingredients) {
                    for (y in additives) {
                        if (additives[y] === items.item[i].ingredients[x]) {
                            addit.push(additives[y]);
                            addCount ++;
                        }
                    }
                }
                console.log("Count is " + addCount);
                name.innerHTML = "Product Name: " + items.item[i].name; 
                ing.innerHTML = "Ingredients: " + items.item[i].ingredients+ "<br/><br/> Additives in the product: " + addit;
                break;   
            }
        }
        newResult.appendChild(number);
        newResult.appendChild(name);
        newResult.appendChild(ing);

        if (ing.innerHTML !== "Sorry this product is not in out database") {
        if (addCount == 0) {
        var label1 = document.createElement("span");
        label1.className = "label1";
        label1.id = "label";
        label1.innerText = "NO ADDITIVES DETECTED";
        newResult.appendChild(label1);
        } else  {
        var label2 = document.createElement("span");
        label2.className = "label2";
        label2.id = "label";
        label2.innerText = "HARMFUL ADDITIVE(S) DETECTED";
        newResult.appendChild(label2);
        }
        }
        modal.style.display = "none";
        resultModal.style.display = "block";
    });
}


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
    } else if (event.target == resultModal) {
        resultModal.style.display = "none";
    }
}

//result modal
  // When the user clicks on <span> (x), close the modal
resultExit.onclick = function() {
    resultModal.style.display = "none";
}

resultClose.onclick = function () {
    resultModal.style.display = "none";
}


  
  