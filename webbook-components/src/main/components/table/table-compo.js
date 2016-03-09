// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.wiedza.webBook.components.Table
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.wiedza.webBook.components.Table = function (options) {
    this._looger = org.wiedza.logger.factory("org.wiedza.webBook.components.Table");

    this.options = {
        id: "",
        title: "",
        caption: "",
        columns: null,
        loader: null,
        xtag: null
    };

    this._innerValues = {
        charSplitter: ";",
        loader: null,
        data: [],
        headers: [],
        columnClasses: [],
        nbColumnClasses :0,
        nbColumn: 0,
        components: {
            tbody: null
        }
    };

    this._init(options);
    this._initData();
    this._render();
};

// -----------------------------------------------------------------------------
// initialize
// -----------------------------------------------------------------------------
org.wiedza.webBook.components.Table.prototype._init = function (options) {
    org.wiedza.asserts.notNull(options, "Table option mustn't be null!");
    org.wiedza.asserts.notNull(options.xtag, "XTag node mustn't be null!");
    org.wiedza.asserts.notNull(options.id, "ID mustn't be null!");
    org.wiedza.asserts.notNull(options.columns, "Table columns mustn't be null!");
    this.options = options;

    if (org.wiedza.check.isNotNull(this.options.loader)) {
        this._innerValues.loader = org.wiedza.services.getFunction(this.options.loader);
    }

    if (org.wiedza.check.isNotNull(this.options.columnClasses)) {
        this._innerValues.columnClasses = this.options.columnClasses.split(this._innerValues.charSplitter);
        this._innerValues.nbColumnClasses = this._innerValues.columnClasses.length;
    }
};


org.wiedza.webBook.components.Table.prototype._initData = function () {
    this._initHeaders();
    this._updateValues();
};

org.wiedza.webBook.components.Table.prototype._initHeaders = function () {
    var headerValues = this.options.columns.split(this._innerValues.charSplitter);

    this._innerValues.nbColumn = headerValues.length;
    org.wiedza.asserts.isTrue(this._innerValues.nbColumn > 0, "can't render table without column (" + this.options.id + ')');

    for (var i = 0; i < this._innerValues.nbColumn; i++) {
        this._innerValues.headers.push(headerValues[i].trim());
    }
};

org.wiedza.webBook.components.Table.prototype._updateValues = function () {
    if (this._innerValues.loader === null) {
        this._updateFromTags();
    } else {
        this._updateFromFunction();
    }
};


org.wiedza.webBook.components.Table.prototype._updateFromTags = function () {
    var result = [];
    var children = this.options.xtag.children();

    if(org.wiedza.check.isNotNull(children)){
        var nbChildren = children.length;
        for(var i=0; i<nbChildren;i++){
            var child = children[i];
            if(child.nodeName === "W-ROW"){
                result.push(this._extractRowInformations(child));
            }
        }
    }

    this._innerValues.data = result;
};

org.wiedza.webBook.components.Table.prototype._extractRowInformations = function (child) {
    var result = [];

    if(org.wiedza.check.isNotNull(child.childNodes)){
        var nbChildren = child.childNodes.length;
        for(var i =0;i<nbChildren; i++){
            var cellNode = child.childNodes[i];
            if(cellNode.nodeName === "W-CELL"){
                var cell = this._extractCellInformation(cellNode);
                if(org.wiedza.check.isNotNull(cell)){
                    result.push(cell);
                }
            }
        }
    }
    org.wiedza.asserts.isFalse(result.length>this._innerValues.nbColumn,"error too much data for row :"+child);
    return result;
};

org.wiedza.webBook.components.Table.prototype._extractCellInformation = function (cell) {
    return cell.innerHTML;
};

org.wiedza.webBook.components.Table.prototype._updateFromFunction = function () {
    var uncheckedDatas = this._innerValues.loader();

    if (org.wiedza.check.isNotNull(uncheckedDatas)) {
        org.wiedza.asserts.type.isArray(uncheckedDatas);
        for (var i = uncheckedDatas.length - 1; i >= 0; i--) {
            org.wiedza.asserts.type.isArray(uncheckedDatas[i]);
            org.wiedza.asserts.isFalse((uncheckedDatas[i].length > this._innerValues.nbColumn), "too many value in row!");
        }
    }

    this._innerValues.data = uncheckedDatas;
};

// -----------------------------------------------------------------------------
// render
// -----------------------------------------------------------------------------
org.wiedza.webBook.components.Table.prototype._render = function () {
    var compo = org.wiedza.rendering.createNode('div', 'webbook-table', this.options.id);
    var table = org.wiedza.rendering.createNode('table');

    if(org.wiedza.check.isNotNull(this.options.title)){
        compo.append(this._renderTitle());
    }
    if(org.wiedza.check.isNotNull(this.options.caption)){
        table.append(this._renderCaption());
    }
    table.append(this._renderHeader());
    table.append(this._renderContent());

    compo.append(table);
    this.options.xtag.html("");
    this.options.xtag.append(compo);
};

org.wiedza.webBook.components.Table.prototype._renderTitle = function () {
    var result = org.wiedza.rendering.createNode('div', 'webbook-table-title');
        result.text(this.options.title);
    return result;
};

org.wiedza.webBook.components.Table.prototype._renderCaption = function () {
    var result = org.wiedza.rendering.createNode('caption');
        result.text(this.options.caption);
    return result;
};

org.wiedza.webBook.components.Table.prototype._renderHeader = function () {
    var result = org.wiedza.rendering.createNode('thead');
    var row = org.wiedza.rendering.createNode('tr');

    for (var i = 0; i < this._innerValues.nbColumn; i++) {
        row.append(this._renderHeaderItem(i));
    }

    result.append(row);
    return result;
};

org.wiedza.webBook.components.Table.prototype._renderHeaderItem = function (index) {
    var result = org.wiedza.rendering.createNode('th');
    result.text(this._innerValues.headers[index]);
    return result;
}


org.wiedza.webBook.components.Table.prototype._renderContent = function () {
    this._innerValues.components.tbody = org.wiedza.rendering.createNode('tbody');
    this._renderData();
    return this._innerValues.components.tbody;
};

org.wiedza.webBook.components.Table.prototype._renderData = function () {
    if (org.wiedza.check.isNotNull(this._innerValues.data)) {
        for (var i = 0; i < this._innerValues.data.length; i++) {
            this._renderDataRow(i);
        }
    }
};

org.wiedza.webBook.components.Table.prototype._renderDataRow = function (rowIndex) {
    var data = this._innerValues.data[rowIndex];
    var result = org.wiedza.rendering.createNode('tr', (rowIndex % 2 == 0 ? "even" : "odd"));

    for (var i = 0; i < data.length; i++) {
        result.append(this._renderDataCell(data[i], i));
    }

    this._innerValues.components.tbody.append(result);
};

org.wiedza.webBook.components.Table.prototype._renderDataCell = function (data, cellIndex) {
    var result = org.wiedza.rendering.createNode('td', this._defineCellClass(cellIndex));
        result.html(data);
    return result;
}

org.wiedza.webBook.components.Table.prototype._defineCellClass = function (cellIndex) {
    var result = "";
    if(cellIndex>=0 && cellIndex < this._innerValues.nbColumnClasses){
        result = this._innerValues.columnClasses[cellIndex];
    }
    return result;
}