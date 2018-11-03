class CategorySelect extends HTMLElement {
	constructor() {
		// Always call super first in constructor
		super();
		
		let pickerOpen = false;
		let selected = this.getAttribute("selected");
		
		// Create a shadow root
		let shadow = this.attachShadow({mode: "open"});
		
		// Create elements
		let wrapper = document.createElement("div");
		wrapper.className = "wrapper";
		let display = document.createElement("div");
		display.className = "display";
		let displayLabel = document.createElement("div");
		displayLabel.innerText = "Choose a category...";
		this.displayLabel = displayLabel;
		let arrow = document.createElement("div");
		arrow.className = "arrow";
		let picker = document.createElement("div");
		picker.className = "picker";
		picker.style.display = "none";
		
		let items = [
			{name: "Items of Interest", disabled: true, items: [
				{name: "Starbucks Cups"},
				{name: "Plastic To-Go Cups"},
				{name: "Wax Paper Cups"},
				{name: "Compostable Take-Out"},
				{name: "Straws"}
			]},
			{name: "Paper", disabled: true, items: [
				{name: "Recyclable Paper", items: [
					{name: "Subcategory 2", items: [
						{name: "Subcategory 3", items: [
							{name: "Subcategory 4", items: [
								{name: "Subcategory 5", items: [
									{name: "Subcategory 6", items: [
										{name: "Subcategory 7"}
									]}
								]}
							]}
						]}
					]}					
				]},
				{name: "Shredded Paper"},
				{name: "Non-Recyclable Paper"},
				{name: "Paper Towels"}
			]},
			{name: "Plastic", disabled: true, items: [
				{name: "Non HI-5 recyclable plastic containers (1 & 2s)"},
				{name: "HI-5 recyclable plastic containers (1 & 2s)"},
				{name: "Food wrappers (chip bags, bar wrappers, ziplocks)"},
				{name: "Plastic food containers"},
				{name: "Other Plastic"}
			]},
			{name: "Glass", disabled: true, items: [
				{name: "HI-5 Glass Bottles and Containers"},
				{name: "Non-HI-5 Glass"}
			]},
			{name: "Metals", disabled: true, items: [
				{name: "Recyclable metals (pineapple and coconut h20)"},
				{name: "Non-recyclable"},
				{name: "Aluminum cans"}
			]}
		];
		
		let post = (item, depth) => {
			let itemOption = document.createElement("div");
			itemOption.className = "item";
			itemOption.innerText = item.name;
			itemOption.style.paddingLeft = (15 * depth) + "px";
			picker.appendChild(itemOption);
			
			if (selected == item) {
				displayLabel.innerText = item;
			}
			
			if (item.disabled) {
				itemOption.style.color = "#999";
				itemOption.className = "item disabled";
			}
			
			if (item.items) {
				for (let i = 0; i < item.items.length; i++) {
					post(item.items[i], depth + 1);
				}
			}
		};
		
		for (let i = 0; i < items.length; i++) {
			post(items[i], 1);
		}
		
		display.addEventListener("click", (event) => {
			pickerOpen = !pickerOpen;
			picker.style.display = pickerOpen ? "block" : "none";
		});
		
		let style = document.createElement("style");
		style.textContent = `
.wrapper {
	position: relative;
	cursor: default;
	user-select: none;
}

.display {
	height: 29px;
	border: none;
	border-bottom: 1px solid #DADCE0;
	padding: 2px 26px 2px 8px;
	outline: none;
	border-radius: 4px 4px 0 0;
	background: #F5F5F5;
	font-family: "Roboto Mono", monospace;
	font-size: 16px;
	line-height: 24px;
	box-sizing: border-box;
	transition: background 50ms;
}

.display:hover {
	background: #DBDBDB;
}

.arrow {
	position: absolute;
	top: 50%;
	right: 10px;
	border: 7px solid transparent;
	border-top-color: #333;
	border-width: 6px 4px 0 4px;
	transform: translateY(-50%);
}

.picker {
	position: absolute;
	width: 100%;
	margin-top: -1px;
	border: 1px solid #2196F3;
	border-radius: 0 0 4px 4px;
	background: #FFF;
	z-index: 999999;
	box-sizing: border-box;
}

.item {
	padding: 3px 8px;
	font-family: "Roboto Mono", monospace;
	font-size: 16px;
	line-height: 24px;
}

.item.header {
	padding-left: 8px;
}

.item.subitem {
	padding-left: 16px;
}

.item:not(.disabled):hover {
	background: #2196F3;
	color: #FFF;
}
`;
		
		// Attach the created elements to the shadow dom
		shadow.appendChild(style);
		shadow.appendChild(wrapper);
		wrapper.appendChild(display);
		display.appendChild(displayLabel);
		display.appendChild(arrow);
		wrapper.appendChild(picker);
	}
	
	connectedCallback() {
		let selected = this.getAttribute("selected");
		
		if (selected) {
			this.displayLabel.innerText = selected;
		}
	}
}

class CategoryBox extends HTMLElement {
	constructor() {
		// Always call super first in constructor
		super();
		
		let pickerOpen = false;
		let selected = this.getAttribute("selected");
		
		// Create a shadow root
		let shadow = this.attachShadow({mode: "open"});
		
		// Create elements
		let wrapper = document.createElement("div");
		wrapper.className = "wrapper";
		
		let style = document.createElement("style");
		style.textContent = `
.wrapper {
	position: relative;
	cursor: default;
	user-select: none;
}
`;
		
		// Attach the created elements to the shadow dom
		shadow.appendChild(style);
		shadow.appendChild(wrapper);
	}
}

customElements.define("category-select", CategorySelect);
customElements.define("category-box", CategoryBox);