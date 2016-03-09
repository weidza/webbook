// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.wiedza.webBook.components.List
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.wiedza.webBook.components.List= function (options) {

    this.options = {
        id: "",
        type: "",
        xtag: null

    };

    this._innerValues = {
        images     :{
            positive :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApwAAAKcBDzod3AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJsSURBVEiJvZYxTNtQEIa/ew6ClQUWVIkJdUtLsnQiEk0lJAa2SpadsVMmpg5MDJ2YOnWMo0hszDhIYeoSp2WrmCqhLLBkpSLxdfBz5ISYlBb6T/Y7+//vzu/9Z1FV8uCH/oqqlhFKxGwilABQIgw9lEhEukE1uMnjkFkClfNKYe3X2kfgAFjIzSDBHXDYX+x/6mx1hnMF/DP/pY60AZQzy9cIPVGJAFS0hLIJrGae6YojtWA7+JEr4J16PvAFWEqinAiyH1SDn7NS90N/XdEjlD27dAt8aL5rBvcEbObfLPkAod6sNlu5jcnACz0X5TOwDNyKI6/TSgwkPbdtWQIGxjHFPyUHaFabLeOYIjAAlnSkjcp5pTAWsB+0bNtSb2w3rqZJ3LZb9E499U49ddtucTre2G5cIdTtbdlyYvzQXyHZLSCcPCbzWZUgnNjbAz/0V4yqlrFbUZD9vyVPkeFYUNWyGR8euM7bLY+B5bi2aqWCPaEg9LIPTvdZVDay127bnSBuvW1dZMrooewQs1lIK0gPUQoTm+95WYrKsajcW87EI0V3EErmgWqfBAWUCGFXRUvZQGziVxPpqWyIyjGAir5X0cs8UmsloEQF64q71lvGmOgp4LZd0rao6OV0fFLBchl6BiXt/aof+utzKp4Ly7FqhSIjIl0Sy0XRo38VyHDciUjX2GFxaKN7Xui5uW/PgTW91FkPg2pwI6qaDpivJH40MI4pzvKjh1A7q72IR/EFiaN2+4v9N52tztAAdLY6Q3GkRuLny/EovnhMJV7ouRnyW3Gklk63/zdwxi8958hM8axDf6KaJ/ht+Q3odFJPCTwgsAAAAABJRU5ErkJggg==",
            negative :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApwAAAKcBDzod3AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJZSURBVEiJvZa/S1tRFMc/5yaCo4IoQhFUNHSzTbKbVTAxgWQJ1LGTk5NDJwcnJ6eOFlwSeGr+gbgnad1KtFWQgiiCjkLMPR3ue0namtbX1H6ndy+Xz/nx7jnniqrST19zuXEr7aRCQkXiAgkAhbqoNgTqRiO1Wc+77seQxwwcpVLRybGRDVF9Bwz19cCppSKblzd3W4vV6sMfDZzmci/V6C5osnuKK5QGUPd3EghxlIkeVE2srM553ue+Bk7yK29Q3gPDPnhfxa7HSpXzx1xvFtLTomYbJetv3SO8nS8ffPjFgPPcfgSGBW6t6FqsfLj3++z4hvKZolHZURgF7sWa10EkBlzOXVocPGLswlPhALHy4V7E2AWBW2BYje4epVLRjoHJsZGNIOdWdG2mVLl4KjzQTKlyYUXX3EqTjgnyJZsdbxv7DRhC2J8vH+TCwnt1kl/x/H/SiljzwlhpJ/GvoopdHwT+E2PISjtp1C8ehKt+tyWMYqXKOcIVgEIi6lco/j3v6LSQXQgDnivtH3cWjrWkIvFoUP50i8idsfoppPPS810HlgQSJiQktKIKdYFlupE4d4y8GoDbaYpRUW0gsowQ7z3xQ07DyvUpRLVhJMi9MtEspKcH8Bpw/SloggJ1YzRSA1oAomZ7UAM9jJbRSM3Met61imwCoGSb+Uzxb+HNfKYYdFYV2Zz1vGsDcHlztwVSAzAqO2eF9FRY+FkhPWVUdvw4ao7pN7vFavVBrKwC9wqjbWuOw0TSzGeKbWuOu+1aVoPp9v8GTqBnHZmBnnXo9+pfPFu+AwTpRWG9QwKDAAAAAElFTkSuQmCC"
        }
    };


    this._init(options);
    this._render();
};

// -----------------------------------------------------------------------------
// initialize
// -----------------------------------------------------------------------------
org.wiedza.webBook.components.List.prototype._init = function (options) {
    org.wiedza.asserts.notNull(options, "Table option mustn't be null!");
    org.wiedza.asserts.notNull(options.xtag, "XTag node mustn't be null!");
    org.wiedza.asserts.notNull(options.id, "ID mustn't be null!");

    this.options = options;

    if(org.wiedza.check.isNull(this.options.type)){
        this.options.type = "default";
    }
};


// -----------------------------------------------------------------------------
// render
// -----------------------------------------------------------------------------
org.wiedza.webBook.components.List.prototype._render= function (options) {
    var type = this._isNumber() ? "ol" : "ul";
    var compo = org.wiedza.rendering.createNode(type, ['webbook-list',this._getSpecificClass()].join(" "), this.options.id);
    var children = this.options.xtag.context.children;

    for(var i=0; i<children .length; i++){
        var child = children[i];
        if(child.nodeName==="W-ITEM"){
            compo.append(this._renderItem(child));
        }
    }
    compo.append(org.wiedza.rendering.clearDiv());

    this.options.xtag.html("");
    this.options.xtag.append(compo);
};

org.wiedza.webBook.components.List.prototype._renderItem= function (child) {
    var result = org.wiedza.rendering.createNode("li");

    if(this._isWithIcon()) {
        result.append(this._renderItemIcon());
    }
    result.append(this._renderItemContent(child));
    result.append(org.wiedza.rendering.clearDiv());
    return result;
}

org.wiedza.webBook.components.List.prototype._renderItemIcon= function () {
    var result= org.wiedza.rendering.createNode("div","webbook-list-icon");
    var iconImg = org.wiedza.rendering.createNode("img");
        iconImg.attr('src', this._getIcon());

    result.append(iconImg);
    return result;
};

org.wiedza.webBook.components.List.prototype._renderItemContent= function (child) {
    var result= org.wiedza.rendering.createNode("div","webbook-list-item");

    if(org.wiedza.check.isNotNull(child.attributes["title"])){
        var titleSpan = $('<span></span>');
        titleSpan.attr('class','webbook-list-item-title');
        titleSpan.text(child.attributes["title"].value);
        result.append(titleSpan);
    }

    var content= org.wiedza.rendering.createNode("div","webbook-list-item-content");
        content.html(child.innerHTML);

    result.append(content);
    return result;
};



// -----------------------------------------------------------------------------
// getters
// -----------------------------------------------------------------------------

org.wiedza.webBook.components.List.prototype._getSpecificClass= function () {
    var result = [];

    if(this._isWithIcon()){
        result.push("with-icon");
    }
    result.push(this.options.type);
    return result.join(" ");
};
org.wiedza.webBook.components.List.prototype._isNumber= function () {
    return this._isType("number");
};

org.wiedza.webBook.components.List.prototype._isTypePositiveOrNegative = function(){
    return this._isType("positive") || this._isType("negative");
};

org.wiedza.webBook.components.List.prototype._isWithIcon = function(){
    return this._isTypePositiveOrNegative ();
};
org.wiedza.webBook.components.List.prototype._isType = function(type){
    org.wiedza.asserts.notNull(type);
    return this.options.type  === type;
};

org.wiedza.webBook.components.List.prototype._getIcon= function(){
    var result =this._innerValues.images[this.options.type];
    return org.wiedza.check.isNull(result) ? "":result ;
};
