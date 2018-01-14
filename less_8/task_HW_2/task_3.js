// 3. Сократите код используя циклы:
// elemResult.innerHTML += 'Число: <b>100</b><br>';
// elemResult.innerHTML += 'Число: <b>80</b><br>';
// elemResult.innerHTML += 'Число: <b>60</b><br>';
// elemResult.innerHTML += 'Число: <b>50</b><br>';
// elemResult.innerHTML += 'Число: <b>40</b><br>';
// elemResult.innerHTML += 'Число: <b>20</b><br>';
// elemResult.innerHTML += 'Число: <b>10</b><br>';
// elemResult.innerHTML += 'Число: <b>0</b><br>';

for (var i = 100; i >= 0;  i -=10) {
    if(( i == 90)|| (i == 70)|| (i == 30)) continue;
    // console.log( 'Число:' + i );
    elemResult.innerHTML += 'Число: <b>i</b><br>';
}
