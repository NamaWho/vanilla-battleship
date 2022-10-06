<?php

function success($message = ""){
    echo json_encode(array('error' => 0, 'message' => $message), true);
    die();
}

function error($message = ""){
    echo json_encode(array('error' => 1, 'message' => $message), true);
    die();
}