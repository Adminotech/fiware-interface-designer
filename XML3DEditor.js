function getParentGroup(childNode)
{
    return childNode.parentNode;
}

function getChildrenGroups(parentNode)
{
    var result = [];
    var children = $(parentNode).children();
    for (var i = 0; i < children.length; i++)
        result.push(new XML3DElement(children[i]));

    return result;
}

var XML3DKeyEvent = KeyEventWrapper.$extend(
{
    __init__ : function(keyEvent)
    {
        this.$super(-1);

        this.type = keyEvent.type;

        this.keyCode = keyEvent.keyCode;
        this.key = keyEvent.key;
        // this.repeat = keyEvent.repeat;

        var pressedKey = String.fromCharCode(keyEvent.keyCode).toLowerCase();

        this.pressed = {};
        this.pressed["alt"] = keyEvent.altKey;
        this.pressed["ctrl"] = keyEvent.ctrlKey;
        this.pressed["meta"] = keyEvent.metaKey;
        this.pressed["shift"] = keyEvent.shiftKey;
        this.pressed[pressedKey] = true;

        this.originalEvent = keyEvent;
    }
});

var XML3DMouseEvent = MouseEventWrapper.$extend(
{
    __init__ : function(mouseEvent)
    {
        this.$super(-1);

        this.type = (mouseEvent.type === "mousedown" ? "press" : mouseEvent.type);
        this.x = mouseEvent.pageX;
        this.y = mouseEvent.pageY;

        // TODO
        this.relativeX = 0;
        this.relativeY = 0;
        this.relativeZ = 0;

        this.leftDown = (mouseEvent.button === 0);
        this.middleDown = (mouseEvent.button === 1);
        this.rightDown = (mouseEvent.button === 2);

        this.targetId = mouseEvent.target.id;
        this.targetNodeName = mouseEvent.currentTarget.localName;
        this.originalEvent = mouseEvent;
    }
});

var XML3DScene = SceneWrapper.$extend(
{
    __classvars__ :
    {
        freeId : 0,

        nextId : function()
        {
            return XML3DScene.freeId++;
        },

        elementById : function(parent, id)
        {
            var all = parent.find("*");
            for (var i = all.length - 1; i >= 0; i--)
            {
                if ($(all[i]).data("editorId") == id)
                    return all[i];
            };

            return null;
        },

        isValueElement : function(elementName)
        {
            return ((elementName.indexOf("int") === 0) || (elementName.indexOf("float") === 0) || (elementName === "bool"));
        },

        configuration : {},
        childElements : {}
    },

    __init__ : function(canvasId)
    {
        this.$super("xml3d");
        this.entityString = "element";
        this.componentString = "element";

        this.canvas = $("#" + canvasId);
        this.canvasDOM = document.getElementById(canvasId);

        // Assign an 'application-specific' id to all elements
        this.canvas.find("*").each(function(index)
        {
            $(this).data("editorId", XML3DScene.nextId());
        });

        var allClasses = XML3D.classInfo;
        var conf = XML3DScene.configuration;
        var childElements = XML3DScene.childElements;

        for (var i in allClasses)
        {
            conf[i] = {};
            conf[i]["id"] = {};
            conf[i]["id"].type = XML3DAttribute.String;
            conf[i]["id"].value = "";
            conf[i]["id"].allowedValues = null;

            conf[i]["class"] = {};
            conf[i]["class"].type = XML3DAttribute.String;
            conf[i]["class"].value = "";
            conf[i]["class"].allowedValues = null;

            conf[i]["style"] = {};
            conf[i]["style"].type = XML3DAttribute.String;
            conf[i]["style"].value = "";
            conf[i]["style"].allowedValues = null;

            for (var j in allClasses[i])
            {
                if (isNull(allClasses[i][j]))
                    continue;

                var a = allClasses[i][j].a;
                var params = allClasses[i][j].params;
                if (isNotNull(a) && isNotNull(params))
                {
                    var type = undefined;
                    var value = params;
                    var allowedValues = null;

                    if (typeof(params) === "number")
                        type = XML3DAttribute.Number;
                    else if (typeof(params) === "boolean")
                        type = XML3DAttribute.Boolean;
                    else if (typeof(params) === "string")
                        type = XML3DAttribute.String;
                    else if (typeof(params) === "object")
                    {
                        if (params instanceof Array)
                        {
                            // Tuples are represented as arrays in XML3D
                            if (params.length === 2)
                                type = XML3DAttribute.Tuple2;
                            else if (params.length === 3)
                                type = XML3DAttribute.Tuple3;
                            else if (params.length === 4)
                                type = XML3DAttribute.Tuple4;
                            else
                                type = XML3DAttribute.NTuple;
                        }
                        else if (isNotNull(params.e) && isNotNull(params.d))
                        {
                            if (params.e === XML3D.MeshTypes)
                                type = XML3DAttribute.MeshTypes;
                            else if (params.e === XML3D.TextureTypes)
                                type = XML3DAttribute.TextureTypes;
                            else if (params.e === XML3D.FilterTypes)
                                type = XML3DAttribute.FilterTypes;
                            else if (params.e === XML3D.WrapTypes)
                                type = XML3DAttribute.WrapTypes;
                            else if (params.e === XML3D.DataFieldType)
                                type = XML3DAttribute.DataFieldType;
                            else if (params.e === XML3D.DataChannelOrigin)
                                type = XML3DAttribute.DataChannelOrigin;

                            value = params.e[params.d];
                            allowedValues = params.e;
                        }
                    }

                    conf[i][j] = {};
                    conf[i][j]["type"] = type;
                    conf[i][j]["value"] = value;
                    conf[i][j]["allowedValues"] = allowedValues;
                }
                else if (isNotNull(a) && (j != "className") && (a === XML3D.ReferenceHandler))
                {
                    conf[i][j] = {};
                    conf[i][j]["type"] = XML3DAttribute.String;
                    conf[i][j]["value"] = "";
                    conf[i][j]["allowedValues"] = null;
                }
                else if (isNotNull(a) && (
                    a === XML3D.FloatArrayValueHandler ||
                    a === XML3D.Float2ArrayValueHandler ||
                    a === XML3D.Float3ArrayValueHandler ||
                    a === XML3D.Float4ArrayValueHandler ||
                    a === XML3D.Float4x4ArrayValueHandler ||
                    a === XML3D.IntArrayValueHandler ||
                    a === XML3D.BoolArrayValueHandler)
                )
                {
                    conf[i][j] = {};
                    conf[i][j]["type"] = XML3DAttribute.Array;
                    conf[i][j]["value"] = "";
                    conf[i][j]["allowedValues"] = null;
                }
            }

            // Taken from the XML3D specification
            if (i === "xml3d" || i === "data" || i === "group" || i === "mesh" || i === "shader" || i === "lightshader" || i === "proto")
                childElements[i] = ["xml3d", "data", "defs", "group", "mesh", "transform", "shader", "light", "lightshader", "script", "proto", "float", "float2", "float3", "float4", "float4x4", "int", "int4", "bool", "texture", "img", "video", "view"];
            else if (i === "defs")
                childElements[i] = ["data", "group", "mesh", "transform", "shader", "light", "lightshader", "script", "proto", "img", "video", "view"];
            else if (i === "texture")
                childElements[i] = ["img", "video"];
            else
                childElements[i] = [];
        }
    },

    entities : function()
    {
        if (isNull(this.canvasDOM))
            return [];

        return getChildrenGroups(this.canvasDOM);
    },

    entityById : function(entityId)
    {
        var result = XML3DScene.elementById(this.canvas, entityId);

        if (isNotNull(result))
            return new XML3DElement(result);

        return null;
    },

    createEntity : function(components)
    {
        return this.createElement("group", components);
    },

    createElement : function(type, children)
    {
        var element = document.createElement(type);
        var newElement = new XML3DElement(element);
        this.canvasDOM.appendChild(element);

        if (isNotNull(children) && children instanceof Array)
            for (var i = 0; i < children.length; i++)
                newElement.createComponent(children[i], "");

        return newElement;  
    },

    removeEntity : function(entityId)
    {
        var result = XML3DScene.elementById(this.canvas, entityId);

        if (isNotNull(result))
            $(result).remove();
    },

    registeredComponents : function(typeName)
    {
        var result = [];
        if (isNull(typeName))
            typeName = "xml3d";

        var childElements = XML3DScene.childElements[typeName];

        for (var i = 0; i < childElements.length; i++)
            result.push(
                {
                    name : childElements[i],
                    value : 0
                });


        return result;
    },

    doesAllowSameNamedComponents : function()
    {
        return true;
    },

    doRaycast : function(x, y, selectionLayer)
    {
        var hit = this.canvasDOM.getElementByPoint(x,y);
        var result = new XML3DRaycastResult(hit);

        return result;
    },

    componentNameWithPrefix : function(componentName)
    {
        return componentName;
    },

    componentNameInHumanFormat : function(typeName)
    {
        return typeName;
    },

    isAttributeAtomic : function(attrTypeId)
    {
        return (attrTypeId === XML3DAttribute.String ||
                attrTypeId === XML3DAttribute.Number ||
                attrTypeId === XML3DAttribute.Boolean ||
                attrTypeId === XML3DAttribute.Enum ||
                attrTypeId === XML3DAttribute.Array);
    },

    isAttributeArray : function(attrTypeId)
    {
        return (attrTypeId === XML3DAttribute.NTuple);
    },

    isAttributeTuple : function(attrTypeId)
    {
        if (attrTypeId === XML3DAttribute.Tuple2)
            return 2;
        else if (attrTypeId === XML3DAttribute.Tuple3)
            return 3;
        else if (attrTypeId === XML3DAttribute.Tuple4)
            return 4;
        else
            return 0;
    },

    isAttributeEnum : function(attrTypeId)
    {
        return (attrTypeId === XML3DAttribute.MeshTypes ||
                attrTypeId === XML3DAttribute.TextureTypes ||
                attrTypeId === XML3DAttribute.FilterTypes ||
                attrTypeId === XML3DAttribute.WrapTypes ||
                attrTypeId === XML3DAttribute.DataFieldType ||
                attrTypeId === XML3DAttribute.DataChannelOrigin);
    },

    attributeTypeToName : function(attrTypeId)
    {
        return "string";
    },

    attributeTypeIds : function()
    {
        return [XML3DAttribute.String];
    },

    unsubscribe : function(subscription)
    {
        if (isNotNull(subscription))
            subscription.ptr.unbind(subscription.eventName);
    },

    // TODO: Implement when DOM change events fixed in XML3D codebase
    /*
    entityCreated : function(context, callback)
    {

    },

    entityRemoved : function(context, callback)
    {

    },

    componentCreated : function(context, callback)
    {

    },

    componentRemoved : function(context, callback)
    {

    },
*/
    attributeChanged : function(context, callback)
    {
        this.registerCallback("onAttributeChanged", context, callback);
        this.canvas.on("DOMAttrModified", this._onAttributeChanged.bind(this));

        return {
            ptr : $(this._ptr),
            eventName : "DOMAttrModified"
        };
    },
    
    _onAttributeChanged : function(jqMutationEvent)
    {
        var mutationEvent = jqMutationEvent.originalEvent;
        if (mutationEvent.attrChange !== MutationEvent.MODIFICATION)
            return;

        var componentNode = mutationEvent.relatedNode;
        var parentGroup = getParentGroup(componentNode);

        var entityPtr = new XML3DElement(parentGroup);
        var componentPtr = new XML3DElement(componentNode);
        var attributeName = mutationEvent.attrName;
        var attributeValue = mutationEvent.newValue;
        var attributeIndex = -1;

        this.callback("onAttributeChanged", entityPtr, componentPtr, attributeIndex, attributeName, attributeValue);
    },

    logInfo : function(text)
    {
        XML3D.debug.logInfo(text);
    },

    logWarning : function(text)
    {
        XML3D.debug.logWarning(text);
    },

    logError : function(text)
    {
        XML3D.debug.logError(text);
    }    
});

var XML3DElement = EntityWrapper.$extend(
{
    __init__ : function(entityPtr)
    {
        this.typeName = entityPtr.localName;

        var entity = $(entityPtr);
        var id = "";
        var name = isNull(entity.attr("id")) ? "" : entity.attr("id");
        if (isNotNull(entity.data("editorId"))) 
            id = entity.data("editorId");
        else
        {
            id = XML3DScene.nextId();
            entity.data("editorId", id);
        }

        this.$super(id, name, false, false);
        this._ptr = entityPtr;
    },

    parentId : function()
    {
        if (this.expired())
            return null;

        var id = $(this._ptr).parent().data("editorId");
        return (isNull(id) ? null : id);
    },

    setName : function(name)
    {
        if (this.expired())
            return;

        if (XML3DScene.isValueElement(this.typeName))
            this._ptr.setAttribute("name", name);
        else
            this._ptr.setAttribute("id", name);
    },

    getName : function()
    {
        if (this.expired())
            return "";

        var name = "";
        if (XML3DScene.isValueElement(this.typeName))
            name = $(this._ptr).attr("name");
        else
            name = $(this._ptr).attr("id");

        return isNull(name) ? "" : name;
    },

    isDynamic : function()
    {
        return false;
    },

    setTemporary : function(temporary)
    {

    },

    components : function()
    {
        var result = [];
        if (this.expired())
            return result;

        var children = $(this._ptr).children();
        for (var i = 0; i < children.length; i++)
            result.push(new XML3DElement(children[i]));

        return result;
    },

    attributes : function()
    {
        var result = [];
        if (this.expired())
            return result;

        var conf = XML3DScene.configuration[this.typeName];
        for (var i in conf)
            result.push(new XML3DAttribute(i, conf[i].type, this));

        return result;
    },

    createComponent : function(typeName, name, isLocal)
    {
        if (this.expired())
            return null;

        var newComponent = document.createElement(typeName);

        if (isNotNull(name) && name !== "")
        {
            var isValueElement = XML3DScene.isValueElement(typeName);
            if (isValueElement)
                newComponent.setAttribute("name", name);
            else
                newComponent.setAttribute("id", name);
        }

        this._ptr.appendChild(newComponent);
        return new XML3DElement(newComponent);
    },

    createAttribute : function(typeId, name)
    {
        return false;
    },

    attributeByName : function(name)
    {
        if (this.expired())
            return null;

        var typeId = XML3DScene.configuration[this.typeName][name].type;
        return new XML3DAttribute(name, typeId, this);
    },

    getAttributeByIndex : function(index)
    {
        return null;
    },

    removeAttribute : function(index)
    {
        return false;
    },

    hasComponent : function(type, name)
    {
        // XML3D allows mutliple "same" elements to be inserted
        return false;
    },

    // unused currently for XML3D
    getComponent : function(type, name)
    {
        return null;
    },

    componentById : function(componentId)
    {
        if (this.expired())
            return null;

        if (componentId === this.id)
            return this;

        var component = XML3DScene.elementById($(this._ptr), componentId);
        if (isNotNull(component))
            return new XML3DElement(component);

        return null;
    },

    removeComponent : function(componentId)
    {
        if (this.expired())
            return;

        var component = XML3DScene.elementById($(this._ptr), componentId);
        if (isNotNull(component))
            $(component).remove();
    }

    // TODO: Implement when DOM change events fixed in XML3D codebase
    /* 
    onComponentCreated : function(context, callback)
    {
        this.registerCallback("onComponentCreated", context, callback);

        return {
            ptr : $(this._ptr),
            eventName : "DOMNodeInserted"
        };
    },

    onComponentRemoved : function(context, callback)
    {
        this.registerCallback("onComponentRemoved", context, callback);

        return {
            ptr : $(this._ptr),
            eventName : "DOMNodeRemoved"
        };
    },

    _onComponentCreated : function(jsMutationEvent)
    {
        
    },

    _onComponentRemoved : function(jsMutationEvent)
    {

    }
    */
});

var XML3DAttribute = AttributeWrapper.$extend(
{
    __classvars__ : 
    {
        String : 0,
        Number : 1,
        Tuple2 : 2,
        Tuple3 : 3,
        Tuple4 : 4,
        Boolean: 5,
        Array : 6,
        NTuple : 7,
        MeshTypes : 10,
        TextureTypes : 11,
        FilterTypes : 12,
        WrapTypes : 13,
        DataFieldType : 14,
        DataChannelOrigin : 15,

    },

    __init__ : function(name, typeId, owner)
    {
        this.$super(-1, typeId, name, owner);
        this.parentType = owner.typeName;
        if (typeId !== XML3DAttribute.Array)
            this._ptr = owner._ptr.getAttributeNode(name);
    },

    fromString : function(str)
    {
        if (this.typeId === XML3DAttribute.Tuple2 ||
            this.typeId === XML3DAttribute.Tuple3 || 
            this.typeId === XML3DAttribute.Tuple4)
        {
            var tuple = str.split(" ");
            var result = {};
            var axes = ["x", "y", "z", "w"];
            for (var i = 0; i < tuple.length; i++)
                result[axes[i]] = parseFloat(tuple[i]);

            return result;
        }
        else if (this.typeId === XML3DAttribute.Number)
            return parseFloat(str);
        else if (this.typeId === XML3DAttribute.Boolean)
        {
            if (str !== "")
                return (str === "true" ? true : false);
            else
                return false;
        }
        else
            return str;
    },

    toString : function(value)
    {
        var str = "";
        if (value instanceof Array)
            str = value.join(" ");
        else if (this.typeId === XML3DAttribute.Tuple2 ||
            this.typeId === XML3DAttribute.Tuple3 || 
            this.typeId === XML3DAttribute.Tuple4)
        {
            for (var i in value)
            {
                str += value[i] + " ";
            }
            str = str.substring(0, str.length - 1);
        }

        else if (this.typeId === XML3DAttribute.Boolean)
            str = (value === true ? "true" : "false");
        else
            str = value;

        return str;
    },

    validValues : function()
    {
        var result = [];
        var values = XML3DScene.configuration[this.parentType][this.name].allowedValues;
        if (isNull(values))
            return null;

        for (var i in values)
        {
            if (/^\d+$/.test(i))
                result.push(values[i]);
        }

        return result;
    },

    get : function()
    {
        if (this.typeId === XML3DAttribute.Array)
            return this.owner._ptr.textContent;

        if (this.expired())
        {
            var value = XML3DScene.configuration[this.parentType][this.name].value;
            return this.fromString(this.toString(value))
        }
        else
            return this.fromString(this._ptr.value);
    },

    set : function(value)
    {
        if (this.typeId === XML3DAttribute.Array)
            this.owner._ptr.textContent = value;
        else
        {
            this.owner._ptr.setAttribute(this.name, this.toString(value));
            this._ptr = this.owner._ptr.getAttributeNode(name);
        }
    }
});

var XML3DRaycastResult = RaycastResult.$extend(
{
    __init__ : function(hitNode)
    {
        this.$super();

        if (isNotNull(hitNode))
        {
            var parentGroup = getParentGroup(hitNode);
            this.entity = new XML3DElement(parentGroup);
            this.component = new XML3DElement(hitNode);
        }

        // TODO: Implement when XML3D has getElementByRay implemented
        // this.pos = raycastResult.pos;
        // this.distance = raycastResult.distance;
        // this.submesh = raycastResult.submesh;
        // this.faceIndex = raycastResult.faceIndex;
        // this.ray = raycastResult.ray;
    }
});

var XML3DEditor = IEditor.$extend(
{
    __init__ : function(mainContentDiv, canvasId)
    {
        this.canvas = $("#" + canvasId);
        this.mainContent = $("#" + mainContentDiv);

        this.$super();

        this.ui.sceneTree.addEntityButton.button("option", "label", "Add new element...");
        this.ui.ecEditor.addCompButton.button("option", "label", "Add new child element");
    },

    width : function()
    {
        return this.canvas.width();
    },

    height : function()
    {
        return this.canvas.height();
    },

    container : function()
    {
        return this.mainContent;
    },

    addWidget : function(element)
    {
        this.mainContent.append(element);
    },

    onAddEntityClicked : function()
    {
        var sceneTree = $("#scene-tree-holder");
        if (isNull(sceneTree))
            return;

        var activeNode = sceneTree.fancytree("getActiveNode");

        var inputNewElementId = "input-newElementName";
        var comboElementTypeId = "combobox-elementList";
        var draggableElementsId = "draggableList-elements";
        var buttons = {
            "Add element" : function()
            {
                var childrenElements = [];
                var droppedElements = $(this).find("div[id^='dropped-']");
                for (var i = 0; i < droppedElements.length; i++)
                    childrenElements.push($(droppedElements[i]).data("dropData"));

                var elementName = $("#" + inputNewElementId).val();
                var elementType = $("#" + comboElementTypeId).find(":selected").text();
                var elementPtr = IEditor.scene.createElement(elementType, childrenElements);
                if (elementName !== "")
                    elementPtr.setName(elementName);

                $(this).dialog("close");
                $(this).remove();

                /// XML3D workaround. TODO: remove when XML3D fixes DOM changes events propagition!
                if (!IEditor.scene.isRegistered("onEntityCreated"))
                    IEditor.Instance.onEntityCreated(elementPtr);
            },
            "Cancel" : function()
            {
                $(this).dialog("close");
                $(this).remove();
            }
        }
        var elementNames = [];
        var registeredElements = IEditor.scene.registeredComponents();
        for (var i = 0; i < registeredElements.length; i++)
            elementNames.push(registeredElements[i].name);

        var draggableChildrenLabel = "Available child elements";
        var draggableNoChildLabel = "<i>No children available for this element</i>";
        var draggableLabel = elementNames.length === 0 ? draggableNoChildLabel : draggableChildrenLabel;

        var dialog = new ModalDialog("AddElement", "Add new element", 550, 200);
        var dialogComboBox = dialog.appendComboBox(comboElementTypeId, "Select element type", registeredElements);
        dialog.appendInputBox(inputNewElementId, "Name this element (optional)", "string");
        var draggableList = dialog.appendDraggableList(draggableElementsId, draggableLabel, elementNames);
        var droppable = dialog.appendDroppable("droppable-elements", "Drag the elements you want to be added as children of this element", true);
        dialog.addButtons(buttons);

        dialogComboBox.on("change", function(){
            draggableList.empty();
            droppable.empty();

            var selected = $(this).find(":selected").text();
            var registeredElems = IEditor.scene.registeredComponents(selected);
            var availableChildren = [];
            for (var i = 0; i < registeredElems.length; i++)
                availableChildren.push(registeredElems[i].name);

            draggableLabel = availableChildren.length === 0 ? draggableNoChildLabel : draggableChildrenLabel;
            dialog.appendDraggableList(draggableElementsId, draggableLabel, availableChildren);

            var droppableLabel = $("#label-droppable-elements");
            if (availableChildren.length === 0)
            {
                droppable.hide();
                droppableLabel.hide();
            }
            else
            {
                droppable.show();
                droppableLabel.show();
            }
        });

        dialog.exec();
    },

    onAddComponentClicked : function()
    {
        var entityId = $(this).data("targetEntity");
        if (isNull(entityId))
            return;

        var entityPtr = IEditor.scene.entityById(entityId);
        if (isNull(entityPtr))
            return;

        var registeredComponents = IEditor.scene.registeredComponents(entityPtr.typeName);
        var dialog = new ModalDialog("AddElement", "Add new child element", 450, 250);
        var comboboxElements = dialog.appendComboBox("combobox-elementList", "Select element type:   ", registeredComponents);
        var inputCompName = dialog.appendInputBox("input-newElementName", "Name this element (optional):", "string");

        var buttons = {
            "Add element" : function()
            {
                var compTypeName = comboboxElements.find(":selected").text();
                var compName = inputCompName.val();

                var newComponent = entityPtr.createComponent(compTypeName, compName);

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

    createTreeItemForEntity : function(entityPtr, parentNode)
    {
        this.createTreeItemForElement(entityPtr, parentNode);
    },

    createTreeItemForComponent : function(componentPtr, parentNode)
    {
        this.createTreeItemForElement(componentPtr, parentNode)
    },

    createTreeItemForElement : function(elementPtr, parentNode)
    {
        var childNode = parentNode.addChildren({
            title : this.getNodeTitleForElement(elementPtr),
            key : "sceneNode-" + elementPtr.id
        });

        var components = elementPtr.components();
        for (var i = 0; i < components.length; i++)
            this.createTreeItemForElement(components[i], childNode);
    },

    removeTreeItem : function(entityPtr, componentPtr)
    {
        var node = null;
        if (isNotNull(componentPtr))
            node = this.ui.sceneTree.holder.fancytree("getNodeByKey", "sceneNode-" + componentPtr.id);
        else
            node = this.ui.sceneTree.holder.fancytree("getNodeByKey", "sceneNode-" + entityPtr.id);

        if (isNotNull(node))
            node.remove();
    },

    registerKeyEventCallback : function(context, callback)
    {
        this.registerCallback("onKeyEvent", context, callback);
        $(document).keydown(this.onKeyEvent.bind(this));
    },

    registerMouseEventCallback : function(context, callback)
    {
        this.registerCallback("onMouseEvent", context, callback);
        this.canvas.mousedown(this.onMouseEvent.bind(this));
    },

    registerResizeEventCallback : function(context, callback)
    {
        this.registerCallback("onResizeEvent", context, callback);
        $(window).resize(this.onResizeEvent.bind(this));
    },

    registerSceneObject : function()
    {
        return new XML3DScene(this.canvas.attr("id"));
    },

    onKeyEvent : function(keyEvent)
    {
        this.callback("onKeyEvent", new XML3DKeyEvent(keyEvent));
    },

    onMouseEvent : function(mouseEvent)
    {
        this.callback("onMouseEvent", new XML3DMouseEvent(mouseEvent));
    },

    onResizeEvent : function(jqResizeEvent)
    {
        this.callback("onResizeEvent", this.mainContent.width(), this.mainContent.height());
    }
});