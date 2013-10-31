var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

function getRandomColor() {
		return colors[Math.round(Math.random() * 5)];
}

function tango(layer) {
	var color = Kinetic.Util.getRGB(getRandomColor());

	for(var n = 0; n < layer.getChildren().length; n++) {
		var shape = layer.getChildren()[n];
		var stage = shape.getStage();
		var radius = Math.random() * 100 + 20;
		
		new Kinetic.Tween({
			node: shape, 
			duration: 1,
			x: Math.random() * stage.getWidth(), 
			y: Math.random() * stage.getHeight(), 
			rotation: Math.random() * Math.PI * 2, 
			radius: radius,
			opacity: (radius - 20) / 100,
			easing: Kinetic.Easings.EaseInOut,
			fillR: color.r,
			fillG: color.g,
			fillB: color.b
		}).play();
	}
}
var stage = new Kinetic.Stage({
	container: 'canvas-div',
	width: $('#canvas-div').width(),
	height: $('#canvas-div').height()
});

var layer = new Kinetic.Layer();

for(var n = 0; n < 10; n++) {
	var radius = Math.random() * 100 + 20;
	var shape = new Kinetic.RegularPolygon({
		x: Math.random() * stage.getWidth(),
		y: Math.random() * stage.getHeight(),
		sides: Math.ceil(Math.random() * 5 + 3),
		radius: radius,
		fill: getRandomColor(),
		opacity: (radius - 20) / 100,
		draggable: true
	});

	layer.add(shape);
}

stage.add(layer);

$('#modify').click(function() {
	tango(layer);
});
