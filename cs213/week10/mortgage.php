<html>
<head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width">
   <title>Mortgage</title>
   <link href="mortgageStyle.css" rel="stylesheet" type="text/css" />
</head>
<body>
   <script src="mortgageScript.js"></script>
   <div id="site">
      <h1> Calculate Monthly </h1>

      <form id="myForm" action="mortgage.php" method="get">
         <div id="checkLoan">
            <h2>Loan</h2>
            <p id="loanTip"></p>
            <img src="doubt.png" onclick="loanDoubt()" id="doubt" />
            <input type="number" id="loan" name="loan"
             onkeypress = "check('loan')" step = 0.01 min= 0/>
         </div>

         <div id="checkYear">
            <h2>Years</h2>
            <p id="yearTip"></p>
            <img src="doubt.png" onclick="yearDoubt()" id="doubt" />
            <input type="number" id="year" name="year"
             onkeypress = "check('year')" step= 1 min= 0/>
         </div>

         <div id="checkAPR">
            <h2>Annual Percentage Rate</h2>
            <p id="APRTip"></p>
            <img src="doubt.png" onclick="APRDoubt()" id="doubt" />
            <input type="number" id= "rate" name="rate"
             onkeypress = "check('rate')"  step = 0.01 min= 0 />
         </div>
      <input type="submit" value="calculate"/>
         <p> Make shure that the information are correct
            before conforming the calculation</p>

      </form>      

      <?php
      function calculateMortage($loan, $APR, $years)
      {
         $APR /= 100;
         $APR /= 12;
         $month = $years * 12;
         $power = (1 + $APR) ** $month;
         $mPayment = ($loan * ($APR * $power)) / ($power - 1);
         $returnIt = number_format((float)$mPayment, 2, '.', '');
         return $returnIt;
	  }

      function displayResult($monthlyPayment)
      {
         echo "<p id='result'> \$ $monthlyPayment </p>";
	  }

      function inputErrorPHP($id)
      {
         echo '<script>', 'function inputError($id){ console.log($id);', 
              '   document.getElementById($id).style.backgroundColor = "red";',
              'document.getElementById($id).style.color="white";}',
              ' </script>';
	  }

      function main()
      {
         $loan = $_GET["loan"];
         $year = $_GET["year"];
         $APR = $_GET["rate"];
         $ok = true;
         $errorYear = "year";
         if($loan <= 0 || $loan == '')
         {
             inputErrorPHP("loan");
             $ok = false;
         }
         else
            //inputOk("loan");
 
         if($APR < 0 || $APR > 25.00 || $APR == '')
         {
            inputErrorPHP("rate");
            $ok = false;
         }
         else
          //  inputOk("rate");
    
         if($years <= 0 || $years =='')
         {
            inputErrorPHP($errorYear);
            $ok = false;
         }
         else
           // inputOk("year");

         if($ok == true)
         {
            $monthlyPayment = calculateMortage($loan, $year, $APR);
            displayResult($monthlyPayment);
         }
      }

      main();
      ?>
      
   </div>
</body>
</html>