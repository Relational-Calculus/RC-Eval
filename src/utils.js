function datapoint_to_json(data) {
    return { dataKey: data, width: 120 }
} 

function column_name_to_json(data, type='') {
    return { colName: data, type: type};
}

// Formatting the result of the query s.t. it fits into MUI table
export function createData(data, fv) {
    if (data === null || fv === null) {
        return [datapoint_to_json("")]
    } else {
        const myArr = []
        for (let i = 0; i < data.length; i += fv.length) {
            const myObj = {};
            for (let j = 0; j < fv.length; j++) {
                myObj[fv[j]] = data[i + j];
            }
            myArr.push(myObj);
        }
        return myArr;
    }
}

// Formatting the string of free variables to columns of the MUI table
export function fv_to_columns(fv) {
    if (fv === null) {
        return [datapoint_to_json("")]
    } else {
        return Array.from(fv, (elem, _) =>
                    datapoint_to_json(elem))
    }
}

// Turn table into an array of schemas, s.t. they can be displayed as buttons on the side
// 
// DESIRED OUTPUT:
// [
// [Tablename1, [{colName: col1, type: type1}, {colName: col2, type: type2}, {colName: col3, type: type3}]], 
// [Tablename2, [{colName: col1, type: type1}, {colName: col2, type: type2}, {colName: col3, type: type3}]]   
// ]

export function table_to_array(table) {
    const result = []
    let tableResult = []
    let columnResult = []
    
    const tables = table.split('\n');
    const regExTableNames = /^[\w+]+/
    const regExColName = /[\w+:]+/g;

    tables.forEach(str => {
        const tableName = str.match(regExTableNames);
        tableResult.push(tableName);
        const colName = str.match(regExColName);
        if (colName !== null) {
            const colNameArr = colName.slice(1);
            colNameArr.forEach(column => {
                const x = column.split(':');
                if (x.length > 1) {
                    columnResult.push(column_name_to_json(x[0], x[1]))
                } else {
                    columnResult.push(column_name_to_json(x[0]))
                }
            })
            tableResult.push(columnResult);
            columnResult = [];
        }
        result.push(tableResult)
        tableResult = [];
        });

        return result;
}


export function schema_from_tablename(tableName, tableArray) {
    let schemaStr = tableName;
    let colNames = [];
    let colNameIdx = 0;
    schemaStr += "(";

    tableArray.forEach((elem, idx) => {
        if (elem[0][0] === tableName) {
            colNameIdx = idx;
        }
    })

    tableArray[colNameIdx][1].map(col => {
        colNames.push(col.colName);
    })

    schemaStr += colNames.join(', ');
    schemaStr += ")";

    return schemaStr;
}

// Get dynamic completion list for current tablenames
// FUNCTION THAT TAKES schema AND GIVES US A STRING OF TABLENAMES
export function schema_to_completion_list(schema) {
    let tableNames = schema.match(/\w+(?=\()/g);
    // let schemas = schema.match(/\w+\)$/g);
    if (tableNames === null) {
        return []
    } else {
        tableNames = tableNames.map((kw) => ({ label: kw, type: "keyword" }));
    }
    return tableNames;
}