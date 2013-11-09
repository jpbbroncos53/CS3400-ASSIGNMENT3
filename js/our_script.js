
window.onload = function() {  
    var paper = new Raphael(document.getElementById('canvas_container'), 500, 500);  
    var circle = paper.circle(100, 100, 80);  
    for(var i = 0; i < 5; i+=1) {  
        var multiplier = i*5;  
        paper.circle(250 + (2*multiplier), 100 + multiplier, 50 - multiplier)  
    }  
    var rectangle = paper.rect(200, 200, 250, 100);  
    var ellipse = paper.ellipse(200, 400, 100, 50);  
  
}  
          