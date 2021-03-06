var stage = new Kinetic.Stage({
        container: 'container',
        width: 500,
        height: 500
      });

      var layer = new Kinetic.Layer();

      var box1 = new Kinetic.Rect({
        x: 239,
        y: 75,
        width: 100,
        height: 50,
        fill: 'green',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true
      });

     var box2 = new Kinetic.Rect({
        x: 139,
        y: 75,
        width: 100,
        height: 50,
        fill: 'green',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true
      });

     var box3 = new Kinetic.Rect({
        x: 339,
        y: 175,
        width: 100,
        height: 50,
        fill: 'green',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true
      });

     // var originalPoint = {x: box.getX(), y: box.getY()}; // save original box coordinates
      
      var line = new Kinetic.Line({
        points: [box1.getX()+box1.getWidth()/2, box1.getY()+box1.getHeight()/2 , box2.getX()+box2.getWidth()/2, box2.getY()+box2.getHeight()/2],
        stroke: 'red',
        strokeWidth: 5,
        lineCap: 'round',
        lineJoin: 'round'
      });  

      var line2 = new Kinetic.Line({
         points: [box2.getX()+box2.getWidth()/2, box2.getY()+box2.getHeight()/2 , box3.getX()+box3.getWidth()/2, box3.getY()+box3.getHeight()/2],
        stroke: 'red',
        strokeWidth: 5,
        lineCap: 'round',
        lineJoin: 'round'
      }); 

      var line3 = new Kinetic.Line({
         points: [box3.getX()+box3.getWidth()/2, box3.getY()+box3.getHeight()/2 , box1.getX()+box1.getWidth()/2, box1.getY()+box1.getHeight()/2],
        stroke: 'red',
        strokeWidth: 5,
        lineCap: 'round',
        lineJoin: 'round'
      }); 
                    
       box1.on('dragstart dragmove', function(){
         update();
       });

       box2.on('dragstart dragmove', function(){
         update();
       });

       box3.on('dragstart dragmove', function(){
         update();
       });
      
      layer.add(line);
      layer.add(line2);
      layer.add(line3);
      layer.add(box1);
      layer.add(box2);
      layer.add(box3);
     
      stage.add(layer);


function update(){
    line.setPoints([box1.getX()+box1.getWidth()/2, box1.getY()+box1.getHeight()/2 , box2.getX()+box2.getWidth()/2, box2.getY()+box2.getHeight()/2]);
    line2.setPoints([box2.getX()+box2.getWidth()/2, box2.getY()+box2.getHeight()/2 , box3.getX()+box3.getWidth()/2, box3.getY()+box3.getHeight()/2]);
   layer.draw();
    line3.setPoints([box3.getX()+box3.getWidth()/2, box3.getY()+box3.getHeight()/2 , box1.getX()+box1.getWidth()/2, box1.getY()+box1.getHeight()/2]);
}
