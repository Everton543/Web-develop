function setFocus(id)
{
 document.getElementById(id).focus();
}

function inputOk(id)
{
   var input = document.getElementById(id);
   input.classList.remove("inputError");
}

function inputError(id)
{
   var input = document.getElementById(id);
   input.classList.add("inputError");
}

function checkForm()
{ 
   var startCity = document.getElementById("startCity");
   var startState = document.getElementById("startState");
   var endCity = document.getElementById("endCity");
   var endState = document.getElementById("endState");

   if (!startCity.value.length || !isNaN(startCity.value))
   {
	  setError("startCity");
	  setFocus("startCity");
	  return false;
   }

	if (!startState.value.length
	    || (startState.value.length > 3)
		|| !isNaN(startState.value))
	{
	   setError("startState");
	   setFocus("startState");
	   return false;
	}

	if (!endCity.value.length || !isNaN(endCity.value))
	{
       setError("endCity");
       setFocus("endCity");
       return false;
	}

	if (!endState.value.length
		|| (endState.value.length > 3)
		|| !isNaN(endState.value))
    {
       setError("endState");
	   setFocus("endState");
	   return false;
	}

	return true;	
}
	
function buildQueryString()
{
   var queryString="http://157.201.194.254/cgi-bin/ercanbracks/mileage/mileageAjaxXML?";
   var startCity = document.getElementById("startCity").value;
   var startState = document.getElementById("startState").value;
   var endCity = document.getElementById("endCity").value;
   var endState = document.getElementById("endState").value;
   queryString+="startCity="+startCity+"&startState="+startState+"&endCity="+endCity+"&endState="+endState;
   return queryString;
}

function parseData(trip)
{
   var data="<br>The distance between ";
   console.log(trip);
   var sC=trip.getElementsByTagName("startcity")[0].innerHTML;
   var sS=trip.getElementsByTagName("startstate")[0].innerHTML;
   var eC=trip.getElementsByTagName("endcity")[0].innerHTML;
   var eS=trip.getElementsByTagName("endstate")[0].innerHTML;
   var miles=trip.getElementsByTagName("miles")[0].innerHTML;
   var tmode=trip.getElementsByTagName("tmode");
   var modes = "";

   for(var i =0; i < tmode.length; i++) {
       modes+=" - "+tmode[i].innerHTML+"<br>";
   }
 
    data+=sC+", "+sS+" and "+eC+", "+eS+" is "+miles+" miles.<br><br>"
       +"The transportation modes available are:<br><br>"+modes;
    console.log(data);
   return data;
}

function loadXML() 
{
   var request;
   var validate = checkForm();

   if(validate	!= true)
      return;

   var url = buildQueryString();
   var response;
	
   if (window.XMLHttpRequest)
      request=new XMLHttpRequest();

   else
      request=new ActiveXObject("Microsoft.XMLHTTP");

   request.onreadystatechange=function() {
      if (request.readyState==4 && request.status==200)
      {
         response=request.responseText;
         if(window.DOMParser)
         {
	        parser = new DOMParser();
	        trip = parser.parseFromString(response, "text/xml");
         }
          
         else
         {
            xmlDoc=new	ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.loadXML(txt);
         }

         document.getElementById("result").innerHTML = parseData(trip);
      }
   }

   request.open("GET",url,true);
   request.send();
}
	