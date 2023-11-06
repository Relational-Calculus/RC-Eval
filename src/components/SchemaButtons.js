import { useState, useEffect } from 'react';
import './SchemaButtons.css';
import Button from '@mui/material/Button';
import { table_to_array } from '../utils'

// [
// {Tablename: x, columnName: [{colName: col1, type: type1}, {colName: col2, type: type2}, {colName: col3, type: type3}]}, 
// [Tablename2, [{colName: col1, type: type1}, {colName: col2, type: type2}, {colName: col3, type: type3}]]   
// ]

export default function Schemabuttons({ schema }) {
    const [localSchema, setLocalSchema] = useState([['', [{colName: '', type: ''}]]]);

    console.log(localSchema)

    useEffect(() => {
        setLocalSchema(table_to_array(schema));
      }, [schema, setLocalSchema]);
    
    return (
        <>
            { localSchema[0][0] !== null && localSchema.map(tableName => (
                <div className='outer'>
                    <Button sx={{color: 'black'}} className='button' size='medium'>{tableName[0]}</Button>
                    <div className='inner'>
                        {tableName[1].map(columnName => (
                            <div>
                                <Button sx={{color: 'black'}} className='button' size='small'>
                                    {columnName.colName}&nbsp;<i>{columnName.type}</i>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
      );
}