class Tab {
	constructor() {
		this.tabs = document.querySelectorAll(".tab-item");
		this.contents = document.querySelectorAll(".tab-content");
		this.previousIndex = 0;
		this.contents[0].style.display = "block";
	}

	addClickEvent() {
		for(let i = 0; i < this.tabs.length; i++) {
			tab.onclick = () => {
				this._change(i);
			}
		}
	}

	addMoveEvent() {
		for(let i = 0; i < this.tabs.length; i++) {
			let tab = this.tabs[i];
			tab.onmousemove = () => {
				this._change(i);
			}
		}
	}

	_change(i) { // 使用_开头的方法代表告诉其他程序员这是private方法不要调用, 但其实不是真正private, 单纯为了提高阅读性
		// 排它
		// 由于previousIndex属于Tab, 所以this需要指向Tab, 则使用箭头函数
		let previousTab = this.tabs[this.previousIndex];
		previousTab.className = previousTab.className.replace("selected", ""); // 使用空String替换selected来删除类名

		let previousContent = this.contents[this.previousIndex];
		previousContent.style.display = "none";

		// 添加选中样式
		let currentTab = this.tabs[i];
		currentTab.className = previousTab.className + "selected";

		let currentContent = this.contents[i];
		currentContent.style.display = "block";

		// 保存当前索引
		this.previousIndex = i;
	}
}