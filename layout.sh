#!/bin/bash

type=$1
dir=$2
file_name=$3

function app_layout() {
    mkdir ./src/app/$dir
    touch ./src/app/$dir/layout.tsx ./src/app/$dir/page.tsx

    zeditor ./src/app/$dir/layout.tsx ./src/app/$dir/page.tsx
}

function cmp_layout() {
    mkdir ./src/components/$dir
    touch ./src/components/$dir/$file_name

    zeditor ./src/components/$dir/$file_name
}

if [ $type != 'app' && $type != 'cmp' ];
then
    echo "Entrada no valida"
fi

if [ $type == 'app' ];
then
    app_layout
fi

if [ $type == 'cmp' ];
then
    cmp_layout
fi
