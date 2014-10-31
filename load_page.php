<?php

$page = $_POST['page'];

if(file_exists($page.'.html'))
echo file_get_contents($page.'.html');

else echo $page.'.html';
?>