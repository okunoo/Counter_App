//各カウンターを格納する配列
let counters = [];

//カウンターを追加する関数
function addCounter(name) {
    counters.push({ name: name, count: 0 });
}

//カウンターを削除する関数
function removeCounter(index) {
    //index番目から1つ要素を削除する　= index番目の要素を削除する。
    counters.splice(index,1);
}

//カウンターの値を更新する関数
function updateCounter(index, count) {
    counters[index].count = count;
}

//カウンターの名前を更新する関数
function updateCounterName(index, name) {
    counters[index].name = name;
}

function renderCounters() {
    let countersDiv = document.getElementById("counters");
    countersDiv.innerHTML = "";

    for (let i = 0; i < counters.length; i++){
        let counterDiv = document.createElement("div");
        counterDiv.classList.add("counter");

        let counterNameInput = document.createElement("input");
        counterNameInput.classList.add("counterNameInput");
        counterNameInput.type = "text";
        counterNameInput.value = counters[i].name;
        counterNameInput.addEventListener("input", function (event) {
            updateCounterName(i, event.target.value);
        });
        counterDiv.appendChild(counterNameInput);

        let counterValueSpan = document.createElement("span");
        counterValueSpan.classList.add("counter-value");
        counterValueSpan.innerText = counters[i].count;
        counterDiv.appendChild(counterValueSpan);

        let counterIncrementButton = document.createElement("button");
        counterIncrementButton.classList.add("counterIncrementButton");
        counterIncrementButton.innerText = "+";
        counterIncrementButton.addEventListener("click", function () {
            let count = counters[i].count + 1;
            updateCounter(i, count);
            counterValueSpan.innerText = count;
        });
        counterDiv.appendChild(counterIncrementButton);

        let counterDecrementButton = document.createElement("button");
        counterDecrementButton.classList.add("counterDecrementButton");
        counterDecrementButton.innerText = "-";
        counterDecrementButton.addEventListener("click", function () {
            let count = counters[i].count -1;
            updateCounter(i, count);
            counterValueSpan.innerText = count;
        });
        counterDiv.appendChild(counterDecrementButton);

        let counterRemoveButton = document.createElement("button");
        counterRemoveButton.classList.add("RemoveButton");
        counterRemoveButton.innerText = "削除";
        counterRemoveButton.addEventListener("click", function () {
            removeCounter(i);
            renderCounters();
        });
        counterDiv.appendChild(counterRemoveButton);

        countersDiv.appendChild(counterDiv);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let addCounterButton = document.getElementById("add-counter");
    addCounterButton.addEventListener("click", function () {
        let counterNameInput = document.getElementById("counter-name");
        let counterName = counterNameInput.value.trim();
        if (counterName !== "") {
            addCounter(counterName);
            counterNameInput.value = "";
            renderCounters();
        }
    });
    renderCounters();
});