<?php 
$key = $_POST['key'];
$vida = $_POST['vida'];
echo $key;
include('MyTXT.php');
$mytxt = new MyTXT("../datausers/posiciones.cbc");
$mytxt->rows[$key]['s'.$vida] = $mytxt->rows[$key]['s'.$vida]+1;

$mytxt->save("../datausers/posiciones.cbc"); 
$mytxt->close();