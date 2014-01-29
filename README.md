FIWARE Interface Designer
=========================

FIWARE Interface Designer GE implementation. Copyright 2013 Adminotech Oy All rights reserved. See LICENCE for conditions of distribution and use.

# Interface Designer Installation and Administration

This document describes the installation and administration of the Interface Designer GE.
## System Requirements

### Hardware Requirements

Since this GE is application-oriented, and serves for manipulating a 3D scene, any recent PC/Mac configuration that is capable of 3D rendering is considered as a minimum system requirement.
[edit] Operating System Support

Any operating system that is supported by the target WebGL-enabled browser.
### Software Requirements

The interface designer GE is currently implemented specifically for Web Rocket / Web Tundra and XML3D scenes.
A WebGL-enabled browser, which includes, but not limited to:
* Google Chrome 9+
* Mozilla Firefox 4.0+
* Safari 6.0+ (disabled by default)
* Opera 11+ (disabled by default)

Other internal dependencies are

* Classy.js v1.4 (http://classy.pocoo.org/)
* jQuery v2.0.3 (https://jquery.org/)
* jQuery UI v1.10.3 (http://jqueryui.com/)
* Fancytree v.2.0.0-5 (http://plugins.jquery.com/fancytree/)
* jquery-contextMenu v1.7 (https://github.com/arnklint/jquery-contextMenu)

## Software Installation and Configuration

This section will be updated closer to the reference implementation software release.
* First, download all dependencies from the links above. Add the scripts into the <head> section of your HTML file by doing:
```
   <script type="text/javascript" src="path/to/classy.js"></script>
   <script type="text/javascript" src="path/to/jquery.js"></script>
   <script type="text/javascript" src="path/to/jquery-ui.js"></script>
   <script type="text/javascript" src="path/to/jquery.fancytree-all.min.js"></script>
   <script type="text/javascript" src="path/to/jquery.contextmenu.js"></script>
```
* Add the following style sheets that come from JQuery UI and Fancytree dependencies also in the `<head>` section of your HTML file by doing:
```
   <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">
   <link rel="stylesheet" href="path/to/skin-win8/ui.fancytree.css">
```

* Finally, clone the GIT repository https://github.com/Adminotech/fiware-interface-designer. Inside there are three scripts: InterfaceDesigner-main.js, XML3DEditor.js and RocketEditor.webrocketjs.

### WebRocket

* Add the RocketEditor.webrocketjs script to src/applications in the WebRocket code tree, and add InterfaceDesigner-main.js into src/lib

### XML3D

* Download and add xml3d.js from (http://www.xml3d.org/xml3d/script/xml3d.js), and add it BEFORE all other scripts in the `<head>` section.
* Add XML3DEditor.js and InterfaceDesigner-main.js as follows:
```
   <script type="text/javascript" src="path/to/InterfaceDesigner-main.js"></script>
   <script type="text/javascript" src="path/to/XML3DEditor.js"></script>
```

* While in the `<head>` section, add another `<script>` tag, and instantiate the editor. The constructor has two required arguments which are id-s to the main
element and the main `<xml3d>` element. For best results, do a scene that has a `<div>` with a `<xml3d>` DOM tree as a child to said `<div>`:
```
   <script type="text/javascript">
       var editor = new XML3DEditor("id-of-main-DIV", "id-of-main-XML3D-element");
   </script>
```

* Default shortcuts for toggling the editor (turning it on or off) is "shift" + "s", and switching between Scene Tree editor and EC editor panels is "shift" + "e". You can override these shortcuts by adding:
```
    editor.setToggleEditorShortcut(metaKey, key1);
    editor.setSwitchPanelsShortcut(metaKey, key2);
```
* Accepted values for metaKey are `shift`, `ctrl`, `meta`, and `alt`, and `key1` and `key2` could be any character on the keyboard.