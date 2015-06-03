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

var CreateElementCommand = ICommand.$extend(
{
    __init__ : function(scenePtr, elemType, children, name, parentId)
    {
        if (isNull(children) || !(children instanceof Array))
            children = [];
        if (isNull(name))
            name = "";

        var commandLabel = "+add element of type " + elemType;
        if (name !== "")
            commandLabel += " named " + name;

        this.$super(commandLabel);

        this.scenePtr = scenePtr;
        this.elemType = elemType;
        this.children = children;
        this.name = name;
        this.parentId = parentId;
        this.id = 0;
        this.elementStr = "";
    },

    exec : function()
    {
        var elementPtr = null;
        if (this.elementStr === "")
        {
            elementPtr = this.scenePtr.createElement(this.id, this.elemType, this.children, this.name, this.parentId);
            if (isNotNull(elementPtr))
                this.id = elementPtr.id;
        }
        else
            this.scenePtr.deserializeFrom(this.elementStr);

        if (isNull(elementPtr))
            elementPtr = this.scenePtr.entityById(this.id);
    },

    undo : function()
    {
        var elementPtr = this.scenePtr.entityById(this.id);
        var parentElement = this.scenePtr.entityById(elementPtr.parentId());

        this.elementStr = elementPtr.serialize();
        this.scenePtr.removeEntity(this.id);
    }
});

var RemoveElementCommand = ICommand.$extend(
{
    __init__ : function(scenePtr, elementPtr)
    {
        var commandLabel = "-remove element of type " + elementPtr.typeName;
        if (name !== "")
            commandLabel += " named " + elementPtr.getName();

        this.$super(commandLabel);

        this.scenePtr = scenePtr;
        this.id = elementPtr.id;
        this.elementStr = "";
    },

    exec : function()
    {
        var elementPtr = this.scenePtr.entityById(this.id);
        if (isNotNull(elementPtr))
        {
            this.elementStr = elementPtr.serialize();
            this.scenePtr.removeEntity(this.id);
        }
    },

    undo : function()
    {
        this.scenePtr.deserializeFrom(this.elementStr);
    }
});

var ChangeAttributeCommand = ICommand.$extend(
{
    __init__ : function(scenePtr, attributePtr, value)
    {
        this.$super("*edit " + attributePtr.name);

        this.scenePtr = scenePtr;
        this.oldValue = attributePtr.get();
        this.newValue = value;
        this.name = attributePtr.name;
        this.typeId = attributePtr.typeId;

        this.ownerId = attributePtr.owner.id;
    },

    set : function(value)
    {
        var ownerPtr = this.scenePtr.entityById(this.ownerId);
        if (isNull(ownerPtr))
            return;

        var attributePtr = ownerPtr.attributeByName(this.name);
        if (isNull(attributePtr))
            return;

        attributePtr.set(value);
    },

    exec : function()
    {
        this.set(this.newValue);
    },

    undo : function()
    {
        this.set(this.oldValue);
    }
});

var CreatePrimitiveCommand = ICommand.$extend(
{
    __init__ : function(scenePtr, primitiveType, meshRef)
    {
        this.$super("+add " + primitiveType);
        this.scenePtr = scenePtr;
        this.type = primitiveType;
        this.ref = meshRef;
        this.id = 0;
        this.transformId = 0;
    },

    exec : function()
    {
        var element = this.scenePtr.createElement(this.id, "group", [], this.type, null);
        if (isNull(element))
            return;

        this.id = element.id;
        var meshComp = element.createComponent("mesh", "", false, 0);
        if (isNull(meshComp))
            return;

        var meshRefAttr = meshComp.attributeByName("src");
        if (isNull(meshRefAttr))
            return;

        meshRefAttr.set(this.ref);

        var transform = XML3D.tools.MotionFactory.createTransformable(element._ptr);
    },

    undo : function()
    {
        var element = this.scenePtr.entityById(this.id);
        this.scenePtr.removeEntity(this.id);
    }
});

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

        this.originalEvent = keyEvent.originalEvent;
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
        freeId : 1,

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
        this.$super();
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

                var attrLowerCase = j.toLowerCase();
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

                    conf[i][attrLowerCase] = {};
                    conf[i][attrLowerCase]["type"] = type;
                    conf[i][attrLowerCase]["value"] = value;
                    conf[i][attrLowerCase]["allowedValues"] = allowedValues;
                }
                else if (isNotNull(a) && (j != "className") && (a === XML3D.ReferenceHandler))
                {
                    conf[i][attrLowerCase] = {};
                    conf[i][attrLowerCase]["type"] = XML3DAttribute.String;
                    conf[i][attrLowerCase]["value"] = "";
                    conf[i][attrLowerCase]["allowedValues"] = null;
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
                    conf[i][attrLowerCase] = {};
                    conf[i][attrLowerCase]["type"] = XML3DAttribute.Array;
                    conf[i][attrLowerCase]["value"] = "";
                    conf[i][attrLowerCase]["allowedValues"] = null;
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

        var observer = new MutationObserver(this.onMutation.bind(this));
        observer.observe(this.canvasDOM, {
            childList : true,
            attributes : true,
            subtree : true
        });
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

    createEntity : function(id, components)
    {
        return this.createElement(id, "group", components);
    },

    createElement : function(id, type, children, name, parentId)
    {
        if (isNotNull(id))
        {
            if (id === 0)
                id = XML3DScene.nextId();
        }
        else
            id = XML3DScene.nextId();

        var parent = isNull(parentId) ? this.canvasDOM : XML3DScene.elementById(this.canvas, parentId);
        var element = document.createElement(type);
        $(element).data("editorId", id);

        parent.appendChild(element);
        var newElement = new XML3DElement(element);
        newElement.setName(name);

        if (isNotNull(children) && children instanceof Array)
            for (var i = 0; i < children.length; i++)
                newElement.createComponent(children[i], "");

        return newElement;  
    },

    removeEntity : function(entityId)
    {
        var result = XML3DScene.elementById(this.canvas, entityId);
        if (isNotNull(result))
            result.parentNode.removeChild(result);
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

    deserializeFrom : function(str)
    {
        var element = JSON.parse(str);
        var elementPtr = this.entityById(element.id);
        if (isNull(elementPtr))
            elementPtr = this.createElement(element.id, element.type, [], element.name, element.parentId);

        if (isNotNull(elementPtr))
            elementPtr.deserialize(element);
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

    isAttributeBool : function(attrTypeId)
    {
        return (attrTypeId === XML3DAttribute.Boolean);
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

    onMutation : function(mutations, observer)
    {
        for (var i = 0; i < mutations.length; ++i)
        {
            if (mutations[i].type === "attributes")
                this._onAttributeChanged(mutations[i]);
            else if (mutations[i].type === "childList")
            {
                if (mutations[i].addedNodes.length != 0)
                    this.onAddedNodes(mutations[i]);
                else if (mutations[i].removedNodes.length != 0)
                    this.onRemovedNodes(mutations[i]);
            }
        }
    },

    onAddedNodes : function(mutationRecord)
    {
        for (var i = 0; i < mutationRecord.addedNodes.length; ++i)
        {
            var node = mutationRecord.addedNodes[i];
            if (node instanceof Text)
            {
                this._onValueAttributeChanged(node);
                return;
            }

            var parentNode = getParentGroup(node);

            if (isNull(parentNode))
                this._onEntityCreated(node);
            else
            {
                if (parentNode === this.canvasDOM)
                    this._onEntityCreated(node);
                else
                    this._onComponentCreated(parentNode, node);
            }
        }
    },

    onRemovedNodes : function(mutationRecord)
    {
        for (var i = 0; i < mutationRecord.removedNodes.length; ++i)
        {
            var node = mutationRecord.removedNodes[i];
            if (node instanceof Text)
            {
                this._onValueAttributeChanged(node);
                return;
            }

            var parentNode = getParentGroup(node);

            if (isNull(parentNode))
                this._onEntityRemoved(node);
            else
            {
                if (parentNode === this.canvasDOM)
                    this._onEntityRemoved(node);
                else
                    this._onComponentRemoved(parentNode, node);
            }
        }
    },

    entityCreated : function(context, callback)
    {
        this.registerCallback("onEntityCreated", context, callback);
    },

    entityRemoved : function(context, callback)
    {
        this.registerCallback("onEntityRemoved", context, callback);
    },

    componentCreated : function(context, callback)
    {
        this.registerCallback("onComponentCreated", context, callback);
    },

    componentRemoved : function(context, callback)
    {
        this.registerCallback("onComponentRemoved", context, callback);
    },

    attributeChanged : function(context, callback)
    {
        this.registerCallback("onAttributeChanged", context, callback);
    },

    _onEntityCreated : function(element)
    {
        this.callback("onEntityCreated", new XML3DElement(element));
    },

    _onEntityRemoved : function(element)
    {
        this.callback("onEntityRemoved", new XML3DElement(element));
    },

    _onComponentCreated : function(parentGroup, element)
    {
        var entityPtr = null;
        var componentPtr = new XML3DElement(element);

        if (parentGroup === this.canvasDOM)
            entityPtr = componentPtr;
        else
            entityPtr = new XML3DElement(parentGroup);

        this.callback("onComponentCreated", entityPtr, componentPtr);
    },

    _onComponentRemoved : function(parentGroup, element)
    {
        var entityPtr = null;
        var componentPtr = new XML3DElement(element);

        if (parentGroup === this.canvasDOM)
            entityPtr = componentPtr;
        else
            entityPtr = new XML3DElement(parentGroup);

        this.callback("onComponentRemoved", entityPtr, componentPtr);
    },

    _onAttributeChanged : function(mutationRecord)
    {
        var componentNode = mutationRecord.target;
        var parentGroup = getParentGroup(componentNode);

        var entityPtr = null;
        var componentPtr = new XML3DElement(componentNode);

        if (parentGroup === this.canvasDOM)
            entityPtr = componentPtr;
        else
            entityPtr = new XML3DElement(parentGroup);

        var attributeName = mutationRecord.attributeName;
        var attributeValue = componentNode.getAttribute(attributeName);
        var attributeIndex = -1;

        this.callback("onAttributeChanged", entityPtr, componentPtr, attributeIndex, attributeName, attributeValue);
    },

    _onValueAttributeChanged : function(node)
    {
        var componentNode = node.parentNode;
        var parentGroup = getParentGroup(componentNode);

        var entityPtr = null;
        var componentPtr = new XML3DElement(componentNode);

        if (parentGroup === this.canvasDOM)
            entityPtr = componentPtr;
        else
            entityPtr = new XML3DElement(parentGroup);

        var attributeName = "value"
        var attributeValue = node.textContent;
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

    isAncestorOf : function(entityPtr)
    {
        var parentId = entityPtr.parentId();
        if (isNull(parentId))
            return false;
        else if (parentId === this.id)
            return true;
        else
            return this.isAncestorOf(IEditor.scene.entityById(parentId));
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

    serialize : function()
    {
        var result = {};

        result.id = this.id;
        result.name = this.getName();
        result.type = this.typeName;
        result.parentId = this.parentId();

        result.attributes = [];
        var attrs = this.attributes();
        for (var i = 0; i < attrs.length; i++)
            result.attributes.push(attrs[i].serialize());

        result.children = [];
        var comps = this.components();
        for (var i = 0; i < comps.length; i++)
            result.children.push(comps[i].serialize());

        return JSON.stringify(result);
    },

    deserialize : function(element)
    {
        for (var i = 0; i < element.attributes.length; i++)
        {
            var attribute = JSON.parse(element.attributes[i]);
            var attrPtr = this.attributeByName(attribute.name);
            if (isNotNull(attrPtr))
                attrPtr.deserialize(attribute);
        }

        for (var i = 0; i < element.children.length; i++)
        {
            var child = JSON.parse(element.children[i]);
            var childPtr = this.createComponent(child.type, child.name, false, child.id);
            if (isNotNull(childPtr))
                childPtr.deserialize(child);
        }
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

    createComponent : function(typeName, name, isLocal, id)
    {
        if (this.expired())
            return null;

        if (isNotNull(id))
        {
            if (id === 0)
                id = XML3DScene.nextId();
        }
        else
            id = XML3DScene.nextId();

        var newComponent = document.createElement(typeName);
        $(newComponent).data("editorId", id);

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
        if (isNull(value))
            value = this.get();

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
    },

    serialize : function()
    {
        var result = {
            name : this.name,
            typeId : this.typeId,
            parentType : this.parentType,
            value : this.toString()
        };

        return JSON.stringify(result);
    },

    deserialize : function(attribute)
    {
        if (typeof(attribute) === "string")
            attribute = JSON.parse(attribute);

        this.set(this.fromString(attribute.value));
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
    __init__ : function(options)
    {
        if (isNull(options.mainContent))
        {
            console.error("The id to the main content div is required!");
            return;
        }
        if (isNull(options.canvas))
        {
            console.error("The id to the main XML3D canvas is required!");
            return;
        }

        this.canvas = $("#" + options.canvas);
        this.mainContent = $("#" + options.mainContent);

        if (isNull(options.resourcePath))
            this.resourcePath = "resources/";
        else
            this.resourcePath = options.resourcePath;

        if (this.resourcePath.charAt(this.resourcePath.length - 1) !== "/")
            this.resourcePath += "/";

        this.meshRefs = {
            "Ball" : this.resourcePath + "ball.xml#ball",
            "Cube" : this.resourcePath + "cube.xml#cube",
            "Cone" : this.resourcePath + "cone.xml#cone",
            "Cylinder" : this.resourcePath + "cylinder.xml#cylinder"
        };

        options.type = "xml3d";
        options.noSelectionString = "<i>(No elements selected)</i>";
        this.$super(options);

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
                IEditor.Instance.undoStack.pushAndExec(new CreateElementCommand(IEditor.scene, elementType, childrenElements, elementName));

                $(this).dialog("close");
                $(this).remove();
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

                IEditor.Instance.undoStack.pushAndExec(new CreateElementCommand(IEditor.scene, compTypeName, [], compName, entityPtr.id));

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
        var treeItem = this.ui.sceneTree.holder.fancytree("getNodeByKey", "sceneNode-" + elementPtr.id);
        if (isNotNull(treeItem))
            return;

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

    createPrimitive : function(type)
    {
        this.undoStack.pushAndExec(new CreatePrimitiveCommand(IEditor.scene, type, this.meshRefs[type]));
    },

    createMovable : function()
    {
        this.undoStack.pushAndExec(new CreateElementCommand(IEditor.scene, "group", [], "movable", null));
    },

    createDrawable : function()
    {
        this.undoStack.pushAndExec(new CreateElementCommand(IEditor.scene, "group", ["mesh"], "drawable", null));
    },

    createScript : function()
    {
        this.undoStack.pushAndExec(new CreateElementCommand(IEditor.scene, "script", [], "script", null));
    },

    initTransformEditor : function()
    {
        // this.transformEditor = new TransformEditor();
    },

    removeEntityCommand : function(elementPtr)
    {
        this.undoStack.pushAndExec(new RemoveElementCommand(IEditor.scene, elementPtr));
    },

    removeComponentCommand : function(elementPtr)
    {
        this.removeEntityCommand(elementPtr);
    },

    changeAttributeCommand : function(attributePtr, value)
    {
        this.undoStack.pushAndExec(new ChangeAttributeCommand(IEditor.scene, attributePtr, value));
    },

    registerKeyEventCallback : function(context, callback)
    {
        this.registerCallback("onKeyEvent", context, callback);
        $(document).keydown(this.onKeyEvent.bind(this));
    },

    registerMouseEventCallback : function(context, callback)
    {
        this.registerCallback("onMouseEvent", context, callback);
        this.canvas[0].addEventListener("mousedown", this.onMouseEvent.bind(this), false);
    },

    registerResizeEventCallback : function(context, callback)
    {
        this.registerCallback("onResizeEvent", context, callback);
        window.addEventListener("resize", this.onResizeEvent.bind(this), false);
    },

    registerSceneObject : function()
    {
        return new XML3DScene(this.canvas.attr("id"));
    },

    save : function(filename)
    {
        var xml3dString = new XMLSerializer().serializeToString(this.canvas[0]);
        var blob = new Blob([vkbeautify.xml(xml3dString)], {type: "text/xml;charset=utf-8"});
        saveAs(blob, filename + ".xml");
    },

    onKeyEvent : function(keyEvent)
    {
        this.callback("onKeyEvent", new XML3DKeyEvent(keyEvent));
    },

    onMouseEvent : function(mouseEvent)
    {
        this.callback("onMouseEvent", new XML3DMouseEvent(mouseEvent));
    },

    onResizeEvent : function(resizeEvent)
    {
        this.callback("onResizeEvent", this.container().width(), this.container().height());
    }
});

var TransformEditor = Class.$extend(
{
    __init__ : function()
    {
        this.gizmo = null;
        this.targetTransform = null;
        this.mode = "translate";
    },

    setMode : function(mode)
    {
        this.clearSelection();
        this.createGizmo(mode);
    },

    createGizmo : function(mode)
    {
        if (mode == undefined)
            mode = this.mode;

        switch(mode)
        {
            case "translate":
                this.gizmo = new XML3D.tools.interaction.widgets.TranslateGizmo("interfaceDesignerGizmo", { target: this.targetTransform });
                this.gizmo.attach();
                break;
            case "rotate":
                this.gizmo = new XML3D.tools.interaction.widgets.RotateGizmo("interfaceDesignerGizmo", { 
                    target: this.targetTransform,
                    geometry: {
                        scale: new XML3DVec3(2,2,2),
                        bandWidth: 1.1
                    }});
                this.gizmo.attach();
                break;
        }
    },

    setTargetEntity : function(entity)
    {
        this.clearSelection();
        if (isNull(entity))
            return;

        var targetGroup = $("#" + entity.name)[0];
        this.targetTransform = XML3D.tools.MotionFactory.createTransformable(targetGroup);
        this.createGizmo();
    },

    clearSelection : function()
    {
        if (this.gizmo != null)
        {
            this.gizmo.detach();
            this.gizmo = null;
        }
    }
});