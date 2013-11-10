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

	var menu = document.getElementById("add-edit-menu");
	$('#edit-add-menu').html('<div id="dialog-add" title="Edit">' +
          '<label for="Types: " id="typeLabel">Type: </label>' +
          '<select name="type" id="addType">'+
			'<option value="square">Square</option>'+
			'<option value="diamond">Diamond</option>'+
			'<option value="circle">Circle</option>'+
			'</select>'+
            '<button id="makeShape" onclick=callAddShape(document.getElementById("addType").value) class="btn btn-default"><span class="glyphicon glyphicon-plus"></span> Create </button>' +
    '</div>');
});

function callAddShape(value)
{
	$('#edit-add-menu').html("");
	addShape(value);
}

// Modify button linking to tango function
$('#modify').click(function() {
	tango(layer);
});

$('#makeShape').click(function() {
	alert("yes");
	addShape(layer);
});

// Remove button is toggable, linking to remove function
$('#remove').click(function () {
	$(this).toggleClass('btn-hold');
	removing = !removing;
	remove(layer);
});
