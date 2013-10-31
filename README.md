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

_Colin on 10/30 @ 8:30PM_

Set up the basic frame with side buttons. Currently the `Modify` button will call the tango function from the demo. Canvas is dynamically sized. We can add more buttons if needed. Most of the functionality is going to come from the Javascript though. We may want to implement our own class that will be graphically represented by the KineticJS shape which may make it easier for us to create simple user interface stuff.

<del>Delete script works good, but the only problem is that if you drag a shape the event doesn't fire.</del> <b>fixed</b>

There are a set of glyphs that come with Boostrap that would be pretty slick if we can work them into the interface (confirm/cancel symbols for deletion instead of an alert box).

_Stuart on 10/30_

It's seeming like the easiest was of setting up the edit/delete options is to do an event handler similar to what I did in the DeleteByClicking, except have it pop up a new screen with all of the possible edit options for that certain shape. I couldn't figure out an easier way to target them individually


MakesMoreShapes is made obsolete by DestroyByClicking. I kept it in the repository because if you want to know how it works then it is easier than trying to look through DeleteByClicking. DeleteByClicking has code added on top of the stucture of MakeMoreShapes so if you are going to use any of the code from either get it from DeleteByClicking
