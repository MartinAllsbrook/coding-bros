// Start tracking mouse position
let x, y;
const logMousePosition = false;
const secondWindow = document.getElementsByClassName('window-two')[0];

function moveWindowToPosition (x,y) {
    secondWindow.style.left = x + 'px';
    secondWindow.style.top = y + 'px';
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


const openWindow = document.getElementsByClassName('open-folder')[0];
const folderBackground = document.getElementsByClassName('folder-bg')[0];
let trueButton = false;

openWindow.addEventListener('click', function() {
console.log('clicked');
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