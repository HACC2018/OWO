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

class CategoryBag extends HTMLElement {
	constructor() {
		// Always call super first in constructor
		super();

		// Create a shadow root
		let shadow = this.attachShadow({mode: "open"});

		// Create elements
		let wrapper = document.createElement("div");
		wrapper.className = "data-category category-label";
    wrapper.dataset.label = "Bag #1";

		let del = document.createElement("div");
		del.className = "delete";

		let delspan = document.createElement("span");
		delspan.className = "mdi mdi-close";

		let half1 = document.createElement("div");
		half1.className = "half";

		let half2 = document.createElement("div");
		half2.className = "half";

		let weight = document.createElement("h3");
		weight.innerText = "Weight (lbs)";

		let inputWeight = document.createElement("input");
		inputWeight.type = "number";
		inputWeight.className = "data-content";
		inputWeight.setAttribute("placeholder", "Weight");

		let volume = document.createElement("h3");
		volume.innerText = "Volume (gal)";

		let inputVolume = document.createElement("input");
		inputVolume.type = "number";
		inputVolume.className = "data-content";
		inputVolume.setAttribute("placeholder", "Volume");

		wrapper.appendChild(del);
		del.appendChild(delspan);
		wrapper.appendChild(half1);
		half1.appendChild(weight);
		half1.appendChild(inputWeight);
		wrapper.appendChild(half2);
		half2.appendChild(volume);
		half2.appendChild(inputVolume);

		let style = document.createElement("style");
		style.textContent = `
@import "input.css";
@import "global.css";
@import "https://cdn.materialdesignicons.com/2.8.94/css/materialdesignicons.min.css";
`;

		// Attach the created elements to the shadow dom
		shadow.appendChild(style);
		shadow.appendChild(wrapper);
	}
}

class CategoryBox extends HTMLElement {
	constructor() {
		// Always call super first in constructor
		super();

		// Create a shadow root
		let shadow = this.attachShadow({mode: "open"});

		// Create elements
		let wrapper = document.createElement("div");
		wrapper.className = "data-category";

		let del = document.createElement("div");
		del.className = "delete";

		let delspan = document.createElement("span");
		delspan.className = "mdi mdi-close";

		let h3 = document.createElement("h3");
		h3.innerText = "Category";

		let categorySelect = document.createElement("category-select");
		categorySelect.setAttribute("selected", "Recyclable Paper");

		let bag = document.createElement("category-bag");

		let div = document.createElement("div");
		div.className = "right";

		let button = document.createElement("button");
		button.className = "fab icon";

		let buttonspan = document.createElement("span");
		buttonspan.className = "icon mdi mdi-plus";

		let buttonLabel = document.createTextNode("Bag");

		 wrapper.appendChild(del);
		 del.appendChild(delspan);
		 wrapper.appendChild(h3);
		 wrapper.appendChild(categorySelect);
		 wrapper.appendChild(bag);
		 wrapper.appendChild(div);
		 div.appendChild(button);
		 button.appendChild(buttonspan);
		 button.appendChild(buttonLabel);

		let style = document.createElement("style");
		style.textContent = `
@import "input.css";
@import "global.css";
@import "https://cdn.materialdesignicons.com/2.8.94/css/materialdesignicons.min.css";
`;

		// Attach the created elements to the shadow dom
		shadow.appendChild(style);
		shadow.appendChild(wrapper);
	}
}

customElements.define("category-select", CategorySelect);
customElements.define("category-bag", CategoryBag);
customElements.define("category-box", CategoryBox);

/*
// Saves a new form on the Firebase DB.
function saveAuditForm(elementvalue) {
  // Add a new form entry to the Firebase Database.

}


// Triggered when the send new audit form is submitted.
function onAuditFormSubmit(e) {
  e.preventDefault();
  // Check that the new form is submitted.

}

//Creates new category on audit form
function onAddCategory(e) {
	e.preventDefault();
}

//Create new bags in category
function onAddBags(e) {
	e.preventDefault();
}

/
var CATEGORY_TEMPLATE =
    '<div class="category-data">' +
		'<div class="show-whitespace delete" style="font-size: 28px;">' +
		'</div>' +
    '</div>';

let auditFormElement = document.getElementById('audit-form');
let auditInputElement = document.getElementById('audit');
let auditListofCategories = document.getElementById('category-list');

auditFormElement.addEventListener('submit', onAuditFormSubmit);
auditFormElement.addEventListener('add-category', onAddCategory);
*/
