function getParentGroup(childNode)
{
    var parentGroup = childNode;
    while(isNotNull(parentGroup) && parentGroup.localName !== "group")
        parentGroup = parentGroup.parentNode;

    return parentGroup;
}

function getChildrenGroups(parentNode)
{
    var result = [];
    var children = $(parentNode).children();
    for (var i = 0; i < children.length; i++)
        if (children[i].localName === "group")
            result.push(new XML3DEntity(children[i]));

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

        configuration : {}
    },

    __init__ : function(canvasId)
    {
        this.$super();

        this.canvas = $("#" + canvasId);
        this.canvasDOM = document.getElementById(canvasId);

        // Assign an 'application-specific' id to all elements
        this.canvas.find("*").each(function(index)
        {
            $(this).data("editorid", XML3DScene.nextId());
        });

        var allClasses = XML3D.classInfo;
        var conf = XML3DScene.configuration;

        for (var i in allClasses)
        {
            conf[i] = {};
            conf[i]["id"] = {};
            conf[i]["id"].type = XML3DAttribute.String;
            conf[i]["id"].value = "";

            conf[i]["class"] = {};
            conf[i]["class"].type = XML3DAttribute.String;
            conf[i]["class"].value = "";

            conf[i]["style"] = {};
            conf[i]["style"].type = XML3DAttribute.String;
            conf[i]["style"].value = "";

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

                            value = params.d;
                        }
                    }

                    conf[i][j] = {};
                    conf[i][j]["type"] = type;
                    conf[i][j]["value"] = value;
                }
                else if (isNotNull(a) && (j != "className") && (a === XML3D.ReferenceHandler))
                {
                    conf[i][j] = {};
                    conf[i][j]["type"] = XML3DAttribute.String;
                    conf[i][j]["value"] = "";
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
                }
            }
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

        if (isNotNull(result));
            return new XML3DEntity(result);

        return null;
    },

    createEntity : function(components)
    {
        var groupElement = document.createElement("group");
        var newEntity = new XML3DEntity(groupElement);
        this.canvasDOM.appendChild(groupElement);

        if (isNotNull(components) && components instanceof Array)
            for (var i = 0; i < components.length; i++)
                newEntity.createComponent(components[i], "");

        return new XML3DEntity(groupElement);
    },

    removeEntity : function(entityId)
    {
        var result = XML3DScene.elementById(this.canvas, entityId);

        if (isNotNull(result))
            $(result).remove();
    },

    registeredComponents : function()
    {
        var result = [];
        for (var i in XML3D.classInfo)
            result.push(
                {
                    typeName : i,
                    typeId : 0
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
                attrTypeId === XML3DAttribute.Array ||
                attrTypeId >= 10);
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

        var entityPtr = new XML3DEntity(parentGroup);
        var componentPtr = new XML3DComponent(componentNode, entityPtr);
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

var XML3DEntity = EntityWrapper.$extend(
{
    __init__ : function(entityPtr)
    {
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

        var fixedCompId = entity.data("fixedComponentId");
        if (isNull(fixedCompId))
        {
            fixedCompId = XML3DScene.nextId();
            entity.data("fixedComponentId", fixedCompId);
        }

        this.$super(id, name, false, false);
        this._ptr = entityPtr;
        this.fixedComponentId = fixedCompId;
    },

    parentId : function()
    {
        return $(this._ptr).parent().data("editorId");
    },

    children : function()
    {
        if (this.expired())
            return [];

        return getChildrenGroups(this._ptr);
    },

    setName : function(name)
    {
        $(this._ptr).attr("id", name);
    },

    getName : function()
    {
        var name = $(this._ptr).attr("id");
        return isNull(name) ? "" : name;
    },

    numberOfComponents : function()
    {
        var result = 1;
        if (this.expired())
            return result;

        var children = $(this._ptr).children();
        for (var i = 0; i < children.length; i++)
            if (children[i].localName !== "group")
                ++result;

        return result;
    },

    components : function()
    {
        var result = [];
        result.push(new XML3DFixedComponent(this));

        if (this.expired())
            return result;

        var children = $(this._ptr).children();
        for (var i = 0; i < children.length; i++)
            if (children[i].localName !== "group")
                result.push(new XML3DComponent(children[i], this));

        return result;
    },

    createComponent : function(typeName, name, isLocal)
    {
        if (this.expired())
            return null;

        var newComponent = document.createElement(typeName);
        if (name )
        if (XML3DComponent.isValueElement(typeName))
            newComponent.setAttribute("name", name);
        else
            newComponent.setAttribute("id", name);

        this._ptr.appendChild(newComponent);

        return new XML3DComponent(newComponent, this);
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

        var fixedCompId = $(this._ptr).data("fixedComponentId");
        if (isNotNull(fixedCompId) && componentId === fixedCompId)
            return new XML3DFixedComponent(this);

        var component = XML3DScene.elementById($(this._ptr), componentId);
        if (isNotNull(component))
            return new XML3DComponent(component, this);

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

var XML3DComponent = ComponentWrapper.$extend(
{
    __classvars__ :
    {
        dataTypes : ["int", "int4", "float", "float2", "float3", "float4", "float4x4", "bool"],
        isValueElement : function(elementName)
        {
            for (var i in XML3DComponent.dataTypes)
            {
                if (XML3DComponent.dataTypes[i] === elementName)
                    return true;
            }

            return false;
        },

        create : function(typeName)
        {

        }
    },

    __init__ : function(componentPtr, parentEntity)
    {
        var component = $(componentPtr);
        var id = "";
        if (isNotNull(component.data("editorId")))
            id = component.data("editorId");
        else
        {
            id = XML3DScene.nextId();
            component.data("editorId", id);
        }

        var name = "";
        if (XML3DComponent.isValueElement(componentPtr.localName))
            name = component.attr("name");
        else
            name = component.attr("id");

        if (isNull(name))
            name = "";

        this.$super(id, name, componentPtr.localName, parentEntity.id);
        this._ptr = componentPtr;
    },

    isDynamic : function()
    {
        return false;
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

    createAttribute : function(typeId, name)
    {
        if (this.expired())
            return false;

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
        if (this.expired())
            return null;

        return null;
    },

    removeAttribute : function(index)
    {
        if (this.expired())
            return false;

        return false;
    },

    onAttributeChanged : function(context, callback)
    {
        if (this.expired())
            return 0;

        this.registerCallback("onAttributeChanged", context, callback);
        $(this._ptr).on("DOMAttrModified", this._onAttributeChanged.bind(this));

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

        var entityPtr = new XML3DEntity(parentGroup);
        var componentPtr = new XML3DComponent(componentNode, entityPtr);
        var attributeName = mutationEvent.attrName;
        var attributeValue = mutationEvent.newValue;
        var attributeIndex = -1;

        this.callback("onAttributeChanged", entityPtr, componentPtr, attributeIndex, attributeName, attributeValue);
    }
});

// A placeholder component for the group attributes
var XML3DFixedComponent = ComponentWrapper.$extend(
{
    __init__ : function(entityPtr)
    {
        var id = entityPtr.fixedComponentId;
        var name = "Group attributes";
        var typeName = "fixed";
        var parentId = entityPtr.id;

        this.$super(id, name, typeName, parentId);

        this._ptr = entityPtr._ptr;
        this.isFixed = true;
    },

    isDynamic : function()
    {
        return false;
    },

    attributes: function()
    {
        var result = [];
        if (this.expired())
            return result;

        var conf = XML3DScene.configuration["group"];
        for (var i in conf)
            result.push(new XML3DAttribute(i, conf[i].type, this));

        return result;
    },

    attributeByName : function(name)
    {
        if (this.expired())
            return null;

        var typeId = XML3DScene.configuration["group"][name].type;
        return new XML3DAttribute(name, typeId, this);
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
        this.parentType = owner.isFixed ? "group" : owner.typeName;
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
            this.entity = new XML3DEntity(parentGroup);
            this.component = new XML3DComponent(hitNode, this.entity);
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