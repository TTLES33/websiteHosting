<html>
    <head>
        <script src="redirect.js"></script>
        <meta charset="UTF-8">
    </head>
    <body onload="search()">
        <div id="log">
            <?php
            $engine = $_GET['engine'];
            $query = $_GET['query'];
            echo "<script> 
            var engine = \"".$engine."\";
            var query = \"".$query."\";
            </script>";
            echo "<br>";
            echo "[Engine] ";
            echo $engine;
            echo "<br>";
            echo "[Query] ";
            echo $query;
            ?>
        </div>
        
    </body>
</html>