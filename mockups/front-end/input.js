class SelectOptionGroup extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

		this.text = "";

		let observer = new MutationObserver((records, observer) => this.observed(records, observer));
		let observationConfig = {attributeFilter: ["text"], attributes: true, childList: true};
		observer.observe(this, observationConfig);

		this.updateParent();
    }

	connectedCallback() {
		this.updateParent();
	}

	updateParent() {
		if (this.getAttribute("text") !== null) {
			this.text = this.getAttribute("text");
		} else {
			this.text = "";
		}

		if (this.parentElement !== null) {
			if (this.parentElement.nodeType == document.ELEMENT_NODE) {
				if (this.parentElement.tagName == "CUSTOM-SELECT") {
					this.parentElement.buildList();
				}
			}
		}
	}

	selectOption(option) {
		if (this.parentElement !== null) {
			if (this.parentElement.nodeType == document.ELEMENT_NODE) {
				if (this.parentElement.tagName == "CUSTOM-SELECT" || this.parentElement.tagName == "SELECT-OPTION-GROUP") {
					this.parentElement.selectOption(this);
				}
			}
		}
	}

	observed(records, observer) {
		for (let i = 0; i < records.length; i++) {
			let record = records[i];

//			if (record.type == "childList") {
				this.updateParent();
//			}
		}
	}
}

class SelectOption extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

		this._selected = false;
		this._disabled = false;

		let observer = new MutationObserver((records, observer) => this.observed(records, observer));
		let observationConfig = {attributeFilter: ["selected", "disabled"], attributes: true, characterData: true, childList: true, subtree: true};
		observer.observe(this, observationConfig);

		this.update();
		this.updateParent();
    }

	connectedCallback() {
		this.update();
		this.updateParent();
	}

	set selected(value) {
		this._selected = value;

		if (this.parentElement !== null) {
			if (this.parentElement.nodeType == document.ELEMENT_NODE) {
				if (this.parentElement.tagName == "CUSTOM-SELECT" || this.parentElement.tagName == "SELECT-OPTION-GROUP") {
					this.parentElement.selectOption(this);
				}
			}
		}
	}

	get selected() {
		return this._selected;
	}

	set disabled(value) {
		this._disabled = value;
		if (this._disabled) {
			this.setAttribute("disabled", "");
		} else {
			this.removeAttribute("disabled");
		}
	}

	get disabled() {
		return this._disabled;
	}

	update() {
		this._selected = this.getAttribute("selected") !== null;
		this._disabled = this.getAttribute("disabled") !== null;
	}

	updateParent() {
		if (this.parentElement !== null) {
			if (this.parentElement.nodeType == document.ELEMENT_NODE) {
				if (this.parentElement.tagName == "CUSTOM-SELECT") {
					this.parentElement.buildList();
				} else if (this.parentElement.tagName == "SELECT-OPTION-GROUP") {
					this.parentElement.updateParent();
				}
			}
		}
	}

	observed(records, observer) {
		for (let i = 0; i < records.length; i++) {
			let record = records[i];

			if (record.type == "attributes") {
				if (record.attributeName == "selected") {
					if (this.getAttribute("selected") !== null) {
						if (this.parentElement !== null) {
							if (this.parentElement.nodeType == document.ELEMENT_NODE) {
								if (this.parentElement.tagName == "CUSTOM-SELECT" || this.parentElement.tagName == "SELECT-OPTION-GROUP") {
									this.parentElement.selectOption(this);
								}
							}
						}
					}
				} else if (record.attributeName == "disabled") {
					this._disabled = this.hasAttribute("disabled");
				} else {
					this.updateParent();
				}
			}
		}
	}
}

class CustomSelect extends HTMLElement {
	constructor() {
		// Always call super first in constructor
		super();
		
		this.showing = false;
		let selected = this.getAttribute("selected");

		// Create a shadow root
		let shadow = this.attachShadow({mode: "open"});

		// Create elements
		let wrapper = document.createElement("div");
		wrapper.className = "wrapper";
		this.wrapper = wrapper;
		let display = document.createElement("div");
		display.className = "display";
		let displayLabel = document.createElement("div");
		displayLabel.innerText = "Select a category...";
		this.displayLabel = displayLabel;
		let arrow = document.createElement("div");
		arrow.className = "arrow";
		let pickerUnderlay = document.createElement("div");
		pickerUnderlay.className = "picker-underlay";
		pickerUnderlay.style.display = "none";
		this.pickerUnderlay = pickerUnderlay;
		let picker = document.createElement("div");
		picker.className = "picker";
		picker.style.display = "none";
		this.picker = picker;
		
		this.buildList();

		// This is a memory leak, because the event listener is never removed
		pickerUnderlay.addEventListener("mousedown", () => {
			this.hide();
		});

		// This is a memory leak, because the event listener is never removed
		display.addEventListener("click", () => {
			if (this.showing) {
				this.hide();
			} else {
				this.show();
			}
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
	overflow-y: auto;
	box-sizing: border-box;
}

.picker-underlay {
	position: fixed;
	top: -50vh;
	left: -50vw;
	width: 200vw;
	height: 200vh;
	z-index: 999998;
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
		wrapper.appendChild(pickerUnderlay);
		wrapper.appendChild(picker);

		let observer = new MutationObserver((records, observer) => this.observed(records, observer));
		let observationConfig = {childList: true};
		observer.observe(this, observationConfig);
	}

	connectedCallback() {
		let fill = () => {
			while (this.firstChild) {
				this.removeChild(this.firstChild);
			}
			
			for (let i = 0; i < window.categoryData.length; i++) {
				let parent = window.categoryData[i];

				let optionGroup = document.createElement("select-option-group");
				optionGroup.setAttribute("text", parent.name);

				for (let j = 0; j < parent.items.length; j++) {
					let option = document.createElement("select-option");
					option.innerText = parent.items[j];
					optionGroup.appendChild(option);
				}

				this.appendChild(optionGroup);
			}
		};
		
		if (window.categoryData) {
			fill();
		} else {
			let fillCallback;
			
			fillCallback = () => {
				window.removeEventListener("categories-loaded", fillCallback);
				fill();
			};
			
			window.addEventListener("categories-loaded", fillCallback);
		}
		
		this.buildList();
	}
	
	show() {
		let rectangle = this.wrapper.getBoundingClientRect();
		let viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		let pickerHeight = viewportHeight - rectangle.bottom;
		let bodyHeight = document.body.getBoundingClientRect().height;

		this.picker.style.display = "block";
		this.picker.style.height = `${pickerHeight}px`;
		this.pickerUnderlay.style.display = "block";
		
		if (viewportHeight < bodyHeight) {
			document.body.style.overflow = "hidden";
			document.body.style.paddingRight = "17px";
		}
		
		this.showing = true;
	}
	
	hide() {
		this.picker.style.display = "none";
		this.pickerUnderlay.style.display = "none";
		document.body.style.overflow = "";
		document.body.style.paddingRight = "";
		this.showing = false;
	}
	
	buildList() {
		while (this.picker.firstChild) {
			if (this.picker.firstChild.clickCallback) {
				this.picker.firstChild.removeEventListener("click", this.picker.firstChild.clickCallback);
			}
			this.picker.removeChild(this.picker.firstChild);
		}

		let post = (item, depth) => {
			let isGroup = item.tagName == "SELECT-OPTION-GROUP";

			let itemOption = document.createElement("div");
			itemOption.className = "item";
			itemOption.innerText = isGroup ? item.text : item.innerText;
			itemOption.style.paddingLeft = (15 * depth) + "px";
			itemOption.selectOption = item;
			
			let clickCallback = () => {
				if (item.tagName == "SELECT-OPTION-GROUP" || item.disabled) {
					return;
				}
				
				this.selectOption(itemOption.selectOption);
				this.hide();
			};
			itemOption.clickCallback = clickCallback;
			itemOption.addEventListener("click", clickCallback);
			
			this.picker.appendChild(itemOption);

			if (item.selected) {
				this.displayLabel.innerText = item.innerText;
			}

			if (isGroup || item.disabled) {
				itemOption.style.color = "#999";
				itemOption.className = "item disabled";
				itemOption.setAttribute("disabled", "");
			}

			if (isGroup) {
				for (let i = 0; i < item.children.length; i++) {
					post(item.children[i], depth + 1);
				}
			}
		};

		for (let i = 0; i < this.children.length; i++) {
			post(this.children[i], 1);
		}
	}

	selectOption(option) {
		let deselect = (item) => {
			let isGroup = item.tagName == "SELECT-OPTION-GROUP";

			if (isGroup) {
				for (let i = 0; i < item.children.length; i++) {
					deselect(item.children[i], 1);
				}
			} else {
				item._selected = false;
			}
		};

		for (let i = 0; i < this.children.length; i++) {
			deselect(this.children[i]);
		}

		option._selected = true;
		this.displayLabel.innerText = option.innerText;
	}

	observed(records, observer) {
		for (let i = 0; i < records.length; i++) {
			let record = records[i];

			if (record.type == "childList") {
				this.buildList();
			}
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
		this.wrapper = wrapper;

		let del = document.createElement("div");
		del.className = "delete";

		let delspan = document.createElement("span");
		delspan.className = "mdi mdi-close";

		let half1 = document.createElement("div");
		half1.className = "half";
		half1.style.paddingRight = "5px";

		let weight = document.createElement("h3");
		weight.innerText = "Weight (lbs)";

		let inputWeight = document.createElement("input");
		inputWeight.type = "number";
		inputWeight.className = "data-content";
		inputWeight.setAttribute("placeholder", "Weight");
		inputWeight.style.width = "100%";

		let half2 = document.createElement("div");
		half2.className = "half";
		half2.style.paddingLeft = "5px";

		let volume = document.createElement("h3");
		volume.innerText = "Volume (gal)";

		let inputVolume = document.createElement("input");
		inputVolume.type = "number";
		inputVolume.className = "data-content";
		inputVolume.setAttribute("placeholder", "Volume");
		inputVolume.style.width = "100%";
		
		del.addEventListener("click", () => {
			if (this.parentElement !== null) {
				if (this.parentElement.nodeType == document.ELEMENT_NODE) {
					this.parentElement.removeChild(this);
				}
			}
		});

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
@import "global.css";
@import "input.css";
@import "https://cdn.materialdesignicons.com/2.8.94/css/materialdesignicons.min.css";
`;

		// Attach the created elements to the shadow dom
		shadow.appendChild(style);
		shadow.appendChild(wrapper);

		let observer = new MutationObserver((records, observer) => this.observed(records, observer));
		let observationConfig = {attributeFilter: ["number"], attributes: true};
		observer.observe(this, observationConfig);
	}

	connectedCallback() {
		if (this.getAttribute("number") !== null) {
			this.wrapper.dataset.label = `Bag #${this.getAttribute("number")}`;
		}
	}

	observed(records, observer) {
		for (let i = 0; i < records.length; i++) {
			let record = records[i];

			if (record.type == "attributes") {
				if (this.getAttribute("number") !== null) {
					this.wrapper.dataset.label = `Bag #${this.getAttribute("number")}`;
				}
			}
		}
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

		let customSelect = document.createElement("custom-select");
//		customSelect.setAttribute("selected", "Recyclable Paper");

		let bagContainer = document.createElement("div");
		this.bagContainer = bagContainer;

		let bag = document.createElement("category-bag");
		bag.setAttribute("number", 1);

		let div = document.createElement("div");
		div.className = "right";

		let button = document.createElement("button");
		button.className = "fab icon";

		let buttonContent = document.createElement("div");
		buttonContent.className = "button-content";

		let buttonspan = document.createElement("span");
		buttonspan.className = "icon mdi mdi-plus";

		let buttonLabel = document.createTextNode("Bag");
		
		del.addEventListener("click", () => {
			if (this.parentElement !== null) {
				if (this.parentElement.nodeType == document.ELEMENT_NODE) {
					this.parentElement.removeChild(this);
				}
			}
		});
		
		button.addEventListener("click", () => {
			let bag = document.createElement("category-bag");
			bagContainer.appendChild(bag);
		});

		wrapper.appendChild(del);
		del.appendChild(delspan);
		wrapper.appendChild(h3);
		wrapper.appendChild(customSelect);
		wrapper.appendChild(bagContainer);
		bagContainer.appendChild(bag);
		wrapper.appendChild(div);
		div.appendChild(button);
		button.appendChild(buttonContent);
		buttonContent.appendChild(buttonspan);
		buttonContent.appendChild(buttonLabel);

		let style = document.createElement("style");
		style.textContent = `
@import "global.css";
@import "input.css";
@import "https://cdn.materialdesignicons.com/2.8.94/css/materialdesignicons.min.css";
`;

		// Attach the created elements to the shadow dom
		shadow.appendChild(style);
		shadow.appendChild(wrapper);

		let observer = new MutationObserver((records, observer) => this.observed(records, observer));
		let observationConfig = {childList: true};
		observer.observe(bagContainer, observationConfig);
	}

	numberBags() {
		for (let i = 0; i < this.bagContainer.children.length; i++) {
			let bag = this.bagContainer.children[i];

			bag.setAttribute("number", i + 1);
		}
	}

	observed(records, observer) {
		for (let i = 0; i < records.length; i++) {
			let record = records[i];
			
			if (record.type == "childList") {
				if (this.bagContainer.children.length == 0) {
					let bag = document.createElement("category-bag");
					this.bagContainer.appendChild(bag);
				} else {
					this.numberBags();
				}
			}
		}
	}
}

customElements.define("select-option-group", SelectOptionGroup);
customElements.define("select-option", SelectOption);
customElements.define("custom-select", CustomSelect);
customElements.define("category-bag", CategoryBag);
customElements.define("category-box", CategoryBox);

/*
//Initialize database
let config = {
	apiKey: "AIzaSyDdyNdBVENgTrOXeUPAXn0jOI_maCPZaCs",
	authDomain: "oooooo-1cb0d.firebaseapp.com",
	databaseURL: "https://oooooo-1cb0d.firebaseio.com",
	projectId: "oooooo-1cb0d",
	storageBucket: "oooooo-1cb0d.appspot.com",
	messagingSenderId: "928900583874"
};
firebase.initializeApp(config);

let db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

//Skeleton for adding into database
function submitForm(e) {
	e.preventDefault();
	//Grabs all category container DOM elements
	let cat_containers = auditFormElement.getElementByClassName("data-category");
	//A temporary array that stores all categories in the form
	let temp_cat = [];
	int i;
	//Loop through all category containers
	for(i = 0; i < cat_containers.length(); i++) {
		//Grabs all DOM bag elements in a container
		let bags = cat_containers[i].getElementByClassName("data-category category-label");
		int j;
		let temp_bags = [];
		for(j = 0; j < bags.length(); j++) {
			//Grabs values of each bag
			let weight = bags[j].getElementByClassName("weight").value;
			let volume = bags[j].getElementByClassName("volume").value;
			//Creates a bag and stores it into array
			let bag = {
				weight: weight,
				volume: volume
			}
			temp_bag.push(bag);
		}
		//Creates container and stores it into an array
		let cat_container = {
			category_name: ,
			bags: temp_bags
		}
		temp_cat.push(cat_container);
	}
	//Adds audit form into database
	db.collection("collection").add({
    bag_vol: ,
    bucket_tare: ,
		date: ,
		email: ,
		location: ,
		notes: ,
		recorder_name: ,
		categories: temp_cat
	})
}

//Reference to database
let dbAuditForms = db.collection.('collection');
let auditFormElement = document.getElementById("audit-form");
auditFormElement.addEventListener('submit', onAuditFormSubmit);
*/
