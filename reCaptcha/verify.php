<?php
  $url = 'https://www.google.com/recaptcha/api/siteverify';
        $data = ['secret'   => '6Lcn02kpAAAAAJmQiIFG-GTY81TX84Ab9CYkwBBg',
            'response' => $_POST['g-recaptcha-response'],
            'remoteip' => $_SERVER['REMOTE_ADDR']];

        $options = [
            'http' => [
                'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                'method'  => 'POST',
                'content' => http_build_query($data)
            ]
        ];

        $context  = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        echo $result;
        echo json_decode($result)->success;
?>