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
    },

    // Main scene methods
    // pure virtual
    entities : function() {},
    entityById : function(entityId) {},
    createEntity : function(components, change, replicated, componentsReplicated) {},
    removeEntity : function(entityId) {},
    registeredComponents : function() {},
    doesAllowSameNamedComponents : function() {},
    doRaycast : function(x, y, selectionLayer) {},
    componentNameWithPrefix : function(componentName) {},
    componentNameInHumanFormat : function(typeName) {},
    attributeTypeToName : function(attrTypeId) {},
    attributeTypeIds : function() {},
    unsubscribe : function(subscription) {},

    // virtual
    isAttributeAtomic : function(attrTypeId)
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
    logError : function(text){}
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

    children : function()
    {
        return [];
    },

    // pure virtual
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
        this.parentId = parentId;
        this.isFixed = false;
    },

    // pure virtual
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

    __init__ : function()
    {
        this.$super();
        IEditor.Instance = this;

        this.ui = {};                                       // JSON
        this.enabled = false;
        this.isECEditor = false;
        this.noSelectionStr = "(No entities selected)";     // String
        this.sceneEvents = [];
        this.componentEvents = [];                         // Array of EventWrapper
        this.transformEditor = null;

        this.toggleEditorShortcut = {
            meta : "shift",
            key : "s",
        };
        this.switchPanelsShortcut = {
            meta : "shift",
            key : "e"
        };

        // The current object in editing
        this.currentObject = null;

        this._initUi();

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

    _initUi : function()
    {
        // Invalid data CSS class, for marking up invalid values on input boxes
        var invalidDataClass = $("<style/>");
        invalidDataClass.text(".invalidData { border : 2px solid red; }");

        // Some style for context menu items
        var menuItemsClass = $("<style/>");
        menuItemsClass.text(".sceneTree-contextMenu-itemsClass a { \
            font-family: Arial; \
            font-size :  12pt; \
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

        $("head").append(invalidDataClass);
        $("head").append(menuItemsClass);

        var panelHeight = this.height();

        this.ui.sceneTree = {};
        this.ui.ecEditor = {};

        this.ui.sceneTree.panel = $("<div/>");
        this.ui.sceneTree.panel.attr("id", "webrocket-editor-leftpanel");
        this.ui.sceneTree.panel.css({
            "position"          : "absolute",
            "top"               : 0,
            "left"              : 0,
            "height"            : panelHeight,
            "width"             : "420px",
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
        this.ui.ecEditor.panel.attr("id", "webrocket-editor-rightpanel");
        this.ui.ecEditor.panel.css({
            "position"          : "absolute",
            "top"               : 0,
            "left"              : 0,
            "height"            : panelHeight,
            "width"             : "420px",
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
            "min-width": "48%"
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
            "min-width": "48%"
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
            "height" : "80%",
            "font-size" : "10px",
        });

        this.ui.ecEditor.entityLabel = $("<div/>");
        this.ui.ecEditor.entityLabel.attr("id", "editor-entity-label");
        this.ui.ecEditor.entityLabel.css({
            "position" : "relative",
            "top" : 5,
            "left" : 0,
            "width" : "98%",
            "height" : "5%",
            "font-family" : "Verdana",
            "font-size" : "16px",
            "text-align" : "center"
        });
        this.ui.ecEditor.entityLabel.html(this.noSelectionStr);

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
                primary : "ui-icon-pencil"
            }
        });

        this.ui.ecEditor.buttonsHolder = $("<div/>");
        this.ui.ecEditor.buttonsHolder.attr("id", "editor-buttons");
        this.ui.ecEditor.buttonsHolder.css({
            "position" : "relative",
            "overflow" : "auto",
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

        this.ui.ecEditor.panel.append(this.ui.ecEditor.entityLabel);
        this.ui.ecEditor.panel.append(this.ui.ecEditor.buttonsHolder);

        var componentHolderHeight = this.ui.ecEditor.panel.height() - 
            (this.ui.ecEditor.entityLabel.height() 
            + parseInt(this.ui.ecEditor.entityLabel.css("top"))
            + this.ui.ecEditor.buttonsHolder.height());

        this.ui.ecEditor.holder = $("<div/>");
        this.ui.ecEditor.holder.attr("id", "editor-component-accordions");
        this.ui.ecEditor.holder.css({
            "position"   : "relative",
            "overflow"   : "auto",
            "top"        : this.ui.ecEditor.entityLabel.height() + this.ui.ecEditor.buttonsHolder.height(),
            "left"       : 10,
            "width"      : "95%",
            "height"     : componentHolderHeight,
            "font-size"  : "10px",
            "padding"    : 0
        });

        this.ui.ecEditor.panel.append(this.ui.ecEditor.holder);

        this.ui.ecEditor.buttonsHolder.hide();
        this.ui.sceneTree.panel.hide();
        this.ui.ecEditor.panel.hide();
        this.addWidget(this.ui.sceneTree.panel);
        this.addWidget(this.ui.ecEditor.panel);

        this.registerResizeEventCallback(this, this._onResizeEvent);

        this.createContextMenu();
        this.ui.sceneTree.addEntityButton.click(this, this.onAddEntityClicked);
        this.ui.sceneTree.expColButton.click(this, this.onSTExpColClicked);
        this.ui.ecEditor.addCompButton.click(this, this.onAddComponentClicked);
        this.ui.ecEditor.editCompButton.click(this, this.onEditButtonClicked);
        this.ui.ecEditor.expColButton.click(this, this.onECExpColClicked);
    },

    _onKeyEvent : function(keyEvent)
    {
        var metaToggleEditor = this.toggleEditorShortcut.meta;
        var keyToggleEditor = this.toggleEditorShortcut.key;

        var metaTogglePanels = this.switchPanelsShortcut.meta;
        var keyTogglePanels = this.switchPanelsShortcut.key;

        if (keyEvent.isPressed(metaToggleEditor) && keyEvent.isPressed(keyToggleEditor))
            this.toggleEditor();
        else if (keyEvent.isPressed(metaTogglePanels) && keyEvent.isPressed(keyTogglePanels))
            this.togglePanels();
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

        var componentHolderHeight =  this.ui.ecEditor.panel.height() - 
            (this.ui.ecEditor.entityLabel.height() + parseInt(this.ui.ecEditor.entityLabel.css("top")) + 
            this.ui.ecEditor.buttonsHolder.height());

        this.ui.ecEditor.holder.css("height", componentHolderHeight);
    },

    setSwitchPanelsShortcut : function(meta, key)
    {
        this.switchPanelsShortcut.meta = meta;
        this.switchPanelsShortcut.key = key;
    },

    setToggleEditorShortcut : function(meta, key)
    {
        this.toggleEditorShortcut.meta = meta;
        this.toggleEditorShortcut.key = key;
    },

    onAddEntityClicked : function()
    {
        var inputNewEntityId = "input-newEntityName";
        var checkboxIsLocalId = "checkbox-localEntity";
        var buttons = {
            "Add entity" : function()
            {
                var componentNames = [];
                var droppedComponents = $(this).find("div[id^='dropped-']");
                for (var i = 0; i < droppedComponents.length; i++)
                    componentNames.push($(droppedComponents[i]).data("component"));

                var entityName = $("#" + inputNewEntityId).val();
                var isLocal = $("#" + checkboxIsLocalId).is(":checked");

                var entityPtr = IEditor.scene.createEntity(componentNames, null, !isLocal);
                if (entityName !== "")
                    entityPtr.setName(entityName);

                $(this).dialog("close");
                $(this).remove();

                /// XML3D workaround. TODO: remove when XML3D fixes DOM changes events propagition!
                if (!IEditor.scene.isRegistered("onEntityCreated"))
                    IEditor.Instance.onEntityCreated(entityPtr);
            },
            "Cancel" : function()
            {
                $(this).dialog("close");
                $(this).remove();
            }
        };

        var dialog = new ModalDialog("AddEntity", "Add new entity", 550, 450);
        dialog.appendInputBox(inputNewEntityId, "Name this entity (optional)", "string");
        dialog.appendInputBox(checkboxIsLocalId, "Create local entity", "checkbox");

        var componentNames = [];
        var registeredComponents = IEditor.scene.registeredComponents();

        for (var i = 0; i < registeredComponents.length; i++)
            componentNames.push(registeredComponents[i].typeName);

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

    onAddComponentClicked : function()
    {
        var entityId = $(this).data("targetEntity");
        if (isNull(entityId))
            return;

        var entityPtr = IEditor.scene.entityById(entityId);
        if (isNull(entityPtr))
            return;

        var comps = new Array();
        var registeredComponents = IEditor.scene.registeredComponents();
        for (var i = 0; i < registeredComponents.length; i++)
            comps.push({
                name : IEditor.scene.componentNameInHumanFormat(registeredComponents[i].typeName),
                value : registeredComponents[i].typeId
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

                var newComponent = entityPtr.createComponent(compTypeName, compName, isLocal);
                if (isNotNull(newComponent))
                    newComponent.setTemporary(isTemporary);

                $(this).dialog("close");
                $(this).remove();

                /// XML3D workaround. TODO: remove when XML3D fixes DOM changes events propagition!
                if (!IEditor.scene.isRegistered("onComponentCreated") && isNotNull(newComponent))
                    IEditor.Instance.onComponentCreated(entityPtr, newComponent);
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
        if (entityPtr.id === this.currentObject.id)
            this.selectEntity(null);

        var entityToRemove = this.ui.sceneTree.holder.fancytree("getNodeByKey", "sceneNode-" + entityPtr.id);
        entityToRemove.remove();
    },

    onEditButtonClicked : function()
    {
        var toggle = $(this).data("toggle");
        if (isNull(toggle))
            return;

        toggle = !toggle;

        $(this).data("toggle", toggle);

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
        }
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
    },

    selectEntity : function(entityPtr, activeComponent)
    {
        this.ui.ecEditor.holder.off();
        this.ui.ecEditor.holder.empty();
        this.ui.ecEditor.addCompButton.data("targetEntity", -1);
        this.ui.ecEditor.editCompButton.data("toggle", false);

        if (isNull(entityPtr))
        {
            this.currentObject = null;
            this.ui.ecEditor.entityLabel.html(this.noSelectionStr);

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
            this.ui.ecEditor.addCompButton.data("targetEntity", entityPtr.id);
            this.populateComponents(entityPtr, activeComponent);

            this.ui.ecEditor.buttonsHolder.show();
        }
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

                    var entity = IEditor.scene.entityById(entityId);
                    if (isNull(entity))
                        return;
                    else
                    {
                        if (componentId !== -1)
                        {
                            var confirmDialog = ModalDialog.confirmationDialog(
                                "RemoveComponent", 
                                "Remove component", 
                                "Are you sure that you want to remove this component?",
                                function(){
                                    /// XML3D workaround. TODO: remove when XML3D fixes DOM changes events propagition!
                                    if (!IEditor.scene.isRegistered("onComponentRemoved"))
                                    {
                                        var componentPtr = entity.componentById(componentId);
                                        IEditor.Instance.onComponentRemoved(entityPtr, componentPtr);
                                    }
                                    entity.removeComponent(componentId);
                                });

                            confirmDialog.exec();
                        }
                        else
                        {
                            var confirmDialog = ModalDialog.confirmationDialog(
                                "RemoveEntity", 
                                "Remove entity with ID " + entityId, 
                                "Are you sure that you want to remove this entity?",
                                function(){
                                    /// XML3D workaround. TODO: remove when XML3D fixes DOM changes events propagition!
                                    if (!IEditor.scene.isRegistered("onEntityRemoved"))
                                        IEditor.Instance.onEntityRemoved(entity);

                                    IEditor.scene.removeEntity(entityId);                                    
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

    createTreeItemForEntity : function(entityPtr, parentNode)
    {
        var childNode = parentNode.addChildren({
            title : this.getNodeTitleForEntity(entityPtr),
            key : "sceneNode-" + entityPtr.id
        });

        var children = entityPtr.children();
        for (var i = 0; i < children.length; i++)
            this.createTreeItemForEntity(children[i], childNode);

        var components = entityPtr.components();
        for (var i = 0; i < components.length; i++)
        {
            var component = components[i];
            if (component.isFixed)
                continue;

            childNode.addChildren({
                title : this.getNodeTitleForComponent(component),
                key : "sceneNode-" + entityPtr.id + "-" + component.id
            });
        }
    },

    getNodeTitleForEntity : function(entityPtr, setUnnamed)
    {
        if (isNull(setUnnamed))
            setUnnamed = false;

        var entityName = "<i>unnamed</i>";
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

    createTreeItemForComponent : function(componentPtr, parentNode)
    {
        var fullName = this.getNodeTitleForComponent(componentPtr);
        parentNode.addChildren({
            title : fullName,
            key : "sceneNode-" + componentPtr.parentId + "-" + componentPtr.id
        });
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
        var treeItem = this.ui.sceneTree.holder.fancytree("getNodeByKey", "sceneNode-" + componentPtr.parentId + "-" + componentPtr.id);
        if (isNull(treeItem))
            return;

        treeItem.setTitle(this.getNodeTitleForComponent(componentPtr));
    },

    onComponentCreated : function(entityPtr, componentPtr)
    {
        if (!this.isEditorEnabled())
            return;

        if (this.isECEditor)
        {
            if (isNotNull(this.currentObject) && (entityPtr.id === this.currentObject.id))
                this.appendAccordionForComponent(componentPtr);
        }

        var treeNode = this.ui.sceneTree.holder.fancytree("getNodeByKey", "sceneNode-" + entityPtr.id);
        this.createTreeItemForComponent(componentPtr, treeNode);
    },

    onComponentRemoved : function(entityPtr, componentPtr)
    {
        if (!this.isEditorEnabled())
            return;

        if (this.isECEditor)
        {
            if (isNotNull(this.currentObject) && (entityPtr.id === this.currentObject.id))
                if (componentPtr.typeName === "EC_Name")
                    this.ui.ecEditor.entityLabel.html(this.getNodeTitleForEntity(entityPtr, true));

            var accordionId = "#accordion-" + entityPtr.id + "-" + componentPtr.id;
            $(accordionId).hide("fast", function()
            {
                $(accordionId).remove();
            });
        }

        if (componentPtr.typeName === "EC_Name")
            this.renameEntityNode(entityPtr, true);

        var componentToRemove = this.ui.sceneTree.holder.fancytree("getNodeByKey", "sceneNode-" + entityPtr.id + "-" + componentPtr.id);
        if (isNotNull(componentToRemove))
            componentToRemove.remove();
    },

    onAllAttributeChanges : function(entityPtr, componentPtr, attributeIndex, attributeName, attributeValue)
    {
        if (!this.isEditorEnabled())
            return;

        if (this.isECEditor)
        {
            if (isNotNull(this.currentObject) && (entityPtr.id === this.currentObject.id))
            {
                this.onAttributesChanged(entityPtr, componentPtr, attributeIndex, attributeName, attributeValue);
                if (componentPtr.typeName === "EC_Name" && attributeName === "name")
                    this.ui.ecEditor.entityLabel.html(this.getNodeTitleForEntity(entityPtr));
            }
        }

        if (componentPtr.typeName === "EC_Name" && attributeName === "name")
            this.renameEntityNode(entityPtr);
    },

    populateComponents : function(entityPtr, activeComponent)
    {
        this.ui.ecEditor.entityLabel.html(this.getNodeTitleForEntity(entityPtr));

        for (var i = this.componentEvents.length - 1; i >= 0; i--)
            IEditor.scene.unsubscribe(this.componentEvents[i]);
        this.componentEvents.length = 0;

        var components = entityPtr.components();
        for (var i = 0; i < components.length; ++i)
        {
            var compId = parseInt(components[i].id);
            this.appendAccordionForComponent(components[i], compId === activeComponent);
        }

        this.ui.ecEditor.holder.on("change", "input", this.onAttributesEdit);
        this.ui.ecEditor.holder.on("change", "select", this.onAttributesEdit);

        // this.ui.ecEditor.holder.sortable();
    },

    appendAccordionForComponent : function(componentPtr, setActive)
    {
        if (isNull(componentPtr))
            return;
        if (isNull(setActive))
            setActive = false;

        var entAndCompSuffix = componentPtr.parentId + "-" + componentPtr.id;
        var accordionId = "accordion-" + entAndCompSuffix;
        var accordion = $("<div/>", {
            id : accordionId
        });

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
            title : "Remove this component"
        });
        removeButton.data("parentAccordion", accordionId);
        removeButton.css("float", "right");
        removeButton.button({
            icons : {
                primary : "ui-icon-closethick"
            },
            text : false
        });

        var editButtonsVisible = this.ui.ecEditor.editCompButton.data("toggle");
        if (!editButtonsVisible)
        {
            addAttrButton.hide();
            removeButton.hide();
        }

        var compNameNoEC = IEditor.scene.componentNameInHumanFormat(componentPtr.typeName);
        header.html(compNameNoEC + (componentPtr.name == "" ? "" : " (" + componentPtr.name + ")"));

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
                parentEntityId : componentPtr.parentId
            });

            for (var attr = 0; attr < attributes.length; attr++)
            {
                var tableRow = this.createRowsForAttribute(componentPtr.parentId, componentPtr.id, attributes[attr].name, attributes[attr]);
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

        if (!componentPtr.isFixed)
            header.append(removeButton);
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

        addAttrButton.tooltip({
            track : true
        });
        removeButton.tooltip({
            track : true
        });

        addAttrButton.click( function(event)
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
                        if (!componentPtr.createAttribute(attrTypeId, attrName))
                        {
                            attrNameElem.addClass(Utils.invalidDataName);
                            return;
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
                    var confirmDialog = ModalDialog.confirmationDialog(
                        "RemoveComponent", 
                        "Remove component",
                        "Are you sure that you want to remove this component?",
                        function()
                        {
                            /// XML3D workaround. TODO: remove when XML3D fixes DOM changes events propagition!
                            if (!IEditor.scene.isRegistered("onComponentRemoved"))
                            {
                                var componentPtr = entityPtr.componentById(componentId);
                                IEditor.Instance.onComponentRemoved(entityPtr, componentPtr);
                            }
                            entityPtr.removeComponent(componentId);
                        }
                    );

                    confirmDialog.exec();
                    
                }
            }
        });
    },

    createRowsForAttribute : function (entityId, componentId, attrName, attributePtr)
    {
        var element = null;
        var attributeValue = attributePtr.get();

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
                        compPtr.removeAttribute(attributePtr.index);
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
        var entityId = attributePtr.owner.parentId;
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
                attribute.set($(this).is(":checked"));
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
                    attribute.set(parseFloat(value));
                }
            }
            else
                attribute.set(value);
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
            attribute.set(clone);
        }
        else if (IEditor.scene.isAttributeTuple(typeId))
        {
            var axis = data.axis;
            var clone = attribute.get();
            clone[axis] = parseFloat($(this).val());
            attribute.set(clone);
        }
        else if (IEditor.scene.isAttributeArray(typeId))
        {
            var index = data.index;
            var clone = attribute.get();
            clone[index] = $(this).val();
            attribute.set(clone);
        }
        else
            IEditor.scene.logError("[Editor]: Current type is not implemented yet! Type requested was: " + IEditor.scene.attributeTypeToName(typeId));
    },

    onAttributeCreate : function(componentPtr, attributePtr)
    {
        var suffix = componentPtr.parentId + "-" + componentPtr.id;
        var targetAccordion = $("#accordion-" + suffix);

        var targetTable = $("#table-" + suffix);
        var tableBody = this.createRowsForAttribute(componentPtr.parentId, componentPtr.id, attributePtr.name, attributePtr);
        tableBody.appendTo(targetTable);

        targetAccordion.accordion("refresh");
    },

    onAttributeRemove : function(componentPtr, attributeIndex, attributeName)
    {
        var suffixAccordion = componentPtr.parentId + "-" + componentPtr.id;
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
        {
            IEditor.scene.logError("A non-existing element was requested in an attribute change: ", elementName);
            return;
        }

        if (IEditor.scene.isAttributeAtomic(typeId))
        {
            if (typeof(attributeValue) === "boolean")
                $("#" + elementName).prop('checked', attributeValue);

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
            var xyzw = new Array();
            if (!IEditor.scene.isAttributeColor(typeId))
                xyzw = ["x", "y", "z", "w"];
            else
                xyzw = ["r", "g", "b", "a"];

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

    appendLabel : function(text)
    {
        var labelElement = $("<label/>");
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

        this.appendLabel(label);
        this.append(inputElement, true);

        return inputElement;
    },

    appendDraggableList : function(elementId, label, items)
    {
        var draggableList = $("<div/>",
        {
            id : elementId
        });

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

        this.appendLabel(label);
        this.append(draggableList, true);
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
            "margin" : "4px"
        });

        this.appendLabel(label);

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
                divButtons.data("component", buttonTitle);
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
            height : this.height,
            modal : true,
            closeOnEscape : true,
            buttons : this.buttons
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