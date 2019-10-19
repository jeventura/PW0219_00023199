let carnet_field = document.querySelector("#carnet_field");
let schedule_dropdown = document.querySelector("#schedule_field");
let late_switch = document.querySelector("#late_switch");
let submit_btn = document.querySelector("#submit_btn");
let tbody = document.querySelector("#table_body");
let carnet_regex = new RegExp("[0-9]{8}$");
let student_list = [];
let serial = 0;

let printArray = () => {
  tbody.innerHTML = "";

  student_list.forEach(elem => {
    let new_row = document.createElement("tr");
  

    let celda = document.createElement("td");
    let celdaValidar = document.createElement("td");
    let btnEliminar = document.createElement("button");
    let txtArea = document.createElement("input");

    

    new_row.classList.add("table-active");
    new_row.innerHTML = `<td>${elem.carnet}</td>
    <td>${elem.horario}</td>
    <td>${elem.hora.toLocaleString()}</td>
    <td>${elem.tarde}</td>`;

    /*
     *personalizando btn
     */

    txtArea.className = "form-control";
    //btnEliminar.innerText = "Eliminar";

    btnEliminar.className = "btn btn-danger";
    btnEliminar.innerText = "Eliminar";
    btnEliminar.value = elem.id;

    
      btnEliminar.addEventListener("click", event => {
        let id_actual = event.target.value;
  
        if (txtArea.value === elem.carnet) {
        student_list.forEach((elem, pos) => {
          if (id_actual == elem.id) {
            student_list.splice(pos, 1);
            printArray();
          }
        });
      }else{
        alert('Para borrar, confirme el numero de carnet')
      }
      });
    
    celdaValidar.appendChild(txtArea);
    new_row.appendChild(celdaValidar);
    tbody.appendChild(new_row);

    celda.appendChild(btnEliminar);
    new_row.appendChild(celda);
    tbody.appendChild(new_row);
  });
};

let parseLateSwitch = (value) => {
  if (value) {
    return "Tardisimo";
  
  }
    return "test";
   
};

let add_student = (carnet, schedule, late) => {
  let dateTime= new Date();
    student_list.push({
        id: serial,
        carnet: carnet,
        horario: schedule,
        tarde: late,
        hora:dateTime
      });
      serial++;
};




submit_btn.addEventListener("click", () => {
  let carnet = carnet_field.value;
  let schedule =schedule_dropdown.options[schedule_dropdown.selectedIndex].text;
  let late = parseLateSwitch(late_switch.cheked);
  
  if (carnet_regex.test(carnet)) {
    add_student(carnet, schedule, late);
    printArray();
  } else {
    alert("el carnet no es valido");
  }
});

carnet_field.addEventListener("keyup", event => {
  let keyUp = event.kedCode;
  let carnet = carnet_field.value;
  if (keyUp == 13) {
    submit_btn.click();
  }

  if (carnet_regex.test(carnet)) {
    submit_btn.disabled = false;
  } else {
    submit_btn.disabled = true;
  }
});
