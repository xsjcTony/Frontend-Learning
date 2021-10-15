function addFooter() {
    let oDiv = document.createElement("div");
    oDiv.innerText = "我是底部";
    document.body.appendChild(oDiv);
}

exports.addFooter = addFooter
