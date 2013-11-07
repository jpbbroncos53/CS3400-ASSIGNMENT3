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
		var opacity = shape.getOpacity();
		if(removing) {
			shape.setDraggable(false);
			shape.on('mouseover', function() {
				document.body.style.cursor = 'pointer';
				this.setOpacity(0.25);
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
					this.setOpacity(1);
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

function create(layer, edges, spin) {
	var radius = Math.random() * 100 + 20;
	var shape = new Kinetic.RegularPolygon({
		x: Math.random() * stage.getWidth(),
		y: Math.random() * stage.getHeight(),
		rotation: spin,
		sides: edges,
		radius: radius,
		fill: getRandomColor(),
		opacity: 1,
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
var connecting = false;

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
		opacity: 1,
		draggable: true
	});

	// Add each shape to the layer
	layer.add(shape);
}

// Redraw the stage
stage.draw();

// BUTTON FUNCTIONS ___________________________________________________________
// Create button opens shapes tray
$('#create').click(function () {
	$('#shapes').slideToggle('fast');
	$('#create').toggleClass('pull-bottom');
});

// Make a new square
$('#square').click(function () {
	create(layer, 4, Math.PI / 4);
	$('#shapes').slideUp('fast');
	$('#create').addClass('pull-bottom');
});

// Make a new oval
$('#oval').click(function () {
	create(layer, 6);
	$('#shapes').slideUp('fast');
	$('#create').addClass('pull-bottom');
});

// Make a new diamond
$('#diamond').click(function() {
	create(layer, 4);
	$('#shapes').slideUp('fast');
	$('#create').addClass('pull-bottom');
});

// Modify button linking to tango function
$('#modify').click(function() {
	tango(layer);
	$('#modify-pane').slideToggle('fast');
});

// Modification form submission
$('#modify-form').submit(function() {
	alert("SIDES: " + $('#sides').val());
	alert("COLOR: " + $('#color').val());
	alert("RADIUS: " + $('#radius').val());
	$('#modify-pane').slideUp('fast');
});

// Line button is toggable, linking to line function
$('#line').click(function () {
	$(this).toggleClass('btn-hold');
	connecting = !connecting;
	remove(layer);
});

// Remove button is toggable, linking to remove function
$('#remove').click(function () {
	$(this).toggleClass('btn-hold');
	removing = !removing;
	remove(layer);
});
