#To Do:#

* Implement Creation
* Implement Deletion
* Implement Resizing
* Implement Text Fields
* Implement Arrows

####Optional:####

* Saving
* Other Stuff I Can't Remember

#Notes:#

_Stuart on 10/31 @ 7:00PM_

Changed up the Delete file, it now contains functions to create Circles, Squares, and Diamonds. It also contains an edit function that is not complete but so far I have it opening a dialog box with three fields. I set the default values of these feilds to the current value of the shape. The delete function is finished.

_Stuart on 10/31 @ 1:30PM_

I'm pretty sure deleteByClicking is done. I was able to remove some global variables and now they don't need to be stored in an array. The dialog box still needs to be styled

_Stuart on 10/31 @ 12:30PM_

I was able to change the the prompt for delete from a simple dialog box to one that we can change the styling. I haven't done any of the styling for it yet, it is set to what it defaulted to. This required me to go back to using the array based implementation of the shapes. Its not done yet so I didn't want to add it to the main project yet.


_Colin on 10/30 @ 8:30PM_

Set up the basic frame with side buttons. Currently the `Modify` button will call the tango function from the demo. Canvas is dynamically sized. We can add more buttons if needed. Most of the functionality is going to come from the Javascript though. We may want to implement our own class that will be graphically represented by the KineticJS shape which may make it easier for us to create simple user interface stuff.

<del>Delete script works good, but the only problem is that if you drag a shape the event doesn't fire.</del> <b>fixed</b>

There are a set of glyphs that come with Boostrap that would be pretty slick if we can work them into the interface (confirm/cancel symbols for deletion instead of an alert box).

_Stuart on 10/30_

It's seeming like the easiest was of setting up the edit/delete options is to do an event handler similar to what I did in the DeleteByClicking, except have it pop up a new screen with all of the possible edit options for that certain shape. I couldn't figure out an easier way to target them individually


MakesMoreShapes is made obsolete by DestroyByClicking. I kept it in the repository because if you want to know how it works then it is easier than trying to look through DeleteByClicking. DeleteByClicking has code added on top of the stucture of MakeMoreShapes so if you are going to use any of the code from either get it from DeleteByClicking
