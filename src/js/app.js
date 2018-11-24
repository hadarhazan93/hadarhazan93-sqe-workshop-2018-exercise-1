import $ from 'jquery';
import {parseCode} from './code-analyzer';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        draw(parsedCode);
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
    });
});

function draw(tableArr){
    var C1 , C2, C3, C4, C5, r, i;
    var table = document.getElementById('myTable');
    var first_row = table.insertRow(0);
    C1 = first_row.insertCell(0);
    C1.innerHTML = 'Line';
    C2 = first_row.insertCell(1);
    C2.innerHTML = 'Type';
    C3 = first_row.insertCell(2);
    C3.innerHTML = 'Name';
    C4 = first_row.insertCell(3);
    C4.innerHTML = 'Condition';
    C5 = first_row.insertCell(4);
    C5.innerHTML = 'Value';
    f(table,tableArr, C1 , C2, C3, C4, C5, r, i);
}

function f(table, tableArr, C1 , C2, C3, C4, C5, r, i) {
    for( i=0 ; i<tableArr.length ; i++){
        r = table.insertRow(i+1);
        C1 = r.insertCell(0);
        C1.innerHTML = tableArr[i].Line;
        C2 = r.insertCell(1);
        C2.innerHTML = tableArr[i].Type;
        C3 = r.insertCell(2);
        if (typeof tableArr[i].Name === 'undefined' ){C3.innerHTML = null; }
        else { C3.innerHTML = tableArr[i].Name; }
        C4 = r.insertCell(3);
        if (typeof tableArr[i].Condition === 'undefined' ){C4.innerHTML = null; }
        else { C4.innerHTML = tableArr[i].Condition; }
        C5 = r.insertCell(4);
        if (typeof tableArr[i].Value === 'undefined' ){ C5.innerHTML = null; }
        else { C5.innerHTML = tableArr[i].Value; }
    }
}

