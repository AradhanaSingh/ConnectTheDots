jQuery(document).ready(function () {
    var points = [];
    $("#canvasArea").click(function (e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        
        var point={};
        point.x=x;
        point.y=y;
        point.angle=0;
        
        console.log(point.x);
        console.log(point.y);
      
        points.push(point);
        console.log("No of points  "+points.length);
  
        /* var c=document.getElementById("canvasArea"); */
        var ctx = this.getContext("2d"); 
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, 2 * Math.PI);
        ctx.stroke();
       
    });



    $("#processButton").click(function changeValueButton() {
        var oldValue = document.getElementById("processButton").value;
        if (oldValue == "Solve Me") {
            var center={};
            center.x=0;
            center.y=0;
            center.angle=0;
          
            /*finding center of mass*/
            for(arai=0;arai<points.length;arai++)
            {
                center.x+=points[arai].x;
                center.y+=points[arai].y;
                console.log(points[arai].x);
                console.log(points[arai].y);
            }
            center.x=center.x/points.length;
            center.y=center.y/points.length;
          
            console.log("center x : "+center.x);
            console.log("center y : "+center.y);
          
            /* for each compute point, computed teh center to that point */
           for(arai=0;arai<points.length;arai++)
           {
               points[arai].angle=Math.atan2( points[arai].y-center.y , points[arai].x-center.x);           
               console.log("angle : "+points[arai].angle);
           }
          
           /*sort object based on the angle
            For same anglees, sort by radius next
           */

            points.sort(function (a, b) {
                if(a.angle!=b.angle)
                {
                    return a.angle - b.angle;}
                else
                {
                    aradius=Math.pow(Math.pow(a.x-center.x,2)+Math.pow(a.y-center.y,2),0.5);
                    bradius=Math.pow(Math.pow(b.x-center.x,2)+Math.pow(b.y-center.y,2),0.5);
                    console.log("aradius: "+aradius);
                    console.log("bradius: "+bradius);
              
                    return aradius - bradius;
                }
            });

            console.log("points after sorting");
            for(arai=0;arai<points.length;arai++)
            {            
                console.log("angle : "+points[arai].angle);
            }
          
            var c = document.getElementById("canvasArea");
            var ctx = c.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            
            for (i = 0; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.lineTo(points[0].x, points[0].y);
          
            ctx.strokeStyle = "blue";
            ctx.stroke();
            document.getElementById("processButton").value = "Reset";
            } 
            else {
                points=[];
                var c = document.getElementById("canvasArea");
                var ctxy = c.getContext("2d");
                ctxy.clearRect(0, 0, 500, 500);
                document.getElementById("processButton").value = "Solve Me";
            }
    });

});