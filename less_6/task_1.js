// В модуль передается переменная window. Затем в ф-ция setStates существует условие
// проверки  передана переменная или нет и есть у нее свойство params.
// Затем идет присвоение в свойство объекта.
(function(win){
    var params = {
        states:{
            url:"/",
            template: "temlate.js"
        }
    };

    function setStates(params){
        if(win && !win.params){
            win.params = params;
        }
    }

    setStates();
    console.log(params.states.template);

})(window);