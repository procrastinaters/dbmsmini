var socket=io();
var table = document.getElementById("mytable");


socket.on('tabledata',function(result){
    console.log(result[0].name);

    for(i=0;i<10;i++)
    {
        var row = table.insertRow(i+1);
        var cell0=row.insertCell(0);
        var cell1=row.insertCell(1);
        var cell2=row.insertCell(2);
        var cell3=row.insertCell(3);
        var cell4=row.insertCell(4);
        var cell5=row.insertCell(5);
        var cell6=row.insertCell(6);
        var cell7=row.insertCell(7);
        var cell8=row.insertCell(8);
        var cell9=row.insertCell(9);
        var cell10=row.insertCell(10);

        cell0.innerHTML=result[i].name;
        cell3.innerHTML=result[i].marketprice;
        cell4.innerHTML=result[i].perclose;
    }
});