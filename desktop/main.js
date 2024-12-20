// Start tracking mouse position
let x, y;
const logMousePosition = false;
document.addEventListener('mousemove', (event) => {
    x = event.clientX;
    y = event.clientY;
  
    if (logMousePosition)
        console.log('Mouse position:', x, y);
});

const window = document.getElementsByClassName('window')[0];
console.log(window);
window.style.backgroundColor = "lightgray";
window.style.borderRadius = "10px";

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

// Function to change color of window on click
const changeColor = document.getElementsByClassName('changing-color')[0];
const unchangeColor = document.getElementsByClassName('unchange-color')[0];
const windowMessage = document.getElementById('window-message');

// Add an event listener to the button that listens for the click event
changeColor.addEventListener('click', function() { 
    // This function will be executed when the button is clicked
    console.log("Button clicked!"); 
    window.style.backgroundColor = "lightblue";
    window.style.borderRadius = "50%";
    windowMessage.innerHTML = "Hi Martin :) You clicked the button!";
  });

unchangeColor.addEventListener('click', function() { 
    window.style.backgroundColor = "lightgray";
    windowMessage.innerHTML = "Hello World";
    window.style.borderRadius = "10px";
});


const openWindow = document.getElementsByClassName('open-folder')[0];
const secondWindow = document.getElementsByClassName('window-two')[0];

openWindow.addEventListener('click', function() { 
    secondWindow.style.display = "block";
});


openWindow.addEventListener('click', function() { 
    openWindow.className = 'open-folder open';
});
