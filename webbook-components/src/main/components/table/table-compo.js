// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.weidza.webBook.components.Table
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.weidza.webBook.components.Table = function (options) {
    this._looger = org.weidza.logger.factory("org.weidza.webBook.components.Table");

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
org.weidza.webBook.components.Table.prototype._init = function (options) {
    org.weidza.asserts.notNull(options, "Table option mustn't be null!");
    org.weidza.asserts.notNull(options.xtag, "XTag node mustn't be null!");
    org.weidza.asserts.notNull(options.id, "ID mustn't be null!");
    org.weidza.asserts.notNull(options.columns, "Table columns mustn't be null!");
    this.options = options;

    if (org.weidza.check.isNotNull(this.options.loader)) {
        this._innerValues.loader = org.weidza.services.getFunction(this.options.loader);
    }

    if (org.weidza.check.isNotNull(this.options.columnClasses)) {
        this._innerValues.columnClasses = this.options.columnClasses.split(this._innerValues.charSplitter);
        this._innerValues.nbColumnClasses = this._innerValues.columnClasses.length;
    }
};


org.weidza.webBook.components.Table.prototype._initData = function () {
    this._initHeaders();
    this._updateValues();
};

org.weidza.webBook.components.Table.prototype._initHeaders = function () {
    var headerValues = this.options.columns.split(this._innerValues.charSplitter);

    this._innerValues.nbColumn = headerValues.length;
    org.weidza.asserts.isTrue(this._innerValues.nbColumn > 0, "can't render table without column (" + this.options.id + ')');

    for (var i = 0; i < this._innerValues.nbColumn; i++) {
        this._innerValues.headers.push(headerValues[i].trim());
    }
};

org.weidza.webBook.components.Table.prototype._updateValues = function () {
    if (this._innerValues.loader === null) {
        this._updateFromTags();
    } else {
        this._updateFromFunction();
    }
};


org.weidza.webBook.components.Table.prototype._updateFromTags = function () {
    //TODO :implement
};

org.weidza.webBook.components.Table.prototype._updateFromFunction = function () {
    var uncheckedDatas = this._innerValues.loader();

    if (org.weidza.check.isNotNull(uncheckedDatas)) {
        org.weidza.asserts.type.isArray(uncheckedDatas);
        for (var i = uncheckedDatas.length - 1; i >= 0; i--) {
            org.weidza.asserts.type.isArray(uncheckedDatas[i]);
            org.weidza.asserts.isFalse((uncheckedDatas[i].length > this._innerValues.nbColumn), "too many value in row!");
        }
    }

    this._innerValues.data = uncheckedDatas;
};

// -----------------------------------------------------------------------------
// render
// -----------------------------------------------------------------------------
org.weidza.webBook.components.Table.prototype._render = function () {
    var compo = org.weidza.rendering.createNode('table', 'webbook-table', this.options.id);
    compo.append(this._renderHeader());
    compo.append(this._renderContent());
    this.options.xtag.append(compo);
};

org.weidza.webBook.components.Table.prototype._renderHeader = function () {
    var result = org.weidza.rendering.createNode('thead');
    var row = org.weidza.rendering.createNode('tr');

    for (var i = 0; i < this._innerValues.nbColumn; i++) {
        row.append(this._renderHeaderItem(i));
    }

    result.append(row);
    return result;
};

org.weidza.webBook.components.Table.prototype._renderHeaderItem = function (index) {
    var result = org.weidza.rendering.createNode('th');
    result.text(this._innerValues.headers[index]);
    return result;
}


org.weidza.webBook.components.Table.prototype._renderContent = function () {
    this._innerValues.components.tbody = org.weidza.rendering.createNode('tbody');
    this._renderData();
    return this._innerValues.components.tbody;
};

org.weidza.webBook.components.Table.prototype._renderData = function () {
    if (org.weidza.check.isNotNull(this._innerValues.data)) {
        for (var i = 0; i < this._innerValues.data.length; i++) {
            this._renderDataRow(i);
        }
    }
};

org.weidza.webBook.components.Table.prototype._renderDataRow = function (rowIndex) {
    var data = this._innerValues.data[rowIndex];
    var result = org.weidza.rendering.createNode('tr', (rowIndex % 2 == 0 ? "even" : "odd"));

    for (var i = 0; i < data.length; i++) {
        result.append(this._renderDataCell(data[i], i));
    }

    this._innerValues.components.tbody.append(result);
};

org.weidza.webBook.components.Table.prototype._renderDataCell = function (data, cellIndex) {
    var result = org.weidza.rendering.createNode('td', this._defineCellClass(cellIndex));
        result.text(data);
    return result;
}

org.weidza.webBook.components.Table.prototype._defineCellClass = function (cellIndex) {
    var result = "";
    if(cellIndex>=0 && cellIndex < this._innerValues.nbColumnClasses){
        result = this._innerValues.columnClasses[cellIndex];
    }
    return result;
}