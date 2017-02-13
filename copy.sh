#! /bin/sh
mv package.json old_package.json;
jsonFile='package.json';
node > ${jsonFile} <<EOF
var data = require('./old_${jsonFile}');
data.homepage = 'http://localhost:3000';
console.log(JSON.stringify(data));
EOF
