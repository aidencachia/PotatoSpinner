let revs = 0.00;
let autoMoveLevel = 0;
let decreaseDecelerationLevel = 0;
let clickStrengthLevel = 0;
let speed = 0; // Initial speed
let angle = 0; // Current rotation angle
let spinning = false;

const spinningImage = "img/potato_spinning_100x100.webp";
const stoppedImage = "img/potato_ideal_100x100.webp";

const upgradeButtonsInfo = {
    autoMove: {
        text: "Auto Move",
        id: "autoMoveButton",
        upgradeFunction: upgradeAutoMove,
        levelId: "autoMoveLevel",
        costId: "autoMoveCost"
    },
    decreaseDeceleration: {
        text: "Decrease Deceleration",
        id: "decreaseDecelerationButton",
        upgradeFunction: upgradeDecreaseDeceleration,
        levelId: "decreaseDecelerationLevel",
        costId: "decreaseDecelerationCost"
    },
    clickStrength: {
        text: "Click Strength",
        id: "clickStrengthButton",
        upgradeFunction: upgradeClickStrength,
        levelId: "clickStrengthLevel",
        costId: "clickStrengthCost"
    }
}

let lastTimestamp = performance.now();
let rpm = 0; // real-time rpm

window.onload = load;
setInterval(save, 10000);

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
    const currentTimestamp = performance.now();
    let deltaTime = (currentTimestamp - lastTimestamp) / 1000; // seconds
    lastTimestamp = currentTimestamp;
    
    let prevAngle = angle;
    // if (speed > 0.01) { // Keep spinning until nearly stopped
        angle += speed; // Increase rotation
        speed = Math.max(speed*(1-Math.pow(0.2,decreaseDecelerationLevel*0.2+1)), autoMoveLevel*0.1); 

        // Guard against deltaTime being zero
        if (deltaTime < 0.001) {
            deltaTime = 0.001;  // minimum threshold to avoid infinity
        }
        rpm = ((angle - prevAngle) / 360) * (60 / deltaTime);
        // Optional: display rpm in a dedicated element if exists:
        // document.getElementById("rpm").innerText = rpm.toFixed(2);

        document.getElementById("potato").style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
        
        requestAnimationFrame(spin);
    // } else {
    //     spinning = false; // Stop animation loop when speed is very low
    // }

    if(speed < 0.5){
        document.getElementById("potatoImg").src = stoppedImage;
    } else {
        document.getElementById("potatoImg").src = spinningImage;
        if(speed < 0.01){
            speed = 0
            spinning = false;
        }
    }
    
    revs += (angle - prevAngle)/360;

    document.getElementById("Revs").innerHTML = (Math.floor(revs*100)/100).toFixed(2);
    document.getElementById("RPM").innerHTML = rpm.toFixed(2);
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

async function save(){
    if(localStorage.getItem("userId") == null){
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                revs: revs,
                upgrades: {
                    autoMove: autoMoveLevel,
                    decreaseDeceleration: decreaseDecelerationLevel,
                    clickStrength: clickStrengthLevel
                }
            }),
        };
        const res = await fetch(window.location.origin+"/save", requestOptions);
        const data = await res.json();

        console.log(data["key"]);

        localStorage.setItem("userId", data["key"]);
    }
    else{
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                revs: revs,
                upgrades: {
                    autoMove: autoMoveLevel,
                    decreaseDeceleration: decreaseDecelerationLevel,
                    clickStrength: clickStrengthLevel
                }
            }),
        };
        const res = await fetch(window.location.origin+"/save?key="+localStorage.getItem("userId"), requestOptions);
    }
}

async function load(){
    createButtons();

    if(localStorage.getItem("userId") != null){
        const res = await fetch(window.location.origin+"/save?key="+localStorage.getItem("userId"));
        const data = await res.json();

        revs = data["revs"];
        autoMoveLevel = data["upgrades"]["autoMove"];
        decreaseDecelerationLevel = data["upgrades"]["decreaseDeceleration"];
        clickStrengthLevel = data["upgrades"]["clickStrength"];

        document.getElementById("Revs").innerHTML = (Math.floor(revs*100)/100).toFixed(2);
        document.getElementById("autoMoveLevel").innerHTML = autoMoveLevel;
        document.getElementById("autoMoveCost").innerHTML = (Math.ceil(Math.pow(1.8,autoMoveLevel)*100)/100).toFixed(2);
        document.getElementById("decreaseDecelerationLevel").innerHTML = decreaseDecelerationLevel;
        document.getElementById("decreaseDecelerationCost").innerHTML = (Math.ceil(Math.pow(1.8,decreaseDecelerationLevel)*100)/100).toFixed(2);
        document.getElementById("clickStrengthLevel").innerHTML = clickStrengthLevel;
        document.getElementById("clickStrengthCost").innerHTML = (Math.ceil(Math.pow(1.8,clickStrengthLevel)*100)/100).toFixed(2);

        spin();
    }
}

function createButtons(){
    const buttonContainer = document.getElementById("upgradeButtonContainer");

    for(const [key, value] of Object.entries(upgradeButtonsInfo)){
        const button = document.createElement("button");
        button.innerHTML = value.text;
        button.id = value.id;
        button.className = "upgrade atma-bold";
        button.onclick = value.upgradeFunction;

        const level = document.createElement("div");
        level.className = "level";
        level.id = value.levelId;
        level.innerHTML = "0";

        const cost = document.createElement("p");
        cost.innerHTML = "<span id='"+value.costId+"'>1.00</span> Revs";
        cost.className = "atma-light"

        button.appendChild(level);
        button.appendChild(cost);

        buttonContainer.appendChild(button);
    }
}