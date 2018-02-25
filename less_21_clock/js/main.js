/******************************************************/
/************************1 вариант ********************/
/******************************************************/
function Clock(){
    let currentDay = document.querySelector('.today-date'),
        timerClock = document.querySelector('.timerClock'),
        amountDaysToEnd = document.querySelector('.amountDaysToEnd');
    
    let modifyDateFirstStr = () => {return moment().locale("ru").format('dddd, DD MMMM')} 
     // Вопрос почему при установке зоны RU все равно выводится в формате EN??????????????
   
    let modifyDateSecondStr = () => { return moment().format('hh:mm:ss') };
        
    let modifyDateThirdStr = () =>{ return moment([2019,0,01]).diff(moment(), 'days')}

    function printDate(){
        currentDay.innerHTML =`Сегодня ${modifyDateFirstStr()}`;
        timerClock.innerHTML = modifyDateSecondStr();
        amountDaysToEnd.innerHTML = modifyDateThirdStr();
    }//
    
    this.init = function(){
        printDate();
    }//
    this.init();
    setInterval(this.init,1000);

};

/******************************************************/
/************************2 вариант ********************/
/******************************************************/
// (function(){
   
//     let currentDay = document.querySelector('.today-date'),
//         dayToEndYears = document.querySelector('.dayToEndYears'),
//         timerClock = document.querySelector('.timerClock'),
//         amountDaysToEnd = document.querySelector('.amountDaysToEnd'),
//         currentDate = null;
       
//     // текущая дата   
//     let getCurrentDay = ()=> {return currentDate = new Date();}
    
//     //преобразования для первой строки 
//     function modifyDateFirstStr(d){
//         return `Сегодня ${d.toLocaleString("ru", {weekday: "long"})}, ${d.toLocaleString("ru", {day: "2-digit"})} ${d.toLocaleString("ru", {month: "long"})}`;
//     }//

//     // преобразования даты для второй строки
//     function modifyDateSecondStr(d){
//         return `${d.toLocaleString("ru",{ hour: "2-digit", minute: "2-digit",second: "2-digit"})}`;
//     }

//     // преобразование даты для третьей строки
//     function modifyDateThirdStr(){
//         return Math.floor( (Date.parse(2019) - Date.parse(new Date()))/1000/60/60/24);
//     }

//     function printDate(d){
//         // выводит первую строку.
//         currentDay.innerHTML = modifyDateFirstStr(d);
//         timerClock.innerHTML = modifyDateSecondStr(d);
//         amountDaysToEnd.innerHTML = modifyDateThirdStr();
//     }
//     function init(){
//          printDate(getCurrentDay());
//     }
//     init();
//     setInterval(init,1000);
// })()//


