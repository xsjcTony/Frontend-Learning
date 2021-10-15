function addHeader() {
    let oDiv = document.createElement("div");
    oDiv.innerText = "我是头部";
    document.body.appendChild(oDiv);
}

exports.addHeader = addHeader
