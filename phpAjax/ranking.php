<?php 
include('MyTXT.php');
$mytxt = new MyTXT("../datausers/posiciones.cbc");
//print_r($mytxt->display());

$highest = array();

foreach ($mytxt->rows as $key => $row) {
    $max = max($row['s1'],$row['s2'],$row['s3']);
    //echo $max;
    $highest[] = array('usuario' => $row['usuario'], 'punteo' => $max);
}

foreach ($highest as $clave => $fila) {
    $usuario[$clave] = $fila['usuario'];
    $punteo[$clave] = $fila['punteo'];
}

array_multisort($punteo, SORT_DESC, $highest);
$highest = array_slice($highest, 0,10);

$mytxt->close();
$html = '<a href="#" class="closeRank">X</a>';
$html .= '<div class="rankTitle">RANKING</div>';
$html .= '<ol class="rankList">';
$po = 1;
foreach ($highest as $v) {
	 $html .= '<li>' . $po . '. ' . $v['usuario'] . '<span style="float:right; margin-right:20px;">       .................................      ' . $v['punteo'] . ' puntos</span>' .  '</li>';
$po++;
}

$html .= '</ol>';

echo $html;
