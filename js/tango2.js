// FUNCTIONS __________________________________________________________________
function preload(url) {
	var img = new Image();
	img.src = url;
	return img
}

function getRandomColor() {
		return colors[Math.round(Math.random() * 5)];
}

function tango(layer) {

	for(var n = 0; n < layer.getChildren().length; n++) {
		var color = Kinetic.Util.getRGB(getRandomColor());
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

function remove(layer) {
	for(var n = 0; n < layer.getChildren().length; n++) {
		var shape = layer.getChildren()[n];
		if(removing) {
			shape.setDraggable(false);
			shape.on('mouseover', function() {
				document.body.style.cursor = 'pointer';
				var image = new Kinetic.Image({
					x: this.getAttr('x') - 13,
					y: this.getAttr('y') - 12,
					image: removeIcon,
					width: 26,
					height: 26,
					opacity: 0.5,
					listening: false
				});

				this.on('mouseout', function() {
					document.body.style.cursor = 'default';
					image.destroy();
					stage.draw();
				});

				this.on('mousedown', function() {
					this.destroy();
					image.destroy();
					stage.draw();
				});

				layer.add(image);
				stage.draw();
			});
		} else {
			shape.setDraggable(true);
			shape.off('mouseover mouseout mousedown');
		}
	}
}

function create(layer) {
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
	stage.draw();
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *	MAIN
 *
 */

// GLOBALS ____________________________________________________________________
var removeIcon = preload('icons/remove.png');
var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
var removing = false;

// Create the stage using the container height & width
var stage = new Kinetic.Stage({
	container: 'canvas-div',
	width: $('#canvas-div').width(),
	height: $('#canvas-div').height()
});

// Create a new layer and add it to the stage
var layer = new Kinetic.Layer();
stage.add(layer);

// Create 10 random shapes
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

	// Add each shape to the layer
	layer.add(shape);
}

// Redraw the stage
stage.draw();

// BUTTON FUNCTIONS ___________________________________________________________
// Create button linking to create function
$('#create').click(function () {
	create(layer);
});

// Modify button linking to tango function
$('#modify').click(function() {
	tango(layer);
});

// Remove button is toggable, linking to remove function
$('#remove').click(function () {
	$(this).toggleClass('btn-hold');
	removing = !removing;
	remove(layer);
});
