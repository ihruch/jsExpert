var config = (function(){
    let sortingConfig = {
        "AZ": (page) => { return page.sort(listService.sortEmailAsc)},
        "ZA": (page) => { return page.sort(listService.sortEmailDesc)},
        "User": (page) => { return page.filter(listService.filterUserRole)},
        "Admin": (page) => { return page.filter(listService.filterAdminRole)},
        "Find": (page) => {
                        let exp = new RegExp(event.target.value, "ig");
                        return page.filter( (item) => { return exp.test(item.name)})
                    }

    }
    return{
        sortingConfig : sortingConfig  
    }
})()

