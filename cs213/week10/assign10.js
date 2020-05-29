function update() {
   var phpResponse = document.getElementById('phpResponse');
   var requestBtn  = document.getElementById('buttonJS');

   phpResponse.innerHTML = 'Loading . . .';
   console.log("please open");    
   let xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200)
       {
           let jsonObject = JSON.parse(this.responseText);
           let jsonParsed = '<table><tbody><tr><th>File Name</th><th>'
                            + 'File Type</th><th>Current Working Directory'
                            + '</th><th>View Contents</th></tr>';

           for (var i = 0; i < jsonObject.length; i++) {
               jsonParsed += '<tr>'
                          + '<td>' + jsonObject[i].fileName + '</td>'
                          + '<td>' + jsonObject[i].fileType + '</td>'
                          + '<td>' + jsonObject[i].cwd + '</td>';

               if(jsonObject[i].fileType === 'file') {
                   jsonParsed += '<td><button name="button"'
                              + 'onclick="window.open(\''
                              + jsonObject[i].fileName 
                              + '\', \'_blank\')">Click to Display'
                              + '</button></td>';
               } else {
                   jsonParsed += '<td>&nbsp;</td>';
               }
               jsonParsed += '</tr>';
      }

      if (this.readyState == 4 && this.status == 404)
      {
         let newTitle = '<h1 id="title">Page not found</h1>';
         document.getElementById("title").innerHTML = newTitle;
         let notFound = '<div id="error">'
                      + '<img src="ERROR.png" class="error" />';
         phpResponse.innerHTML = notFound;

      }
           // close the result table
           jsonParsed += '</tbody></table>'

           // write to the DOM
           phpResponse.innerHTML = jsonParsed;
       }
   }
   // GET the requested file
   xhttp.open('GET', 'assign10.php', true);
   // send the GET request
   xhttp.send();
}