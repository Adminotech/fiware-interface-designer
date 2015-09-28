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
* jqueryui-contextMenu v1.10 (https://github.com/mar10/jquery-ui-contextmenu/archive/v1.10.0.zip)
* FileSaver.js (https://github.com/eligrey/FileSaver.js/)
vkbeautify 0.99 (https://code.google.com/p/vkbeautify/downloads/detail?name=vkbeautify.0.99.00.beta.js)

## Software Installation and Configuration

### WebRocket

* Extract or clone the Interface Designer in WEBROCKET_ROOT_DIRECTORY/src/application/editor
* In the server side editor, add an entity with a "Script" component that will point to RocketEditor.webrocketjs

### XML3D

* The xml3dExample.html is a complete ready-to-use example containing an HTML page that has an empty XML3D scene with Interface Designer installed.
```
<!DOCTYPE HTML>
<html>
 <head>
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">
    <link rel="stylesheet" href="lib/skin-win8/ui.fancytree.css">
 
    <style>
        #mainContent {
            position: absolute;
            top: 0; right: 0; bottom: 0; left: 0;
        }
    </style>
    <script type="text/javascript" src="lib/xml3d.js"></script>
    <script type="text/javascript" src="lib/xml3d.tools.js"></script>
    <script type="text/javascript" src="lib/jquery.js"></script>
    <script type="text/javascript" src="lib/jquery-ui.js"></script> 
    <script type="text/javascript" src="lib/jquery.fancytree-all.min.js"></script>
    <script type="text/javascript" src="lib/jquery.ui-contextmenu.min.js"></script>
    <script type="text/javascript" src="lib/FileSaver.min.js"></script>
    <script type="text/javascript" src="lib/vkbeautify.0.99.00.beta.js"></script>
    <script type="text/javascript" src="lib/classy.js"></script>
    <script type="text/javascript" src="InterfaceDesigner-main.js"></script>
    <script type="text/javascript" src="XML3DEditor.js"></script>
 
 
    <script type="text/javascript">
        window.addEventListener('load', function() {
            var cameraTransformable = XML3D.tools.MotionFactory.createTransformable($("#mainCamera")[0]);
            var camera = new XML3D.tools.MouseKeyboardFlyController(cameraTransformable, { moveSpeed: 0.2, rotateSpeed: 2 });
            camera.attach();
            // XML3D editor instance
            var editor = new XML3DEditor({
                mainContent: "mainContent", 
                canvas: "mainCanvas", 
                resourcesPath: "resources/"
            });
 
        }, false);
    </script>
 </head>
 <body>
    <div id="mainContent">
        <xml3d xmlns="http://www.xml3d.org/2009/xml3d" id="mainCanvas" activeView="#cameraView" style="width:100%; height:100%;background-color:white;">
            <defs>
                <transform id="cameraTransform"></transform>
            </defs>
            <group id="mainCamera" transform="#cameraTransform">
                <view id="cameraView"></view>
            </group>
        </xml3d>
    </div>
 </body>
 </html>
```
Let's breakdown the above code for better understanding.
* First, the CSS styles are added for jquery UI, jquery.fancytree and styling of the mainContent div:
```
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">
    <link rel="stylesheet" href="lib/skin-win8/ui.fancytree.css">
 
 
    <style>
        #mainContent {
            position: absolute;
            top: 0; right: 0; bottom: 0; left: 0;
        }
    </style>
```
* Later, the XML3D library is always added BEFORE all other libraries:
```
    <script type="text/javascript" src="lib/xml3d.js"></script>
    <script type="text/javascript" src="lib/xml3d.tools.js"></script>
    <script type="text/javascript" src="lib/jquery.js"></script>
    <script type="text/javascript" src="lib/jquery-ui.js"></script> 
    <script type="text/javascript" src="lib/jquery.fancytree-all.min.js"></script>
    <script type="text/javascript" src="lib/jquery.ui-contextmenu.min.js"></script>
    <script type="text/javascript" src="lib/FileSaver.min.js"></script>
    <script type="text/javascript" src="lib/vkbeautify.0.99.00.beta.js"></script>
    <script type="text/javascript" src="lib/classy.js"></script>
```
* Lastly, XML3DEditor.js and InterfaceDesigner-main.js are added as last:
```
    <script type="text/javascript" src="lib/InterfaceDesigner-main.js"></script>
    <script type="text/javascript" src="lib/XML3DEditor.js"></script>
```
* This example uses XML3D Tools' Mouse/Keyboard Fly controller (camera). It is added in the window's 'load' event:
```
   <script type="text/javascript">
        window.addEventListener('load', function() {
            var cameraTransformable = XML3D.tools.MotionFactory.createTransformable($("#mainCamera")[0]);
            var camera = new XML3D.tools.MouseKeyboardFlyController(cameraTransformable, { moveSpeed: 0.2, rotateSpeed: 2 });
            camera.attach();
            // XML3D editor instance
            var editor = new XML3DEditor({
                mainContent: "mainContent", 
                canvas: "mainCanvas", 
                resourcesPath: "resources/"
            });
        }, false);
    </script>
    <!-- etc etc... -->
```
* In the 'load' event, an instance of XML3DEditor is made that accepts an options JSON: mainContent is the variable that will hold the ID of the main <div> element, canvas holds the ID of the main <xml3d> element, and resourcesPath the path to the resources folder that comes with the package.
```
        var editor = new XML3DEditor({
            mainContent: "mainContent", 
            canvas: "mainCanvas", 
            resourcesPath: "resources/"
        });
```
* Finally, we have the "main scene" in <body> element. It consists of a <div> element with ID mainContent that has only one child element <xml3d> with ID mainCanvas that will contain the whole XML3D scene:
```
 <body>
    <div id="mainContent">
        <xml3d xmlns="http://www.xml3d.org/2009/xml3d" id="mainCanvas" activeView="#cameraView" style="width:100%; height:100%;background-color:white;">
            <defs>
                <transform id="cameraTransform"></transform>
            </defs>
            <group id="mainCamera" transform="#cameraTransform">
                <view id="cameraView"></view>
            </group>
        </xml3d>
    </div>
 </body>
 </html>
```
