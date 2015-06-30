/**
    Global available functions. Not an actual object, used only to store all the globally available methods and variables for documentation purposes.
    @class (global)
*/

/**
    Checks if the object is null or undefined
    @function
    @memberof (global)
    @param {*} ptr The object to be checked
    @return {boolean} - true if null or undefined, false otherwise
    @example
    * if (isNull(someObject))
    *     console.log("someObject is null");
*/
function isNull(ptr)
{
    return (ptr === undefined || ptr === null);
}

/**
    Checks if the object is not null nor undefined
    @function
    @memberof (global)
    @param {*} ptr The object to be checked
    @return {boolean} - true if not null nor undefined, false otherwise
    @example
    * if (isNotNull(someObject))
    *     console.log("someObject is not null");
*/
function isNotNull(ptr)
{
    return !isNull(ptr);
}

/**
    Main method for wrapping.<br>
    For better performance, use this method when wrapping objects from the underlying system. This will create an instance of the wrapped object, or return an existing one.
    @function
    @memberof (global)
    @param {*} instanceType The class that the instance be made of.
    @param {*} ptr The object that should be wrapped
    @param {...*} [arguments] The arguments that the constructor of `instanceType` be called with
    @return {object} - Wrapped object
    @example
    * var object = new SomeObject();
    * var wrappedObject = __(SomeObject, object, params);
*/

function __()
{
    var instanceType = arguments[0];
    var ptr = arguments[1];
    if (ptr.InterfaceDesignerWrapper == undefined)
    {
        var args = [].slice.call(arguments, 1);
        var instance = Object.create(instanceType.prototype);
        instanceType.apply(instance, args);
        ptr.InterfaceDesignerWrapper = instance;
        return instance;
    }
    else
        return ptr.InterfaceDesignerWrapper;
}

var IWrapper = Class.$extend(
/** @lends IWrapper.prototype */
{
    /**
        Main wrapper interface. Every object in the interface designer is descendant of IWrapper.
        Provides the pointer to the main wrapped object, as well as registers and fires callbacks.
        @constructs
    */
    __init__ : function()
    {
        this._ptr = null;
        this.callbacks = {};
    },

    /** 
        Checks if the main wrapped object has expired, i.e. the pointer is not valid anymore
        @return {boolean}
    */
    expired : function()
    {
        return isNull(this._ptr);
    },

    /**
        Registers a callback for a custom event of your choice
        @param {string} eventType The type of event being registered
        @param {Object} context The context of the callback, i.e. the value of `this` pointer inside the body of the callback
        @param {Function} callback The callback to be called when the 'eventType' event is fired
    */
    registerCallback : function(eventType, context, callback)
    {
        if (isNull(this.callbacks[eventType]))
            this.callbacks[eventType] = [];

        this.callbacks[eventType].push({
            "context" : context,
            "callback" : callback
        });
    },

    /**
        Checks if a callback exists for `eventType`.
        @param {string} eventType The type of event being checked
        @return {boolean} - `true` if at least one callback has been registered, `false` otherwise
    */
    isRegistered : function(eventType)
    {
        return (isNotNull(this.callbacks[eventType]) && this.callbacks[eventType].length !== 0);
    },

    /**
        Unregisters all callbacks.
    */
    unregisterAll : function()
    {
        for (var i in this.callbacks)
            this.callbacks[i].length = 0;

        this.callbacks = {};
    },

    /**
        Executes the custom event `eventType`
        @param {string} eventType The type of event executed
        @param {...any} [arguments] The arguments that this callback needs to be called with 
    */
    callback : function(eventType)
    {
        if (isNull(this.callbacks[eventType]))
            return;

        var allRegistered = this.callbacks[eventType];
        if (allRegistered.length == 0)
            return;

        var args = [].slice.call(arguments, 1);
        for (var i = 0; i < allRegistered.length; i++)
        {
            var context = allRegistered[i].context;
            var callback = allRegistered[i].callback;

            callback.apply(context, args);
        }
    }
});

var SceneWrapper = IWrapper.$extend(
/** @lends SceneWrapper.prototype */
{
    /**
        Wrapper interface for the underlying scene object.<br>
        The scene object should provide access to manipulating the scene, such as entities and components, as well as scene events such as entity / component / attribute changes.
        @constructs
        @extends IWrapper
    */
    __init__ : function()
    {
        this.$super();
        /**
            String for displaying the entities in UI
            @type {string}
            @default "entity"
            @virtual
        */
        this.entityString = "entity";

        /**
            String for displaying the components in UI
            @type {string}
            @default "component"
            @virtual
        */
        this.componentString = "component";
    },

    /**
        Deserialize a scene described as JSON object.<br>
        The implementations of this method should re-create a whole scene from a JSON string.
        @param {string} jsonObject The JSON as string
        @virtual
    */
    deserializeFrom : function(jsonObject) {},


    /**
        Returns all entities present in the scene at the moment.<br>
        The implementation should return objects that inherit {@link EntityWrapper}
        @virtual
        @return {Array} - Array of {@link EntityWrapper} objects.
    */
    entities : function() {},

    /**
        Returns the entity for the given `entityId`.<br>
        The implementation should return an object that inherits {@link EntityWrapper}
        @param {number} entityId The ID of the entity to be queried
        @virtual
        @return {?EntityWrapper} - The entity with id `entityId` or `null` if no such entity exists.
    */
    entityById : function(entityId) {},

    /**
        Creates an entity.<br>
        The implementation should create an entity in the underlying system, then return a wrapped object that inherits {@link EntityWrapper}
        @param {number} id A unique ID of the entity to be created. By agreement, a value of 0 should mean that this ID should be generated
        @param {string[]} [components] An array of component type names
        @param {number} [change=0] Enumeration value of how the scene should react on the change when synchronization is implemented also.
        @param {boolean} [replicated=true] If this entity should be replicated to the server in systems where synchronization is implemented.
        @param {boolean} [componentsReplicated=true] If this entity's components should be replicated to the server in systems where synchronization is implemented.
        @virtual
        @return {?EntityWrapper} - The new created entity wrapper object.
    */
    createEntity : function(id, components, change, replicated, componentsReplicated) {},

    /**
        Removes an entity by given ID.<br>
        The implementation should remove the entity in the underlying system
        @param {number} entityId The ID of the entity to be removed
        @virtual
    */
    removeEntity : function(entityId) {},

    /**
        Returns a list of components that are available in the underlying system.<br>
        The implementation should get all component types from the underlying system and push them in an array.onization is implemented.
        @virtual
        @return {string[]} - A list of the component type names available.
    */
    registeredComponents : function() {},

    /**
        Returns if the underlying system allows components that share the same name.
        @virtual
        @return {boolean} - `true` if components can share a name, `false` otherwise
    */
    doesAllowSameNamedComponents : function() {},

    /**
        Perform a raycast.<br>
        The implementation of this method should execute a raycast on the underlying system's renderer.
        @param {number} [x] The X screen coordinate. If left out, it will be taken from the current mouse position.
        @param {number} [y] The Y screen coordinate. If left out, it will be taken from the current mouse position.
        @param {number} [selectionLayer=1] Selection layer that the objects will be checked for.
        @virtual
        @return {RaycastResult} - A {@link RaycastResult} object that contains information about the 3D object that has been intersected with the ray.
    */
    doRaycast : function(x, y, selectionLayer) {},

    /**
        Adds a prefix to the component type name.<br>
        The default implementation is that it will return the same component name that is provided as argument.<br>
        If the underlying system uses prefixes to differ component type names, this method should be implemented to reflect that.
        @param {string} componentName The name of the component
        @virtual
        @return {string} - Component name with prefix
    */
    componentNameWithPrefix : function(componentName)
    {
        return componentName;
    },

    /**
        Removes a prefix, or modifies the original component type name to be in human-readable format.<br>
        The default implementation is that it will return the same component type name that is provided as argument.<br>
        If the underlying system uses prefixes or other means to differ component type names, this method should be implemented to trim out the extra.
        @param {string} componentName The name of the component
        @virtual
        @return {string} - Component name with prefix
    */
    componentNameInHumanFormat : function(typeName)
    {
        return typeName;
    },

    /** 
        Returns an attribute name from given attribute type ID.<br>
        The implementation of this method should provide mapping from attribute type unique ID, to a human-readable attribute name string
        @param {number} attrTypeId The attribute type ID
        @virtual
        @return {string} - Attribute name
    */
    attributeTypeToName : function(attrTypeId) {},

    /** 
        Returns a list of all attribute type IDs.<br>
        The implementation of this method should provide a list of all attribute type IDs that are used from the underlying system.
        @virtual
        @return {number[]} - A list of attribute IDs
    */
    attributeTypeIds : function() {},

    /**
        Resets the scene.<br>
        The implementation of this method should clear, i.e. remove everything from the scene in the underlying system.
        @virtual
    */

    reset : function() {},

    /**
        Unsubscribe from a scene event.<br>
        The implementation of this method should unsubscribe from the scene events using the `subscription` object provided, if such mechanism is used.
        @param {object} subscription The subscription information.
        @virtual
    */
    unsubscribe : function(subscription) {},

    /**
        Returns if the attribute for a given type ID is an atomic value (not array, or object etc). The default implementation returns always false.<br>
        The implementation of this method should return a boolean if the attribute is atomic.
        @param {number} attrTypeId The attribute type ID.
        @virtual
        @return {boolean} - true if atomic, false otherwise
    */
    isAttributeAtomic : function(attrTypeId)
    {
        return false;
    },

    /**
        Returns if the attribute for a given type ID is a boolean value (true or false). The default implementation returns always false.<br>
        The implementation of this method should return a boolean if the attribute is a boolean.
        @param {number} attrTypeId The attribute type ID.
        @virtual
        @return {boolean} - true if boolean, false otherwise
    */
    isAttributeBool : function(attrTypeId)
    {
        return false;
    },

    /**
        Returns if the attribute for a given type ID is an array. The default implementation returns always false.<br>
        The implementation of this method should return a boolean if the attribute is an array.
        @param {number} attrTypeId The attribute type ID.
        @virtual
        @return {boolean} - true if array, false otherwise
    */
    isAttributeArray : function(attrTypeId)
    {
        return false;
    },

    /**
        Returns if the attribute for a given type ID is a Color object. The default implementation returns always false.<br>
        The implementation of this method should return a boolean if the attribute is a color object.
        @param {number} attrTypeId The attribute type ID.
        @virtual
        @return {boolean} - true if Color, false otherwise
    */
    isAttributeColor : function(attrTypeId)
    {
        return false;
    },

    /**
        Returns if the attribute for a given type ID is a Transform object. The default implementation returns always false.<br>
        The implementation of this method should return a boolean if the attribute is a Transform object.
        @param {number} attrTypeId The attribute type ID.
        @virtual
        @return {boolean} - true if Transform, false otherwise
    */
    isAttributeTransform : function(attrTypeId)
    {
        return false;
    },

    /**
        Returns if the attribute for a given type ID is a tuple of n-elements (commonly referred as Vector2, Vector3 etc). The default implementation returns always false.<br>
        The implementation of this method should return a boolean if the attribute is a tuple.
        @param {number} attrTypeId The attribute type ID.
        @virtual
        @return {boolean} - true if tuple, false otherwise
    */
    isAttributeTuple : function(attrTypeId)
    {
        return 0;
    },

    /**
        Returns if the attribute for a given type ID is an enumerated value. The default implementation returns always false.<br>
        The implementation of this method should return a boolean if the attribute is a enumeration.
        @param {number} attrTypeId The attribute type ID.
        @virtual
        @return {boolean} - true if enumeration, false otherwise
    */
    isAttributeEnum : function(attrTypeId)
    {
        return false;
    },

    /**
        Registers a callback for an 'entity created' event.<br>
        The implementation of this method should internally subscribe to the 'entity created' event internally using the {@link IWrapper} methods for callbacks, and execute the callback when the underlying system fires the event. 
        @param {object} context The object as context.
        @param {function} callback The callback to be called.
        @virtual
        @return {?object} - A subscription object if available.
    */
    entityCreated : function(context, callback) {},

    /**
        Registers a callback for an 'entity removed' event.<br>
        The implementation of this method should internally subscribe to the 'entity removed' event internally using the {@link IWrapper} methods for callbacks, and execute the callback when the underlying system fires the event. 
        @param {object} context The object as context.
        @param {function} callback The callback to be called.
        @virtual
        @return {?object} - A subscription object if available.
    */
    entityRemoved : function(context, callback) {},

    /**
        Registers a callback for an 'component created' event.<br>
        The implementation of this method should internally subscribe to the 'component created' event internally using the {@link IWrapper} methods for callbacks, and execute the callback when the underlying system fires the event. 
        @param {object} context The object as context.
        @param {function} callback The callback to be called.
        @virtual
        @return {?object} - A subscription object if available.
    */
    componentCreated : function(context, callback) {},

    /**
        Registers a callback for an 'component removed' event.<br>
        The implementation of this method should internally subscribe to the 'component removed' event internally using the {@link IWrapper} methods for callbacks, and execute the callback when the underlying system fires the event. 
        @param {object} context The object as context.
        @param {function} callback The callback to be called.
        @virtual
        @return {?object} - A subscription object if available.
    */
    componentRemoved : function(context, callback) {},

    /**
        Registers a callback for an 'attribute change' event.<br>
        The implementation of this method should internally subscribe to the 'attribute change' event internally using the {@link IWrapper} methods for callbacks, and execute the callback when the underlying system fires the event. 
        @param {object} context The object as context.
        @param {function} callback The callback to be called.
        @virtual
        @return {?object} - A subscription object if available.
    */
    attributeChanged : function(context, callback) {},

    // Log channels
    /**
        Log info on developer console
        @virtual
        @param {string} text The text to be printed in the console
    */
    logInfo : function(text) {},
    /**
        Log warning on developer console
        @virtual
        @param {string} text The text to be printed in the console
    */
    logWarning : function(text) {},
    /**
        Log error on developer console
        @virtual
        @param {string} text The text to be printed in the console
    */
    logError : function(text) {}
});


var EntityWrapper = IWrapper.$extend(
/** @lends EntityWrapper.prototype */
{
    /**
        Wrapper interface for an entity object. 
        The entity object should provide access to manipulating individual entities and its components.
        @constructs
        @extends IWrapper
    */
    __init__ : function(id, name, isLocal, isTemporary)
    {
        this.$super();

        /**
            Unique ID of the entity.
            @type {number}
            @default -1
        */
        this.id = isNull(id) ? -1 : id;
        /**
            Entity name.
            @type {string}
            @default ""
        */
        this.name = isNull(name) ? "" : name;

        /**
            Local or replicated entity.
            @type {boolean}
            @default false
        */
        this.local = isLocal;

        /**
            Temporary entity
            @type {boolean}
            @default false
        */
        this.temporary = isTemporary;
    },

    /** 
        Returns the parent ID of this entity, or null if not parented
        @virtual
        @return {?number} - The parent entity ID
    */
    parentId : function()
    {
        return null;
    },

    /** 
        Checks if this entity is ancestor of `entityPtr`.<br>
        @param {EntityWrapper} entityPtr The potential ancestor to be checked
        @virtual
        @return {boolean} - true if entity is ancestor of `entityPtr`, false otherwise
    */
    isAncestorOf : function(entityPtr)
    {
        return false;
    },

    /** 
        Serialize this entity into a JSON string.<br>
        The implementation should take care of the serialization in a way that will ensure it will stick to the {@link EntityWrapper} description.
        @virtual
        @return {string} - A stringified JSON from this entity
    */
    serialize : function() {},

    /** 
        Deserializes given JSON string to this entity.<br>
        The implementation should take care of the deserialization in a way that will ensure it will stick to the {@link EntityWrapper} description.
        @param {string} jsonObject The JSON string
        @virtual
    */
    deserialize : function(jsonObject) {},

    /** 
        Sets the entity name.<br>
        @param {string} name The desired name for this entity
        @virtual
    */
    setName : function(name) {},

    /** 
        Returns the entity name.<br>
        @return {string} - The current name for this entity
        @virtual
    */
    getName : function() {},

    /** 
        Returns the number of components that this entity has.<br>
        @return {number} - The number of components
        @virtual
    */
    numberOfComponents : function() {},

    /** 
        Returns an array of all components that this entity has.<br>
        @return {ComponentWrapper[]}
        @virtual
    */
    components : function() {},

    /** 
        Creates a component and sets this entity as its parent.<br>
        The implementation of this method should internally create a component to this entity.
        @param {string} typeName The type name for this component.
        @param {string} [name] The name for the component.
        @param {boolean} [isLocal=false] Set to true if the component is to be created local only, meaning that it won't be sent to the server if synchronization is implemented.
        @return {?ComponentWrapper} - The new created component, or null if creation fails
        @virtual
    */
    createComponent : function(typeName, name, isLocal) {},

    /** 
        Checks if the component with given type and name exists.<br>
        @param {string} type The type name for this component.
        @param {string} [name] The name for the component.
        @return {boolean} - 
        @virtual
    */
    hasComponent : function(type, name) {},

    /** 
        Retrieve a component with given type and name.<br>
        @param {string} type The type name for this component.
        @param {string} [name] The name for the component.
        @return {?ComponentWrapper} - The component, or null if not found
        @virtual
    */
    getComponent : function(type, name) {},

    /** 
        Retrieve a component with given unique ID.<br>
        @param {number} componentId The ID for the component.
        @return {?ComponentWrapper} - The component, or null if not found
        @virtual
    */
    componentById : function(componentId) {},

    /** 
        Remove a component with given unique ID.<br>
        @param {number} componentId The ID for the component.
        @virtual
    */
    removeComponent : function(componentId) {},
});

var ComponentWrapper = IWrapper.$extend(
/** @lends ComponentWrapper.prototype */
{
    /**
        Wrapper interface for a component object. 
        The component object should provide access to manipulating component attributes and other options.
        @constructs
        @extends IWrapper
    */
    __init__: function(id, name, type, parentId)
    {
        this.$super();

        /**
            Unique ID of the component
            @type {number}
            @default -1 
        */
        this.id = isNull(id) ? -1 : id;

        /**
            Name of the component
            @type {string}
            @default "" 
        */
        this.name = isNull(name) ? "" : name;

        /**
            Type name of the component
            @type {string}
            @default "" 
        */
        this.typeName = isNull(type) ? "" : type;

        /**
            Parent entity ID of the component
            @type {number}
        */
        this.pId = parentId;
    },

    /** 
        Returns this component's parent entity unique ID.<br>
        @return {number} - The ID of the parent.
        @virtual
    */
    parentId : function()
    {
        return this.pId;
    },

    /** 
        Returns the component name.<br>
        @return {string} - The current name for this component
        @virtual
    */
    getName : function()
    {
        return this.name;
    },

    /** 
        Serialize this component into a JSON string.<br>
        The implementation should take care of the serialization in a way that will ensure it will stick to the {@link ComponentWrapper} description.
        @virtual
        @return {string} - A stringified JSON from this component
    */
    serialize : function() {},

    /** 
        Deserializes given JSON string to this component.<br>
        The implementation should take care of the deserialization in a way that will ensure it will stick to the {@link ComponentWrapper} description.
        @param {string} jsonObject The JSON string
        @virtual
    */
    deserialize : function(jsonObject) {},

    /** 
        Returns if the component is dynamic, i.e. its attributes can be added / removed on demand.<br>
        @return {boolean} - true if dynamic component, false otherwise
        @virtual
    */
    isDynamic : function() {},

    /**
        Mark this component a temporary. A temporary component will not be saved when saving the whole scene into a file
        @param {boolean} temporary true if this component should be temporary, false othewise
        @virtual
    */
    setTemporary : function(temporary) {},

    /**
        Returns all attributes of this component
        @return {AttributeWrapper[]}
        @virtual
    */
    attributes : function() {},

    /**
        If this component is dynamic, an attribute can be created by calling this function
        @param {number} typeId The type ID of the attribute that should be created
        @param {string} name A unique name for the new attribute
        @return {boolean} - true if the attribute was successfully created, false if not or if component is not dynamic
        @virtual
    */
    createAttribute : function(typeId, name) {},

    /**
        Gets an attribute by name
        @param {string} name The name for the attribute
        @return {?AttributeWrapper} - The attribute, or null if not found
        @virtual
    */
    attributeByName : function(name) {},

    /**
        Gets an attribute by index
        @param {number} index The index for the attribute
        @return {?AttributeWrapper} - The attribute, or null if not found
        @virtual
    */
    getAttributeByIndex : function(index) {},

    /**
        Removes an attribute by index
        @param {number} index The index for the attribute to be removed
        @return {boolean} - true if the attribute was successfully removed, false if not or if component is not dynamic
        @virtual
    */
    removeAttribute : function(index) {},

    /**
        Registers a callback for an 'attribute added' event.<br>
        The implementation of this method should internally subscribe to the 'attribute added' event internally to this component, using the {@link IWrapper} methods for callbacks, and execute the callback when the underlying system fires the event. 
        @param {object} context The object as context.
        @param {function} callback The callback to be called.
        @virtual
        @return {?object} - A subscription object if available.
    */
    onAttributeAdded : function(context, callback) {},

    /**
        Registers a callback for an 'attribute removed' event.<br>
        The implementation of this method should internally subscribe to the 'attribute removed' event internally to this component, using the {@link IWrapper} methods for callbacks, and execute the callback when the underlying system fires the event. 
        @param {object} context The object as context.
        @param {function} callback The callback to be called.
        @virtual
        @return {?object} - A subscription object if available.
    */
    onAttributeAboutToBeRemoved : function(context, callback) {}

});

var AttributeWrapper = IWrapper.$extend(
/** @lends AttributeWrapper.prototype */
{
    /**
        Wrapper interface for an attribute object. 
        The attribute object should provide access to manipulating values of attributes.
        @param {number} index The index of this attribute. Index is the position where this attribute resides in the component
        @param {number} typeId The type ID of the attribute
        @param {string} name The name of the attribute
        @param {ComponentWrapper} parent The parent component of this attribute
        @constructs
        @extends IWrapper
    */
    __init__ : function(index, typeId, name, parent)
    {
        this.$super();

        /**
            Type ID of the attribute
            @type {number}
        */
        this.typeId = typeId;

        /**
            Name of the attribute
            @type {string}
            @default ""
        */
        this.name = isNull(name) ? "" : name;

        /**
            Attribute index
            @type {number}
        */
        this.index = index;

        /**
            The component that owns the attribute
            @type {ComponentWrapper}
        */
        this.owner = parent;
    },

    /**
        Returns the valid values that this attribute can accept. The default implementation returns null<br>
        The implementation of this method should check with the underlying system the allowed values for this attribute, and return them in an array.
        @return {*} - values array of valid values. Can be any type
    */
    validValues : function()
    {
        return null;
    },

    /**
        Get the raw value of this attribute
        @return {*} - The value of this attribute
    */
    get : function() {},


    /**
        Sets the raw value of this attribute
        @param {*} value The value to be set
    */
    set : function(value) {}
});

var IEvent = Class.$extend(
/** @lends IEvent.prototype */
{

    /** 
        A wrapper for events. Any input event wrapper should inherit this class.
        @param {number} eventType The event type, see the static members 
        @param {number} [id] Unique ID for this event
        @constructs
    */
    __init__ : function(eventType, id)
    {
        this.eventType = eventType;
        this.id = id;

        this.targetId = "";
        this.targetNodeName = "";
        this.originalEvent = null;
    },

    __classvars__ : 
    {
        /**
            Mouse event
            @static
            @type {number}
            @default 0
        */
        MouseEvent : 0,
        /**
            Key event
            @static
            @type {number}
            @default 1
        */
        KeyEvent : 1,
        /**
            Resize event
            @static
            @type {number}
            @default 2
        */
        ResizeEvent : 2
    }
});

var KeyEventWrapper = IEvent.$extend(
/** @lends KeyEventWrapper.prototype */
{
    /** 
        A wrapper for key events. Any key event wrapper should inherit this class.
        @param {number} [id] Unique ID for this event
        @constructs
        @extends IEvent
    */
    __init__ : function(id)
    {
        this.$super(IEvent.KeyEvent, id);
        this.type = "";

        this.keyCode = 0;
        this.key = "";
        this.repeat = false;
        this.pressed = {};
    },

    /**
        Returns if the given keyboard `key` is pressed
        @param {string} key The key to be checked
        @return {boolean} - true if the key is pressed
    */
    isPressed : function(key)
    {
        if (isNotNull(this.pressed[key]))
            return this.pressed[key];

        return false;
    }
});

var MouseEventWrapper = IEvent.$extend(
/** @lends MouseEventWrapper.prototype */
{
    /** 
        A wrapper for mouse events. Any mouse event wrapper should inherit this class.
        @param {number} [id] Unique ID for this event
        @constructs
        @extends IEvent
    */
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
/** @lends RaycastResult.prototype */
{
    /** 
        A raycast result object.
        @constructs
    */
    __init__ : function()
    {
        /** 
            A pointer to the entity wrapper object that has been hit. Can be null
            @var {?EntityWrapper}
        */
        this.entity = null;

        /** 
            A pointer to the component wrapper object (for example a mesh, billboard etc) that has been hit. Can be null
            @var {?ComponentWrapper}
        */
        this.component = null;

        /** 
            A 3-tuple that represents the position of the location where it hit the entity.
            @var {*}
        */
        this.pos = null;

        /** 
            Distance from screen coordinates to the entity that has been hit by the raycasting.
            @var {number}
        */
        this.distance = -1;

        /** 
            Index of the submesh that has been hit by the raycasting.
            @var {number}
        */
        this.submesh = -1;

        /** 
            Face index that has been hit by the raycasting.
            @var {number}
        */
        this.faceIndex = -1;

        /**
            Pointer to the original ray used in the casting.
            @var {*}
        */
        this.ray = null;
    }
});

var ITransformEditor = Class.$extend(
/** @lends ITransformEditor.prototype */
{
    /**
        Base implementation of ITransformEditor.<br>
        This implementation does nothing. Derived implementations should extend this class by adding their own functionality
        @constructs
    */
    __init__ : function()
    {

    },

    /**
        Sets the target entity whose transform should be manipulated
        @param {EntityWrapper} entityPtr The entity to be manipulated
    */
    setTargetEntity : function(entityPtr)
    {

    },

    /**
        Set the mode of transform. Usually values should be "translation", "rotate" and "scale" 
        @param {string} mode 
    */
    setMode : function(mode)
    {

    },

    /**
        Clears the selection
    */
    clearSelection : function()
    {

    }
});

var IEditor = IWrapper.$extend(
/** @lends IEditor.prototype */
{
    __classvars__ : 
    {
        /** An instance to the SceneWrapper-derived object
            @static
            @type {SceneWrapper}
            @default null
        */
        scene : null,
        Instance : null
    },

    /**
        Main entry point to the Interface Designer application.
        Implements all necessary communication with the underlying system to display the current scene situation.<br>
        In order to start the interface designer, an instance should be made of the implementation of this class. Make sure that all dependencies that your implementation and the interface designer uses are included before making the instance.<br>
        Any custom option of your needs can be added to the `options` object, and subsequently handled in your own implementation.<br>
        Be sure to call the base implementation of the editor in your derived class constructor, as shown in the example.
        @example 
        * var MyEditor = IEditor.$extend({
        * {
        *     __init__ : function(options)
        *     {
        *         // call the base implementation constructor
        *         this.$super(options);
        *         // your code here 
        *     },
        *     // ... derived methods etc.
        * });

        @constructs
        @param {object} [options] Start-up options
        @param {string} [options.type=""] Type name of the underlying system of your choice.
        @param {string} [options.toggleEditorShortcut="shift+s"] The shortcut to enable the editor
        @param {string} [options.switchPanelsShortcut="shift+e"] The shortcut to switch between scene tree and entity-component editor
        @param {string} [options.noSelectionString="(No entities selected)"] The text shown in the EC editor title when no entities are selected
        @extends IWrapper
    */
    __init__ : function(options)
    {
        this.$super();

        /** 
            An instance to the IEditor-derived object. Use with caution.
            @static
            @type {SceneWrapper}
            @default null
        */
        IEditor.Instance = this;

        /** 
            Type of the underlying system as string
            @type {string}
            @default ""
        */
        this.type = options.type || "";

        this.ui = {};                                       // JSON
        this.enabled = false;
        this.isECEditor = false;
        this.noSelectionStr = options.noSelectionString || "<i>(No entities selected)</i>";     // String
        this.sceneEvents = [];
        this.componentEvents = [];                         // Array of EventWrapper

        /**
            Transform editor instance
            @type TransformEditor
        */
        this.transformEditor = null;

        this.accordionHistory = {};

        this.toggleEditorShortcut = options.toggleEditorShortcut || "shift+s";
        this.switchPanelsShortcut = options.switchPanelsShortcut || "shift+e";

        // The current object in editing
        this.currentObject = null;

        this.initTransformEditor();

        /**
            Undo manager instance
            @type UndoRedoManager
        */
        this.undoStack = new UndoRedoManager();
        /**
            Toolkit manager instance
            @type ToolkitManager
        */
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

    /**
        Returns if the editor is enabled 
        @return {boolean} - true if enabled
    */
    isEditorEnabled : function()
    {
        return this.enabled;
    },

    /**
        Returns if there is a connection to a server 
        @return {boolean} - true if connected
        @virtual
    */
    isConnected : function()
    {
        return true;
    },

    /**
        Returns the available screen width from browser 
        @return {number}
        @virtual
    */
    width : function()
    {
        return -1;
    },

    /**
        Returns the available screen height from browser 
        @return {number}
        @virtual
    */
    height : function()
    {
        return -1;
    },

    /**
        Returns if there is a taskbar in the underlying system, serves to calculate the editor panels height
        @return {jQuery} - The element as jQuery, or null if does not exist
        @virtual
    */
    taskbar : function()
    {
        return null;
    },

    /**
        Returns a container element if such is implemented in the underlying system
        @virtual
        @return {jQuery} - The container element
    */
    container : function() {},

    /**
        Adds a widget / 2D UI to the browser, or container if such is implemented.
        @virtual
        @param {jQuery} element A jQuery element
    */
    addWidget : function(element) {},

    /**
        Registers a {@link SceneWrapper}-derived object that will serve as the basis for scene manipulation through this editor.<br>
        The implementations of this method should make an instance of their own {@link SceneWrapper} derived object, and return it.

        @virtual
        @return {SceneWrapper}
    */
    registerSceneObject : function() {},

    /**
        Registers a callback for an event that is fired when the client is connected to a server (synchronization)
        @param {Object} context The context of the callback, i.e. the value of `this` pointer inside the body of the callback
        @param {function} callback The callback to be called when the event is fired
        @virtual
    */
    registerClientConnectedCallback : function(context, callback) {},

    /**
        Registers a callback for a key event.
        @param {Object} context The context of the callback, i.e. the value of `this` pointer inside the body of the callback
        @param {function} callback The callback to be called when the event is fired
        @virtual
    */
    registerKeyEventCallback : function(context, callback) {},

    /**
        Registers a callback for a mouse event.
        @param {Object} context The context of the callback, i.e. the value of `this` pointer inside the body of the callback
        @param {function} callback The callback to be called when the event is fired
        @virtual
    */
    registerMouseEventCallback : function(context, callback) {},

    /**
        Registers a callback for a resize event.
        @param {Object} context The context of the callback, i.e. the value of `this` pointer inside the body of the callback
        @param {function} callback The callback to be called when the event is fired
        @virtual
    */
    registerResizeEventCallback : function(context, callback) {},

    /**
        Adds an "entity create" command in the undo stack. See {@link UndoRedoManager} for more information on keeping the editing history.<br>
        Implementations should create a generic command derived from {@link ICommand} for adding an entity to the scene, and adding that command to the undo manager instance {@link IEditor#undoStack}
        @param {string[]} components An array of component type names
        @param {string} [entityName] Name for the new entity
        @virtual
    */ 
    addEntityCommand : function(components, entityName) {},

    /**
        Adds an "entity remove" command in the undo stack. See {@link UndoRedoManager} for more information on keeping the editing history.<br>
        Implementations should create a generic command derived from {@link ICommand} for removing an entity from the scene, and adding that command to the undo manager instance {@link IEditor#undoStack}
        @param {EntityWrapper} entityPtr The entity to be removed
        @virtual
    */ 
    removeEntityCommand : function(entityPtr) {},

    /**
        Adds a "component create" command in the undo stack. See {@link UndoRedoManager} for more information on keeping the editing history.<br>
        Implementations should create a generic command derived from {@link ICommand} for adding a component to the scene, and adding that command to the undo manager instance {@link IEditor#undoStack}
        @param {number} entityId The entity ID that this component should be created
        @param {string} compType Component type name
        @param {string} compName Component name
        @param {boolean} isLocal Create local component
        @param {boolean} temporary Mark this component as temporary
        @virtual
    */ 
    addComponentCommand : function(entityId, compType, compName, isLocal, temporary) {},

    /**
        Adds a "component remove" command in the undo stack. See {@link UndoRedoManager} for more information on keeping the editing history.<br>
        Implementations should create a generic command derived from {@link ICommand} for removing a component from the scene, and adding that command to the undo manager instance {@link IEditor#undoStack}
        @param {ComponentWrapper} componentPtr The entity to be removed
        @virtual
    */ 
    removeComponentCommand : function(componentPtr) {},

    /**
        Adds an "attribute add" command in the undo stack. See {@link UndoRedoManager} for more information on keeping the editing history.<br>
        Implementations should create a generic command derived from {@link ICommand} for adding a component to the scene, and adding that command to the undo manager instance {@link IEditor#undoStack}
        @param {number} entityId The entity ID that this component should be created
        @param {string} compType Component type name
        @param {string} compName Component name
        @param {boolean} isLocal Create local component
        @param {boolean} temporary Mark this component as temporary
        @virtual
    */ 
    addAttributeCommand : function(componentPtr, attrTypeId, attrName) {},

    /**
        Adds an "attribute remove" command in the undo stack. See {@link UndoRedoManager} for more information on keeping the editing history.<br>
        Implementations should create a generic command derived from {@link ICommand} for removing an attribute from the component, and adding that command to the undo manager instance {@link IEditor#undoStack}
        @param {AttributeWrapper} attributePtr The attribute to be removed
        @virtual
    */ 
    removeAttributeCommand : function(attributePtr) {},

    /**
        Adds an "attribute change" command in the undo stack. See {@link UndoRedoManager} for more information on keeping the editing history.<br>
        Implementations should create a generic command derived from {@link ICommand} for changing the attribute's value, and adding that command to the undo manager instance {@link IEditor#undoStack}
        @param {AttributeWrapper} attributePtr The attribute to be changed
        @param {*} value The new value to be set
        @virtual
    */ 
    changeAttributeCommand : function(attributePtr, value) {},

    /**
        Saves the scene.<br>
        Implementations should handle the saving of the scene according to the underlying system for serialization of the scene description 
        @param {string} filename The desired filename without extension
        @virtual
    */ 
    save : function(filename) {},

    /**
        Loads a scene file from hard drive.<br>
        Implementations should handle the saving of the scene according to the underlying system for deserialization of the scene description
        @virtual
        @param {File} fileObject Instance of File object
    */
    load : function(fileObject) {},
    /**
        Initializes the transform editor. Serves to manipulate position / rotation / scale of 3D objects.<br>
        Implementations should make their own transform editors by extending {@link ITransformEditor} and all of its methods
        @param {string} filename The desired filename without extension
        @virtual
    */ 
    initTransformEditor : function() {},

    /**
        Adds a "create primitive" command in the undo stack. See {@link UndoRedoManager} for more information on keeping the editing history.<br>
        Implementations should create a generic command derived from {@link ICommand} for creating the primitive, and adding that command to the undo manager instance {@link IEditor#undoStack}
        @param {string} type Type of primitive: "Ball", "Cube", "Cone", "Cyllinder"
        @virtual
    */
    createPrimitive : function(type) {},

    /**
        Adds a "create movable" command in the undo stack. See {@link UndoRedoManager} for more information on keeping the editing history.<br>
        Implementations should create a generic command derived from {@link ICommand} for creating a movable, and adding that command to the undo manager instance {@link IEditor#undoStack}
        @virtual
    */
    createMovable : function() {},

    /**
        Adds a "create drawable" command in the undo stack. See {@link UndoRedoManager} for more information on keeping the editing history.<br>
        Implementations should create a generic command derived from {@link ICommand} for creating a drawable, and adding that command to the undo manager instance {@link IEditor#undoStack}
        @virtual
    */
    createDrawable : function() {},

    /**
        Adds a "create script" command in the undo stack. See {@link UndoRedoManager} for more information on keeping the editing history.<br>
        Implementations should create a generic command derived from {@link ICommand} for creating a script, and adding that command to the undo manager instance {@link IEditor#undoStack}
        @virtual
    */
    createScript : function() {},

    /**
        Shows the helper grid on the XZ plane.<br>
        Implementations of this method should handle the creation of the appropriate grid in the underlying system renderer
    */
    showGrid : function() {},

    /**
        Hides the helper grid on the XZ plane.<br>
        Implementations of this method should handle the creation of the appropriate grid in the underlying system renderer
    */
    hideGrid : function() {},

    /**
        Shows the helper axes, with start at the 0,0,0 position.<br>
        Implementations of this method should handle the creation of the axes in the underlying system renderer
    */
    showAxes : function() {},

    /**
        Hides the helper axes.<br>
        Implementations of this method should handle the creation of the appropriate grid in the underlying system renderer
    */
    hideAxes : function() {},

    /**
        Quickly creates an entity with given type. Adds a command in the undo stack. See {@link UndoRedoManager} for more information on keeping the editing history.<br>
        Implementations should create a generic command derived from {@link ICommand} for creating a movable, and adding that command to the undo manager instance {@link IEditor#undoStack}
        @param {string} type Type of entity: "Drawable", "Movable", "Script"
        @virtual
    */
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

        var menuItemsClass = $("<style/>");
        menuItemsClass.text(".contextmenu-z { z-index: 5; }");

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

    /** 
        Toggles the editor on or off
    */
    toggleEditor : function()
    {
        this.enabled = !this.enabled;
        this.setEnabled(this.enabled);
    },

    /**
        Set the editor enabled or disabled
        @param {boolean} enabled true to enable the editor, false to disable it
    */
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

    /**
        Toggles the panels
    */
    togglePanels : function()
    {
        if (this.isEditorEnabled())
            this.switchPanels(!this.isECEditor);
    },

    /**
        Switch the desired panel
        @param {boolean} ecPanel true to switch to ecPanel, false to switch to scene tree panel
    */

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

    /**
        Select an entity to be edited in the EC editor.<br>
        If an active component is provided, then that component will be expanded
        @param {EntityWrapper} entityPtr The entity to be edited
        @param {ComponentWrapper} [activeComponent] The component to be expanded
    */
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

    /**
        Sets the mode of the transform editor
        @param {string} mode The transform mode, can be "translate", "rotate", "scale"
    */
    setTransformMode : function(mode)
    {
        if (this.transformEditor)
            this.transformEditor.setMode(mode);
    },

    /** 
        Creates a "remove entity" command on the currently edited object.
    */
    removeCurrent : function()
    {
        if (isNotNull(this.currentObject))
            this.removeEntityCommand(this.currentObject);
    },

    createContextMenu : function()
    {
        this.ui.sceneTree.holder.contextmenu({
            addClass: "contextmenu-z",
            delegate: "span.fancytree-node",
            menu: [
                {title: "Edit", cmd: "edit", uiIcon: "ui-icon-pencil"},
                {title: "Delete", cmd: "delete", uiIcon: "ui-icon-trash"},
            ],
            select: function(event, ui) {
                var element = ui.target[0];
                if (ui.cmd === "edit")
                {
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
                        this.selectEntity(entity, componentId);
                }
                else if (ui.cmd === "delete")
                {
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
                }
            }.bind(this)
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

        var attrNameColumn = $("<td/>", {id : "label-" + idOfElements}).css(Utils.attributeTableColumnStyle);
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
/** @lends ICommand.prototype */
{
    /**
        Base implemetation for undo / redo commands. A command can be executed and reversed (undone), so that the state of the observing workspace will return to the state before said command was executed.<br>
        Any changes that it does should be independent of other commands, and should be able to switch between execution and undoing multiple times in order.<br>
        Derived implementations should extend this class and its methods for their own implementation.
        @param {string} commandString A string that describes what the comand does in human-readable sentences
        @constructs
        @see {@link UndoRedoManager}
    */
    __init__ : function(commandString)
    {
        this.commandId = -1;
        this.commandString = commandString;
    },

    /**
        Execute this command.
    */
    exec : function() {},
    /**
        Undo this command.
    */
    undo : function() {}
});

var UndoRedoManager = Class.$extend(
/** @lends UndoRedoManager.prototype */
{
    /**
        The UndoRedoManager manages the history of states on the observing workspace.<br>
        It maintains the history stack of commands that have been executed and / or undone.
        @param {number} numberOfItems Number of commands that the undo stack will maintain.
        @constructs
        @see {@link ICommand}
        @example
        * var IncrementCommand = ICommand.$extend({
        *     __init__ : function(someObject)
        *     {
        *         this.someObject = someObject;
        *     },
        *
        *     exec : function()
        *     {
        *         this.someObject.i +=1;
        *     },
        *
        *     undo : function()
        *     {
        *         this.someObject.i -= 1;
        *     },
        * });
        * 
        * var undoManager = new UndoRedoManager();
        * var myObject = { i:0 };
        * var newIncrementCommand = new IncrementCommand(myObject);
        * undoManager.pushAndExec(newIncrementCommand); // myObject.i == 1;
        * undoManager.undo();                           // myObject.i == 0;
        * undoManager.redo();                           // myObject.i == 1;
    */
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

    /**
        Checks if undo can be executed on this manager
        @return {boolean} - true if undo can be executed
    */
    canUndo : function()
    {
        return (this._undoHistory.length !== 0);
    },

    /**
        Checks if redo can be executed on this manager
        @return {boolean} - true if redo can be executed
    */
    canRedo : function()
    {
        return (this._redoHistory.length !== 0);
    },

    /**
        Returns the undo history in an array. <br>
        It stores it as an array of objects with two properties: `id` and `commandString`. The `id` is the index of the command in the undo stack at the time of retrieving the history, while `commandString` is the command string in human-readable format.

        @return {object[]} - The undo history represented as objects with properties `id` and `commandString`
    */

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

    /**
        Returns the redo history in an array. <br>
        It stores it as an array of objects with two properties: `id` and `commandString`. The `id` is the index of the command in the undo stack at the time of retrieving the history, while `commandString` is the command string in human-readable format.

        @return {object[]} - The redo history represented as objects with properties `id` and `commandString`
    */
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

    /**
        Registers a callback for 'stateChanged' event.<br>
        The stateChanged event is fired every time the history is changed. For example, every time a command has been added to the stack, or a command has been undone.
        @param {object} context The context of the callback, i.e. the value of `this` pointer inside the body of the callback
        @param {function} callback The callback to be called when the history is changed
    */
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

    /**
        Push a new command to the stack.<br>
        Note: This method only adds the command to the stack, meaning you have to execute the command manually.
        @param {ICommand} command The command to be pushed
        @see {@link UndoRedoManager#pushAndExec}
    */
    pushCommand : function(command)
    {
        this._redoHistory.length = 0;

        if (this._undoHistory.length === this._numberOfItems)
            this._undoHistory.shift();

        this._undoHistory.push(command);
        this._onStateChanged();
    },

    /**
        Push a new command to the stack, and executes it immediately.<br>
        @param {ICommand} command The command to be pushed and executed
        @see {@link UndoRedoManager#pushCommand}
    */
    pushAndExec : function(command)
    {
        this.pushCommand(command);
        command.exec();
    },

    /**
        Execute undo.<br>
        Removes the most recent command executed from the undo stack, calls 'undo' on it, and pushes it in the redo stack.
        @param {boolean} [disconnected=false] Set this to true if the 'stateChanged' event should not be fired
    */ 
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

    /**
        Execute redo.<br>
        Removes the most recent undone command from the redo stack, calls 'exec' on it, and pushes it in the undo stack.
        @param {boolean} [disconnected=false] Set this to true if the 'stateChanged' event should not be fired
    */
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

    /**
        Executes 'undo' or 'redo' multiple times until it reaches the state given through 'commandId' parameter.<br>
        The 'stateChanged' event fires only once, when it gets to the desired state.
        @param {number} commandId The state to be set
    */
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

    /**
        Clears the history, all commands are deleted irreversibly, and fires the 'stateChanged' event in the end.
    */
    clear : function()
    {
        this._undoHistory.length = 0;
        this._redoHistory.length = 0;

        this._onStateChanged();
    }
});

var ToolkitManager = Class.$extend(
/** @lends ToolkitManager.prototype */
{
    /**
        Toolkit manager. Provides the UI for the toolbar, tightly connected with the main editor instance.<br>
        Do not create instances of the ToolkitManager, instead use {@link IEditor#toolkit}.
        @constructs
    */
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

        this.ui.loadButton = $("<button/>", {
            id : "_toolkit-loadButton",
            title : "Load"
        });
        this.ui.loadButton.css({
            "width" : "40px",
            "height" : "22px"
        });
        this.ui.loadButton.button({
            text : false,
            icons : {
                primary : "ui-icon-folder-open"
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
            this.toolbar.append(this.ui.loadButton);
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

        this.ui.loadButton.click(function(){
            var dialog = new ModalDialog("LoadScene", "Load previously saved scene", 450, 100);
            dialog.appendInputBox("loadSceneInput", "Select the file by clicking on 'Choose file'. <br> <br> <strong>WARNING: Loading a scene will reset the scene and the editor, irreversibly removing everything! Save your changes before continuing!</strong><br><br>", "file");
            var buttons = {
                "Ok" : function()
                {
                    var input = $("#loadSceneInput");
                    var filename = input.val();

                    if (isNull(filename) || filename === "")
                    {
                        input.addClass(Utils.invalidDataName);
                        return;
                    }

                    IEditor.Instance.load(input[0].files[0]);                    
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
        })

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

    /**
        Shows the toolbar.
    */
    show : function()
    {
        this.toolbar.show();
    },

    /**
        Hides the toolbar.
    */
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