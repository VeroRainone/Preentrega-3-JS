class TurnoMedico {
    constructor(paciente, especialidad, dia, horario) {
      this.paciente = paciente;
      this.especialidad = especialidad;
      this.dia = dia;
      this.horario = horario
    }
    imprimirTurnos() {
        return (`Turno médico para ${this.paciente}, con la especialidad de ${this.especialidad}, el día ${this.dia}, a las ${this.horario}`)
    }
};
  
const especialidades = [
    "Pediatría",
    "Cardiología",
    "Dermatología"
];
const diasDisponibles ={
    "Pediatría": ["2023-10-01", "2023-10-02", "2023-10-03"],
    "Cardiología": ["2023-10-11", "2023-10-12", "2023-10-13"],
    "Dermatología": ["2023-10-21", "2023-10-22", "2023-10-23"]
};
  
const horariosDisponibles = {
    "Pediatría": ["10:00 AM", "11:00 AM", "12:00 PM"],
    "Cardiología": ["9:00 AM", "10:00 AM", "11:00 AM"],
    "Dermatología": ["2:00 PM", "3:00 PM", "4:00 PM"]
};

const formularioTurno = document.querySelector("#formulario-turno");

const especialidad = document.querySelector("#especialidad");
const dia = document.querySelector("#dia");
const horario = document.querySelector("#horario");
const paciente = document.querySelector("#paciente");

let turnosAgendados = []; 

function obtenerTurnosAgendados() {
    const turnosAgendadosString = localStorage.getItem('turnosAgendados');
    if (turnosAgendadosString) {
        return JSON.parse(turnosAgendadosString);
    } else {
        return [];
    }
}

formularioTurno.addEventListener ("submit", function agendarTurno(e) {
    e.preventDefault();
    const especialidadSelec = especialidad.value;
    const diaSelec = dia.value;
    const horarioSelec = horario.value;
    const pacienteAgendado = paciente.value;

    
    if (especialidadSelec && diaSelec && horarioSelec && pacienteAgendado) {
        let turno = new TurnoMedico(pacienteAgendado, especialidadSelec, diaSelec, horarioSelec);
       
        const detallesTurno = turno.imprimirTurnos();
        
          Swal.fire({
            title: 'Agendar turno',
            html: `Detalles del turno:<br>${detallesTurno},
                  <br><label><b>Ingrese su Email</b></label><br><input type="email" style="width: 200px;">`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (result.isConfirmed) {
              const turnoAgendado = JSON.stringify(turno);
              localStorage.setItem('turnoAgendado', turnoAgendado);
      
              turnosAgendados = obtenerTurnosAgendados();
              turnosAgendados.push(turno);
              localStorage.setItem('turnosAgendados', JSON.stringify(turnosAgendados));
              
              Swal.fire(
                'Turno agendado correctamente.',
                'Su turno será enviado a su direccion de email',
                'success'
              )
            }
          })
  
        limpiarFormulario();
    } else {
        Swal.fire({
            icon: 'error',
            text: 'Por favor, complete todos los campos antes de agendar el turno.',
        })
   }
 });

const selectEspecialidad = document.getElementById("especialidad");

especialidades.forEach(especialidad => {
  const option = document.createElement("option");
  option.value = especialidad;
  option.textContent = especialidad;
  selectEspecialidad.appendChild(option);
});

especialidad.addEventListener("change", function elegirDia() {
    const especialidadSelec = especialidad.value;
    const diaSelec = diasDisponibles[especialidadSelec];

    dia.innerHTML = "<option value=''>Seleccionar</option>";
        
    if (diaSelec.length > 0) {
        for (let i = 0; i < diaSelec.length; i++) {
          const option = document.createElement("option");
          option.value = diaSelec[i];
          option.textContent = diaSelec[i];
          dia.appendChild(option);
        }
    }
});

dia.addEventListener("change", function elegirHorario() {
    const especialidadSelec = especialidad.value;
    const horarioSelec = horariosDisponibles[especialidadSelec];
    
    horario.innerHTML = "<option value=''>Seleccionar</option>";
    
    if (horarioSelec.length > 0) {
        for (let i = 0; i < horarioSelec.length; i++) {
          const option = document.createElement("option");
          option.value = horarioSelec[i];
          option.textContent = horarioSelec[i];
          horario.appendChild(option);
        }
    }
});

function limpiarFormulario() {
    document.getElementById("especialidad").value = "";
    document.getElementById("dia").value = "";
    document.getElementById("horario").value = "";
    document.getElementById("paciente").value = "";
}
  
