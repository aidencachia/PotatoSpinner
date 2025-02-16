let speed = 0; // Initial speed
let angle = 0; // Current rotation angle
let spinning = false;

const spinningImage = "img/potato_spinning_100x100.webp";
const stoppedImage = "img/potato_ideal_100x100.webp";

function spin() {
    let prevAngle = angle;
    if (speed > 0.01) { // Keep spinning until nearly stopped
        angle += speed; // Increase rotation
        speed *= 0.98; // Slow down gradually

        document.getElementById("potato").style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
        
        requestAnimationFrame(spin);
    } else {
        spinning = false; // Stop animation loop when speed is very low
    }

    if(speed < 0.5){
        document.getElementById("potato").src = stoppedImage;
    } else {
        document.getElementById("potato").src = spinningImage;
    }
    
    revs += (angle - prevAngle)/360;

    document.getElementById("Revs").innerHTML = Math.round(revs*100)/100
}


function increaseSpin(){
    speed += 0.1; // Increase speed on click
    if (!spinning) {
        spinning = true;
        spin();
    }
}