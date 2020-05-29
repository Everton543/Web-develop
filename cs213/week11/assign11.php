<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width">
   <title>Assignment 11</title>
   <link href="week11Style.css" rel="stylesheet" type="text/css" />
</head>
<body>
   <script src="week11Script.js"></script>
   <div id="site">
       <h1>Essential For Christians</h1>
       <form id="myForm" action="assign11_a.php" method="get">
          <?php 

             function identity()
             {
                 $firstName = $_GET['firstName'];
                 $lastName = $_GET['lastName'];
                 echo "<p>Name: " .$firstName;
                 echo " " .$lastName. "</p>";
			 }

             function address()
             {
                $street = $_GET['street'];
                $city = $_GET['city'];
                $state = $_GET['state'];
                $zip = $_GET['zip'];
                echo "<h2>Address:</h2>";
                echo "<p>Street: " .$street. "</p>";
                echo "<p>City: " .$city. "</p>";
                echo "<p>State: " .$state. "</p>";
                echo "<p>Zip: " .$zip. "</p>";
			 }

             function contact()
             {
                $phone = $_GET['phone'];
                echo "<br /> <p>Cell Phone: " .$phone. "</p> <br />";
			 }

             function creditCard()
             {
                $type = $_GET['card'];
                $cardNumber = $_GET['credit_card'];
                $expDate = $_GET['exp_date'];

                echo "<h2>Credit Card </h2>";
                echo "<p>Type: " .$type. "</p>";
                echo "<p>Number: " .$cardNumber. "</p>";
                echo "<p>Expiration Date: " .$expDate. "</p>";
			 }

             function showDecimal($number)
             {
                return number_format((float)$number, 2, '.', '');     
			 }

             function getTotal()
             {
                 $itens = $_GET["value"];
                 $total = 0;
                 
                 if (isset($_GET['value']))
                 {
                     echo "<p>Total Price ";
                     
                     foreach($itens as $value){
                         $total += $value;
					 }
				 }

                 echo "$" .showDecimal($total). "</p>";
			 }

              function getName()
              {
                 $names = $_GET['item'];
                 echo "<tr>";
                 if (isset($_GET['item']))
                 {
                    foreach($names as $item){
                        echo "<th>" .$item. "</th>";
                    }
                 }
			  }

              function getValue()
              {
                 $itens = $_GET["value"];
                 echo "<tr>";                
                 if (isset($_GET['value']))
                 {
                     foreach($itens as $value){
                         echo "<td>Buying for $";
                         echo showDecimal($value). "</td>";
					 }
				 }
                 echo "</tr>";
			  }

              function itemList()
              {
                  $names = $_GET['item'];
                  $values = $_GET['value'];
                  echo "<p>You are buying the following:</p>";
                  echo "<table>";
                  getName();
                  getValue();
                  echo "</table>";              
			  }

              function main()
              {
                  echo "<p>Check if the information are correct:</p>";
                  itemList();
                  getTotal();
                  identity();
                  address();
                  contact();
                  creditCard();
			  }

              main();
          ?>
          <input type="submit" id="button" name="confirm" value="CONFIRM" />
          <input type="submit" id="button" name="cancel" value="CANCEL" />
      </form>
   </div>
</body>
</html>