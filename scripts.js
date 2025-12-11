/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "230px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}



function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}




const fileInput = document.getElementById('item-image');
const previewImg = document.getElementById('preview-img');

fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];  // Get the uploaded file
    
    if (file) {
        const reader = new FileReader();  // Create file reader
        
        reader.onload = function(e) {
            previewImg.src = e.target.result;  // Set image source
            previewImg.style.display = 'block';  // Show image
        };
        
        reader.readAsDataURL(file);  // Read file as data URL
    }
});