### HELP
RC-Evaluator comes with a list of example queries with corresponding relational databases already written and ready to use. Just use the example drop-down menu to get started. 

RC-Evaluator follows the grammar defined below, useful for writing your own queries: 

Q = p(t, . . . , t) \
&nbsp;&emsp;| t ≈ t | t < t \
&nbsp;&emsp;| ¬Q | Q ∧ Q | Q ∨ Q \
&nbsp;&emsp;| ∀x. Q | ∃x. Q \
&nbsp;&emsp;| x ← Ω(t;  ̄g) Q \
&nbsp;&emsp;| LET p( ̄x) = Q IN Q 
\
\
t = c | x


The example schemas and databases can be modified using the buttons *SCHEMA* and *DATABASE* respectively and here it is possible to upload your own files if they have the file extensions .sig (for the schema) and .db (for the database). 

Queries can be written directly in the provided field, or you can use the provided buttons for relations and symbols. RC-Evaluator will provide syntax highlighting for relations and operators, suggest autocompletions for relations, operators and variables, as well as display syntax errors. 

Once you have written a query you can check if it is in relational algebra normal form using the *RANF* button. If your original query is not in RANF the RC-Evaluator will try to rewrite your query such that it is. If you are an experienced user, check off *Expert Mode* to see exactly how the tool evaluates your query using the *Evaluation* button that will appear. 

Results will be displayed in a table below the query field. The table can be copied directly to LaTeX source code along with the evaluated query using the designated buttons *Table* and *Query* respectively. If the query returns True, False or have infinitly many results, this will be displayed instead of a table.  