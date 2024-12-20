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