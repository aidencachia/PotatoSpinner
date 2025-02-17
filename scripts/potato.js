let speed = 0; // Initial speed
let angle = 0; // Current rotation angle
let spinning = false;

const spinningImage = "img/potato_spinning_100x100.webp";
const stoppedImage = "img/potato_ideal_100x100.webp";

function spin() {
    let prevAngle = angle;
    // if (speed > 0.01) { // Keep spinning until nearly stopped
        angle += speed; // Increase rotation
        speed = Math.max(speed*(1-Math.pow(0.2,decreaseDecelerationLevel*0.2+1)), autoMoveLevel*0.1); 

        document.getElementById("potato").style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
        
        requestAnimationFrame(spin);
    // } else {
    //     spinning = false; // Stop animation loop when speed is very low
    // }

    if(speed < 0.5){
        document.getElementById("potatoImg").src = stoppedImage;
    } else {
        document.getElementById("potatoImg").src = spinningImage;
    }
    
    revs += (angle - prevAngle)/360;

    document.getElementById("Revs").innerHTML = (Math.round(revs*100)/100).toFixed(2);
}


function increaseSpin(){
    const canVibrate = window.navigator.vibrate
    if (canVibrate) window.navigator.vibrate(100)

    speed += 0.6 * (clickStrengthLevel+1); // Increase speed on click
    if (!spinning) {
        spinning = true;
        spin();
    }
}