<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    if (!empty($password)) {
        $filename = realpath('saved_passwords.txt');

        if ($filename) {
            file_put_contents($filename, $password . PHP_EOL, FILE_APPEND);
            echo 'success';
        } else {
            echo 'failure';
        }
    } else {
        echo 'failure';
    }
} else {
    header('Error');
}
?>