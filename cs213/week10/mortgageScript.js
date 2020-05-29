function loanDoubt()
{
   var returnIt;
   returnIt = "<p> Loan is a  borrowed money. Must be higher than 0</p>";
   document.getElementById("loanTip").innerHTML =
      returnIt;
}

function APRDoubt()
{
   var returnIt;
   returnIt = "<p> The Annual Percentage Rate must be";
   returnIt += " higher than 0% and less than 25%.</p >";
   returnIt += "<p>If you want to write 1% just tip 1.</p>";
   document.getElementById("APRTip").innerHTML =
      returnIt;  
}

function yearDoubt()
{
   var returnIt;
   returnIt = "<p>Write the number of years you have to pay";
   returnIt += "the loan back.</p > ";
   returnIt += "<p>Must be higher than 0.";
   document.getElementById("yearTip").innerHTML =
      returnIt;  
}

function inputError(id)
{
    var input = document.getElementById(id);
    input.classList.add("inputError");
}

function inputOk(id)
{
    var input = document.getElementById(id);
    input.classList.remove("inputError");
}

function clear()
{
   document.getElementById("myForm").reset();
}

function check(id)
{
   var loan = document.getElementById("loan").value;

   //Get Annual Percentage Rate
   var APR =  document.getElementById("rate").value;

   var years = document.getElementById("year").value;

   if((loan <= 0 || loan == '') && id == "loan")
   {
      inputError(id);
      return;
   }

   else if(loan > 0 && id == "loan")
   {
      inputOk(id);
      return;
   }

   if(((APR < 0 || APR > 25.00) || APR == '') && id == "rate")
   {
      inputError(id);
      return;
   }

   else if((APR > 0 && APR <= 25.00) && id == "rate")
   {
      inputOk(id);
      return;
   }

   if((years <= 0 || years =='') && id == "year")
   {
      inputError(id);
      return;
   }

   else if(years > 0 && id == "year")
   {
      inputOk(id);
      return;
   }
}
