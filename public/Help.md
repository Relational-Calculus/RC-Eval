### HELP
DISPLAY CONTENT THAT HELPS WRITING RELATIONAL CALCULUS QUERIES

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

Queries can be written directly in the provided field, or you can use the provided buttons for relations and symbols.  


and RC-Evaluator will provide syntax highlighting for relations and operators, suggest autocompletions for relations, operators and variables, as well as display error messages for syntax errors. 