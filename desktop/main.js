// Start tracking mouse position
let x, y;
const logMousePosition = false;
document.addEventListener('mousemove', (event) => {
    x = event.clientX;
    y = event.clientY;
  
    if (logMousePosition)
        console.log('Mouse position:', x, y);
});


testInnerWidth();

// Function to demonstrate innerWidth
function testInnerWidth() {
    // This will log the width of the viewport
    console.log(window.innerWidth);

    // This will log the width of the frame viewport within a frameset
    console.log(self.innerWidth);

    // This will log the width of the viewport of the closest frameset
    console.log(parent.innerWidth);

    // This will log the width of the viewport of the outermost frameset
    console.log(top.innerWidth);
}


const openWindow = document.getElementsByClassName('open-folder')[0];
const secondWindow = document.getElementsByClassName('window-two')[0];
const folderBackground = document.getElementsByClassName('folder-bg')[0];
let trueButton = false;

openWindow.addEventListener('click', function() {

    if (trueButton === true) {
        secondWindow.style.display = "none";
        folderBackground.className = 'folder-bg close';
        trueButton = false;
    } else { 
        secondWindow.style.display = "block";
        folderBackground.className = 'folder-bg open';
        trueButton = true;
    }
});