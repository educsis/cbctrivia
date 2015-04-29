<?php 
include('MyTXT.php');
$mytxt = new MyTXT("../datausers/posiciones.cbc");
$key = $_POST['key'];
$vida = $_POST['vida'];
$mytxt->rows[$key]['vida']=$vida+1;

$mytxt->save("../datausers/posiciones.cbc"); 
$mytxt->close();
