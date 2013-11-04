// FUNCTIONS __________________________________________________________________
function preload(url) {
	var img = new Image();
	img.src = url;
	return img
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
		fill: 'red',
		opacity: (radius - 20) / 100,
		draggable: true
	});

	layer.add(shape);
	stage.draw();
}

function addline(layer){
	

	
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
