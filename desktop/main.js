const openWindow = document.getElementsByClassName('open-folder')[0];
const folderBackground = document.getElementsByClassName('folder-bg')[0];
let trueButton = false;
const littleClose = document.getElementsByClassName('little_close')[0];

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

littleClose.addEventListener('click', function() {
console.log('clicked');
if (trueButton === true) {
    secondWindow.style.display = "none";
    folderBackground.className = 'folder-bg close';
    trueButton = false;}
});

// Start tracking mouse position
let x, y;
const logMousePosition = false;
const secondWindow = document.getElementsByClassName('window-two')[0];
let windowWidth = secondWindow.clientWidth;
let windowHeight = secondWindow.clientHeight;
let yOffset = windowWidth / 2;
let xOffset = windowHeight / 2;
let newX = x - xOffset;
let newY = y - yOffset; 

function moveWindowToPosition (newX,newY) {
    secondWindow.style.left = newX +'px';
    secondWindow.style.top = newY + 'px';

};

let windowClickTracker = false

secondWindow.addEventListener('mousedown', (event) => {
    windowClickTracker = true;
});

secondWindow.addEventListener('mouseup', (event) => {
    windowClickTracker = false;
});


    document.addEventListener('mousemove', (event) => {
        if (windowClickTracker === true) {
            x = event.clientX;
            y = event.clientY;
            console.log(windowWidth);
        moveWindowToPosition(x, y);
        if (logMousePosition)
            console.log('Mouse position:', x, y);
        }
        else {
            console.log('nope');
        }
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


