var node = document.createElement("LI");                 // Create a <li> node
node.className = "nav-item active";
    
//var textnode = document.createTextNode("Login"); 
var att = document.createElement("a")
att.textContent = "Login";
att.href = "login.html";
att.className = "nav-link";                          
node.appendChild(att);// Append the text to <li>
document.getElementById("navul").appendChild(node);     // Append <li> to <ul> with

function openQRCamera(node) {
    var reader = new FileReader();
    
    reader.onload = function() {
      node.value = "";
      qrcode.callback = function(res) {
        if(res instanceof Error) {
          alert("No QR code found. Please make sure the QR code is within the camera's frame and try again.");
        } else {
          node.parentNode.previousElementSibling.value = res;
        }
      };
      qrcode.decode(reader.result);
    };
    reader.readAsDataURL(node.files[0]);
    enableBtn()

  };

  function showQRIntro() {
    return confirm("Use your camera to take a picture of a QR code.");
  };


  function enableBtn() {
    document.getElementById("go").disabled = false;
  };