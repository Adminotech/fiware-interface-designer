# Introduction 
This document describes the installation and administration of the Interface Designer GE.

# System Requirements
## Hardware Requirements
Since this GE is application-oriented, and serves for manipulating a 3D scene, any recent PC/Mac configuration that is capable of 3D rendering is considered as a minimum system requirement.
## Operating System Support
Any operating system that is supported by the target WebGL-enabled browser.
## Software Requirements
The interface designer GE is currently implemented specifically for Web Rocket / Web Tundra and XML3D scenes.

A WebGL-enabled browser, which includes, but not limited to:

* Google Chrome 9+
* Mozilla Firefox 4.0+
* Safari 6.0+ (WebGL disabled by default)
* Opera 11+ (WebGL disabled by default)


Other internal dependencies which are included in the release package (but pointed out here for reference) are:

* Classy.js v1.4 (https://github.com/mitsuhiko/classy/archive/1.4.tar.gz)
* jQuery v2.0.3 (http://code.jquery.com/jquery-2.0.3.min.js)
* jQuery UI v1.10.3 (http://jqueryui.com/resources/download/jquery-ui-1.10.3.zip and http://jqueryui.com/resources/download/jquery-ui-themes-1.10.3.zip)
* Fancytree v.2.0.0-5 (https://github.com/mar10/fancytree/releases/download/v2.0.0-5/jquery.fancytree-2.0.0-5.zip)
* jqueryui-contextMenu v1.10 (https://github.com/mar10/jquery-ui-contextmenu/archive/v1.10.0.zip)
* FileSaver.js (https://github.com/eligrey/FileSaver.js/)
* vkbeautify 0.99 (https://code.google.com/p/vkbeautify/downloads/detail?name=vkbeautify.0.99.00.beta.js)

# Software Installation and Configuration

* Download the package from the [Interface Designer FIWARE Catalogue](http://catalogue.fiware.org/enablers/interface-designer/downloads) or clone the [Git repository](https://github.com/Adminotech/fiware-interface-designer). The package contains **all necessary dependencies**, and the directory structure is as follows:

		ROOT/
    		lib/
    		    skin-win8/
    		        icons.gif
    		        loading.gif
    		        ui.fancytree-org.css
    		        ui.fancytree.css
    		    classy.js
    		    FileSaver.min.js
    		    jquery-ui.js
    		    jquery.ui-contextmenu.min.js
    		    jquery.fancytree-all.min.js
    		    jquery.js
    		    three-TransformControls.js
    		    vkbeautify.0.99.00.beta.js
    		    xml3d.tools.js
    		    xml3d.js
    		resources/
    		    ball.xml
    		    cone.xml
    		    cube.xml
    		    cylinder.xml
    		conf.json
 		   	COPYRIGHT
    		InterfaceDesigner-main.js
   			LICENSE
    		README.md
    		WebTundraEditor.webtundrajs
    		XML3DEditor.js
    		xml3dExample.html

## WebTundra
* Refer to the WebTundra's [User and programmer's guide](http://webtundra.readthedocs.org/en/latest/user_programmers/#preparing-own-scenes) to set up Interface Designer in WebTundra;

## XML3D
* The `xml3dExample.html` is a complete ready-to-use example containing an HTML page that has an empty XML3D scene with Interface Designer installed.
Let's breakdown the code for better understanding.
* First, the CSS styles are added for jquery UI, jquery.fancytree and styling of the mainContent div:

		<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">
    	<link rel="stylesheet" href="lib/skin-win8/ui.fancytree.css">


    	<style>
      		#mainContent {
        	    position: absolute;
        	    top: 0; right: 0; bottom: 0; left: 0;
        	}
    	</style>

* Later, the XML3D library is always added '''BEFORE''' all other libraries:

    	<script type="text/javascript" src="lib/xml3d.js"></script>
    	<script type="text/javascript" src="lib/xml3d.tools.js"></script>
    	<script type="text/javascript" src="lib/jquery.js"></script>
    	<script type="text/javascript" src="lib/jquery-ui.js"></script> 
    	<script type="text/javascript" src="lib/jquery.fancytree-all.min.js"></script>
    	<script type="text/javascript" src="lib/jquery.ui-contextmenu.min.js"></script>
    	<script type="text/javascript" src="lib/FileSaver.min.js"></script>
    	<script type="text/javascript" src="lib/vkbeautify.0.99.00.beta.js"></script>
    	<script type="text/javascript" src="lib/classy.js"></script>

* Lastly, `XML3DEditor.js` and `InterfaceDesigner-main.js` are added as last:

    	<script type="text/javascript" src="lib/InterfaceDesigner-main.js"></script>
    	<script type="text/javascript" src="lib/XML3DEditor.js"></script>

* This example uses XML3D Tools' Mouse/Keyboard Fly controller (camera). It is added in the window's 'load' event:

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

* In the 'load' event, an instance of `XML3DEditor` is made that accepts an options JSON: `mainContent` is the variable that will hold the ID of the main `<div>` element, `canvas` holds the ID of the main `<xml3d>` element, and `resourcesPath` the path to the `resources` folder that comes with the package.

        var editor = new XML3DEditor({
            mainContent: "mainContent", 
            canvas: "mainCanvas", 
            resourcesPath: "resources/"
        });

* Finally, we have the "main scene" in `<body>` element. It consists of a `<div>` element with ID `mainContent` that has only one child element `<xml3d>` with ID `mainCanvas` that will contain the whole XML3D scene:

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

# Sanity check procedures
As a verification that everything was installed correctly, pressing the shortcut `"Shift" + "S"` should open up the scene editor, and should be ready to use. If you use the above XML3D example, you will come across an empty scene. 