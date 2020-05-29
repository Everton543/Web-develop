<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width">
   <title>Assignment 11</title>
   <link href="week11Style.css" rel="stylesheet" type="text/css" />
</head>
<body>
   <div id="site">
      <h1>Essential For Christians</h1>
      <?php
         function confirm()
         {
            echo "<p>Thank you for your purchase</p>";
            echo "<p>We'll deliver your order one day</p>";
		 }

         function cancel()
         {
            echo "<p>Your order was cancelled</p>";
		 }

         function check()
         {
            $confirm = $_GET['confirm'];
            if($confirm == "")
               cancel();
            else
               confirm();
	     }

         check();
      ?>      
   </div>
</body>
</html>