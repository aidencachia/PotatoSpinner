let revs = 0.00;
let autoMoveLevel = 0;
let decreaseDecelerationLevel = 0;
let clickStrengthLevel = 0;
let speed = 0; // Initial speed
let angle = 0; // Current rotation angle

const spinningImage = "img/potato_spinning_100x100.webp";
const stoppedImage = "img/potato_ideal_100x100.webp";


function upgradeAutoMove() {
    if (revs >= Math.pow(1.8,autoMoveLevel)) {
        revs -= Math.pow(1.8,autoMoveLevel);
        autoMoveLevel++;

        document.getElementById("autoMoveLevel").innerHTML = autoMoveLevel;
        document.getElementById("autoMoveCost").innerHTML = (Math.ceil(Math.pow(1.8,autoMoveLevel)*100)/100).toFixed(2);
        spin();
    }
}

function upgradeDecreaseDeceleration() {
    if (revs >= Math.pow(1.8,decreaseDecelerationLevel)) {
        revs -= Math.pow(1.8,decreaseDecelerationLevel);
        decreaseDecelerationLevel++;
  
        document.getElementById("decreaseDecelerationLevel").innerHTML = decreaseDecelerationLevel;
        document.getElementById("decreaseDecelerationCost").innerHTML = (Math.ceil(Math.pow(1.8,decreaseDecelerationLevel)*100)/100).toFixed(2);
    }
}

function upgradeClickStrength() {
    if (revs >= Math.pow(1.8,clickStrengthLevel)) {
        revs -= Math.pow(1.8,clickStrengthLevel);
        clickStrengthLevel++;
  
        document.getElementById("clickStrengthLevel").innerHTML = clickStrengthLevel;
        document.getElementById("clickStrengthCost").innerHTML =  (Math.ceil(Math.pow(1.8,clickStrengthLevel)*100)/100).toFixed(2);
    }
}

function spin() {
    let prevAngle = angle;
    angle += speed; // Increase rotation
    speed = Math.max(speed*(1-Math.pow(0.2,decreaseDecelerationLevel*0.2+1)), autoMoveLevel*0.1); 

    document.getElementById("potato").style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    
    requestAnimationFrame(spin);

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
}