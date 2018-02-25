

var galleryService = (function(){
    
    function duplicate(arr,count){
        let result = [];
        for (let i = 0; i < count; i++){
            result = result.concat( arr.map((item) => {return Object.assign({},item)} ) );    
        }
        return result;
    }//
    let checkUrl = (url) =>{return ~url.indexOf('://')? url : `http://${url}`};
    let modifyName = (name)  =>{return `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`};
    let modifyDesc = (str) =>{return (str.length > 18 )?  `${str.slice(0,18)}...`: str };
    let modifyDate = (num) =>{return moment(num).format("DD/MM/YYYY") };

    function modifyArr(arr){
            arr.forEach( (element) => {            
                element.url = checkUrl(element.url);
                element.name = modifyName(element.name);
                element.description = modifyDesc(element.description);
                element.newDate = element.date;
                element.date = modifyDate(element.date);
                
            }); 
            return arr;
    }
 
    
    function templateHTML(item){
        return `<div class="col-md-4">
                    <div class="card box-shadow">
                    <img src="${item.url}" alt="/">
                    <div class="card-body">
                        <div class="card-text text-left">
                            <h3>${item.name}</h3>
                            <p class="">${item.description}</p>
                        </div>
                    </div>	
                    <div class="card-footer">
                        <div class="card-group">
                            <button class="btn btn-outline-secondary">VIEW</button>
                            <button class="btn btn-outline-secondary btn-danger ">DELETE</button>
                        </div>
                        <small class="text-muted">${item.date}</small>
                    </div>		 			
                </div>							
            </div> `;
    }//


    function sortItemstoAfromY(a,b){ return (a.name > b.name)? -1 : 1;};
    function sortItemstoYfromA(a,b){ return (a.name > b.name)? 1 : -1;};
    function sortOldBegin(a,b){return a.newDate - b.newDate};
    function sortNewBegin(a,b){return b.newDate - a.newDate};

return{
    duplicateArr : duplicate,
    createTemplateHtml : templateHTML,
    modifyArray : modifyArr,
    sortDateAsc : sortNewBegin,
    sortDateDesc : sortOldBegin

}

})()//