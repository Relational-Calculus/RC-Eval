import { useState, useEffect, forwardRef } from 'react';
import './SchemaButtons.css';
import Button from '@mui/material/Button';
import { table_to_array } from '../utils'

// [
// {Tablename: x, columnName: [{colName: col1, type: type1}, {colName: col2, type: type2}, {colName: col3, type: type3}]}, 
// [Tablename2, [{colName: col1, type: type1}, {colName: col2, type: type2}, {colName: col3, type: type3}]]   
// ]

const Schemabuttons = forwardRef(({ schema, setFocusState }, ref) => {
    const [localSchema, setLocalSchema] = useState([['', [{colName: '', type: ''}]]]);
    
    useEffect(() => {
        setLocalSchema(table_to_array(schema));
      }, [schema, setLocalSchema]);

    const handleClick = (event) => {
        setFocusState(prevState => {
            return { state: 'schema', 
                     schemaBtnText: event.target.innerText }});
        ref.current.focus();
    }
    
    return (
        <>
            { localSchema[0][0] !== null && localSchema.map(tableName => (
                <div className='outer'>
                    <Button sx={{color: 'black'}} className='button' size='medium' onClick={handleClick}>{tableName[0]}</Button>
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
});

export default Schemabuttons;