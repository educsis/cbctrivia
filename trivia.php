<?php
include('classes/MyTXT.php');
$mytxt = new MyTXT("datausers/posiciones.cbc");
$c=0;

foreach ($_COOKIE as $key => $value) {

        $explota = explode('_', $key);
	if($explota[0]=='wordpress' && $explota[1]=='logged' && $explota[2]=='in'){
		$c=1;
		$dato = $value;
	}
//        echo $explota[0] . ' ' . $value;
 //       echo '<br>';//
//	$c++;
	}
//die();
$value = explode('|', $dato);
$usuarioIntranet = $value[0];
if($c==0){
echo '<h1 style="font-size:30px; font-weight:bold;text-align:center;font-family:sans-serif; color: #2F414B;">PARA PODER PARTICIPAR NECESITAS ACCEDER CON TUS DATOS DE ACCESO EN LA INTRANET.</h1>';
DIE();
}
//echo $usuarioIntranet;
//echo '<pre>';
//print_r($_COOKIE);
//echo '<pre>';
//print_r($value);
//die();
/**revisar si existe usuario en db*/
$existe = 0;
foreach ($mytxt->rows as $row) {
    if ($row['usuario'] == $usuarioIntranet) {
        $existe=1;
    }
}

if($existe==0){
    $mytxt->add_row(array($usuarioIntranet, 0, 0, 0, 1));
    $mytxt->save("datausers/posiciones.cbc"); 
}
/**cargar a memoria el key usuario para editar***/
$keyUsuario = 0;
foreach ($mytxt->rows as $key => $row) {
    if ($row['usuario'] == $usuarioIntranet) {
        $keyUsuario = $key;
    }
}
$vidaUsuarioActual = $mytxt->rows[$keyUsuario]['vida'];
$mytxt->close();
//$mytxt->rows[0]['usuario'] = 'Edwinsito';
//echo '<pre>';
//print_r($mytxt);

//$mytxt->save("datausers/posiciones.cbc"); 

//$mytxt->close();
/*copiar BUP*/
copy("datausers/posiciones.cbc", "datausers/posicionesBUP.cbc");

?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Trivia Mundialista CBC</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
        
        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/animate.css">
        <link rel="stylesheet" href="js/jquery.qtip.css">
        
        <link rel="stylesheet" href="css/main.css">

        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
        <script type="text/javascript">

        </script>
    </head>
    <body>
        <!-- variables de vida y de key -->
        <input type="hidden" class="key" value="<?= $keyUsuario; ?>">
        <input type="hidden" class="vida" value="<?= $vidaUsuarioActual; ?>">
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
        <div class="container">
            <img src="img/cover.png" class="cover">
            <img src="img/preloader.gif" class="preloader">
            <div class="header clearfix">
                <a href="javascript:void(0);" class="instruccionesbtn">
                    <img id="box" src="img/instrucciones.png">
                </a>
            </div>
            <div class="center">
                <a href="#" class="btn btnjugar" style="margin: 40px auto 10px;">JUGAR</a>
                <a href="javascript:void(0);" class="btn ranking" style="margin: 15px auto;">VER RANKING</a>
                
            </div>
            <div class="footer">
                <?= '<p class="usuarioIntranet">'.$usuarioIntranet.'</p>'; ?>
            </div>
            <pre>
                    <?php print_r($miDato); ?>
                </pre>
            
        </div>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.2.min.js"><\/script>')</script>
        <script src="js/jquery.qtip.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/jquery.plugin.js"></script>
        <script src="js/jquery.countdown.js"></script>
        <script src="js/main.js"></script>
        <script>
          $(function(){
                
                
          });
        </script>
        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='//www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create','UA-XXXXX-X');ga('send','pageview');
        </script>
    </body>
</html>
