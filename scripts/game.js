let speed = 0; // Initial speed
let angle = 0; // Current rotation angle
let spinning = false;

const spinningImage = "img/potato_spinning_100x100.webp";
const stoppedImage = "img/potato_ideal_100x100.webp";

function spin() {
    if (speed > 0.01) { // Keep spinning until nearly stopped
        angle += speed; // Increase rotation
        speed *= 0.98; // Slow down gradually

        document.getElementById("potato").style.transform = `rotate(${angle}deg)`;
        
        requestAnimationFrame(spin);
    } else {
        spinning = false; // Stop animation loop when speed is very low
    }

    if(speed < 0.5){
        document.getElementById("potato").src = stoppedImage;
    } else {
        document.getElementById("potato").src = spinningImage;
    }
}


function increaseSpin(){
    speed += 5; // Increase speed on click
    if (!spinning) {
        spinning = true;
        spin();
    }
    console.log("Spin increased");
}