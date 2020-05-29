class Error
{
    constructor(newError, newFocus)
    {
        this.error = newError;
        this.focus = newFocus; 
    }
}

function hide(id)
{
   var input = document.getElementById(id);
   input.classList.add("hide");
}

function appear(id)
{
   var input = document.getElementById(id);
   input.classList.remove("hide");
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

function setFocus(id)
{
   document.getElementById(id).focus();
}

function clearForm()
{
    document.getElementById("myForm").reset();
    setFocus("firstName");
}

function checkPhone()
{
    var number = document.getElementById("phone").value;
    var id = "phone";
    var error = false;

    if (!isNaN(number[3]))
        number = number.replace(number[3], "-" + number[3]);

    if(!isNaN(number[7]))
        number = number.replace(number[7], "-" + number[7]);

    for (let i = 0; i < 12; i++)
    {
        if (i == 3 || i == 7) {}
        else
        {
            if (isNaN(number[i]))
                error = true;
        }
    }

    if (error == true || !isNaN(number[12]))
    {
        inputError(id);
        setFocus(id);
    }
    else
        inputOk(id);

   document.getElementById("phone").value = number;
}

function checkCardNumber()
{
   var number = document.getElementById("credit_card").value;
   if(!isNaN(number[16]))
   {
       inputError("credit_card");
       setFocus("credit_card");
   }
   else
       inputOk("credit_card");
}

function checkCardDate()
{
   var date = document.getElementById("exp_date").value;
   // If the user has a "/" at the date iCheck increase
   // the local to check by 1;
   var iCheck = 0;
   var month = date[0] + date[1];
   var error = false;

   if ((date[0] == "1" && date[1] > "2")
         || (date[0] > "1"))
      error = true;

   if(date[2] == "/")
      iCheck = 1;

   if (((date[2 + iCheck] < "2")
       || (date[4 + iCheck] == "1" && date[5 + iCheck] < "7"))
       || (!isNaN(date[2 + iCheck]) == false)
       || (!isNaN(date[3 + iCheck]) == false)
       || (!isNaN(date[4 + iCheck]) == false)
       || (!isNaN(date[5 + iCheck]) == false))
      error = true;
   else
   {
      var year = date[2 + iCheck] + date[3 + iCheck];
          year += date[4 + iCheck] + date[5 + iCheck];
   }

   if(!isNaN(date[2]) && date[2] != "/")
   {
      month += "/";
      date = month + year;
      document.getElementById("exp_date").value = date;
   }

   if(error == true)
   {
       inputError("exp_date");
       setFocus("exp_date");
   }
   else
       inputOk("exp_date");
}

function checkIfEmpty(id, focus)
{
    var check = document.getElementById(id).value;
    error = new Error(false, focus);

   if(check == "")
   {
      error.error = true;
      inputError(id);
   }
   else
      inputOk(id);

   if(focus == false && error.error == true)
   {
      setFocus(id);
      error.focus = true;
   }

   return error;
}

function finishBuy()
{
   var creditCard = document.getElementsByName("card");
   var checked = false;
   var cardLength = creditCard.length;
   error = new Error(false, false);
   error = checkIfEmpty("firstName", error.focus);
   error = checkIfEmpty("lastName", error.focus);
   error = checkIfEmpty("street", error.focus);
   error = checkIfEmpty("city", error.focus);
   error = checkIfEmpty("state", error.focus);
   error = checkIfEmpty("zip", error.focus);
   error = checkIfEmpty("phone", error.focus);
   error = checkIfEmpty("credit_card", error.focus);
   error = checkIfEmpty("exp_date", error.focus);

   for (var i = 0; i < cardLength; i++)
   {
      if(creditCard[i].checked)
      {
         checked = true;
         break;
      }
   }

   var ok = "<p>Thanks for buying with us</p>";
   var problem = "<p>You forgot complete some part of the form,";
    problem += " or got invalid input</p>";

   if (checked == true && error.error == false)
       document.getElementById("result").innerHTML = ok;
   else
       document.getElementById("result").innerHTML = problem;
}

function goToForm()
{
   hide("itens");
   hide("Buy");
   var total = Number(getTotal()).toFixed(2);
   var totalPrice = "Total Price: $" + total;
   document.getElementById("total").innerHTML = totalPrice; 
   appear("form");
}

function back()
{
   appear("itens");
   appear("Buy");
   hide("form");
}

function getTotal()
{
   var total = 0;
   var itens = document.getElementsByClassName("item");
   for (let i = 0; i < itens.length; i++)
   {
      if(itens[i].checked)
      {
          total += parseInt(itens[i].value);
      }
   }
   return total;
}