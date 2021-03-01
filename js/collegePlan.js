const nastavniPlanLink = 'http://www.fulek.com/VUA/SUPIT/GetNastavniPlan';
const kolegijLink = 'http://www.fulek.com/VUA/supit/GetKolegij/';

let kolegijList = [];
let chosenKolegijiID = [];


// Access db and get data
fetch(nastavniPlanLink)
    // turn data into json
    .then(res => res.json())
    // .then(data => console.log(data));
    .then((rawData) => {
        // get labels from db
        rawData.forEach(kolegij => kolegijList.push(kolegij.label));
        // use them as autocomplete
        $("#kolegijInput").autocomplete({
            source: kolegijList
        });

        // when autocomplete closes append row to table
        $("#kolegijInput").on("autocompleteclose", function (event, ui) {
            // find the value of chosen Kolegij
            let label = $("#kolegijInput").val();
            let value = rawData.find(kolegij => kolegij.label == label)?.value;

            if (typeof value !== 'undefined') {
                // fetch data for chosen kolegij
                fetch(kolegijLink + value)
                    .then(result => result.json())
                    .then((kolegijData) => {
                        chosenKolegijiID.push(kolegijData.id);
                        // add to table
                        $('#chosenKolegiji').append(`<tr class="kolegijInTable" id="${kolegijData.id}"><td class="kolegijName">${kolegijData.kolegij}</td><td class="ects">${kolegijData.ects}</td><td class="sati">${kolegijData.sati}</td><td class="predavanja">${kolegijData.predavanja}</td><td class="vjezbe">${kolegijData.vjezbe}</td><td class="tip">${kolegijData.tip}</td><td class="buttonRemove"><button class="btn btn-close" onclick="removeKolegij(${kolegijData.id})"></button></td></tr>`)

                        // sum the data
                        sumData(chosenKolegijiID);
                    })
            }
        })

    })

function removeKolegij(id) {

    console.log('removing:', id);
    // remove from array (backend removal)
    chosenKolegijiID.splice(chosenKolegijiID.indexOf(id), 1);
    console.log('removed:', id);

    //remove from table (frontend removal)
    $(`#${id}`).remove();

    sumData(chosenKolegijiID);
}

function sumData(data) {
    let brSati = 0;
    let brECTS = 0;

    // get go by id and sum relevant data from table
    for (let i = 0; i < data.length; i++) {
        console.log('i: ', i);
        console.log('tabledata[i]', data[i]);
        brECTS += parseInt($("#" + data[i] + " .ects").html());
        console.log('brects', brECTS);
        brSati += parseInt($("#" + data[i] + ' .sati').html());
        console.log('brsati', brSati);

    }
    $('#sumECTS').html(brECTS);
    $('#sumSati').html(brSati);

    if (brSati === 0 || brECTS === 0) {
        if (brECTS === 0) {
            $('#sumECTS').html('');
        }
        if (brSati === 0) {
            $('#sumSati').html('');
        }
    }
}

