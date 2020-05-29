class Error
{
    constructor(newError, newFocus)
    {
        this.error = newError;
        this.focus = newFocus; 
    }
}

function isDuet()
{

   var secondForm = ' <p>First Name:</p>'
       + '<input type = "text" name = "first_name2" '
       + 'id="first_name2" onblur="checkIfEmpty(\'first_name2\',false)" />'
       + '<hr /> <p>Last Name:</p>'
       + '<input type="text" name="last_name2" '
       + 'id="last_name2"  onblur="checkIfEmpty(\'last_name2\',false)" />'
       + '<hr /> <p>Student ID:</p>'
       + '<input type="text" name="student_id2" '
       + ' id="student_id2" onblur="checkIfEmpty(\'student_id2\',false)"/> '
       + '<hr /> <p>Skill Level:</p>'
       + '<select name="skill2">'
       + '    <option value="Beginner">'
       + '       Beginner'
       + '    </option>'
       + '    <option value="Intermediate">'
       + '       Intermediate'
       + '    </option>'
       + '    <option value="Pre-Advanced">'
       + '       Pre-Advanced'
       + '    </option>'
       + '    <option value="Advanced">'
       + '       Advanced'
       + '    </option>'
       + '</select>'
       + '<hr/>'
       + '<p>Instrument:</p>'
       + '<select name="instrument2">'
       + '    <option value="Piano">'
       + '       Piano'
       + '    </option>'
       + '    <option value="Voice">'
       + '       Voice'
       + '    </option>'
       + '    <option value="String">'
       + '       String'
       + '    </option>'
       + '    <option value="Organ">'
       + '       Organ'
       + '    </option>'
       + '    <option value="Other">'
       + '       Other'
       + '    </option>'
       + '</select>'
       + '<hr/>';

   var student2 = "Student 2:";
   var isDuet = document.getElementById("type").value;

   if (isDuet == "Duet")
   {
       document.getElementById('student2').innerHTML = student2;
       document.getElementById("second").innerHTML = secondForm;
       check();
   }
   else
   {
       document.getElementById('student2').innerHTML = "";
       document.getElementById("second").innerHTML = "";
       uncheck();
   }
}

function check()
{
   var id = "isTwoStudent";
   var check = document.getElementById(id);
   check.checked = true;
   check.value = true;
}

function uncheck()
{
   var id = "isTwoStudent";
   var check = document.getElementById(id);
   check.checked = false;
   check.value = false;
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


function checkValidation()
{
   error = new Error(false, false);
   error = checkIfEmpty("room", error.focus);
   error = checkIfEmpty("time", error.focus);
   error = checkIfEmpty("first_name", error.focus);
   error = checkIfEmpty("last_name", error.focus);
   error = checkIfEmpty("student_id", error.focus);
   var isTwoStudent = document.getElementById("isTwoStudent");
   if (isTwoStudent.checked == true)
   {
      error = checkIfEmpty("first_name2", error.focus);
      error = checkIfEmpty("last_name2", error.focus);
      error = checkIfEmpty("student_id2", error.focus);
   }
   if(error.error === false)
   {
      document.getElementById("sendForm").click();
   }
}

function setFocus(id)
{
   document.getElementById(id).focus();
}

function clearForm() {
    document.getElementById("myForm").reset();
    setFocus("type");
}

function openList()
{
   var request = new XMLHttpRequest();
   request.open('GET', 'data/registration.txt');
   request.onload = function(){
      var data = request.responseText;
      data += "]}";
      var obj = JSON.parse(data);
      displayList(obj);
   };
   request.send();
}

function displayList(data)
{
   var list = '<table>' + '<tr>'
            + ' <th> Name </th> '
            + ' <th> Location </th> '
            + ' <th> Time </th>'
            + ' <th> Performance </th> </tr>';
   //let i starts at 1 because the first part of the list will
   //always be empty 
   for (let i = 1; i < data.performance.length; i++)
   {
       list += '<tr> <td> ' + data.performance[i].students[0].first
            + ' ' + data.performance[i].students[0].last;

       if (data.performance[i].type == "Duet")
       {
           list += ' and ' + data.performance[i].student[1].first
                + ' ' + data.performance[i].students[1].last;
       }

       list += ' </td> ';
       list += ' <td> ' + data.performance[i].location.building
            + ' Room ' + data.performance[i].location.room + ' </td> ';
       list += ' <td> ' + data.performance[i].time + '</td>';
       list += '<td> ' + data.performance[i].type + ' for '
            + data.performance[i].students[0].skill + ' '
            + data.performance[i].students[0].instrument;

       if (data.performance[i].type == "Duet")
       {
           list += ' and ' + data.performance[i].students[1].skill
                + ' ' + data.performance[i].students[1].instrument;
       }

       list += ' </td> </tr>';
   }

   list += ' </table>';
   var returnIt = document.getElementById("studentList");
   returnIt.innerHTML = list;
}