### HELP
RC-Evaluator is a tool designed to help students write and learn more about relational calculus queries. It comes with a list of example queries with corresponding relational databases already written and ready to use. Just use the example drop-down menu to get started. 

RC-Evaluator follows the grammar defined below, useful for writing your own queries: 

Q = p(t, . . . , t)
| t ≈ t | t < t
| ¬Q | Q ∧ Q | Q ∨ Q
| ∀x. Q | ∃x. Q
| x ← Ω(t;  ̄g) Q
| LET p( ̄x) = Q IN Q

t = c | x


The example schemas and databases can be modified using the buttons SCHEMA and DATABASE respectively and here it is possible to upload your own files if they have the file extensions .sig (for the schema) and .db (for the database). 

Queries can be written directly in the provided field, or you can use the provided buttons for relations and symbols. RC-Evaluator will provide syntax highlighting for relations and operators, suggest autocompletions for relations, operators and variables, as well as display error messages for syntax errors. 

Once you have written a query you can check if it is in relational algebra normal form using the *RANF* button. If you are an experienced user, check off *expert mode* to see exactly how the tool evaluates your query using the *Evaluation* button that will appear.  

Results will be displayed in a table below the query field. The table can be copied directly to LaTeX source code along with the evaluated query using the designated buttons *Table* and *Query* respectively. If the query returns True, False or have infinitly many results, this will be displayed instead of a table.  