#!/bin/bash

cd ~/monpoly/js/
eval $(opam env)
dune build
rm -f ~/rc-eval/public/rcEval.bc.js
cp ~/monpoly/_build/default/js/rcEval.bc.js ~/rc-eval/public/
cd ~/rc-eval