# Introduction

This document describes the use of the reference implementation provided by the Interface Designer GE.
The interface designer consist of four parts:

* Scene tree editor. Provides a tree-view of all available entities in a 3D scene.

* Entity-component editor. Provides further fine-tuning of the internals of entity components. (for example, modifying the x,y, and z 'position' vector axes of a 'transform' component)

* Transform gizmo. A 3D object that provides direct in-world translating / rotating / scaling an entity, represented as a 3D object that is always centered into the object of interest. It consist of three colored XYZ axes, three planes and a central box.

* Toolbar. A toolbar consisting of viewing the history of editing (undo / redo stack), creating primitives, quickly adding entities, toggling grid and axes helpers, as well as switching between scene and EC editor, and switching between transform gizmo modes.

### Background and Detail


This User and Programmers Guide relates to the Interface Designer GE which is part of the Advanced Middleware and Web UI chapter.
Please find more information about this Generic Enabler in the Open Specification pages.

# User guide

### Brief introduction about entities, components, and attributes (ECA)

#### Entities

An **entity** is any dynamic object within a 3D world; It is the "living being" of a 3D scene in which exists. It has unique ID number used for referencing said entity. In this particular case, entities can be empty, or contain **components** that will define their functionality, look, and behavior.

#### Components

**Components** consist of set of **attributes**, in which information about specific functionality is stored. Components also have unique ID and a type name. A component can be "static" or "dynamic".
A **static** component has a pre-defined set of attributes, that the user cannot remove, or add new ones. The set of attributes is defined by the underlying client application, and given as such to the user.  For example, if the "transform" attribute is removed from "Placeable", the component would be defunct, since it has the responsibility to define the entity position in the 3D scene.
A **dynamic** component is completely user-defined, which means the user can add / remove attributes by will for application-specific purposes.

Some of the core component types include:

* Name: Adds a name to the entity. 
* Placeable: Gives the entity a position / rotation / scale (further in the text altogether called "Transform") into the 3D scene, or toggles its visibility.
* Mesh: A collection of vertices, edges and faces that define the appearance of a 3D object. The mesh formats supported are defined by the underlying client application.
* Camera: Provides a first-view look to a 3D scene. 
* Script: Provides scripting to the target entity, or the whole scene, that can further expand functionality of the scene as required by the author (for example, a script that moves the camera with the arrow keys on the keyboard)
* Dynamic: The fore-mentioned "user-defined" component.

In general, an entity that contains "Name" and "Placeable", will acquire a name and a 3D position in the scene, but not appearance. A "Mesh" component can be added and a valid reference (absolute path or URL) to a mesh format file as the "AssetReference" attribute so that the entity gets appearance and a position in the scene.

#### Attributes

Attributes are atomic or complex data types that store human-readable information to their parent components. The attributes have unique names (there cannot be two attributes with the same name) . Some of the attribute types include:

* Bool: Boolean attribute, that accepts "true" or "false" value;
* Int: Integer attribute, for integer numbers;
* UInt: Unsigned integer, for positive numbers only;
* String: A string attribute that stores text;
* Float: Floating-point numbers;
* Float2: A tuple of 2 floating-point numbers (x,y);
* Float3: A tuple of 3 floating-point numbers (x,y,z);
* Float4: A tuple of 4 floating-point numbers (x,y,z,w);
* Quat: A quaternion, technically same as Float4 (x,y,z,w);
* Color: Technically same as Float4, but made separately for better readability (red, green, blue, alpha);
* Transform: A complex data type consisting of three "Float3"-s named "position", "rotation" and "scale";
* EntityReference: A string attribute that accepts entity IDs or names, to be used as references for application-specific purposes;
* AssetReference: A reference (usually an absolute or relative path, or URL) to a mesh file, script file, material file, shader script, etc..
* AssetReferenceList: A list of AssetReferences.
##### Asset references

**AssetReference** is a specialized string attribute, that is used to reference an asset that is in the local file system, stored on cloud, or hosted on a FTP server, therefore it can be an absolute path or URL. The underlying system should take care for fetching and loading the referenced asset.

#### Local, replicated (syncronization), temporary

**Note: This GE does not cover synchronization between the client and server, as it is a separate technology which is a part as another GE called "Synchronization" in this chapter! It only provides UI means to utilize synchronization if the 3D-UI GE uses the Synchronization GE**

The availability of entities and components to the server and other clients, can be defined as **local** or **replicated** (also known as **synchronized**), and **temporary** or persistent.

* A local entity or component is visible only to the current running client. Their creation, removal or changes are not sent to the server, and so other clients "do not know" about said entity or component. Changing means adding / removing components of the entity, and in case of component, changing the values of its attributes. 
* A replicated (synchronized) entity or component is the opposite of local; When a replicated entity or component is created / removed / changed, the server is notified which will forward the information to all the clients. 
* A temporary entity or component means that the entity or component will not be considered when the scene is saved to a file. This is useful in cases where entities are not meant to became part of a permanent scene, for example, an external script that takes care of creating an entity and using it for its own purposes that are usually short-term.

#### XML3D model vs ECA

XML3D is compatible with the entity-component-attribute by defining its elements as both entities and components. A XML3D element can have child elements (equivalent to entity), while also having attributes (equivalent to component). Therefore, when running this GE on top of XML3D, the terms "Entity" and "Component" are replaced with "Element".

### Scene tree editor

The scene tree editor consists of a tree-view widget that displays all available entities within a scene, and serves as the "head" of the interface designer, as it provides access to all available entities in a scene. The default shortcut for enabling the editor is **"Shift + S"**.
Naming of the tree nodes is as follows:

#### WebTundra

for entities <strong>(id) Entity name</strong>

for components <strong>type_name (component_name)</strong>

#### XML3D

all elements: <strong>[id] element_type (element_name)</strong>

![WebTundra scene tree](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/a/a9/InterfaceDesigner_SceneTreeRocket.png)

![XML3D scene tree](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/5/52/InterfaceDesigner_SceneTreeXML3D.png)

#### Adding / removing entities and their components

An new entity can be created by clicking on the "Add new entity" button, that will pop-up a dialog. Provide the name of the new entity (optional) and choose which components should be created with it by simply dragging the buttons to the marked area:

![Add new entity](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/0/04/InterfaceDesigner_AddEntity.png)


Removing an entity or a component from an entity, can be done by right-clicking of the desired entity / component, and selecting "Delete":

![Context menu](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/7/79/InterfaceDesigner_ContextMenu.png)


It will show a confirmation dialog:

![Remove entity confirmation](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/b/b9/InterfaceDesigner_RemoveEntity.png)

#### Editing individual entities

Right-clicking an entity from the tree-view and selecting "Edit..." in the context menu, will open up the Entity-component editor, that allows further fine-tuning of component attributes, such as "Mesh", "Transform" components etc. Right-clicking a component from the scene tree will also open the Entity-component editor, with the selected component as active (the accordion for the selected component will be expanded).

### Entity-component editor

The entity-component editor further expands component and attribute information, placed in jquery-ui "accordions" which can be individually expanded / collapsed. 

![The EC editor, editing an entity named "box3", with unique id 8](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/f/f2/InterfaceDesigner_Editor.png)


The editor will automatically show when an object has been selected, by right-clicking a tree item and selecting "Edit...", or by pressing "Shift + E" keyboard shortcut. It contains three additional buttons: **"Add new component / child element"**, **"Edit"**, and **"Expand/collapse"**

![EC editor](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/3/32/InterfaceDesigner_ECEditor.png)


By right-clicking and "Edit" on an entity from the scene tree editor, or by clicking it directly on the scene, the entity-component editor will be shown, allowing of fine-tuning of attributes, as well as adding/removing of components.
The header of the accordion contains the entity ID and entity name if specified in the following format: **"(id) <ENTITY NAME HERE>"**.

Pressing on **"Add new component"** will pop-up a modal dialog, asking for the component name, type chosen from a list of available components provided by the underlying client application (XML3D or Web Rocket), "Create local component" check-box, and "Temporary" check-box.

!["Add component" dialog](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/c/cf/InterfaceDesigner_AddComponent.jpg)


When the **"Edit"** button is toggled, the **"Remove this component"** (remove **"X"** icon) and **"Add new attribute"** (plus sign **"+"** icon) or **"Edit"** (pencil icon) buttons are shown on the accordion header where applicable. 

!["Remove this component"](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/c/c0/InterfaceDesigner_RemoveComponentTooltip.png)

!["Add an attribute to this component"](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/1/18/InterfaceDesigner_AddAttributeTooltip.png)

!["Edit this element"](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/2/23/InterfaceDesigner_EditButton.png)


By pressing on the "Add new attribute" button, it will pop-up a modal dialog, asking for name and type of the attribute that is about to be created. The name cannot be duplicate of an existing attribute name. The type is chosen from a list, depending on the currently supported attributes by the underlying client application (XML3D or Web Rocket).

!["Add attribute" dialog](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/8/80/InterfaceDesigner_AddAttribute.jpg)

![A newly created attribute](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/9/95/InterfaceDesigner_AttributeCreated.png)


Pressing on "Remove this component" or "X" will pop-up a confirmation dialog, to prevent accidental removal.

!["Remove component" confirmation dialog](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/7/7a/InterfaceDesigner_RemoveComponent.jpg)


Pressing on "Edit" in case of XML3D, will open up that child element into the editor. An "Up" button will appear on the left side of the label to return to the parent entity.

![File:InterfaceDesigner_UpButton.png|450px|caption|"Up" button](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/1/17/InterfaceDesigner_UpButton.png)


Pressing the "Expand/collapse" button will simply expand all or collapse all opened component accordions.

The attribute names and corresponding input boxes (check boxes in case of boolean attribute) are shown in a tabular view as the accordion body. Editing the attributes have immediate effect on the entity (no confirmation is needed).

### Transform gizmo

The transform gizmo is always shown centered on the currently selected entity when the editor is enabled. It has three modes: translation, rotation and scaling. Each color represents the following:
* X axis - red
* Y axis - green
* Z axis - blue
* XY plane - yellow
* YZ plane - cyan
* XZ plane - magenta

Switching between gizmo modes is done in the toolbar with three radio buttons:
![Gizmo modes](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/e/e6/InterfaceDesigner_GizmoModes.png)
#### Translate

The Translate mode is used to change the position of the current 3D object. It consists of three arrows, three planes and one central box.
![Translation mode](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/8/8a/InterfaceDesigner_GizmoTranslate.png)

By dragging on the axes, the movement is restricted to a single coordinate, while dragging on the planes the movement is restricted to two coordinates. Dragging the central box allows free movement across the viewport.

#### Rotate

The "Rotate" mode is used to rotate the object in place. It consists of 3 arcs, each colored to the corresponding coordinate (as explained above), and 1 circle that allows rotation according to the current camera view. 
![Rotation mode](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/2/24/InterfaceDesigner_GizmoRotate.png)

#### Scale

* The "Scale" mode is used to increase / decrease the size of the mesh. It consists of three lines with box on their tops and a central box. Dragging on the lines restricts the scaling to a single coordinate, while dragging on the central box scales all coordinates.
![Scaling mode](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/4/41/InterfaceDesigner_GizmoScale.png)


#### Multi-edit objects

By holding "shift" and selecting objects, you can manipulate simultaneously all of them. Parented objects can be also selected among others, as long as they are not directly related, meaning selecting a parent and its child will only select the parent, but will still visually mark its children.

### Toolbar

The toolbar contains "Undo" and "Redo" buttons, "Create" button for primitives, "Add..." button for quick-adding empty entities, "Delete" button, "Toggle grid", "Toggle axes", "Translate | Rotate | Scale" radio buttons and "Scene tree | EC editor" radio buttons.

* Clicking on Undo will undo the last made edit / action. "Redo" repeats the last undone action. 
* "Create" will pop-up a menu that has "Cube", "Ball", "Cone" and "Cylinder" items. Clicking on any of those will create a primitive object on the scene, depending on the selection.
* "Add..." will pop-up a menu that has "Movable", "Drawable" and "Script" items, that create an entity with the corresponding components. For example, a drawable entity is an entity that has a mesh component.
* Clicking on the "Delete" (trash can icon) button will remove the current edited object, for which it will ask with a confirmation dialog.
* "Toggle grid" (grid icon) toggles a grid in the 3D scene, with its center in the 0,0,0 point, and two crossed red lines for each X and Z axis.
* "Toggle axes" (arrows icon) toggles a simple axes mesh, similar to that of the gizmo, but serving only as a guide.
* "Translate | Rotate | Scale" serve for changing the transform gizmo mode. Disabled when no object is selected.
* "Scene tree | EC editor" switches between the scene tree and EC panels, as an alternative to the "Shift" + E keyboard shortcut. 

![Toolbar](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/4/4c/InterfaceDesigner_Toolbar.png)
![Grid](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/1/10/InterfaceDesigner_Grid.png)
![Axes](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/2/28/InterfaceDesigner_Axes.png)



#### Undo / redo stack


The undo stack keeps the last 50 edits made via the editor. Next to the "Undo" and "Redo" buttons there are much smaller buttons with arrow icon, that will pop-up a menu that shows 5 most recent actions. The items are always from most recent as the topmost item, to the least recent as the bottom item. For example, as shown on the following photo, selecting "edit transform" item, "undo" will be executed five times.


![Undo menu items](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/c/c3/InterfaceDesigner_UndoItems.png)

When the stack contains more than 5 items, there is an extra menu item "View all X items" that will show a window with all the actions that the stack keeps track of. Transversing through the actions is equivalent to clicking "Undo" or "Redo" multiple times.


![Undo history](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/e/e0/InterfaceDesigner_UndoHistory.png)

Again, the topmost item is the most recent action, while the bottommost is the least recent action. The "Current state" item represents how deep into the undo stack the current state is. As the picture shows, there is one item above "Current state" and many below. Clicking on items above "Current state" and then "Ok" will call "redo" (as many times as it should) and clicking on the items below "Current state" will call "undo". If "Current state" is selected, it will have no effect.

#### Saving and loading


You can save your work by clicking on the disk button "Save". 

![Save / load](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/e/ea/Tutorial17.PNG)

A dialog will appear to ask the desired filename. 

![Name the file](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/c/ce/Tutorial18.PNG)

The file will be saved as a download in your "Downloads" folder, similar to downloading a file from the Internet with your target browser.

![Downloads](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/e/ed/Tutorial19.PNG)

Loading your work is done by clicking on the opened folder button "Load". A dialog will appear with a button "Choose file". 

![Load a scene](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/f/ff/LoadScene.png)

Click on "Choose File" and select a file from your local drive. Be aware that loading previously saved work will overwrite any unsaved work you have done.

### Sample scene creation


The following tutorial shows how to create a simple scene using the Interface Designer. As a foreword, the Interface Designer is not a 3D modeler but rather a scene manipulator, so it is expected by the user to have his/her own meshes and materials / textures for the 3D scene that can be made with external tools (Blender, 3DMAX etc.), and also to be exported in the supported asset format, depending on the underlying 3D-UI GE. For this example, we are going to use WebTundra GE. You can download the materials used in this tutorial, and host them anywhere you like. In this example, the assets are hosted locally, at port 8082, inside /html/assets/ path.
The starting point is an empty, pitch black scene.

**1.** Start the editor by pressing Shift + S. The scene tree should be visible on the right side. 

![Empty scene](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/1/15/Tutorial1.PNG)

There should be nothing else but camera and the instance of the editor application. You can move around with the camera with the WSAD or arrow keys keys (W / Up arrow- forward, S / Down arrow - backward, A - left-strafe, Left arrow - turn left, D - right-strafe, Right arrow - turn right, C - down, Space - up), and rotate the camera with a right-click dragging of the mouse.

**2.** Start by adding an environment light. Click on the "Add new entity" button in the Scene tree 

![Add new entity](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/d/da/Tutorial2.PNG)

**3.** Name the new entity "Light", and drag and drop the "EnvironmentLight" component to the place shown.

**4.** Now right-click on the new created entity "Light" and click on "Edit" 

![Edit menu item](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/2/27/Tutorial3.PNG)

to enter the Entity-Component editor. 

![EC editor](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/e/e2/Tutorial4.PNG)

**5.** We want to add some nice sky and water. Click on the "Add new component" button.

**6.** In the component type, select the "Sky" component and click on "Add component". 

![Add component](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/f/f6/Tutorial5.PNG)

Repeat this step, only this time select "WaterPlane" component.

**7.** The sky and water should be visible at this point 

![Sky and water](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/5/5e/Tutorial6.PNG).

**8.** Time to start adding some content. Click on the upper menu "Add..." 

![Add... menu](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/4/4a/Tutorial7.PNG) 

and select "Drawable". An entity named "drawable" with components "Name", "Mesh" and "Placeable" will be created. 

![New drawable entity](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/c/ce/Tutorial8.PNG)

**9.** Right-click and "Edit" on the new "drawable" entity. Expand the "Mesh" component. First we add the room. Copy-paste the URLs of the room ".mesh" file (in this example it is http://localhost:8082/html/assets/room.mesh) into the "meshRef" attribute, and the URL to its ".material" file into "materialRefs". 

![Mesh and material refs](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/8/80/Tutorial9.PNG)

**10.** Optionally, expand the "Name" component, and rename this entity to "Room".

**11.** You should now see the room. 

![Room mesh](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/0/08/Tutorial10.PNG)

**12.** You can move the room around, or any other entity that has the "Placeable" component with the transform gizmo 

![Translate gizmo](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/9/95/Tutorial11.PNG).

The gizmo mode can be selected on the toolbar up 

![Gizmo modes](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/9/97/Tutorial12.PNG) ![Rotate gizmo](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/2/26/Tutorial13.PNG)

Manipulate the transform of the objects to your liking until you get the desired result.

**13.** Repeat steps from 8 to 12 for the rest of the objects (table, chair, screen, tablet). You can move between scene tree and EC editor when needed

![Scene tree / EC editor](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/1/10/Tutorial14.PNG).

**14.** You can also undo / redo your steps up to 50 manipulations 

![Undo stack](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/b/ba/Tutorial15.PNG). 

This is the current limit of the undo / redo manager.

**15. The final look of the scene. 

![Final scene](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/7/7b/Tutorial16.PNG)

**16. Save your work by clicking on the disk icon in the toolbar 

![Save / load](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/e/ea/Tutorial17.PNG). 

Name your file and click OK. 

![Naming file](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/c/ce/Tutorial18.PNG)

The file will be saved in your "Downloads" folder, similar to how you download files in your target browser. 

![Downloads](https://forge.fiware.org/plugins/mediawiki/wiki/fiware/images/e/ed/Tutorial19.PNG)

# Programmers guide

If your underlying system describes the 3D scenes as Entity-Component-Attribute system, you can adapt this library to your needs. 
Refer to the [javascript API reference](https://edu.fiware.org/mod/resource/view.php?id=718) for information on all classes.