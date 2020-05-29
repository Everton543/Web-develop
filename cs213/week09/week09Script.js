function openFile(fileName)
{

   var xhr = new XMLHttpRequest();
   xhr.open('GET', fileName, true);

   xhr.onload = function ()
   {
      if (this.status == 200)
      {
         var str = this.responseText;
         var res = str.split("\n");
         var size = res.length;
         var output = "<ul>";
         for(var i = 0; i < size -1 ; i++)
         {
             output += "<li>" + res[i] + "</li>";
         }
         output += "</ul>";
         document.getElementById('result').innerHTML =
            output;
       }
    }

   xhr.send();
}

function openJSON()
{
   console.log("openJSON");
   var fileName = " ";
   fileName = document.getElementById('fName').value;
   if(fileName == "")
   {
      fileName = "json.txt";
   }
   console.log(fileName);
   var xhr = new XMLHttpRequest();
   xhr.open('GET', fileName, true);
   console.log(this.status);
   //I don't know why, but bellow from here
   //It does nothing
   xhr.onload = function()
   {
      console.log("Does not show");
      if(this.status == 200)
      {
         var users = JSON.parse(this.responseText);
         console.log(this.responseText)
         //Create list to each users.
         var output = '<div id="users">';
         for(var i in users)
         {
             console.log(i);
             output += '<ul>' + '<li>Name: '
                + users[i].first + " "
                + users[i].last + '</li>'
                + '<li>Address: ' + users[i].address[i].city
                + ', ' +  users[i].address[i].state
                + '. zip: ' + users[i].address[i].zip + '</li>'
                + '<li>Major: ' + users[i].major + '</li>'
                + '<li>GPA: ' + users[i].gpa + '</li> </ul>';
          }
          output += '</div>';
          document.getElementById('usersResult').innerHTML = output;
      }

      if(this.status == 404)
      {
         var output = '<div id="ERROR">'
            + '<img src="ERROR.png" width="50%" height="auto"'
            + '<h3>Page Not Found</h3>'
            + '</div>';
         document.getElementById('site').innerHTML = output;
      }
   }
}