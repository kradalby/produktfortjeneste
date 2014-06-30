
var OMREGNING = 2.97216
var KONSULENT = 0.5812
var MAX_DISCOUNT = 50 + 1


function calculateFullPrice(costPrice) {
    return costPrice * OMREGNING;
}

function calculateConsultantPrice(fullPrice) {
    return fullPrice * 0.5812

}


function addInputField() {
    var container = document.querySelector("#input");

    var field = document.createElement("input");
    field.type = "number";
    field.value = 0;
    field.addEventListener("click", function() {
        field.select()
    });
    //field.pattern = "[0-9]+([,\.][0-9]+)?";
    field.addEventListener("keyup", update);
    container.appendChild(field);
    container.appendChild(document.createElement("br"));

}

function sumInputFields() {
    var container = document.querySelector("#input");
    var totalCostPrice = document.querySelector("#totalCostPrice"); 
    var sum = 0;
    for (var c = 0; c < container.children.length; c += 2) {
        sum += parseFloat(container.children[c].value);
    }

    totalCostPrice.innerHTML = sum + " kr";
    return sum;
}

function createRows() {
    var table = document.querySelector("#discountTable");

    for (var r = 0; r < MAX_DISCOUNT; r += 5) {
        var row = document.createElement("tr");
        var discount = document.createElement("td");
        var customer = document.createElement("td");
        var consultant = document.createElement("td");

        discount.innerHTML = r + "% avslag";

        customer.id = "cust" + r;
        customer.innerHTML = 0 + " kr";

        consultant.id = "cons" + r;
        consultant.innerHTML = 0 + " kr";

        row.appendChild(discount);
        row.appendChild(customer);
        row.appendChild(consultant);
        table.children[0].appendChild(row);
    }

}

function calculateDiscount(sum) {
    var table = document.querySelector("#discountTable");

    for (var r = 0; r < MAX_DISCOUNT; r += 5) {
        var customer = document.querySelector("#" + "cust" + r);
        var consultant = document.querySelector("#" + "cons" + r);

        var price = calculateFullPrice(sum) * ((100-r)/100);

        customer.innerHTML = Math.round(price) + " kr";
        consultant.innerHTML = Math.round(calculateConsultantPrice(price)*100)/100 + " kr";

    }
    
}

function update() {
    var sum = sumInputFields();
    calculateDiscount(sum);
}

window.onload = function () {
    createRows();

    addInputField();
    addInputField();
    addInputField();

    firstInputField = document.querySelector("#input").children[0];
    firstInputField.focus();
    firstInputField.select();
}
