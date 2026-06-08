async function loadEmployees(){

  const res =
    await fetch('/employees');

  const data =
    await res.json();

  const list =
    document.getElementById('list');

  list.innerHTML='';

  data.forEach(emp=>{

    list.innerHTML += `
      <li>
        ${emp.employeeId}
        ${emp.name}
      </li>`;
  });
}

async function save(){

  await fetch('/employees',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      employeeId:
        document.getElementById('id').value,

      name:
        document.getElementById('name').value
    })
  });

  loadEmployees();
}

loadEmployees();