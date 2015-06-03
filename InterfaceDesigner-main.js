function isNull(ptr)
{
    return (ptr === undefined || ptr === null);
}

function isNotNull(ptr)
{
    return !isNull(ptr);
}

var IWrapper = Class.$extend(
{
    __init__ : function()
    {
        this._ptr = null;
        this.callbacks = {};
    },

    expired : function()
    {
        return isNull(this._ptr);
    },

    registerCallback : function(eventType, context, callback)
    {
        if (isNull(this.callbacks[eventType]))
            this.callbacks[eventType] = [];

        this.callbacks[eventType].push({
            "context" : context,
            "callback" : callback
        });
    },

    isRegistered : function(eventType)
    {
        return (isNotNull(this.callbacks[eventType]) && this.callbacks[eventType].length !== 0);
    },

    unregisterAll : function()
    {
        for (var i in this.callbacks)
            this.callbacks[i].length = 0;

        this.callbacks = {};
    },

    callback : function(eventType, arg, arg1, arg2, arg3, arg4)
    {
        if (isNull(this.callbacks[eventType]))
            return;

        var allRegistered = this.callbacks[eventType];
        if (allRegistered.length == 0)
            return;

        for (var i = 0; i < allRegistered.length; i++)
        {
            var context = allRegistered[i].context;
            var callback = allRegistered[i].callback;

            callback.call(context, arg, arg1, arg2, arg3, arg4);
        }
    }
});

var SceneWrapper = IWrapper.$extend(
{
    __init__ : function()
    {
        this.$super();
        this.entityString = "entity";
        this.componentString = "component";
    },

    // Main scene methods
    // pure virtual
    generateXml : function() {},
    deserializeFrom : function(jsonObject) {},
    entities : function() {},
    entityById : function(entityId) {},
    createEntity : function(id, components, change, replicated, componentsReplicated) {},
    removeEntity : function(entityId) {},
    registeredComponents : function() {},
    doesAllowSameNamedComponents : function() {},
    doRaycast : function(x, y, selectionLayer) {},
    componentNameWithPrefix : function(componentName) {},
    componentNameInHumanFormat : function(typeName) {},
    attributeTypeToName : function(attrTypeId) {},
    attributeTypeIds : function() {},
    reset : function() {},
    unsubscribe : function(subscription) {},

    // virtual
    isAttributeAtomic : function(attrTypeId)
    {
        return false;
    },

    isAttributeBool : function(attrTypeId)
    {
        return false;
    },

    isAttributeArray : function(attrTypeId)
    {
        return false;
    },

    isAttributeColor : function(attrTypeId)
    {
        return false;
    },

    isAttributeTransform : function(attrTypeId)
    {
        return false;
    },

    isAttributeTuple : function(attrTypeId)
    {
        return 0;
    },

    isAttributeEnum : function(attrTypeId)
    {
        return false;
    },

    // Events
    entityCreated : function(context, callback) {},
    entityRemoved : function(context, callback) {},
    componentCreated : function(context, callback) {},
    componentRemoved : function(context, callback) {},
    attributeChanged : function(context, callback) {},

    // Log channels
    logInfo : function(text) {},
    logWarning : function(text) {},
    logError : function(text) {}
});


var EntityWrapper = IWrapper.$extend(
{
    __init__ : function(id, name, isLocal, isTemporary)
    {
        this.$super();

        this.id = isNull(id) ? -1 : id;
        this.name = isNull(name) ? "" : name;
        this.local = isLocal;
        this.temporary = isTemporary;
    },

    // virtual
    parentId : function()
    {
        return null;
    },

    isAncestorOf : function(entityPtr)
    {
        return false;
    },

    // pure virtual
    serialize : function() {},
    deserialize : function(jsonObject) {},
    setName : function(name) {},
    getName : function() {},
    numberOfComponents : function() {},
    components : function() {},
    createComponent : function(typeName, name, isLocal) {},
    hasComponent : function(type, name) {},
    getComponent : function(type, name) {},
    componentById : function(componentId) {},
    removeComponent : function(componentId) {},

    // Events
    componentCreated : function(context, callback) {},
    componentRemoved : function(context, callback) {}
});

var ComponentWrapper = IWrapper.$extend(
{
    __init__: function(id, name, type, parentId)
    {
        this.$super();

        this.id = isNull(id) ? -1 : id;
        this.name = isNull(name) ? "" : name;
        this.typeName = isNull(type) ? "" : type;
        this.pId = parentId;
    },

    parentId : function()
    {
        return this.pId;
    },

    getName : function()
    {
        return this.name;
    },

    // pure virtual
    serialize : function() {},
    deserialize : function(jsonObject) {},
    isDynamic : function() {},
    setTemporary : function(temporary) {},
    attributes : function() {},
    createAttribute : function(typeId, name) {},
    attributeByName : function(name) {},
    getAttributeByIndex : function(index) {},
    removeAttribute : function(index) {},

    onAttributeAdded : function(context, callback) {},
    onAttributeChanged : function(context, callback) {},
    onAttributeAboutToBeRemoved : function(context, callback) {}

});

var AttributeWrapper = IWrapper.$extend(
{
    __init__ : function(index, typeId, name, parent)
    {
        this.$super();

        this.typeId = typeId;
        this.name = isNull(name) ? "" : name;
        this.index = index;
        this.owner = parent;
    },

    validValues : function()
    {
        return null;
    },

    // pure virtual
    get : function() {},
    set : function(value) {}
});

var IEvent = Class.$extend(
{
    __classvars__ : 
    {
        MouseEvent : 0,
        KeyEvent : 1,
        ResizeEvent : 2
    },

    __init__ : function(eventType, id)
    {
        this.eventType = eventType;
        this.id = id;

        this.targetId = "";
        this.targetNodeName = "";
        this.originalEvent = null;
    }
});

var KeyEventWrapper = IEvent.$extend(
{
    __init__ : function(id)
    {
        this.$super(IEvent.KeyEvent, id);
        this.type = "";

        this.keyCode = 0;
        this.key = "";
        this.repeat = false;
        this.pressed = {};
    },

    isPressed : function(key)
    {
        if (isNotNull(this.pressed[key]))
            return this.pressed[key];

        return false;
    }
});

var MouseEventWrapper = IEvent.$extend(
{
    __init__ : function(id)
    {
        this.$super(IEvent.MouseEvent, id);

        this.type == "";
        this.x = null;
        this.y = null;

        this.relativeX = 0;
        this.relativeY = 0;
        this.relativeZ = 0;

        this.leftDown   = false;
        this.middleDown = false;
        this.rightDown  = false;
    }
});

var RaycastResult = Class.$extend(
{
    __init__ : function()
    {
        this.entity = null;
        this.component = null;
        this.pos = null;
        this.distance = -1;
        this.submesh = -1;
        this.faceIndex = -1;
        this.ray = null;
    }
});

var IEditor = IWrapper.$extend(
{
    __classvars__ : 
    {
        scene : null, // 'Static' object to the scene
        Instance : null // 'Static' object of the editor. Use with caution
    },

    __init__ : function(options)
    {
        this.$super();
        IEditor.Instance = this;
        this.type = options.type || "";

        this.ui = {};                                       // JSON
        this.enabled = false;
        this.isECEditor = false;
        this.noSelectionStr = options.noSelectionString || "<i>(No entities selected)</i>";     // String
        this.sceneEvents = [];
        this.componentEvents = [];                         // Array of EventWrapper
        this.transformEditor = null;

        this.accordionHistory = {};

        this.toggleEditorShortcut = options.toggleEditorShortcut || "shift+s";
        this.switchPanelsShortcut = options.switchPanelsShortcut || "shift+e";

        // The current object in editing
        this.currentObject = null;

        this.initTransformEditor();
        this.undoStack = new UndoRedoManager();
        this.toolkit = new ToolkitManager();

        this._initUi();
        this.toolkit.initUi(isNotNull(this.transformEditor));

        if (this.isConnected())
            this._onClientConnected();
        else
            this.registerClientConnectedCallback(this, this._onClientConnected);
    },

    _onClientConnected : function()
    {
        this.registerKeyEventCallback(this, this._onKeyEvent);
        this.registerMouseEventCallback(this, this._onMouseEvent);
        IEditor.scene = this.registerSceneObject();

        this.undoStack.stateChanged(this, this.onUndoRedoStateChanged);
    },

    isEditorEnabled : function()
    {
        return this.enabled;
    },

    /* virtual */ 
    isConnected : function()
    {
        return true;
    },

    width : function()
    {
        return -1;
    },

    height : function()
    {
        return -1;
    },

    taskbar : function()
    {
        return null;
    },

    /* pure virtual */
    container : function() {},
    addWidget : function(element) {},
    registerSceneObject : function() {},
    registerClientConnectedCallback : function(context, callback) {},
    registerKeyEventCallback : function(context, callback) {},
    registerMouseEventCallback : function(context, callback) {},
    registerResizeEventCallback : function(context, callback) {},

    addEntityCommand : function(components, entityName) {},
    removeEntityCommand : function(entityPtr) {},
    addComponentCommand : function(entityId, compType, compName, isLocal, temporary) {},
    removeComponentCommand : function(componentPtr) {},
    addAttributeCommand : function(componentPtr, attrTypeId, attrName) {},
    removeAttributeCommand : function(attributePtr) {},
    changeAttributeCommand : function(attributePtr, value) {},

    save : function(filename) {},

    initTransformEditor : function() {},
    createPrimitive : function(type) {},
    createMovable : function() {},
    createDrawable : function() {},
    createScript : function() {},

    showGrid : function() {},
    hideGrid : function() {},
    showAxes : function() {},
    hideAxes : function() {},

    quickCreateEntity : function(type)
    {
        if (isNull(type))
            return;

        if (type === "Drawable")
            this.createDrawable();
        else if (type === "Movable")
            this.createMovable();
        else if (type === "Script")
            this.createScript();
        else
            this.logError("quickCreate: Unknown type: " + text);
    },

    _initUi : function()
    {
        // Invalid data CSS class, for marking up invalid values on input boxes
        var invalidDataClass = $("<style/>");
        invalidDataClass.text(".invalidData { border : 2px solid red; }");

        // Some style for context menu items
        var menuItemsClass = $("<style/>");
        menuItemsClass.text(".sceneTree-contextMenu-itemsClass a { \
            font-family: Arial; \
            font-size :  12px; \
            background-color  : #F2F2F2; \
            color             : #333333; \
            text-decoration   : none; \
            display           : block; \
            margin : 10; \
            padding           : 5; \
            }\
        .sceneTree-contextMenu-itemsClass a:hover { \
            background-color  : #000000; \
            color             : #FFFFFF; }");

        var accordionStyle = $("<style/>"); // #F7EEDC
        accordionStyle.text(".accStripe { background: blue url(http://code.jquery.com/ui/1.10.3/themes/smoothness/images/ui-bg_glass_75_e6e6e6_1x400.png) none repeat scroll 0 0; }\
        .accStripe .ui-accordion-header { background: blue url(http://code.jquery.com/ui/1.10.3/themes/smoothness/images/ui-bg_glass_75_e6e6e6_1x400.png) none repeat scroll 0 0; }");

        var undoListStyle = "#_toolkit-undoStackButtons .ui-selecting { background: #AAAAAA; } \
        #_toolkit-undoStackButtons .ui-selected { background: #BBBBBB; color: white; } \
        #_toolkit-undoStackButtons { list-style-type: none; margin: 0; padding: 0; width: 60%; } \
        #_toolkit-undoStackButtons li { margin: 3px; padding: 0.4em; font-size: 1.4em; height: 18px; } ";

        var undoStyleElem = $("<style/>");
        undoStyleElem.append(undoListStyle);

        $("head").append(invalidDataClass);
        $("head").append(menuItemsClass);
        $("head").append(accordionStyle);
        $("head").append(undoStyleElem);
        $("body").css("font-size", "12px");

        this.panelWidth = 420;
        this.panelHeight = this.height();

        var toolbar = this.toolkit.getOrCreateToolbar(this.width() - this.panelWidth);

        this.ui.sceneTree = {};
        this.ui.ecEditor = {};

        this.ui.sceneTree.panel = $("<div/>");
        this.ui.sceneTree.panel.attr("id", "scenetree-panel");
        this.ui.sceneTree.panel.css({
            "position"          : "absolute",
            "top"               : 0,
            "left"              : 0,
            "height"            : this.panelHeight,
            "width"             : this.panelWidth,
            "margin"            : 0,
            "padding"           : 0,
            "padding-top"       : 0,
            "padding-bottom"    : 0,
            "border"            : 0,
            "border-left"       : "1px solid gray",
            "overflow"          : "auto",
            "font-family"       : "Courier New",
            "font-size"         : "10pt",
            "color"             : "rgb(50,50,50)",
            "background-color"  : "rgba(248,248,248, 0.5)",
        });

        this.ui.ecEditor.panel = $("<div/>");
        this.ui.ecEditor.panel.attr("id", "editor-panel");
        this.ui.ecEditor.panel.css({
            "position"          : "absolute",
            "top"               : 0,
            "left"              : 0,
            "height"            : this.panelHeight,
            "width"             : this.panelWidth,
            "margin"            : 0,
            "padding"           : 0,
            "padding-bottom"    : 0,
            "border"            : 0,
            "border-left"       : "1px solid gray",
            "overflow"          : "none",
            "font-family"       : "Courier New",
            "font-size"         : "10pt",
            "color"             : "rgb(50,50,50)",
            "background-color"  : "rgba(248,248,248, 0.5)",
        });

        this.ui.sceneTree.addEntityButton = $("<button/>", {
            id : "st-add-entity-button"
        });
        this.ui.sceneTree.addEntityButton.css({
            "position" : "relative",
            "font-size" : "10px",
            "min-width": "50%"
        });
        this.ui.sceneTree.addEntityButton.html("Add new entity...");
        this.ui.sceneTree.addEntityButton.button({
            icons : {
                primary : "ui-icon-plusthick"
            }
        });

        this.ui.sceneTree.expColButton = $("<button/>", {
            id : "st-expand-collapse-button"
        });
        this.ui.sceneTree.expColButton.data("toggle", false);
        this.ui.sceneTree.expColButton.css({
            "position" : "relative",
            "font-size" : "10px",
            "min-width": "49%"
        });
        this.ui.sceneTree.expColButton.html("Expand/Collapse");
        this.ui.sceneTree.expColButton.button({
            icons : {
                primary : "ui-icon-carat-2-n-s"
            }
        });

        this.ui.sceneTree.buttonsHolder = $("<div/>");
        this.ui.sceneTree.buttonsHolder.attr("id", "scenetree-buttons");
        this.ui.sceneTree.buttonsHolder.css({
            "position" : "relative",
            "overflow" : "auto",
            "top" : 10,
            "left" : 10,
            "width" : "95%",
            "padding" : 0
        });

        this.ui.sceneTree.holder = $("<div/>");
        this.ui.sceneTree.holder.attr("id", "scene-tree-holder");
        this.ui.sceneTree.holder.css({
            "position" : "relative",
            "top" : 20,
            "left" : 10,
            "width" : "95%",
            "height" : "90%",
            "font-size" : "10px",
        });

        this.ui.ecEditor.entityLabel = $("<div/>");
        this.ui.ecEditor.entityLabel.attr("id", "editor-entity-label");
        this.ui.ecEditor.entityLabel.css({
            "position" : "relative",
            "top" : 5,
            "left" : 10,
            "width" : "94%",
            "height" : "20px",
            "font-family" : "Verdana",
            "font-size" : "16px",
            "text-align" : "center",
            "border" : "2px dashed #a1a1a1",
            "padding" : "5px 0 5px 0",
            "margin" : "0 0 10px 0",
            "background" : "#DDDDDD",
            "border-radius" : "10px"
        });
        this.ui.ecEditor.entityLabel.html(this.noSelectionStr);

        this.ui.ecEditor.upButton = $("<button/>", {
            id : "up-parent-button"
        });
        this.ui.ecEditor.upButton.css({
            "position" : "absolute",
            "top" : 10,
            "left" : 20,
            "font-size" : "10px",
            "z-index" : 5,
        })
        this.ui.ecEditor.upButton.html("Up");
        this.ui.ecEditor.upButton.button({
            icons : {
                primary : "ui-icon-arrowreturnthick-1-n"
            }
        });

        this.ui.ecEditor.addCompButton = $("<button/>", {
            id : "ec-add-component-button"
        });
        this.ui.ecEditor.addCompButton.css({
            "position" : "relative",
            // "margin-left" : 10,
            "font-size" : "10px",
            "min-width": "32%"
        });
        this.ui.ecEditor.addCompButton.html("Add new component...");
        this.ui.ecEditor.addCompButton.button({
            icons : {
                primary : "ui-icon-plusthick"
            }
        });

        this.ui.ecEditor.expColButton = $("<button/>", {
            id : "ec-expand-collapse-button"
        });
        this.ui.ecEditor.expColButton.data("toggle", false);
        this.ui.ecEditor.expColButton.css({
            "position" : "relative",
            "font-size" : "10px",
            "min-width": "32%"
        });
        this.ui.ecEditor.expColButton.html("Expand/Collapse");
        this.ui.ecEditor.expColButton.button({
            icons : {
                primary : "ui-icon-carat-2-n-s"
            }
        });

        this.ui.ecEditor.editCompButton = $("<button/>", {
            id : "ec-edit-component-button"
        });
        this.ui.ecEditor.editCompButton.data("toggle", false);
        this.ui.ecEditor.editCompButton.css({
            "position" : "relative",
            "font-size" : "10px",
            "min-width": "30%"
        });
        this.ui.ecEditor.editCompButton.html("Edit...");
        this.ui.ecEditor.editCompButton.button({
            icons : {
                primary : "ui-icon-pencil",
                secondary : "ui-icon-locked"
            }
        });

        this.ui.ecEditor.buttonsHolder = $("<div/>");
        this.ui.ecEditor.buttonsHolder.attr("id", "editor-buttons");
        this.ui.ecEditor.buttonsHolder.css({
            "position" : "relative",
            "overflow" : "auto",
            "top" : 5,
            "left" : 10,
            "width" : "95%",
            "padding" : 0
        });

        this.ui.sceneTree.buttonsHolder.append(this.ui.sceneTree.addEntityButton);
        this.ui.sceneTree.buttonsHolder.append(this.ui.sceneTree.expColButton);

        this.ui.ecEditor.buttonsHolder.append(this.ui.ecEditor.addCompButton);
        this.ui.ecEditor.buttonsHolder.append(this.ui.ecEditor.expColButton);
        this.ui.ecEditor.buttonsHolder.append(this.ui.ecEditor.editCompButton);

        this.ui.sceneTree.panel.append(this.ui.sceneTree.buttonsHolder);
        this.ui.sceneTree.panel.append(this.ui.sceneTree.holder);

        this.ui.ecEditor.panel.append(this.ui.ecEditor.upButton);
        this.ui.ecEditor.panel.append(this.ui.ecEditor.entityLabel);
        this.ui.ecEditor.panel.append(this.ui.ecEditor.buttonsHolder);

        this.ui.ecEditor.holder = $("<div/>");
        this.ui.ecEditor.holder.attr("id", "editor-component-accordions");
        this.ui.ecEditor.holder.css({
            "position"   : "relative",
            "overflow"   : "auto",
            "top"        : 15,
            "left"       : 10,
            "width"      : "95%",
            "height"     : this.componentHolderHeight(),
            "font-size"  : "10px",
            "padding"    : 0
        });

        this.ui.ecEditor.panel.append(this.ui.ecEditor.holder);

        this.ui.ecEditor.upButton.hide();
        this.ui.ecEditor.buttonsHolder.hide();
        this.ui.sceneTree.panel.hide();
        this.ui.ecEditor.panel.hide();
        toolbar.hide();

        this.addWidget(this.ui.sceneTree.panel);
        this.addWidget(this.ui.ecEditor.panel);
        this.addWidget(toolbar);

        this.registerResizeEventCallback(this, this._onResizeEvent);

        this.createContextMenu();
        this.ui.sceneTree.addEntityButton.click(this, this.onAddEntityClicked);
        this.ui.sceneTree.expColButton.click(this, this.onSTExpColClicked);
        this.ui.ecEditor.upButton.click(this, this.onUpButtonClicked);
        this.ui.ecEditor.addCompButton.click(this, this.onAddComponentClicked);
        this.ui.ecEditor.editCompButton.click(this, this.onEditButtonClicked);
        this.ui.ecEditor.expColButton.click(this, this.onECExpColClicked);
    },

    _onKeyEvent : function(keyEvent)
    {
        if (keyEvent.type !== "press" && keyEvent.type !== "keydown")
            return;

        var editorShortcutKeys = this.toggleEditorShortcut.replace(/ /g,'').split("+");
        var panelsShortcutKeys = this.switchPanelsShortcut.replace(/ /g,'').split("+");

        var editorShortcutPressed = true;
        for (var i = 0; i < editorShortcutKeys.length; ++i)
        {
            if (!keyEvent.isPressed(editorShortcutKeys[i]))
            {
                editorShortcutPressed = false;
                break;
            }
        }

        var panelsShortcutPressed = true;
        for (var i = 0; i < panelsShortcutKeys.length; ++i)
        {
            if (!keyEvent.isPressed(panelsShortcutKeys[i]))
            {
                panelsShortcutPressed = false;
                break;
            }
        }

        if (editorShortcutPressed)
        {
            this.toggleEditor();
            keyEvent.originalEvent.preventDefault();
            keyEvent.originalEvent.stopPropagation();
        }
        else if (panelsShortcutPressed)
        {
            this.togglePanels();
            keyEvent.originalEvent.preventDefault();
            keyEvent.originalEvent.stopPropagation();
        }
        else if (keyEvent.isPressed("ctrl") && keyEvent.isPressed("z"))
            this.undoStack.undo();
        else if (keyEvent.isPressed("ctrl") && keyEvent.isPressed("q"))
            this.undoStack.redo();
    },

    _onMouseEvent : function(mouseEvent)
    {
        if (!this.isEditorEnabled())
            return;

        if (mouseEvent.targetNodeName !== "canvas" && mouseEvent.targetNodeName !== "xml3d")
            return;

        if (mouseEvent.type === "press" && mouseEvent.leftDown)
        {
            var raycastResult = IEditor.scene.doRaycast(mouseEvent.x, mouseEvent.y);
            if (isNotNull(raycastResult))
            {
                if (isNull(raycastResult.entity) && isNull(this.currentObject))
                    return;

                if (isNotNull(raycastResult.entity) && isNotNull(this.currentObject))
                    if (raycastResult.entity.id == this.currentObject.id)
                        return;

                this.selectEntity(raycastResult.entity);
            }
            else
                if (isNotNull(this.transformEditor))
                    this.transformEditor.clearSelection();
        }
    },

    _onResizeEvent : function(width, height)
    {
        var panelHeight = this.height();
        var taskbar = this.taskbar();
        var container = this.container();

        this.ui.sceneTree.panel.css("height", panelHeight);
        this.ui.ecEditor.panel.css("height", panelHeight);

        if (isNotNull(taskbar))
        {
            if (this.ui.sceneTree.panel.is(":visible"))
                this.ui.sceneTree.panel.position(
                {
                    my : "right bottom",
                    at : "right top",
                    of : taskbar
                });

            if (this.ui.ecEditor.panel.is(":visible"))
                this.ui.ecEditor.panel.position(
                {
                    my : "right bottom",
                    at : "right top",
                    of : taskbar
                });
        }
        else if (isNotNull(container))
        {
            if (this.ui.sceneTree.panel.is(":visible"))
                this.ui.sceneTree.panel.position(
                {
                    my : "right top",
                    at : "right top",
                    of : container
                });

            if (this.ui.ecEditor.panel.is(":visible"))
                this.ui.ecEditor.panel.position(
                {
                    my : "right top",
                    at : "right top",
                    of : container
                });
        }

        this.ui.ecEditor.holder.css("height", this.componentHolderHeight());
    },

    onUndoRedoStateChanged : function(undoItems, redoItems, total)
    {
        this.toolkit.onUndoRedoStateChanged(undoItems, redoItems, total);
    },

    componentHolderHeight : function()
    {
        return this.ui.ecEditor.panel.height() - (
            this.ui.ecEditor.entityLabel.height()
            + this.ui.ecEditor.buttonsHolder.height()
            + parseInt(this.ui.ecEditor.upButton.css("top"))
            + parseInt(this.ui.ecEditor.entityLabel.css("top"))
            + parseInt(this.ui.ecEditor.buttonsHolder.css("top"))
            + parseInt(this.ui.ecEditor.entityLabel.css("margin-bottom"))
            + parseInt(this.ui.ecEditor.entityLabel.css("padding-top"))
            + parseInt(this.ui.ecEditor.entityLabel.css("padding-bottom")));
    },

    setSwitchPanelsShortcut : function(shortcut)
    {
        this.switchPanelsShortcut = shortcut;
    },

    setToggleEditorShortcut : function(shortcut)
    {
        this.toggleEditorShortcut = shortcut;
    },

    onAddEntityClicked : function()
    {
        var sceneTree = $("#scene-tree-holder");
        if (isNull(sceneTree))
            return;

        var inputNewEntityId = "input-newEntityName";
        var checkboxIsLocalId = "checkbox-localEntity";
        var buttons = {
            "Add entity" : function()
            {
                var componentNames = [];
                var droppedComponents = $(this).find("div[id^='dropped-']");
                for (var i = 0; i < droppedComponents.length; i++)
                    componentNames.push($(droppedComponents[i]).data("dropData"));

                var entityName = $("#" + inputNewEntityId).val();
                var isLocal = $("#" + checkboxIsLocalId).is(":checked");
                IEditor.Instance.addEntityCommand(componentNames, entityName, !isLocal);

                $(this).dialog("close");
                $(this).remove();
            },
            "Cancel" : function()
            {
                $(this).dialog("close");
                $(this).remove();
            }
        };

        var dialog = new ModalDialog("AddEntity", "Add new entity", 550, 300);
        dialog.appendInputBox(inputNewEntityId, "Name this entity (optional)", "string");
        dialog.appendInputBox(checkboxIsLocalId, "Create local entity", "checkbox");

        var componentNames = [];
        var registeredComponents = IEditor.scene.registeredComponents();

        for (var i = 0; i < registeredComponents.length; i++)
            componentNames.push(registeredComponents[i].TypeName);

        dialog.appendDraggableList("draggableList-components", "Registered components", componentNames);
        dialog.appendDroppable("droppable-components", "Drag the components you want to be included upon creation of this entity", IEditor.scene.doesAllowSameNamedComponents());
        dialog.addButtons(buttons);
        dialog.exec();
    },

    onSTExpColClicked : function()
    {
        var sceneTree = $("#scene-tree-holder");
        if (isNull(sceneTree))
            return;

        var toggle = $(this).data("toggle");
        var newToggle = !toggle;
        sceneTree.fancytree("getRootNode").visit(function(node){
            node.setExpanded(newToggle);
        });

        $(this).data("toggle", newToggle);
    },

    onUpButtonClicked : function()
    {
        var entityId = $(this).data("targetEntity");
        if (isNull(entityId))
            return;

        var entityPtr = IEditor.scene.entityById(entityId);
        if (isNull(entityPtr))
            return;

        var parentId = entityPtr.parentId();
        if (isNull(parentId))
            return;

        var parentEntity = IEditor.scene.entityById(parentId);
        if (isNull(parentEntity))
            return;

        IEditor.Instance.selectEntity(parentEntity);
    },

    onAddComponentClicked : function()
    {
        var entityId = $(this).data("targetEntity");
        if (isNull(entityId))
            return;

        var entityPtr = IEditor.scene.entityById(entityId);
        if (isNull(entityPtr))
            return;

        var comps = [];
        var registeredComponents = IEditor.scene.registeredComponents();
        for (var i = 0; i < registeredComponents.length; i++)
            comps.push({
                name : IEditor.scene.componentNameInHumanFormat(registeredComponents[i].TypeName),
                value : registeredComponents[i].TypeId
            });

        var dialog = new ModalDialog("AddComponent", "Add new component", 450, 300);
        dialog.appendComboBox("combobox-componentList", "Select component type:   ", comps);
        dialog.appendInputBox("input-newComponentName", "Name this component (optional):", "string");
        dialog.appendInputBox("checkbox-local", "Create local component:", "checkbox");
        dialog.appendInputBox("checkbox-temporary", "Temporary:", "checkbox");

        var buttons = {
            "Add component" : function()
            {
                var inputCompName = $("#input-newComponentName");
                var compTypeName = $("#combobox-componentList").find(":selected").text();
                var compTypeId = $("#combobox-componentList").find(":selected").val();
                var compName = $("#input-newComponentName").val();
                var isLocal = $("#checkbox-local").is(":checked");
                var isTemporary = $("#checkbox-temporary").is(":checked");
                if (compTypeName === "Dynamic")
                    compTypeName = "DynamicComponent";
                compTypeName = IEditor.scene.componentNameWithPrefix(compTypeName);

                var hasComponent = entityPtr.hasComponent(compTypeName, compName);
                if (hasComponent)
                {
                    inputCompName.addClass(Utils.invalidDataName);
                    return;
                }

                IEditor.Instance.addComponentCommand(entityPtr.id, compTypeName, compName, isLocal, isTemporary);

                $(this).dialog("close");
                $(this).remove();
            },
            "Cancel" : function()
            {
                $(this).dialog("close");
                $(this).remove();
            }
        };

        dialog.addButtons(buttons);
        dialog.exec();
    },

    onEntityCreated : function(entityPtr)
    {
        var rootNode = null;
        var parent = entityPtr.parentId();
        if (isNull(parent))
            rootNode = this.ui.sceneTree.holder.fancytree("getRootNode");
        else
            rootNode = this.ui.sceneTree.holder.fancytree("getNodeByKey", "sceneNode-" + parent);

        this.createTreeItemForEntity(entityPtr, rootNode);
    },

    onEntityRemoved : function(entityPtr)
    {
        if (isNotNull(this.currentObject))
        {
            if (entityPtr.id === this.currentObject.id || entityPtr.isAncestorOf(this.currentObject))
                this.selectEntity(null);
        }

        this.removeTreeItem(entityPtr);
    },

    onEditButtonClicked : function()
    {
        var toggle = $(this).data("toggle");
        if (isNull(toggle))
            return;

        toggle = !toggle;

        $(this).data("toggle", toggle);

        var editButtonSecondIcon = toggle ? "ui-icon-unlocked" : "ui-icon-locked";
        $(this).button("option", {
            icons : {
                primary : "ui-icon-pencil",
                secondary : editButtonSecondIcon
            }
        });

        var addAttrButtons = $("button[id^='addAttrButton-']");
        for (var i = addAttrButtons.length - 1; i >= 0; i--)
            if (toggle === true)
                $(addAttrButtons[i]).show("slow");
            else
                $(addAttrButtons[i]).hide("slow");

        var removeAttrButtons = $("button[id^='removeAttrButton-']");
        for (var i = removeAttrButtons.length - 1; i >= 0; i--)
            if (toggle === true)
                $(removeAttrButtons[i]).show("slow");
            else
                $(removeAttrButtons[i]).hide("slow");

        var removeButtons = $("button[id^='removeButton-']");
        for (var i = removeButtons.length - 1; i >= 0; i--)
            if (toggle === true)
                $(removeButtons[i]).show("slow");
            else
                $(removeButtons[i]).hide("slow");

        var editButtons = $("button[id^='editButton-']");
        for (var i = editButtons.length - 1; i >= 0; i--)
            if (toggle === true)
                $(editButtons[i]).show("slow");
            else
                $(editButtons[i]).hide("slow");
    },

    onECExpColClicked : function()
    {
        var accordions = $("div[id^='accordion-']");
        if (accordions.length == 0)
            return;

        var newToggle = false;
        for (var i = 0; i < accordions.length; i++)
        {
            var isActive = $(accordions[i]).accordion("option", "active");
            if (isActive === false)
            {
                newToggle = true;
                break;
            }
        }

        for (var i = 0; i < accordions.length; i++)
            $(accordions[i]).accordion("option", "active", newToggle ? 0 : false);
    },

    toggleEditor : function()
    {
        this.enabled = !this.enabled;
        this.setEnabled(this.enabled);
    },

    setEnabled : function(enabled)
    {
        if (enabled)
        {
            this.switchPanels(false);
            this.populateScene();
            this.toolkit.show();
            this._onResizeEvent();
        }
        else
        {
            IEditor.scene.unregisterAll();

            for (var i = 0; i < this.sceneEvents.length; i++)
                IEditor.scene.unsubscribe(this.sceneEvents[i]);
            this.sceneEvents.length = 0;

            this.ui.sceneTree.holder.fancytree("destroy");
            this.ui.sceneTree.holder.empty();
            this.ui.sceneTree.panel.hide();

            this.selectEntity(null);
            this.ui.ecEditor.panel.hide();

            this.toolkit.hide();

            this.undoStack.clear();
        }

        if (isNull(this.transformEditor))
            this.initTransformEditor();
    },

    togglePanels : function()
    {
        if (this.isEditorEnabled())
            this.switchPanels(!this.isECEditor);
    },

    switchPanels : function(ecPanel)
    {
        if (ecPanel)
        {
            this.ui.ecEditor.panel.show();
            this.ui.sceneTree.panel.hide();
        }
        else
        {
            this.ui.ecEditor.panel.hide();
            this.ui.sceneTree.panel.show();
        }

        this.isECEditor = ecPanel;
        this._onResizeEvent();
        this.toolkit.onPanelsSwitch(this.isECEditor);
    },

    selectEntity : function(entityPtr, activeComponent)
    {
        if (isNotNull(this.currentObject))
            this.saveAccordionHistory();

        this.ui.ecEditor.holder.off();
        this.ui.ecEditor.holder.empty();
        this.ui.ecEditor.upButton.data("targetEntity", -1);
        this.ui.ecEditor.addCompButton.data("targetEntity", -1);

        if (isNull(entityPtr))
        {
            this.currentObject = null;
            this.ui.ecEditor.entityLabel.html(this.noSelectionStr);

            this.ui.ecEditor.upButton.hide();
            this.ui.ecEditor.buttonsHolder.hide();

            if (isNotNull(this.transformEditor))
                this.transformEditor.clearSelection();
        }
        else
        {
            this.switchPanels(true);
            if (isNotNull(this.transformEditor))
                this.transformEditor.setTargetEntity(entityPtr);

            this.currentObject = entityPtr;
            this.ui.ecEditor.upButton.data("targetEntity", entityPtr.id);
            this.ui.ecEditor.addCompButton.data("targetEntity", entityPtr.id);
            this.populateComponents(entityPtr, activeComponent);

            this.ui.ecEditor.buttonsHolder.show();
            if (isNotNull(entityPtr.parentId()))
                this.ui.ecEditor.upButton.show();
            else
                this.ui.ecEditor.upButton.hide();
        }

        this.toolkit.onEntitySelected(entityPtr);
    },

    setTransformMode : function(mode)
    {
        if (this.transformEditor)
            this.transformEditor.setMode(mode);
    },

    removeCurrent : function()
    {
        if (isNotNull(this.currentObject))
            this.removeEntityCommand(this.currentObject);
    },

    createContextMenu : function()
    {
        var menuItemHoverInCss = {
            "background-color" : "rgb(150,150,150)",
            "color" : "rgb(255,255,255)"
        };
        var menuItemHoverOutCss = {
            "background-color" : "#F2F2F2",
            "color"   : "#333333"
        };

        var self = this;
        this.ui.sceneTree.holder.contextMenu('sceneTree-contextMenu',{
            "Edit ..." :{
                click : function(element){
                    var node = $.ui.fancytree.getNode(element);
                    var target = node.key.split("-");

                    var entityId = -1;
                    var componentId = -1;
                    if (target.length >= 2)
                        entityId = parseInt(target[1]);
                    if (target.length >= 3)
                        componentId = parseInt(target[2]);

                    var entity = IEditor.scene.entityById(entityId);
                    if (isNotNull(entity))
                        self.selectEntity(entity, componentId);
                },
                klass : "sceneTree-contextMenu-itemsClass"
            },
            "Delete" : {
                click : function(element){
                    var node = $.ui.fancytree.getNode(element);
                    var target = node.key.split("-");
                    var entityId = -1;
                    var componentId = -1;
                    if (target.length >= 2)
                        entityId = parseInt(target[1]);
                    if (target.length >= 3)
                        componentId = parseInt(target[2]);

                    var entStr = IEditor.scene.entityString;
                    var compStr = IEditor.scene.componentString;
                    var entity = IEditor.scene.entityById(entityId);
                    if (isNull(entity))
                        return;
                    else
                    {
                        if (componentId !== -1)
                        {
                            var componentPtr = entity.componentById(componentId);
                            var confirmDialog = ModalDialog.confirmationDialog(
                                "RemoveComponent", 
                                "Remove " + compStr, 
                                "Are you sure that you want to remove this " + compStr + "?",
                                function(){
                                    IEditor.Instance.removeComponentCommand(componentPtr);
                                });

                            confirmDialog.exec();
                        }
                        else
                        {
                            var confirmDialog = ModalDialog.confirmationDialog(
                                "RemoveEntity", 
                                "Remove " + entStr + " with ID " + entityId, 
                                "Are you sure that you want to remove this " + entStr + "?",
                                function(){
                                    IEditor.Instance.removeEntityCommand(entity);                                    
                                });

                            confirmDialog.exec();
                        }
                    }
                },
                klass : "sceneTree-contextMenu-itemsClass"
            }
        }, 
        {
            delegateEventTo: 'span.fancytree-title',
            disable_native_context_menu : true
        });

        var contextMenu = $("#sceneTree-contextMenu");
        contextMenu.css({
            "background-color": "#F2F2F2",
            "border": "1px solid #999999",
            "list-style-type": "none",
            "margin": 10,
            "padding": 5
        });
    },

    populateScene : function()
    {
        var entities = IEditor.scene.entities();

        var sceneRootElem = $("<ul/>",{
            id : "sceneTree-rootElement"
        });
        sceneRootElem.css("text-align", "left");

        this.ui.sceneTree.holder.append(sceneRootElem);
        this.ui.sceneTree.holder.fancytree({
            icons : false
        });

        var rootNode = this.ui.sceneTree.holder.fancytree("getRootNode");
        for (var i = 0; i < entities.length; i++)
        {
            var entity = entities[i];
            this.createTreeItemForEntity(entity, rootNode);
        };

        this.sceneEvents.push(IEditor.scene.entityCreated(this, this.onEntityCreated));
        this.sceneEvents.push(IEditor.scene.entityRemoved(this, this.onEntityRemoved));
        this.sceneEvents.push(IEditor.scene.componentCreated(this, this.onComponentCreated));
        this.sceneEvents.push(IEditor.scene.componentRemoved(this, this.onComponentRemoved));
        this.sceneEvents.push(IEditor.scene.attributeChanged(this, this.onAllAttributeChanges));
    },

    saveAccordionHistory : function()
    {
        var previousHistory = this.accordionHistory[this.currentObject.id];
        if (isNotNull(previousHistory))
            previousHistory.length = 0;

        var history = this.accordionHistory[this.currentObject.id];
        history = [];

        var atLeastOneActive = false;
        var accordions = $("div[id^='accordion-']");
        for (var i = 0; i < accordions.length; i++)
        {
            var targetCompId = $(accordions[i]).data("targetComponent");
            var isActive = $(accordions[i]).accordion("option", "active") === false ? false : true;
            if (isActive)
                history.push($(accordions[i]).data("targetComponent"));
        }

        if (history.length !== 0)
            this.accordionHistory[this.currentObject.id] = history;
    },

    getAccordionHistory : function(entityId)
    {
        return (isNull(this.accordionHistory[entityId]) ? [] : this.accordionHistory[entityId]);
    },

    createTreeItemForEntity : function(entityPtr, parentNode)
    {
        var childNode = parentNode.addChildren({
            title : this.getNodeTitleForEntity(entityPtr),
            key : "sceneNode-" + entityPtr.id
        });

        var components = entityPtr.components();
        for (var i = 0; i < components.length; i++)
            this.createTreeItemForComponent(components[i], childNode);
    },

    createTreeItemForComponent : function(componentPtr, parentNode)
    {
        if (isNull(parentNode))
            return;

        var fullName = this.getNodeTitleForComponent(componentPtr);
        var childNode = parentNode.addChildren({
            title : fullName,
            key : "sceneNode-" + componentPtr.parentId() + "-" + componentPtr.id
        });
    },

    removeTreeItem : function(entityPtr, componentPtr)
    {
        var node = null;
        if (isNull(componentPtr))
            node = this.ui.sceneTree.holder.fancytree("getNodeByKey", "sceneNode-" + entityPtr.id);
        else
            node = this.ui.sceneTree.holder.fancytree("getNodeByKey", "sceneNode-" + entityPtr.id + "-" + componentPtr.id);

        if (isNotNull(node))
            node.remove();
    },

    getNodeTitleForEntity : function(entityPtr, setUnnamed)
    {
        if (isNull(setUnnamed))
            setUnnamed = false;

        var type = entityPtr.typeName;
        if (isNull(type))
            type = "";

        var entityName = "<i>unnamed " + type + "</i>";
        var name = entityPtr.getName();
        if (name !== "" && !setUnnamed)
            entityName = name;

        return ("(" + entityPtr.id + ") " + entityName);
    },

    getNodeTitleForComponent : function(componentPtr)
    {
        var componentName = (componentPtr.name.length > 0 ? " (" + componentPtr.name + ")" : "");
        var componentTypeName = IEditor.scene.componentNameInHumanFormat(componentPtr.typeName);

        return (componentTypeName + componentName);
    },

    getNodeTitleForElement : function(elementPtr)
    {
        var elementName = (elementPtr.getName().length > 0 ? " (" + elementPtr.getName() + ")" : "");
        var elementType = IEditor.scene.componentNameInHumanFormat(elementPtr.typeName);

        return ("[" + elementPtr.id + "] " + elementType + elementName);
    },

    renameEntityNode : function(entityPtr, setUnnamed)
    {
        var treeItem = this.ui.sceneTree.holder.fancytree("getNodeByKey", "sceneNode-" + entityPtr.id);
        if (isNull(treeItem))
            return;

        treeItem.setTitle(this.getNodeTitleForEntity(entityPtr, setUnnamed));
    },

    renameComponentNode : function(componentPtr)
    {
        var treeItem = this.ui.sceneTree.holder.fancytree("getNodeByKey", "sceneNode-" + componentPtr.parentId() + "-" + componentPtr.id);
        if (isNull(treeItem))
            return;

        treeItem.setTitle(this.getNodeTitleForComponent(componentPtr));
    },

    onComponentCreated : function(entityPtr, componentPtr)
    {
        if (!this.isEditorEnabled())
            return;

        if (isNotNull(this.currentObject) && (entityPtr.id === this.currentObject.id))
            this.appendAccordionForComponent(componentPtr);

        var treeNode = this.ui.sceneTree.holder.fancytree("getNodeByKey", "sceneNode-" + entityPtr.id);
        this.createTreeItemForComponent(componentPtr, treeNode);
    },

    onComponentRemoved : function(entityPtr, componentPtr)
    {
        if (!this.isEditorEnabled())
            return;

        if (isNotNull(this.currentObject) && (entityPtr.id === this.currentObject.id))
            if (componentPtr.typeName === "Name")
                this.ui.ecEditor.entityLabel.html(this.getNodeTitleForEntity(entityPtr, true));

        var accordionId = "#accordion-" + entityPtr.id + "-" + componentPtr.id;
        $(accordionId).hide("fast", function()
        {
            $(accordionId).remove();
        });

        if (componentPtr.typeName === "Name")
            this.renameEntityNode(entityPtr, true);

        this.removeTreeItem(entityPtr, componentPtr);
    },

    onAllAttributeChanges : function(entityPtr, componentPtr, attributeIndex, attributeName, attributeValue)
    {
        if (!this.isEditorEnabled())
            return;

        if (isNotNull(this.currentObject))
        {
            if (entityPtr.id === this.currentObject.id || componentPtr.id === this.currentObject.id)
            {
                this.onAttributesChanged(entityPtr, componentPtr, attributeIndex, attributeName, attributeValue);
                if (componentPtr.typeName === "Name" && attributeName === "name")
                    this.ui.ecEditor.entityLabel.html(this.getNodeTitleForEntity(entityPtr));
            }
        }

        if (componentPtr.typeName === "Name" && attributeName === "name")
            this.renameEntityNode(entityPtr);
    },

    populateComponents : function(entityPtr, activeComponent)
    {
        this.ui.ecEditor.entityLabel.html(this.getNodeTitleForEntity(entityPtr));

        for (var i = this.componentEvents.length - 1; i >= 0; i--)
            IEditor.scene.unsubscribe(this.componentEvents[i]);
        this.componentEvents.length = 0;

        var components = entityPtr.components();
        if (isNotNull(entityPtr.attributes))
            this.appendAccordionForComponent(entityPtr, true, false);

        var accordionHistory = this.getAccordionHistory(entityPtr.id);
        for (var i = 0; i < components.length; ++i)
        {
            var compId = parseInt(components[i].id);
            var compHistoryIndex = accordionHistory.indexOf(compId);
            var activateComp = ((compId === activeComponent) || compHistoryIndex !== -1);
            this.appendAccordionForComponent(components[i], activateComp);
        }

        var allowedComps = IEditor.scene.registeredComponents(entityPtr.typeName);
        if (allowedComps.length === 0)
        {
            this.ui.ecEditor.editCompButton.button("disable");
            this.ui.ecEditor.addCompButton.button("disable");
        }
        else
        {
            this.ui.ecEditor.editCompButton.button("enable");
            this.ui.ecEditor.addCompButton.button("enable");
        }

        this.ui.ecEditor.holder.on("change", "input", this.onAttributesEdit);
        this.ui.ecEditor.holder.on("keydown", "input", function(e) { e.stopPropagation(); });
        this.ui.ecEditor.holder.on("change", "select", this.onAttributesEdit);

        // this.ui.ecEditor.holder.sortable();
    },

    appendAccordionForComponent : function(componentPtr, setActive, canBeRemoved)
    {
        if (isNull(componentPtr))
            return;
        if (isNull(setActive))
            setActive = false;
        if (isNull(canBeRemoved))
            canBeRemoved = true;

        var entAndCompSuffix = componentPtr.parentId() + "-" + componentPtr.id;
        var accordionId = "accordion-" + entAndCompSuffix;
        var accordion = $("<div/>", {
            id : accordionId
        });
        accordion.data("targetComponent", componentPtr.id);

        var contentHolder = $("<div/>");
        var header = $("<div class='h3'/>");

        var addAttrButtonId = "addAttrButton-" + entAndCompSuffix;
        var addAttrButton = $("<button/>", {
            id : addAttrButtonId,
            title : "Add an attribute to this component"
        });
        addAttrButton.data("parentAccordion", accordionId);
        addAttrButton.css("float", "right");
        addAttrButton.button({
            icons : {
                primary : "ui-icon-plusthick"
            },
            text : false
        });

        var removeButtonId = "removeButton-" + entAndCompSuffix;
        var removeButton = $("<button/>", {
            id : removeButtonId,
            title : "Remove this " + IEditor.scene.componentString
        });
        removeButton.data("parentAccordion", accordionId);
        removeButton.css("float", "right");
        removeButton.button({
            icons : {
                primary : "ui-icon-closethick"
            },
            text : false
        });

        var editButton = null;
        if (IEditor.Instance.type === "xml3d")
        {
            var editButtonId = "editButton-" + componentPtr.id;
            editButton = $("<button/>", {
                id : editButtonId,
                title : "Edit this element"
            });
            editButton.data("parentAccordion", accordionId);
            editButton.css("float", "right");
            editButton.button({
                icons : {
                    primary : "ui-icon-pencil"
                },
                text : false
            });
        }

        var editButtonsVisible = this.ui.ecEditor.editCompButton.data("toggle");
        if (!editButtonsVisible)
        {
            addAttrButton.hide();
            removeButton.hide();
            if (isNotNull(editButton))
                editButton.hide();
        }

        var compNameNoEC = IEditor.scene.componentNameInHumanFormat(componentPtr.typeName);
        header.html(compNameNoEC + (componentPtr.getName() === "" ? "" : " (" + componentPtr.getName() + ")"));

        var content = $("<div/>").css(
        {
            "padding" : "0px 0px 0px 10px"
        });

        var attributes = componentPtr.attributes();

        if (attributes.length != 0)
        {
            var table = $("<table/>", {
                id : "table-" + entAndCompSuffix
            });

            table.data("componentData", {
                parentCompId : componentPtr.id,
                parentEntityId : componentPtr.parentId()
            });

            for (var attr = 0; attr < attributes.length; attr++)
            {
                var tableRow = this.createRowsForAttribute(componentPtr.parentId(), componentPtr.id, attributes[attr].name, attributes[attr]);
                if (tableRow != null)
                    table.append(tableRow);
            }

            content.append(table);
        }
        // else
        //     content.html($("<em/>").html("Nothing to edit for this component"));

        if (componentPtr.isDynamic())
        {
            this.componentEvents.push(componentPtr.onAttributeAdded(this, this.onAttributeCreate));
            this.componentEvents.push(componentPtr.onAttributeAboutToBeRemoved(this, this.onAttributeRemove));
        }

        if (canBeRemoved)
        {
            header.append(removeButton);
            if (isNotNull(editButton))
                header.append(editButton);
        }
        if (componentPtr.isDynamic())
            header.append(addAttrButton);

        contentHolder.append(header);
        contentHolder.append(content);

        accordion.append(contentHolder);

        this.ui.ecEditor.holder.append(accordion);
        accordion.accordion({
            header : "> div > .h3",
            collapsible : true,
            heightStyle : "content",
            active : (setActive ? 0 : false)
        });
        accordion.addClass("accStripe");
        addAttrButton.tooltip({
            track : true
        });
        removeButton.tooltip({
            track : true
        });
        if (isNotNull(editButton))
            editButton.tooltip({
                track : true
            });

        addAttrButton.click(function(event)
        {
            event.stopPropagation();
            event.preventDefault();

            var attrs = new Array();
            var dialog = new ModalDialog("addAttribute", "Add new attribute", 450, 250);
            var attributeIds = IEditor.scene.attributeTypeIds();
            for (var i = 0; i < attributeIds.length; i++)
                attrs.push({
                    name : IEditor.scene.attributeTypeToName(attributeIds[i]),
                    value : attributeIds[i]
                });

            dialog.appendComboBox("combobox-attributeList", "Select attribute type:", attrs);
            dialog.appendInputBox("input-attributeName", "Attribute name:", "string");
            var buttons = {
                "Add attribute" : function()
                {
                    var attrTypeElem = $("#combobox-attributeList");
                    var attrNameElem = $("#input-attributeName");

                    var attrTypeName = attrTypeElem.find(":selected").text();
                    var attrTypeId = parseInt(attrTypeElem.find(":selected").val());
                    var attrName = attrNameElem.val();

                    if (isNull(attrName) || attrName === "")
                    {
                        attrNameElem.addClass(Utils.invalidDataName);
                        return;
                    }

                    if (componentPtr.isDynamic())
                    {
                        if (!IEditor.Instance.addAttributeCommand(componentPtr, attrTypeId, attrName))
                        {
                            attrNameElem.addClass(Utils.invalidDataName);
                            return;
                        }
                    }
                    $(this).dialog("close");
                    $(this).remove();
                },
                "Cancel" : function()
                {
                    $(this).dialog("close");
                    $(this).remove();
                }
            }

            dialog.addButtons(buttons);
            dialog.exec();

        });

        removeButton.click( function(event)
        {
            event.stopPropagation();
            event.preventDefault();

            var accordionId = $(this).data("parentAccordion");
            if (isNotNull(accordionId))
            {
                var entityId = parseInt(accordionId.split("-")[1]);
                var componentId = parseInt(accordionId.split("-")[2]);
                var entityPtr = IEditor.scene.entityById(entityId);
                if (isNotNull(entityPtr))
                {
                    var componentPtr = entityPtr.componentById(componentId);
                    var compStr = IEditor.scene.componentString;
                    var confirmDialog = ModalDialog.confirmationDialog(
                        "RemoveComponent", 
                        "Remove " + compStr,
                        "Are you sure that you want to remove this " + compStr + "?",
                        function()
                        {
                            IEditor.Instance.removeComponentCommand(componentPtr);
                        }
                    );

                    confirmDialog.exec();
                    
                }
            }
        });

        if (isNotNull(editButton))
            editButton.click( function(event)
            {
                event.stopPropagation();
                event.preventDefault();

                var elementId = parseInt($(this).attr("id").split("-")[1]);
                var entityPtr = IEditor.scene.entityById(elementId);
                if (isNotNull(entityPtr))
                    IEditor.Instance.selectEntity(entityPtr);
            });
    },

    createRowsForAttribute : function (entityId, componentId, attrName, attributePtr)
    {
        var element = null;
        var attributeValue = attributePtr.get();

        if (isNull(entityId))
            entityId = componentId;

        var attributeTypeId = attributePtr.typeId;
        var isDynamic = attributePtr.owner.isDynamic();
        var jsType = typeof(attributeValue);
        var inputType = (jsType === "boolean" ? "checkbox" : "input");
        var idOfElements = entityId + "-" + componentId + "-" + attrName;

        var tableBody = $("<tbody/>", {
            id : "tableBody-" + idOfElements
        });

        var tableRow = $("<tr/>").css(Utils.attributeTableRowStyle);
        var removeAttrColumn = $("<td/>");
        removeAttrColumn.css("minWidth", "1px");

        var removeAttrButton = $("<button/>", {
            id : "removeAttrButton-" + idOfElements
        });
        removeAttrButton.css("float", "left");
        removeAttrButton.button({
            icons : {
                primary : "ui-icon-closethick"
            },
            text : false
        });

        var editButtonsVisible = this.ui.ecEditor.editCompButton.data("toggle");
        if (!editButtonsVisible)
            removeAttrButton.hide();

        removeAttrButton.click( function()
        {
            var confirmDialog = ModalDialog.confirmationDialog(
                "RemoveAttribute",
                "Remove attribute named " + attributePtr.name,
                "Are you sure you want to remove this attribute?",
                function(){
                    var compPtr = attributePtr.owner;
                    if (isNotNull(compPtr))
                        IEditor.Instance.removeAttributeCommand(attributePtr);
                }
            );

            confirmDialog.exec();
        })

        var attrNameColumn = $("<td/>").css(Utils.attributeTableColumnStyle);
        if (!isDynamic)
            attrNameColumn.attr("colspan", 2);

        var elementColumn = $("<td/>").css(Utils.attributeTableColumnStyle);
        attrNameColumn.html($("<strong/>").html(attrName));

        if (IEditor.scene.isAttributeAtomic(attributeTypeId))
        {
            element = $("<input/>", {
                id : idOfElements,
                type : inputType,
                value : attributeValue,
                checked : attributeValue
            });

            element.data("attrData", {
                name : attrName,
                type : jsType,
                typeId : attributeTypeId,
                parentCompId : componentId,
                parentEntityId : entityId,
            });
        }

        if (element != null)
            elementColumn.append(element);
        if (isDynamic)
        {
            removeAttrColumn.append(removeAttrButton);
            tableRow.append(removeAttrColumn);
        }

        tableRow.append(attrNameColumn);
        tableRow.append(elementColumn);
        tableBody.append(tableRow);

        // Fill complex elements (Transform, Vector2, Vector3 etc.)
        if (IEditor.scene.isAttributeTransform(attributeTypeId))
        {
            var labels = ["position x", "y", "z", "rotation x", "y", "z", "scale x", "y", "z"];
            var comps = ["x", "y", "z"];
            for (var i = 0; i < 9; i++)
            {
                // pos for i = 0..2, rot for i = 3..5, scale for i = 6..8
                var varName = (i < 3 ? "pos" : (i < 6) ? "rot" : "scale");
                // x for i = 0, 3, 6 | y for i = 1, 4, 7 | z for i = 2, 5, 8
                var xyz = comps[((i >= 3  && i < 6) ? i - 3 : (i >= 6 ? i - 6 : i))];

                var transformRow = $("<tr/>").css(Utils.attributeTableRowStyle);
                var transformAttrCol = $("<td colspan='2'/>").css(Utils.attributeTableColumnStyle);
                var transformElemCol = $("<td/>").css(Utils.attributeTableColumnStyle);

                transformAttrCol.html(labels[i]);
                var inputElem = $("<input/>", {
                    id : idOfElements + "-" + varName + "-" + xyz,
                    type : "number",
                    step : "1",
                    value : attributeValue[varName][xyz]
                });

                if (i >= 6)
                    inputElem.attr("min", 0.0);

                inputElem.data("attrData", {
                    name : attrName,
                    type : jsType,
                    typeId : attributeTypeId,
                    parentCompId : componentId,
                    parentEntityId : entityId,
                    transformComp : varName,
                    axis : xyz
                })

                transformElemCol.append(inputElem);
                transformRow.append(transformAttrCol);
                transformRow.append(transformElemCol);
                tableBody.append(transformRow);
            }
        }
        else if (IEditor.scene.isAttributeTuple(attributeTypeId))
        {
            var labels = new Array();
            if (!IEditor.scene.isAttributeColor(attributeTypeId))
                labels = ["x", "y", "z", "w"];
            else
                labels = ["r", "g", "b", "a"];

            var vec2or3or4orQuat = IEditor.scene.isAttributeTuple(attributeTypeId);

            for (var i = 0; i < vec2or3or4orQuat; i++)
            {
                var vecRow = $("<tr/>").css(Utils.attributeTableRowStyle);
                var vecAttr = $("<td colspan='2'/>").css(Utils.attributeTableColumnStyle);
                var vecElem = $("<td/>").css(Utils.attributeTableColumnStyle);

                vecAttr.html(labels[i]);
                var inputElem = $("<input/>", {
                    id : idOfElements + "-" + labels[i],
                    type : "number",
                    step : "1",
                    value : attributeValue[labels[i]]
                });

                inputElem.data("attrData",{
                    name : attrName,
                    type : jsType,
                    typeId : attributeTypeId,
                    parentCompId : componentId,
                    parentEntityId : entityId,
                    axis : labels[i]
                });

                vecElem.append(inputElem);
                vecRow.append(vecAttr);
                vecRow.append(vecElem);
                tableBody.append(vecRow);
            }
        }
        else if (IEditor.scene.isAttributeArray(attributeTypeId))
        {
            for (var i = 0; i <= attributeValue.length; i++)
            {
                var arrayRow = this.createArrayRow(attributePtr, attributeValue, i);
                tableBody.append(arrayRow);
            }

            tableBody.data("arrayLength", attributeValue.length);
        }
        else if (IEditor.scene.isAttributeEnum(attributeTypeId))
        {
            var values = attributePtr.validValues();
            if (isNotNull(values))
            {
                var selectElement = $("<select/>", {
                    id : idOfElements
                });
                selectElement.data("attrData", {
                    name : attrName,
                    type : jsType,
                    typeId : attributeTypeId,
                    parentCompId : componentId,
                    parentEntityId : entityId,
                });

                for (var i = 0; i < values.length; i++)
                {
                    var option = $("<option/>", {
                        value : values[i]
                    });

                    option.html(values[i]);
                    selectElement.append(option);
                }

                selectElement.appendTo(elementColumn);
            }
        }

        return tableBody;
    },

    createArrayRow : function(attributePtr, attributeValue, arrayIndex)
    {
        var entityId = attributePtr.owner.parentId();
        var componentId = attributePtr.owner.id;
        var idOfElement = entityId + "-" + componentId + "-" + attributePtr.name + "-" + arrayIndex;

        var arrayRow = $("<tr/>", {
            id : "attributeRow-" + idOfElement
        });
        arrayRow.css(Utils.attributeTableRowStyle);
        var arrayLabel = $("<td colspan='2'/>").css(Utils.attributeTableColumnStyle);
        var arrayElem = $("<td/>").css(Utils.attributeTableColumnStyle);

        var attrName = attributePtr.name;
        var attrValue = attributeValue[arrayIndex];
        var attributeTypeId = attributePtr.typeId;
        var jsType = typeof(attributeValue);

        arrayLabel.html("[" + arrayIndex + "]");
        var inputElem = $("<input/>", {
            id : idOfElement,
            type : "input",
            value : (isNull(attrValue) ? "" : attrValue)
        });

        inputElem.data("attrData", {
            name : attrName,
            type : jsType,
            typeId : attributeTypeId,
            parentCompId : componentId,
            parentEntityId : entityId,
            index : arrayIndex
        })

        arrayElem.append(inputElem);
        arrayRow.append(arrayLabel);
        arrayRow.append(arrayElem);

        return arrayRow;
    },

    onAttributesEdit : function()
    {
        var data = $(this).data("attrData");
        var value = $(this).val();
        var finalValue = null;

        var name = data.name;
        var type = data.type;
        var typeId = data.typeId;
        var entId = data.parentEntityId;
        var compId = data.parentCompId;

        var entity = IEditor.scene.entityById(entId);
        if (isNull(entity))
            return;

        var component = entity.componentById(compId);
        if (isNull(component))
            return;

        var attribute = component.attributeByName(name);
        if (isNull(attribute))
            return;

        if (IEditor.scene.isAttributeAtomic(typeId) || IEditor.scene.isAttributeEnum(typeId))
        {
            if (type === "boolean")
                finalValue = $(this).is(":checked");
            else if (type === "number")
            {
                if (isNaN(value))
                {
                    $(this).addClass(Utils.invalidDataName);
                    return;
                }
                else
                {
                    $(this).removeClass(Utils.invalidDataName);
                    finalValue = parseFloat(value);
                }
            }
            else
                finalValue = value;
        }
        else if (IEditor.scene.isAttributeTransform(typeId))
        {
            var transformComp = data.transformComp;
            if (transformComp === "scale" && parseFloat($(this).val()) < 0.0)
            {
                $(this).addClass(Utils.invalidDataName);
                return;
            }
            else
                $(this).removeClass(Utils.invalidDataName);

            var axis = data.axis;
            var clone = attribute.get();
            clone[transformComp][axis] = parseFloat($(this).val());
            finalValue = clone;
        }
        else if (IEditor.scene.isAttributeTuple(typeId))
        {
            var axis = data.axis;
            var clone = attribute.get();
            clone[axis] = parseFloat($(this).val());
            finalValue = clone;
        }
        else if (IEditor.scene.isAttributeArray(typeId))
        {
            var index = data.index;
            var clone = attribute.get();
            clone[index] = $(this).val();
            finalValue = clone;
        }
        else
            IEditor.scene.logError("[Editor]: Current type is not implemented yet! Type requested was: " + IEditor.scene.attributeTypeToName(typeId));

        IEditor.Instance.changeAttributeCommand(attribute, finalValue);
    },

    onAttributeCreate : function(componentPtr, attributePtr)
    {
        var suffix = componentPtr.parentId() + "-" + componentPtr.id;
        var targetAccordion = $("#accordion-" + suffix);

        var targetTable = $("#table-" + suffix);
        var tableBody = this.createRowsForAttribute(componentPtr.parentId(), componentPtr.id, attributePtr.name, attributePtr);
        tableBody.appendTo(targetTable);

        targetAccordion.accordion("refresh");
    },

    onAttributeRemove : function(componentPtr, attributeIndex, attributeName)
    {
        var suffixAccordion = componentPtr.parentId() + "-" + componentPtr.id;
        var suffix = suffixAccordion + "-" + attributeName;
        var targetBody = $("#tableBody-" + suffix);
        targetBody.hide("fast", function()
            {
                targetBody.remove();
                var accordionId = "#accordion-" + suffixAccordion;
                $(accordionId).accordion("refresh");
            }
        );
    },

    onAttributesChanged : function(entity, component, attributeIndex, attributeName, attributeValue)
    {
        if (!this.isEditorEnabled())
            return;

        var attributePtr = component.attributeByName(attributeName);
        var typeId = attributePtr.typeId;
        var elementName = entity.id + "-" + component.id + "-" + attributeName;
        if (isNull(elementName))
            return;

        if (IEditor.scene.isAttributeAtomic(typeId) || IEditor.scene.isAttributeEnum(typeId))
        {
            if (IEditor.scene.isAttributeBool(typeId))
            {
                var value = attributeValue;
                if (typeof(value) === "string")
                    value = (value === "true" ? true : false);

                $("#" + elementName).prop('checked', value);
            }

            $("#" + elementName).val(attributeValue);
        }
        else if (IEditor.scene.isAttributeTransform(typeId))
        {
            // WebRocket specific 'Transform' attribute
            var xyz = ["x", "y", "z"];
            for (var i = 0; i < 9; i++)
            {
                // pos for i = 0..2, rot for i = 3..5, scale for i = 6..8
                var transformComp = (i < 3 ? "pos" : (i < 6) ? "rot" : "scale");
                 // x for i = 0, 3, 6 | y for i = 1, 4, 7 | z for i = 2, 5, 8
                var tuple = xyz[((i >= 3  && i < 6) ? i - 3 : (i >= 6 ? i - 6 : i))];

                var extElementName = elementName + "-" + transformComp + "-" + tuple;
                $("#" + extElementName).val(attributeValue[transformComp][tuple]);

                if (i >= 6)
                    $("#" + extElementName).removeClass(Utils.invalidDataName);
            }
        }
        else if (IEditor.scene.isAttributeTuple(typeId))
        {
            var xyzw = [];
            if (!IEditor.scene.isAttributeColor(typeId))
                xyzw = ["x", "y", "z", "w"];
            else
                xyzw = ["r", "g", "b", "a"];

            if (typeof(attributeValue) === "string")
            {
                var attrValue = attributeValue.split(" ");
                for (var i = 0; i < attrValue.length; i++)
                {
                    var value = attrValue[i];
                    var extElementName = elementName + "-" + xyzw[i];
                    $("#" + extElementName).val(value);
                }
            }
            else
                for (var i = 0; i < xyzw.length; i++)
                {
                    var value = attributeValue[xyzw[i]];
                    if (isNull(value))
                        return;

                    var extElementName = elementName + "-" + xyzw[i];
                    $("#" + extElementName).val(value);
                }
        }
        else if (IEditor.scene.isAttributeArray(typeId))
        {
            var arrayTableBody = $("tbody#tableBody-" + elementName);
            if (arrayTableBody.length <= 0)
                return;

            var arrayLength = attributeValue.length;
            for (var i = 0; i < arrayLength; i++)
            {
                var extElementName = elementName + "-" + i;
                var element = $("input#" + extElementName);
                // if there is a new item in AssetReferenceList, add new row for it
                if (element.length <= 0)
                {
                    var newArrayElement = this.createArrayRow(attributePtr, attributeValue, i);
                    arrayTableBody.append(newArrayElement);
                }

                element.val(attributeValue[i]);
            }

            var previousLength = arrayTableBody.data("arrayLength");
            var difference = previousLength - arrayLength;

            // Remove extra attribute elements
            if (previousLength > arrayLength)
            {
                for (var i = previousLength; i >= arrayLength; i--)
                {
                    var extElementName = elementName + "-" + i;
                    var elementToBeRemoved = $("tr#attributeRow-" + extElementName);
                    if (elementToBeRemoved.length > 0)
                        elementToBeRemoved.remove()
                }
            }

            // Add an empty one for entering any subsequent asset refs
            if (difference != 0)
            {
                var emptyArrayElement = this.createArrayRow(attributePtr, attributeValue, arrayLength);
                arrayTableBody.append(emptyArrayElement);
            }

            arrayTableBody.data("arrayLength", arrayLength);
        }
    }
});

var ICommand = Class.$extend(
{
    __init__ : function(commandString)
    {
        this.commandId = -1;
        this.commandString = commandString;
    },

    exec : function() {},
    undo : function() {}
});

var UndoRedoManager = Class.$extend(
{
    __init__ : function(numberOfItems)
    {
        this._numberOfItems = 50;
        this._index = -1;

        if (isNotNull(numberOfItems))
            this._numberOfItems = numberOfItems;

        this.stateChangedCallbacks = [];

        this._undoHistory = [];
        this._redoHistory = [];
    },

    canUndo : function()
    {
        return (this._undoHistory.length !== 0);
    },

    canRedo : function()
    {
        return (this._redoHistory.length !== 0);
    },

    undoHistory : function()
    {
        var result = [];
        if (!this.canUndo())
            return result;

        for (var i = this._undoHistory.length - 1; i >= 0; i--)
            result.push({
                id : i,
                commandString : this._undoHistory[i].commandString
            });

        return result;
    },

    redoHistory : function()
    {
        var result = [];
        if (!this.canRedo())
            return result;

        var total = this._undoHistory.length + this._redoHistory.length;
        for (var i = this._redoHistory.length - 1; i >= 0; i--)
        {
            result.push({
                id : (total - i - 1),
                commandString : this._redoHistory[i].commandString
            });
        }

        return result;
    },

    stateChanged : function(context, callback)
    {
        this.stateChangedCallbacks.push({
            "context" : context,
            "callback" : callback
        });
    },

    _onStateChanged : function()
    {
        this._index = this._undoHistory.length - 1;

        var undoHistory = this.undoHistory();
        var redoHistory = this.redoHistory();

        for (var i = 0; i < this.stateChangedCallbacks.length; i++)
        {
            var context = this.stateChangedCallbacks[i].context;
            var callback = this.stateChangedCallbacks[i].callback;

            callback.call(context, undoHistory, redoHistory, undoHistory.length + redoHistory.length);
        }
    },

    pushCommand : function(command)
    {
        this._redoHistory.length = 0;

        if (this._undoHistory.length === this._numberOfItems)
            this._undoHistory.shift();

        this._undoHistory.push(command);
        this._onStateChanged();
    },

    pushAndExec : function(command)
    {
        this.pushCommand(command);
        command.exec();
    },

    undo : function(disconnected)
    {
        if (!this.canUndo())
            return;

        if (isNull(disconnected))
            disconnected = false;

        var command = this._undoHistory.pop();
        command.undo();
        this._redoHistory.push(command);

        if (!disconnected)
            this._onStateChanged();
    },

    redo : function(disconnected)
    {
        if (!this.canRedo())
            return;

        if (isNull(disconnected))
            disconnected = false;

        var command = this._redoHistory.pop();
        command.exec();
        this._undoHistory.push(command);

        if (!disconnected)
            this._onStateChanged();
    },

    goToState : function(commandId)
    {
        if (commandId < 0)
            return;

        var undoOrRedo = (this._index - commandId) >= 0;
        var times = Math.abs(this._index - commandId);

        if (undoOrRedo)
            ++times;

        for (var i = 0; i < times; i++)
        {
            if (undoOrRedo)
                this.undo(true);
            else
                this.redo(true);
        }

        this._onStateChanged();
    },

    clear : function()
    {
        this._undoHistory.length = 0;
        this._redoHistory.length = 0;

        this._onStateChanged();
    }
});

var ToolkitManager = Class.$extend(
{
    __init__ : function()
    {
        this.toolbar = null;
        this.undoMenu = null;
        this.redoMenu = null;
        this.ui = {};
    },

    initUi : function(gizmoAvailable)
    {
        this.ui.undoButton = $("<button/>", {
            id : "_toolkit-undoButton",
            title : "Undo"
        });
        this.ui.undoButton.css({
            "width" : "40px",
            "height" : "22px"
        });
        this.ui.undoButton.button({
            text : false,
            icons : {
                primary : "ui-icon-arrowreturnthick-1-w"
            }
        })

        this.ui.undoArrowButton = $("<button/>");
        this.ui.undoArrowButton.css({
            "width" : "14px",
            "height" : "22px"
        });
        this.ui.undoArrowButton.button({
            text : false,
            icons : {
                primary : "ui-icon-triangle-1-s"
            }
        });

        this.ui.undoButtonSet = $("<div/>", {
            id : "_toolkit-undoButtonSet"
        });

        this.ui.undoButtonSet.css({
            "display" : "inline-block",
            "margin" : "4px"
        });

        this.ui.undoButtonSet.append(this.ui.undoButton);
        this.ui.undoButtonSet.append(this.ui.undoArrowButton);
        this.ui.undoButtonSet.buttonset();
        this.ui.undoButtonSet.buttonset("option", "disabled", true);

        this.ui.redoButton = $("<button/>", {
            id : "_toolkit-redoButton",
            title : "Redo"
        });
        this.ui.redoButton.css({
            "width" : "40px",
            "height" : "22px"
        });
        this.ui.redoButton.button({
            text : false,
            icons : {
                primary : "ui-icon-arrowreturnthick-1-e"
            }
        })

        this.ui.redoArrowButton = $("<button/>");
        this.ui.redoArrowButton.css({
            "width" : "14px",
            "height" : "22px"
        });
        this.ui.redoArrowButton.button({
            text : false,
            icons : {
                primary : "ui-icon-triangle-1-s"
            }
        });

        this.ui.redoButtonSet = $("<div/>", {
            id : "_toolkit-redoButtonSet"
        });
        this.ui.redoButtonSet.css({
            "display" : "inline-block",
            "margin" : "4px"
        });

        this.ui.redoButtonSet.append(this.ui.redoButton);
        this.ui.redoButtonSet.append(this.ui.redoArrowButton);
        this.ui.redoButtonSet.buttonset();
        this.ui.redoButtonSet.buttonset("option", "disabled", true);

        this.ui.undoMenu = $("<ul/>",{
            id : "_toolkit-undoMenu"
        });
        this.ui.undoMenu.css({
            "font-size" : "10px",
            "width" : "150px",
            "padding" : "5px",
            "z-index" : 5
        });

        $("body").append(this.ui.undoMenu);

        this.ui.redoMenu = $("<ul/>", {
            id : "_toolkit-redoMenu"
        });
        this.ui.redoMenu.css({
            "font-size" : "10px",
            "width" : "150px",
            "padding" : "5px",
            "z-index" : 5
        });

        $("body").append(this.ui.redoMenu);

        this.ui.saveButton = $("<button/>", {
            id : "_toolkit-saveButton",
            title : "Save"
        });
        this.ui.saveButton.css({
            "width" : "40px",
            "height" : "22px"
        });
        this.ui.saveButton.button({
            text : false,
            icons : {
                primary : "ui-icon-disk"
            }
        });

        this.ui.quickAddButton = $("<button/>");
        this.ui.quickAddButton.text("Add...");
        this.ui.quickAddButton.css({
            "font-size" : "10px",
            "width" : "80px",
            "height" : "22px"
        });
        this.ui.quickAddButton.button({
            icons : {
                primary : "ui-icon-circle-plus",
                secondary : "ui-icon-triangle-1-s"
            }
        });

        this.ui.quickAddMenu = $("<ul/>", {
            id : "_toolkit-quickAddMenu"
        });
        this.ui.quickAddMenu.css({
            "font-size" : "10px",
            "width" : "150px",
            "padding" : "5px",
            "z-index" : 5
        });

        $("body").append(this.ui.quickAddMenu);

        this.ui.createButton = $("<button/>");
        this.ui.createButton.text("Create");
        this.ui.createButton.css({
            "font-size" : "10px",
            "width" : "80px",
            "height" : "22px"
        });
        this.ui.createButton.button({
            icons : {
                primary : "ui-icon-circle-plus",
                secondary : "ui-icon-triangle-1-s"
            }
        });

        this.ui.createMenu = $("<ul/>", {
            id : "_toolkit-createMenu"
        });
        this.ui.createMenu.css({
            "font-size" : "10px",
            "width" : "150px",
            "padding" : "5px",
            "z-index" : 5
        });

        $("body").append(this.ui.createMenu);

        this.ui.deleteButton = $("<button/>");
        this.ui.deleteButton.css({
            "width" : "40px",
            "height" : "22px"
        });
        this.ui.deleteButton.button({
            text : false,
            icons : {
                primary : "ui-icon-trash"
            }
        });
        this.ui.deleteButton.button("option", "disabled", true);

        if (IEditor.Instance.type === "rocket")
        {
            this.ui.gridButton = $("<input/>", {
                type : "checkbox",
                id : "_toolkit-gridButton",
                title : "Toggle grid"
            });

            var gridLabel = $("<label/>", {
                "for" : "_toolkit-gridButton"
            });
            gridLabel.append("<i class='ui-icon ui-icon-calculator'></i>");

            this.ui.axesButton = $("<input/>", {
                type : "checkbox",
                id : "_toolkit-axesButton",
                title : "Toggle axes"
            });

            var axesLabel = $("<label/>", {
                "for" : "_toolkit-axesButton"
            });
            axesLabel.append("<i class='ui-icon ui-icon-arrow-4'></i>");

            this.ui.axesGridButtonSet = $("<div/>", {
                id : "_toolkit-axesGridButtonSet"
            });
            this.ui.axesGridButtonSet.css({
                "height" : "22px",
                "font-size" : "10px",
                "display" : "inline-block",
            });

            this.ui.axesGridButtonSet.append(gridLabel);
            this.ui.axesGridButtonSet.append(this.ui.gridButton);
            this.ui.axesGridButtonSet.append(axesLabel);
            this.ui.axesGridButtonSet.append(this.ui.axesButton);

            this.ui.axesGridButtonSet.buttonset();
        }

        if (gizmoAvailable)
        {
            this.ui.translateButton = $("<input/>", {
                type : "radio",
                id : "_toolkit-radioTranslate",
                name : "transform",
                checked : "checked"
            });
            this.ui.translateButton.data("transformMode", "translate");

            this.ui.rotateButton = $("<input/>", {
                type : "radio",
                id : "_toolkit-radioRotate",
                name : "transform"
            });
            this.ui.rotateButton.data("transformMode", "rotate");

            this.ui.scaleButton = $("<input/>", {
                type : "radio",
                id : "_toolkit-radioScale",
                name : "transform"
            });
            this.ui.scaleButton.data("transformMode", "scale");

            this.ui.transformButtonSet = $("<div/>", {
                id : "_toolkit-transformButtonSet"
            });
            this.ui.transformButtonSet.css({
                "height" : "22px",
                "font-size" : "10px",
                "float" : "right"
            });

            var labelTranslate = $("<label/>", {
                "for" : "_toolkit-radioTranslate"
            });
            labelTranslate.text("Translate");

            var labelRotate = $("<label/>", {
                "for" : "_toolkit-radioRotate"
            });
            labelRotate.text("Rotate");

            var labelScale = $("<label/>", {
                "for" : "_toolkit-radioScale"
            });
            labelScale.text("Scale");

            this.ui.transformButtonSet.append(this.ui.translateButton);
            this.ui.transformButtonSet.append(labelTranslate);
            this.ui.transformButtonSet.append(this.ui.rotateButton);
            this.ui.transformButtonSet.append(labelRotate);
            this.ui.transformButtonSet.append(this.ui.scaleButton);
            this.ui.transformButtonSet.append(labelScale);
            this.ui.transformButtonSet.buttonset();
            this.ui.transformButtonSet.buttonset("option", "disabled", true);
        }

        this.ui.sceneTreeButton = $("<input/>",{
            type : "radio",
            id : "_toolkit-sceneTreeButton",
            name : "panels",
            checked : "checked"
        });
        this.ui.sceneTreeButton.data("isECEditor", false);

        this.ui.ecEditorButton = $("<input/>", {
            type : "radio",
            id : "_toolkit-ecEditorButton",
            name : "panels",
        });
        this.ui.ecEditorButton.data("isECEditor", true);

        this.ui.panelsButtonSet = $("<div/>", {
            id : "_toolkit-panelsButtonSet"
        });
        this.ui.panelsButtonSet.css({
            "height" : "22px",
            "font-size" : "10px",
            "float" : "right"
        });

        var labelSceneTree = $("<label/>", {
            "for" : "_toolkit-sceneTreeButton"
        });
        labelSceneTree.text("Scene tree");

        var labelECEditor = $("<label/>", {
            "for" : "_toolkit-ecEditorButton"
        });
        labelECEditor.text("EC editor");

        this.ui.panelsButtonSet.append(this.ui.sceneTreeButton);
        this.ui.panelsButtonSet.append(labelSceneTree);
        this.ui.panelsButtonSet.append(this.ui.ecEditorButton);
        this.ui.panelsButtonSet.append(labelECEditor);
        this.ui.panelsButtonSet.buttonset();

        if (isNotNull(this.toolbar))
        {
            this.toolbar.append(this.ui.undoButtonSet);
            this.toolbar.append(this.ui.redoButtonSet);
            this.toolbar.append(this.ui.saveButton);
            this.toolbar.append($("<span style='margin:0 .2em'></span>"));
            this.toolbar.append(this.ui.createButton);
            this.toolbar.append(this.ui.quickAddButton);
            this.toolbar.append(this.ui.deleteButton);
            this.toolbar.append($("<span style='margin:0 .2em'></span>"));
            if (IEditor.Instance.type === "rocket")
                this.toolbar.append(this.ui.axesGridButtonSet);

            this.toolbar.append(this.ui.panelsButtonSet);
            this.toolbar.append($("<span style='margin:0 .2em'></span>"));
            if (isNotNull(this.ui.transformButtonSet))
                this.toolbar.append(this.ui.transformButtonSet);
        }

        this.constructMenus();
        IEditor.Instance.registerResizeEventCallback(this, this.onResizeEvent);

        var self = this;

        this.ui.undoButton.click(function(){
            IEditor.Instance.undoStack.undo();
        });

        this.ui.redoButton.click(function(){
            IEditor.Instance.undoStack.redo();
        });

        this.ui.saveButton.click(function(){
            var dialog = new ModalDialog("SaveScene", "Save current state", 450, 100);
            dialog.appendInputBox("saveSceneFilename", "Enter file name without a file extension", "string");
            var buttons = {
                "Ok" : function()
                {
                    var input = $("#saveSceneFilename");
                    var filename = input.val();

                    if (isNull(filename) || filename === "")
                    {
                        input.addClass(Utils.invalidDataName);
                        return;
                    }

                    IEditor.Instance.save(filename);
                    $(this).dialog("close");
                    $(this).remove();
                },
                "Cancel" : function()
                {
                    $(this).dialog("close");
                    $(this).remove();
                }
            };
            dialog.addButtons(buttons);
            dialog.exec();
        });

        this.ui.undoArrowButton.click(function(){
            $(".ui-menu").hide();
            var menu = $("#_toolkit-undoMenu");
            menu.show();
            menu.position({
                my : "left top",
                at : "left bottom",
                of : this
            });

            return false;
        });

        this.ui.redoArrowButton.click(function(){
            $(".ui-menu").hide();
            var menu = $("#_toolkit-redoMenu");
            menu.show();
            menu.position({
                my : "left top",
                at : "left bottom",
                of : this
            });

            return false;
        });

        this.ui.createButton.click(function(){
            $(".ui-menu").hide();
            self.ui.createMenu.show();
            self.ui.createMenu.position({
                my : "left top",
                at : "left bottom",
                of : this
            });

            return false;
        });

        this.ui.quickAddButton.click(function(){
            $(".ui-menu").hide();
            self.ui.quickAddMenu.show();
            self.ui.quickAddMenu.position({
                my : "left top",
                at : "left bottom",
                of : this
            });

            return false;
        });

        this.ui.deleteButton.click(function(){
            var dialog = ModalDialog.confirmationDialog("RemoveItem", 
                "Remove edited object",
                "Are you sure you want to remove the selected object?", 
                function(){
                    IEditor.Instance.removeCurrent();
                });
            dialog.exec();
        });

        this.ui.undoMenu.on("menuselect", function(event, ui) {
            var commandId = ui.item.data("commandId");
            if (commandId < 0)
                self.onViewUndoStackClicked();
            else
                IEditor.Instance.undoStack.goToState(commandId);

            $(this).hide();
        });

        this.ui.redoMenu.on("menuselect", function(event, ui){
            var commandId = ui.item.data("commandId");
            if (commandId < 0)
                self.onViewUndoStackClicked();
            else
                IEditor.Instance.undoStack.goToState(commandId);

            $(this).hide();
        });

        this.ui.createMenu.on("menuselect", function(event, ui){
            IEditor.Instance.createPrimitive(ui.item.text());
        });

        this.ui.quickAddMenu.on("menuselect", function(event, ui){
            IEditor.Instance.quickCreateEntity(ui.item.text());
        });

        if (IEditor.Instance.type === "rocket")
        {
            this.ui.gridButton.click(function()
            {
                if ($(this).is(":checked"))
                    IEditor.Instance.showGrid();
                else
                    IEditor.Instance.hideGrid();
            });

            this.ui.axesButton.click(function()
            {
                if ($(this).is(":checked"))
                    IEditor.Instance.showAxes();
                else
                    IEditor.Instance.hideAxes();
            });
        }

        if (isNotNull(this.ui.transformButtonSet))
        {
            this.ui.transformButtonSet.on("change", function(event){
                IEditor.Instance.setTransformMode($(event.target).data("transformMode"));
            });
        }

        this.ui.panelsButtonSet.on("change", function(event){
            IEditor.Instance.switchPanels($(event.target).data("isECEditor"));
        });

        $("body:not(.ui-menu)").click(function() {
            $(".ui-menu").hide();
        })
    },

    onViewUndoStackClicked : function()
    {
        var dialog = $("<div/>", {
            id : "_toolkit-undoStackView",
            title : "Editing history"
        });

        var stackButtonSet = $("<ul/>",{
            id : "_toolkit-undoStackButtons"
        });
        stackButtonSet.css({
            "margin-left" : "auto",
            "margin-right" : "auto",
            "font-size" : "8px",
            "minWidth" : "150px"
        })

        var undoHistory = IEditor.Instance.undoStack.undoHistory();
        var redoHistory = IEditor.Instance.undoStack.redoHistory();

        for(var i = redoHistory.length - 1; i >= 0; i--)
        {
            var li = $("<li/>");
            li.append(redoHistory[i].commandString.substring(1));
            li.data("commandId", redoHistory[i].id);
            li.appendTo(stackButtonSet);
        }

        var liCurrent = $("<li/>");
        liCurrent.append("<strong>Current state</strong>");
        liCurrent.appendTo(stackButtonSet);

        for (var i = 0; i < undoHistory.length; i++)
        {
            var li = $("<li/>");
            li.append(undoHistory[i].commandString.substring(1));
            li.data("commandId", undoHistory[i].id);
            li.appendTo(stackButtonSet);
        }

        stackButtonSet.selectable({
            tolerance : "fit"
        });

        dialog.append(stackButtonSet);
        dialog.dialog({
            resizable : false,
            width : 300,
            minHeight : 180,
            maxHeight : 600,
            modal : true,
            closeOnEscape : true,
            buttons : {
                "Ok" : function()
                {
                    var selected = $(".ui-selected");
                    if (selected.length > 0)
                    {
                        var commandId = $(selected[0]).data("commandId");
                        if (isNotNull(commandId))
                            IEditor.Instance.undoStack.goToState(commandId);
                    }

                    $(this).dialog("close");
                    $(this).remove();
                },
                "Cancel" : function()
                {
                    $(this).dialog("close");
                    $(this).remove();
                }
            }
        });

        dialog.dialog("open");
    },

    getOrCreateToolbar : function(width)
    {
        if (isNotNull(this.toolbar))
            return this.toolbar;

        this.toolbar = $("<div/>");
        this.toolbar.attr("id", "interfaceDesigner-toolbar");
        this.toolbar.css({
            "position" : "absolute",
            "top" : 0,
            "padding"  : 0,
            "margin"   : 0,
            "height"   : 30,
            "width" : width,
            "border"   : 0,
            "border-bottom"     : "1px solid gray",
            "background-color"  : "rgba(248,248,248, 0.5)"
        });

        return this.toolbar;
    },

    constructMenus : function()
    {
        var createMenu = this.ui.createMenu;
        var quickAddMenu = this.ui.quickAddMenu;

        var primitives = [{
            text : "Cube",
            icon : "ui-icon-bullet"
        },
        {
            text : "Ball",
            icon : "ui-icon-bullet"
        },
        {
            text : "Cone",
            icon : "ui-icon-bullet"
        },
        {
            text : "Cylinder",
            icon : "ui-icon-bullet"
        }];

        var quickAddItems = [{
            text : "Movable", 
            icon: "ui-icon-arrow-4"
        },
        {
            text : "Drawable",
            icon : "ui-icon-pencil"
        },
        {
            text : "Script",
            icon : "ui-icon-document"
        }];

        for (var i = 0; i < primitives.length; i++)
        {
            var li = $("<li/>");
            var a = $("<a href='#'></a>");
            var span = $("<span class='ui-icon " + primitives[i].icon + "'></span>");
            a.append(span);
            a.append(primitives[i].text);
            li.append(a);
            createMenu.append(li);
        }

        for (var i = 0; i < quickAddItems.length; i++)
        {
            var li = $("<li/>");
            var a = $("<a href='#'></a>");
            var span = $("<span class='ui-icon " + quickAddItems[i].icon + "'></span>");
            a.append(span);
            a.append(quickAddItems[i].text);
            li.append(a);
            quickAddMenu.append(li);
        }

        createMenu.menu();
        createMenu.hide();

        quickAddMenu.menu();
        quickAddMenu.hide();
    },

    constructUndoRedoMenu : function(menu, items, total)
    {
        if (menu.hasClass("ui-menu"))
            menu.menu("destroy");

        menu.empty();

        for(var i = 0; i < items.length; i++)
        {
            if (i === 5)
                break;

            var item = $("<li/>");

            var spanClass = "ui-icon";
            var commandChar = items[i].commandString[0];
            if (commandChar === "+")
                spanClass += " ui-icon-plus";
            else if (commandChar === "-")
                spanClass += " ui-icon-minus";
            else if (commandChar === "*")
                spanClass += " ui-icon-pencil";

            var link = $("<a href='#'></a>");
            var span = $("<span class='" + spanClass + "'></span>");
            link.append(span);
            link.append(items[i].commandString.substring(1));

            item.append(link);
            item.data("commandId", items[i].id);

            menu.append(item);
        }

        if (items.length > 5)
        {
            var item = $("<li/>");
            item.data("commandId", -1);
            var a = $("<a href='#'>View all " + total + " items</a>");
            item.append(a);

            menu.append($("<li>-</li>"));
            menu.append(item);
        }

        menu.menu();
        menu.hide();
    },

    onResizeEvent : function(width, height)
    {
        if (isNull(this.toolbar))
            return;

        this.toolbar.css("width", width - IEditor.Instance.panelWidth);
    },
    onUndoRedoStateChanged : function(undoItems, redoItems, total)
    {
        this.ui.undoButtonSet.buttonset("option", "disabled", undoItems.length === 0);
        this.ui.redoButtonSet.buttonset("option", "disabled", redoItems.length === 0);

        this.constructUndoRedoMenu(this.ui.undoMenu, undoItems, total);
        this.constructUndoRedoMenu(this.ui.redoMenu, redoItems, total);
    },

    onEntitySelected : function(entityPtr)
    {
        this.ui.deleteButton.button("option", "disabled", isNull(entityPtr));
        if (isNotNull(this.ui.transformButtonSet))
            this.ui.transformButtonSet.buttonset("option", "disabled", isNull(entityPtr));
    },

    onPanelsSwitch : function(isECEditor)
    {
        this.ui.sceneTreeButton.prop("checked", !isECEditor);
        this.ui.ecEditorButton.prop("checked", isECEditor);
        this.ui.panelsButtonSet.buttonset("refresh");
    },

    show : function()
    {
        this.toolbar.show();
    },

    hide : function()
    {
        this.toolbar.hide();
    }
})

var ModalDialog = Class.$extend(
{
    /*
    buttons : {
        <button1 name> : <callback1>,
        <button2 name> : <callback2> ...
    }
    */
    __classvars__ : {
        confirmationDialog : function(id, title, message, callback)
        {
            var confirmDialog = new ModalDialog(id, title, 450, 180);
            confirmDialog.appendLabel(message);
            var buttons = {
                "Yes" : function()
                {
                    callback.call();
                    $(this).dialog("close");
                    $(this).remove();
                },
                "No" : function()
                {
                    $(this).dialog("close");
                    $(this).remove();
                }
            };

            confirmDialog.addButtons(buttons);
            return confirmDialog;
        }
    },

    __init__ : function(dialogId, dialogTitle, dialogWidth, dialogHeight, buttons)
    {
        this.element = $("<div/>",
        {
            id : "dialog-" + dialogId,
            title : dialogTitle
        });

        this.element.css({
            "font-size" : "14px"
        });

        this.width = dialogWidth;
        this.height = dialogHeight;

        if (isNotNull(buttons))
            this.buttons = buttons;
    },

    appendLabel : function(text, id)
    {
        var labelElement = $("<label/>");
        if (isNotNull(id) && id !== "")
            labelElement.attr("id", "label-" + id);

        labelElement.html(text);

        this.append(labelElement);

        return labelElement;
    },

    appendComboBox : function(elementId, label, options)
    {
        var selectElement = $("<select/>", {
            id : elementId
        });
        selectElement.css({
            "float" : "right"
        });

        for (var i = 0; i < options.length; i++)
        {
            var option = $("<option/>", {
                value : options[i].value
            });

            option.html(options[i].name);
            selectElement.append(option);
        }

        this.appendLabel(label);
        this.append(selectElement, true);

        return selectElement;
    },

    appendInputBox : function(elementId, label, inputType)
    {
        var inputElement = $("<input/>",
        {
            id : elementId,
            type : inputType
        });

        inputElement.css({
            "float" : "right"
        });

        inputElement.on("keydown", function(event)
        {
            event.stopPropagation();
        });

        this.appendLabel(label);
        this.append(inputElement, true);

        return inputElement;
    },

    appendDraggableList : function(elementId, label, items)
    {
        var editEnabled = true;
        var draggableList = $("#" + elementId);
        if (draggableList.length === 0)
        {
            editEnabled = false;
            draggableList = $("<div/>",
            {
                id : elementId
            });
        }

        draggableList.css({
            "float" : "right",
            "font-size" : "10px",
            "border" : "black",
            "border-size" : "4px"
        });

        for (var i = 0; i < items.length; i++)
        {
            var button = $("<button/>", {
                id : "draggable-" + items[i],
                title : items[i]
            });
            button.css({
                "margin" : "2px"
            })
            button.html(IEditor.scene.componentNameInHumanFormat(items[i]));
            button.button();
            button.draggable({
                cancel : false,
                helper : "clone"
            });
            draggableList.append(button);
        }

        if (!editEnabled)
        {
            this.appendLabel(label, elementId);
            this.append(draggableList, true);
        }
        else
        {
            var thisLabel = $("#label-" + elementId);
            if (thisLabel.length !== 0)
                thisLabel.html(label);
        }
        return draggableList;
    },

    appendDroppable : function(elementId, label, allowDuplicates)
    {
        var droppable = $("<div/>",
        {
            id : elementId
        });
        droppable.css({
            "width" : 0.9 * this.width,
            "min-height" : 0.1 * this.height,
            "font-size" : "10px",
            "border-color" : "black",
            "border-width" : "1px",
            "border-style" : "dashed",
            "border-radius" : "10px",
            "margin" : "4px"
        });

        this.appendLabel(label, elementId);

        droppable.droppable({
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            drop : function(event, ui)
            {
                var buttonTitle = ui.draggable.attr("title");

                if (!allowDuplicates)
                {
                    var existing = $(this).find("#dropped-" + buttonTitle);
                    if (existing.length > 0)
                    {
                        $(existing[0]).effect("pulsate", {times:3}, 400);
                        return;
                    }
                }

                var newButton = $("<button/>");
                newButton.text(ui.draggable.text());

                var closeButton = $("<button/>");
                closeButton.css({
                    height : "22px"
                });
                closeButton.button({
                    text : false,
                    icons : {
                        primary : "ui-icon-closethick"
                    }
                });
                closeButton.click(function()
                {
                    $(this).parent().fadeOut(200, function(){
                        $(this).remove();
                    });
                });

                var divButtons = $("<div/>", {
                    id : "dropped-" + buttonTitle
                });
                divButtons.data("dropData", buttonTitle);
                divButtons.css({
                    "display" : "inline-block",
                    "margin" : "4px"
                });

                divButtons.append(newButton);
                divButtons.append(closeButton);
                divButtons.buttonset();
                divButtons.appendTo(this);
            }
        });
        this.append(droppable, true);

        return droppable;
    },

    append : function(element, newLine)
    {
        this.element.append(element);

        if (isNotNull(newLine))
            if (newLine)
                this.element.append("<br /><br />");
    },

    addButtons : function(buttons)
    {
        this.buttons = buttons;
    },

    exec : function()
    {
        this.element.dialog({
            resizable : false,
            width : this.width,
            minHeight : this.height,
            modal : true,
            closeOnEscape : true,
            buttons : this.buttons,
            close : function()
            {
                $(this).remove();
            }
        });

        this.element.dialog("open");
    }
});

var Utils = Class.$extend(
{
    __classvars__:
    {
        invalidDataName : "invalidData",

        attributeTableRowStyle : {
            "text-align" : "right"
        },

        attributeTableColumnStyle : {
            "width" : "50%"
        }
    }
});