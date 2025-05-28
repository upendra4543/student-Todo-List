//form validation

function validateForm(name, studentId, email, contactNo) {
    let isValid = true;
      
    // Name
    if (name.trim() === "") {
        document.querySelector(".name-error").innerText = "Name is required";
        isValid = false;
    } else {
        document.querySelector(".name-error").innerText = "";
    }

    // Student ID
    if (studentId.trim() === "") {
        document.querySelector(".id-error").innerText = "Student ID is required";
        isValid = false;
    } else if (studentId.length > 8) {
        document.querySelector(".id-error").innerText = "Student ID must be max 8 characters";
        isValid = false;
    } else {
        document.querySelector(".id-error").innerText = "";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === "") {
        document.querySelector(".email-error").innerText = "Email is required";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.querySelector(".email-error").innerText = "Enter a valid email";
        isValid = false;
    } else {
        document.querySelector(".email-error").innerText = "";
    }

    // Contact No
    const digitsOnly = contactNo.replace(/\D/g, '');
    if (digitsOnly.length !== 10) {
        document.querySelector(".contact-error").innerText = "Contact number must be 10 digits";
        isValid = false;
    } else if (digitsOnly.charAt(0) === '0' || digitsOnly.charAt(0) === '1') {
        document.querySelector(".contact-error").innerText = "Contact number cannot start with 0 or 1";
        isValid = false;
    } else {
        document.querySelector(".contact-error").innerText = "";
    }

    return isValid;
}

let data = [
    { id:1,name:"upendra",studentId:1213,email:"upendra@gmail.com",contactNo:9984078746},
    {id:2,name:"shrivastava",studentId:45454,email:"lala@gmail.com",contactNo:9984078747}
]

function readAll(){
      localStorage.setItem("object", JSON.stringify(data))
      let tabledata = document.querySelector(".data-table");
      let object = localStorage.getItem('object')
      let objectdata = JSON.parse(object);

      let element = "";
      objectdata.map(record=>(
        element += `<tr>
                    <td>${record.name}</td>
                    <td>${record.studentId}</td>
                    <td>${record.email}</td>
                    <td>${record.contactNo}</td>
                    <td>
                          <button class = "edit" onclick="edit(${record.id})">Edit</button>
                          <button class = "delete" onclick="deleteRecord(${record.id})">Delete</button>
                    </td>

                    
        </tr>`
      ))
      tabledata.innerHTML = element;
}
// create form is visible on click add
function create(){
    document.querySelector(".create-form").style.display ="block";
    document.querySelector(".add-button").style.display ="none";
}
// add to list on form creation

function add(){
    let name = document.querySelector(".name").value;
    let studentId = document.querySelector(".studentid").value;
    let studentEmail = document.querySelector(".email").value;
    let contactNo = document.querySelector(".contactno").value;
    if (!validateForm(name, studentId, studentEmail, contactNo)) return;
    let newId = data.length > 0 ? Math.max(...data.map(item => item.id || 0)) + 1 : 1;

    let newObj = {id:newId,name:name,studentId:studentId,email:studentEmail,contactNo:contactNo}
    data.push(newObj);
    readAll()
    document.querySelector(".create-form").style.display ="none";
    document.querySelector(".add-button").style.display ="block";
}

// edit fucion
function edit (id){
      document.querySelector(".update-form").style.display = "block";
      let obj = data.find(rec=> rec.id===id);
      document.querySelector(".nname").value = obj.name;
      document.querySelector(".sstudentid").value = obj.studentId ;
      document.querySelector(".eemail").value =obj.email ;
      document.querySelector(".ccontactno").value = obj.contactNo;
      document.querySelector(".id").value = obj.id;
}
// update list fuction
function update(){
    let id = parseInt(document.querySelector(".id").value);
    let name = document.querySelector(".nname").value;
    let studentId = document.querySelector(".sstudentid").value;
    let email = document.querySelector(".eemail").value;
    let contactNo = document.querySelector(".ccontactno").value;
     if (!validateForm(name, studentId, email, contactNo)) return;

    let index = data.findIndex(rec =>rec.id ===id);
     data[index] = {id,name,studentId,email,contactNo};
    document.querySelector(".update-form").style.display = "none";
    readAll()
}

//delet list
function deleteRecord(id) {
    data = data.filter(item => item.id !== id);
    readAll();
}