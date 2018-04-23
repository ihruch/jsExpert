export default class GalleryView {        
    constructor() {
        this.DOMElements = {
            userList : document.querySelector("#user-list"),
            selectAll : document.querySelector("#select-all"),
            statsInfo : document.querySelector("#stats"),
            
            emailDropdown : document.querySelector("#dropdown-email"),
            roleDropdown : document.querySelector("#dropdown-role"),
            search : document.querySelector("#inputSearch"),
            nextBtn : document.querySelector("#next-page"),
            backBtn : document.querySelector("#back-btn"),
                
            detailsView : document.querySelector("#details-view"),
            mainView : document.querySelector("#main-view"),
            detailsItems : document.querySelector("#details-items")  
        };
        
        this.counter = 0;
        this.DOMElements.selectAll.addEventListener("click", this.selectAllItems.bind(this));
    }

    tableTemplate (item) {
		return 	`<tr>
		<th scope="row">
		  <input type="checkbox">
		</th>
		<th scope="row">${item.id}</th>
		<td>${item.name}</td>
		<td>${item.username}</td>
		<td>${item.role}</td>
		<td>${item.email}</td>
		<td data-toggle="tooltip" title="${item.address.zipcode}, ${item.address.city}, ${item.address.street}">${item.address.city}</td>
		<td>${item.website}</td>
		<td>
			<div class="text-center">
				<a href="#" data-row-id="${item.id}" class="btn btn-primary btn-sm">Открыть</a>
	  		</div>
	  </td>
	  </tr>`;
	};


	selectAllItems (){
		let checkboxes = this.DOMElements.userList.querySelectorAll("input[type=checkbox]");
		checkboxes.forEach(item => this.DOMElements.selectAll.checked ? item.checked = true : item.checked = false);
	}

    selectTableLine(event) {
		let tableLines = event.currentTarget.querySelectorAll("tr");
		tableLines.forEach(item=>item.classList.remove("table-active"));
		event.target.closest("tr").classList.add("table-active");
    }
    
    clearList(){
        this.DOMElements.userList.innerHTML = "";
        this.hideNextPage();
    }

    updateButtonText(event){
        event.currentTarget.querySelector("button").innerHTML = event.target.innerText;
    }

    getSortingType(event) {
        return event.target.getAttribute("sorting-type");
    }

	blockNextPage() {
		this.DOMElements.nextBtn.classList.add("disabled");
    }

    hideNextPage() {
		this.DOMElements.nextBtn.classList.add("hide");
    }
    
    showStats(stats){
        this.DOMElements.statsInfo.innerHTML = `Статистика системы. Админов: ${stats.admins}, Пользователей: ${stats.users}`;
    }

    buildUsersList(page, filterSortFunction) {		
		filterSortFunction && (page = filterSortFunction(page));
		let result = page.map(item => this.tableTemplate(item));
		this.DOMElements.userList.innerHTML += result.join("");
	}

}

