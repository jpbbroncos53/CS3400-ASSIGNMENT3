// FUNCTIONS __________________________________________________________________
/*
 *	Apparently this preloads images, but I kind of doubt it
 */
function preload(url) {
	var img = new Image();
	img.src = url;
	return img
}

/*
 *	Pick random color from colors array
 */
function getRandomColor() {
	return colors[Math.round(Math.random() * 5)];
}

/*
 *	Tango animation function (keeping around for fun)
 */
function tango(layer)
{
	for(var n = 0; n < layer.getChildren().length; n++) {
		var color = Kinetic.Util.getRGB(getRandomColor());
		var shape = layer.getChildren()[n];
		var stage = shape.getStage();
		var radius = Math.round(Math.random() * 100 + 20);
		
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

function addText(layer)
{
	for(var n = 0; n < layer.getChildren().length; n++) {
		var group = new Kinetic.Group({
			draggable: true,
			listening: true
		});
		var text = new Kinetic.Text({
			x: stage.getWidth() / 2,
			y: 15,
			text: 'Simple Text',
			fontSize: 30,
			fontFamily: 'Calibri',
			fill: 'black'
		});
		var shape = layer.getChildren()[n];
		if(texting) {
			shape.setDraggable(false);
			shape.on('mouseover', function() {
				document.body.style.cursor = 'crosshair';
				this.setStrokeWidth(4);
				stage.draw();

				this.on('mouseout', function() {
					document.body.style.cursor = 'default';
					this.setStrokeWidth(2);
					stage.draw();
				});

				this.on('mousedown', function() {
					for(var n = 0; n < layer.getChildren().length; n++) {
						var shape = layer.getChildren()[n];
						shape.setStrokeWidth(2);
						shape.on('mouseover', function() {
							document.body.style.cursor = 'crosshair';
							this.setStrokeWidth(4);
							stage.draw();
						});
						shape.on('mouseout', function() {
							document.body.style.cursor = 'default';
							this.setStrokeWidth(2);
							stage.draw();
						});
					}
					selectedShape = this;
					this.off('mouseover mouseout');
					this.on('mouseout', function() {
						document.body.style.cursor = 'default';
					});
					this.setStrokeWidth(4);
					group.add(text);
					group.add(selectedShape);
					layer.add(group);
					stage.draw();
				});
			});
		} else {
			shape.setDraggable(true);
			shape.off('mouseover mouseout mousedown');
			shape.setStrokeWidth(2);
			stage.draw();
		}
	}
}

/*
 *	Shape modification mode function
 */
function modify(layer)
{
	for(var n = 0; n < layer.getChildren().length; n++) {
		var shape = layer.getChildren()[n];
		if(modifying) {
			shape.setDraggable(false);
			shape.on('mouseover', function() {
				document.body.style.cursor = 'crosshair';
				this.setStrokeWidth(4);
				stage.draw();

				this.on('mouseout', function() {
					document.body.style.cursor = 'default';
					this.setStrokeWidth(2);
					stage.draw();
				});

				this.on('mousedown', function() {
					for(var n = 0; n < layer.getChildren().length; n++) {
						var shape = layer.getChildren()[n];
						shape.setStrokeWidth(2);
						shape.on('mouseover', function() {
							document.body.style.cursor = 'crosshair';
							this.setStrokeWidth(4);
							stage.draw();
						});
						shape.on('mouseout', function() {
							document.body.style.cursor = 'default';
							this.setStrokeWidth(2);
							stage.draw();
						});
					}
					selectedShape = this;
					this.off('mouseover mouseout');
					this.on('mouseout', function() {
						document.body.style.cursor = 'default';
					});
					this.setStrokeWidth(4);
					if(this.getClassName() === 'Ellipse') {
						color.val(this.getFill());
						size.val(this.getRadius().x);
						$('#color')[0].selectionStart = 0;
						$('#color')[0].selectionEnd = $('#sides').val().length;
					} else {
						sides.val(this.getSides());
						color.val(this.getFill());
						size.val(this.getRadius());
						$('#sides')[0].selectionStart = 0;
						$('#sides')[0].selectionEnd = $('#sides').val().length;
					}
					stage.draw();
				});
			});
		} else {
			shape.setDraggable(true);
			shape.off('mouseover mouseout mousedown');
			shape.setStrokeWidth(2);
			stage.draw();
		}
	}
}

/*
 *	Shape removal mode function
 */
function remove(layer)
{
	for(var n = 0; n < layer.getChildren().length; n++) {
		var shape = layer.getChildren()[n];
		var opacity = shape.getOpacity();
		if(removing) {
			shape.setDraggable(false);
			shape.on('mouseover', function() {
				document.body.style.cursor = 'pointer';
				this.setOpacity(0.6);
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

/*
 *	Shape creation function
 */
function create(layer, edges, spin)
{
	var radius = Math.round(Math.random() * 100 + 20);
	var shape = new Kinetic.RegularPolygon({
		x: Math.random() * stage.getWidth(),
		y: Math.random() * stage.getHeight(),
		rotation: spin,
		sides: edges,
		radius: radius,
		fill: getRandomColor(),
		stroke: 'black',
		opacity: 1,
		draggable: true
	});

	layer.add(shape);
	stage.draw();
}

function createOval(layer, radius)
{
	var shape = new Kinetic.Ellipse({
		x: Math.random() * stage.getWidth(),
		y: Math.random() * stage.getHeight(),
		radius: {
			x: radius * 2,
			y: radius
		},
		fill: getRandomColor(),
		stroke: 'black',
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
var sides = $('#sides');
var color = $('#color');
var size = $('#radius');
var selectedShape = null;
var removing = false;
var connecting = false;
var modifying = false;
var texting = false;

// Create the stage using the container height & width
var stage = new Kinetic.Stage({
	container: 'canvas-div',
	width: $('#canvas-div').width(),
	height: $('#canvas-div').height()
});

// Create a new layer and add it to the stage
var layer = new Kinetic.Layer();
stage.add(layer);

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
	// create(layer, 6);
	createOval(layer, Math.round(Math.random() * 100 + 20));
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
	$(this).toggleClass('btn-hold');
	modifying = !modifying;
	modify(layer);
	$('#modify-pane').slideToggle('fast');
	$('#modify-form').each(function () {
		this.reset();
	})
});

// Modification form submission
$('#modify-form').submit(function() {
	// Should grab values from modify-pane here
	if(selectedShape) {
		if(selectedShape.getClassName() === 'RegularPolygon') {
			selectedShape.setSides(sides.val());
			selectedShape.setFill(color.val());
			selectedShape.setRadius(size.val());
		} else {
			selectedShape.setFill(color.val());
			selectedShape.setRadius([size.val(), size.val() / 2]);
		}
		selectedShape.setStrokeWidth(2);
		stage.draw();
	}
	this.reset();
	modifying = !modifying;
	// Calling modify with modify false deregisters callbacks
	modify(layer);
	document.body.style.cursor = 'default';
	$('#modify').toggleClass('btn-hold');
	$('#modify-pane').slideUp('fast');
});

// Line button is toggable, linking to line function
$('#line').click(function () {
	$(this).toggleClass('btn-hold');
	connecting = !connecting;
	/* connect function */
});

// Text button is toggable, linking to text function
$('#text').click(function () {
	$(this).toggleClass('btn-hold');
	texting = !texting;
	/* text function */
});

// Remove button is toggable, linking to remove function
$('#remove').click(function () {
	$(this).toggleClass('btn-hold');
	removing = !removing;
	remove(layer);
});

$('#tango').click(function () {
	tango(layer);
});
