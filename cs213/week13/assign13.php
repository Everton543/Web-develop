<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Assignment 13</title>
    <link href="week13Style.css" rel="stylesheet" type="text/css" />
</head>
<body onload="openList()">
   <script src="week13Script.js"></script>
   <div id="site">
       <h1>BYU-Idaho Music Festival</h1>
      <form action="#" method="post"
            id="myForm">
          <h2>Performance Info:</h2>
          <hr />

          <p>Type:</p>
          <select name="perType"  onblur="isDuet()"
                  id="type">
              <option value="Solo">
                  Solo
              </option>

              <option value="Duet" >
                  Duet
              </option>

              <option value="Concerto">
                  Concerto
              </option>
          </select>
          <hr/>

          <p>Building:</p>
          <select name="building">
              <option value="Austin">
                  Austin
              </option>

              <option value="Clarke" >
                  Clarke
              </option>

              <option value="Hinckley">
                  Hinckley
              </option>

              <option value="Snow">
                  Snow
              </option>
          </select>
          <hr />

          <p>Room: </p>
          <input type="number" name="room" id="room"
                 onblur="checkIfEmpty('room', false)"/>
          <hr />

          <p>Time Slot:</p>
          <input type="text" name="time" id="time"
                 onblur="checkIfEmpty('time', false)"/>
          <hr />

          <h2>Student Info:</h2>
          <h3>Student 1:</h3>

          <p>First Name:</p>
          <input type="text" name="first_name" id="first_name"
                 onblur="checkIfEmpty('first_name', false)"/>
          <hr />

          <p>Last Name:</p>
          <input type="text" name="last_name" id="last_name"
                 onblur="checkIfEmpty('last_name', false)"/>
          <hr />

          <p>Student ID:</p>
          <input type="text" name="student_id" id="student_id"
                 onblur="checkIfEmpty('student_id', false)"/>
          <hr />
          
          <p>Skill Level:</p>
          <select name="skill">
              <option value="Beginner">
                  Beginner
              </option>

              <option value="Intermediate">
                  Intermediate
              </option>

              <option value="Pre-Advanced">
                  Pre-Advanced
              </option>

              <option value="Advanced">
                  Advanced
              </option>
          </select>
          <hr/>

          <p>Instrument:</p>
          <select name="instrument">
              <option value="Piano">
                  Piano
              </option>

              <option value="Voice">
                  Voice
              </option>

              <option value="String">
                  String
              </option>

              <option value="Organ">
                  Organ
              </option>

              <option value="Other">
                  Other
              </option>
          </select>
          <hr/>
          <h3 id="student2"></h3>
          <p id="second"></p>
          <input type="button" value="CLEAR FORM"
                 onclick="clearForm()" />
          <input type="button" value="REGISTER"
                 onclick="checkValidation()"/>
          <input type="submit" id="sendForm" class="hide" />
          <input type="radio" name="isTwoStudent"
                 id="isTwoStudent" class="hide" value="false"/>
      </form>
      <div id="schedule">
          <h2 class="middle">Festival Schedule</h2>
          <table id="studentList"></table>
      </div>
   </div>
<?php
function makeJson()
{
   $type = $_POST['perType'];
   $building = $_POST['building'];
   $room = $_POST['room'];
   $time = $_POST['time'];
   $firstName1 = $_POST['first_name'];
   $lastName1 = $_POST['last_name'];
   $studentId1 = $_POST['student_id'];
   $skill1 = $_POST['skill'];
   $instrument1 = $_POST['instrument'];

   if($type == "Duet")
   {
      $firstName2 = $_POST['first_name2'];
      $lastName2 = $_POST['last_name2'];
      $studentId2  = $_POST['student_id2'];
      $skill2 = $_POST['skill2'];
      $instrument2 = $_POST['instrument2'];
   }
   $jsonText = ','.PHP_EOL;
   $jsonText .='    { "type" : "'  .$type. '",' .PHP_EOL;
   $jsonText .= '      "students" :' .PHP_EOL;
   $jsonText .='       ['.PHP_EOL; 
   $jsonText .= '         { "first" : "' .$firstName1. '",' .PHP_EOL;
   $jsonText .= '           "last" : "' .$lastName1. '",' .PHP_EOL;
   $jsonText .= '           "id" : "' .$studentId1. '",' .PHP_EOL;
   $jsonText .= '           "skill" : "' .$skill1. '",' .PHP_EOL;
   $jsonText .= '           "instrument" : "' .$instrument1. '"' .PHP_EOL;
   $jsonText .= '         }';

   if($type == "Duet")
   {
      $jsonText .= ','.PHP_EOL;
   $jsonText .= '         { "first" : "' .$firstName2. '",' .PHP_EOL;
   $jsonText .= '           "last" : "' .$lastName2. '",' .PHP_EOL;
   $jsonText .= '           "id" : "' .$studentId2. '",' .PHP_EOL;
   $jsonText .= '           "skill" : "' .$skill2. '",' .PHP_EOL;
   $jsonText .= '           "instrument" : "' .$instrument2. '"' .PHP_EOL;
   $jsonText .= '         }';
   }
   
   $jsonText .= PHP_EOL. '      ],' .PHP_EOL;
   $jsonText .= '      "location" : { "building" : "' .$building. '", ';
   $jsonText .= '"room" : "' .$room. '" },' .PHP_EOL;
   $jsonText .= '      "time" : "' .$time. ' AM"' .PHP_EOL;
   $jsonText .= '    }';
   $myfile = fopen("data/registration.txt", "a") or die("Unable to open file!");
   fwrite($myfile, $jsonText);
   fclose($myfile);
}
makeJson();
?>
</body>
</html>