<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require '/PHPMailer/Exception.php';
require '/PHPMailer/PHPMailer.php';
require '/PHPMailer/SMTP.php';


$mail = new PHPMailer;

$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'PHPMailer/language/');
$mail->ItsHTML(true);

$mail->setFrom('adm@' . $_SERVER['HTTP_HOST'], 'Галлерея Blanchard');
$mail->addAdress('smite20115@yandex.ru');

$mail->Subject = 'Новая заявка';

$body = '<h1>Новая заявка</h1>';

if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['tel']))){
    $body.='<p><strong>Телефон:</strong> '.$_POST['tel'].'</p>';
}

$mail->Body = $body;


$mail->send();



?>