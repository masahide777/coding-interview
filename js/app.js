/**
要件
1. exam.html をブラウザで開いた時、json/data.js にある変数 TABLE_DATA の内容がブラウザ上にテーブルとして表示される。テーブルのカラムの順番は exam.html にすでに書かれているものに従う。
2. button#start をクリックしたとき、テーブルの行が 1 秒ごとにランダムに並び変わる。
3. button#stop をクリックしたとき、2 の処理を停止できる。
4. button#sort をクリックしたとき、price の降順でテーブルの行がソートされる。price が同じ場合は id が昇順になるようにソートされる。
 */

let intervalEvent = 0;

function main() {
  createTable();
  document.getElementById("start").addEventListener("click", start);
  document.getElementById("stop").addEventListener("click", stop);
  document.getElementById("sort").addEventListener("click", sort);
}

function createTable() {
  const tblBody = document.getElementsByTagName("tbody")[0];
  const thead = Array.from(document.getElementsByTagName("th"));
  TABLE_DATA.forEach((rowData) => {
    const rowElm = document.createElement("tr");
    thead.forEach((th) => {
      const cell = document.createElement("td");
      const thText = th.innerText.toLowerCase();
      let cellElm;
      if (thText === "image") {
        cellElm = document.createElement("img");
        cellElm.setAttribute("src", rowData["thumbnailUrl"]);
      } else {
        cellElm = document.createTextNode(rowData[thText]);
      }
      cell.appendChild(cellElm);
      rowElm.appendChild(cell);
    });
    if (tblBody.childNodes.length === TABLE_DATA.length) {
      tblBody.removeChild(tblBody.firstChild);
    }
    tblBody.appendChild(rowElm);
  });
}

function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function start() {
  if (intervalEvent) return;
  intervalEvent = setInterval(() => {
    shuffle(TABLE_DATA);
    createTable();
  }, 1000);
}

function stop() {
  if (intervalEvent) {
    clearInterval(intervalEvent);
    intervalEvent = 0;
  }
}

function sort() {
  if (intervalEvent) return;
  TABLE_DATA.sort((a, b) => {
    if (a.price < b.price) {
      return 1;
    } else if (a.price === b.price) {
      if (Number(a.id) > Number(b.id)) return 1;
      return -1;
    } else {
      return -1;
    }
  });
  createTable();
}

main();
