function changeValueButton()
{
    var oldValue=document.getElementById("processButton").value;
    if(oldValue=="<Solve Me>")
        document.getElementById("processButton").value="<Reset>";
    else
        document.getElementById("processButton").value="<Solve Me>";
}