//各カウンターを格納する配列
let counters = [];

//カウンターをインクリメント/デクリメントする際のSE
let incrementSE = document.getElementById("incrementSE");
let decrementSE = document.getElementById("decrementSE");

//SEのボリュームを管理するスライダー
let seVolume = document.getElementById("volume");
//SEのボリュームの値を出力しているHTML要素
let volumeRange = document.getElementById("vol_range");
//ボリュームの初期設定
incrementSE.volume = seVolume.value*0.5;
decrementSE.volume = seVolume.value*0.25;

//スライダーの値を変更した際に、SEのボリュームが変わる様にする
seVolume.addEventListener("change", function(){
    volume = seVolume.value;
    incrementSE.volume = volume*0.5;
    decrementSE.volume = volume*0.25;
    volumeRange.textContent = volume;
});

//ミュートボタン
let muteButton = document.getElementById("mute-button");

//SEのミュート切り替え
function mute() {
    if (incrementSE.muted && decrementSE.muted) {
        incrementSE.muted = false;
        decrementSE.muted = false;
        muteButton.innerText = "カウントアップ/ダウン時のSEをミュートする";
    }
    else {
        incrementSE.muted = true;
        decrementSE.muted = true;
        muteButton.innerText = "カウントアップ/ダウン時のSEのミュートを解除する";
    }
}

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

//カウンターの値を0にリセットする関数
function resetCounter(index) {
    counters[index].count = 0;
}

//カウンターをwebページに描画する関数
function renderCounters() {
    //カウンター要素を入れていくdivタグ
    let countersDiv = document.getElementById("counters");
    countersDiv.innerHTML = "";

    //カウンター配列の要素の数だけ、カウンターを順に描画していく
    for (let i = 0; i < counters.length; i++){
        //カウンターごとの要素を格納するdivダグ
        let counterDiv = document.createElement("div");
        counterDiv.classList.add("counter");

        //カウンターの名前を出力するHTML要素
        let counterNameInput = document.createElement("input");
        counterNameInput.classList.add("counterNameInput");
        counterNameInput.type = "text";
        counterNameInput.value = counters[i].name;
        //名前を変更できる様にする処理
        counterNameInput.addEventListener("input", function (event) {
            updateCounterName(i, event.target.value);
        });
        //counterDivに追加する。
        counterDiv.appendChild(counterNameInput);

        //カウンターの値を出力するHTML要素
        let counterValueSpan = document.createElement("span");
        counterValueSpan.classList.add("counter-value");
        counterValueSpan.innerText = counters[i].count;
        //counterDivに追加する。
        counterDiv.appendChild(counterValueSpan);

        //カウンターの値を増加させるボタン
        let counterIncrementButton = document.createElement("button");
        counterIncrementButton.classList.add("counterIncrementButton");
        counterIncrementButton.innerText = "+";
        //クリックするとSEを鳴らし、カウンターの値を増加させる処理
        counterIncrementButton.addEventListener("click", function () {
            let count = counters[i].count + 1;
            updateCounter(i, count);
            incrementSE.play();
            counterValueSpan.innerText = count;
        });
        //counterDivに追加する。
        counterDiv.appendChild(counterIncrementButton);

        //カウンターの値を減少させるボタン
        let counterDecrementButton = document.createElement("button");
        counterDecrementButton.classList.add("counterDecrementButton");
        counterDecrementButton.innerText = "-";

        //クリックするとSEを鳴らし、カウンターの値を減少させる処理
        counterDecrementButton.addEventListener("click", function () {
            let count = counters[i].count -1;
            updateCounter(i, count);
            decrementSE.play();
            counterValueSpan.innerText = count;
        });

        //counterDivに追加する。
        counterDiv.appendChild(counterDecrementButton);

        //カウンターの値を0にするボタン
        let resetButton = document.createElement("button");
        resetButton.classList.add("resetButton");
        resetButton.innerText = "カウントリセット";

        //クリックするとカウンターの値を0にリセットする処理
        resetButton.addEventListener("click", function () {
            let count = 0;
            resetCounter(i);
            counterValueSpan.innerText = 0;
        });

        //counterDivに追加する。
        counterDiv.appendChild(resetButton);

        //当該カウンターを削除するボタン
        let counterRemoveButton = document.createElement("button");
        counterRemoveButton.classList.add("RemoveButton");
        counterRemoveButton.innerText = "カウントを削除";
        //クリックするとカウンターを削除する処理
        counterRemoveButton.addEventListener("click", function () {
            removeCounter(i);
            //カウンターを削除したので、再び描画し直す。
            renderCounters();
        });
        //counterDivに追加する。
        counterDiv.appendChild(counterRemoveButton);

        //最後に、作成したcounterDivをcountersDivに追加する
        countersDiv.appendChild(counterDiv);
    }
}

//ユーザがカウンターを追加する処理
document.addEventListener("DOMContentLoaded", function () {
    //カウンター追加ボタン
    let addCounterButton = document.getElementById("add-counter");
    //クリックした際にカウンター配列にカウンターを追加し、カウンターを描画する処理
    addCounterButton.addEventListener("click", function () {
        let counterNameInput = document.getElementById("counter-name");
        let counterName = counterNameInput.value.trim();
        addCounter(counterName);
        counterNameInput.value = "";
        renderCounters();
    });
    renderCounters();
});