function datapoint_to_json(data) {
    return { dataKey: data, width: 120 }
} 

// Formatting the result of the query s.t. it fits into MUI table
export function createData(data, fv) {
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

// Formatting the string of free variables to columns of the MUI table
export function fv_to_columns(fv) {
    return Array.from(fv, (elem, _) =>
                    datapoint_to_json(elem))
}
