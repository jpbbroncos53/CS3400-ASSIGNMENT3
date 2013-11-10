function addShape(type)
{
    alert("yes");
    if(type == "square")
    {
        var square = new Kinetic.Rect
        ({
            x: 239,
            y: 75,
            width: 100,
            height: 100,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
            listening: true,
            name: 'square'
        });
           
        layer.add(square);
        stage.add(layer);
    }
    else if(type == "circle")
    {
        var circle = new Kinetic.Circle
        ({
            x: 239,
            y: 75,
            radius: 75,
            fill: 'red',
            stroke: 'red',
            strokeWidth: 3,
            draggable: true,
            listening: true,
            name: 'circle'
        });

       
        layer.add(circle);
        stage.add(layer);
    }
    else if(type == "diamond")
    {
        var diamond = new Kinetic.Rect
        ({
            x: 239,
            y: 75,
            width: 100,
            height: 100,
            fill: 'blue',
            stroke: 'red',
            strokeWidth: 1,
            draggable: true,
            listening: true,
            rotationDeg: 45, 
            name: 'square'
        });
           
        layer.add(diamond);
        stage.add(layer);
    }
}
