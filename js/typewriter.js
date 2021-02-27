const rootTxt = 'Budi izvrstan u onome što ';
const txtSuffix =['želiš!', 'vidiš!', 'voliš.'];
const callToActionTxt='ZAISKRI.';

let upperTyper = new TypeIt(".upperText")
    .type(rootTxt)
    .go();
let lowerTyper = new TypeIt(".lowerText");

function sleep(milliseconds) {
    const start = Date.now();
    while (Date.now() - start < milliseconds);
}

function writeUpper(index) {
    upperTyper
        .pause(500)
        .type(txtSuffix[index])
        .pause(1000)
        .go()
}

function deleteUpper(index){
    upperTyper.delete(txtSuffix[index].length).go()
}

function writeLower(){
    lowerTyper.type(callToActionTxt).go()
}


function resetBoth() {
    upperTyper.reset()
}

function init(){
    while (true){
        writeUpper(0);
        for (let i = 1; i < txtSuffix.length; i++) {
            deleteUpper(i-1);
            writeUpper(i);
        }

        writeLower();
        sleep(5000);
        resetBoth();
    }
}

document.addEventListener("DOMContentLoaded", init);