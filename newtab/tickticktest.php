<html>
    <head>
        <script src="ticktick.js"></script>
        <script src="//code.jquery.com/jquery-3.5.1.min.js"></script>
    </head>
    <body>
        <?php
             $codetick = $_GET['code'];
             echo $codetick;
             echo "<script>var ticktickcode = ".$codetick."</script>";
        ?>
        <button onclick="ticktickone()">Get TickTick code</button>
    </body>
</html>