let revs = 0.00;
let autoMoveLevel = 0;
let decreaseDecelerationLevel = 0;
let clickStrengthLevel = 0;

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