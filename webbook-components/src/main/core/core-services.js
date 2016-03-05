// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// CORE SERVICE
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.weidza.services = {

    generateId: function (componentName) {
        var index = org.weidza._innerValues.componentsIds[componentName];

        if (index === undefined || index === null) {
            index = 0;
        }
        index++;
        org.weidza._innerValues.componentsIds[componentName] = index;
        return componentName + "_" + index;
    },

    normalizeId: function (value) {
        TAB_00C0 = "AAAAAAACEEEEIIIIDNOOOOO*OUUUUYIs" +
        "aaaaaaaceeeeiiii?nooooo/ouuuuy?y" +
        "AaAaAaCcCcCcCcDdDdEeEeEeEeEeGgGg" +
        "GgGgHhHhIiIiIiIiIiJjJjKkkLlLlLlL" +
        "lLlNnNnNnnNnOoOoOoOoRrRrRrSsSsSs" +
        "SsTtTtTtUuUuUuUuUuUuWwYyYZzZzZzF";
        var result = value.split('');
        for (var i = 0; i < result.length; i++) {
            var c = value.charCodeAt(i);
            if (c >= 0x00c0 && c <= 0x017f) {
                result[i] = String.fromCharCode(TAB_00C0.charCodeAt(c - 0x00c0));
            } else if (c > 127) {
                result[i] = '_';
            }
        }

        return result.join('').replace(/\W/g, '_');
    },

    defaultValueEmpty: function (value) {
        return org.weidza.services.defaultValue(value, "");
    },

    defaultValue: function (value, defaultValue) {
        var isEmpty = value === undefined;

        if (!isEmpty && (typeof value === 'string' || value instanceof String)) {
            isEmpty = "" === value;
        }

        return isEmpty ? defaultValue : value;
    },

    getParent: function (nodeName, currentNode) {
        org.weidza.asserts.notNull(nodeName, "can't search node parent without this name!")
        return this._processGetParent(nodeName.toUpperCase(), currentNode);
    },

    _processGetParent: function (nodeName, currentNode) {
        var result = null;

        var parent = null;
        if (currentNode !== null) {
            parent = currentNode.context === undefined ? currentNode.parentNode : currentNode.context.parentNode;
        }
        if (parent !== null) {
            if (nodeName === parent.nodeName) {
                result = parent;
            } else {
                result = this._processGetParent(nodeName, parent);
            }
        }
        return result;
    },

    getFunction: function (name) {
        org.weidza.asserts.notNull(name, "function name mustn't be null !");
        var result = null;

        if (name.indexOf(".") == -1) {
            result = window[name];
        } else {
            var packageNames = name.split('.');

            for (var index = 0; index < packageNames.length; index++) {
                if (index == 0) {
                    result = window[packageNames[index]];
                    org.weidza.asserts.notNull(result, "no namespace found :" + packageNames[index]);
                } else {
                    result = result[packageNames[index]];
                }
            }
        }

        return result;
    }


};

