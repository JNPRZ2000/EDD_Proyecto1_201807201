import SimplyLinkedList from "../edd/SimplyLinkedList.js";
import User from "../modelos/User.js";
import "https://d3js.org/d3.v7.min.js";
"X-Content-Type-Options: nosniff"

//onload


const user_list = new SimplyLinkedList();
let admin = new User(2654568452521, "Oscar Armin", "EDD", "123", 5021231234657);
admin.setAdmin(true)
user_list.add(admin);
//navbar
let navbar = document.getElementById("navbar");
let optionExit = document.getElementById("optionExit");
//buttons
let btn_register = document.getElementById("btn_register");
let btn_login = document.getElementById("btn_login");
//inputs
//                  REGISTRO
let input_dpi = document.getElementById("txt_dpi");
let input_name = document.getElementById("txt_name");
let input_username = document.getElementById("txt_username");
let input_password = document.getElementById("txt_password");
let input_phone_number = document.getElementById("txt_phone_number");
//                                      FILES
let inputFile_adminUsers = document.getElementById("tabUserFile");
//                  LOGIN
let input_logUsername = document.getElementById("txt_logUssername");
let input_logPassword = document.getElementById("txt_logPassword");
//PANELS
let panelLoginRegistro = document.getElementById("panelLoginRegistro");
let panelAdminUI = document.getElementById("panelAdmin");
//TOAST
var toastLive = document.getElementById('liveToast');
let toastBody = document.getElementById('toastBody');
//body
let bodyUI = document.getElementById("body");
bodyUI.onload = function () {
    panelAdminUI.style.display = "none";
    optionExit.style.display = "none";
}


//ONCLICKS
btn_register.onclick = function () {
    var alert_message = "";
    if (input_dpi.value.length === 0) alert_message += "DPI\n";
    if (input_name.value.length === 0) alert_message += "NAME\n";
    if (input_username.value.length === 0) alert_message += "USERNAME\n";
    if (input_password.value.length === 0) alert_message += "PASSWORD\n";
    if (input_phone_number.value.length === 0) alert_message += "PHONE NUMBER";
    if (alert_message != "") {
        alert_message = "LOS SIGUIENTES CAMPOS SON OBLIGATORIOS:\n" + alert_message;
        var toast = new bootstrap.Toast(toastLive);
        toastBody.textContent = alert_message;
        toast.show();
        //window.alert(alert_message);
    } else {
        const new_user = new User(parseInt(input_dpi.value), input_name.value, input_username.value, input_password.value, parseInt(input_phone_number.value));
        user_list.add(new_user);
        input_dpi.value = "";
        input_name.value = "";
        input_username.value = "";
        input_password.value = "";
        input_phone_number.value = "";
    }
}
btn_login.onclick = function () {
    var alert_message = "";
    if (input_logPassword.value.length === 0) {
        alert_message += "Contraseña\n";
    }
    if (input_logUsername.value.length === 0) {
        alert_message += "Nombre de Usuario\n";
    }
    if (alert_message != "") {
        var toast = new bootstrap.Toast(toastLive);
        toastBody.textContent = "Los siguientes campos son obligatorios:\n" + alert_message;
        toast.show();
    } else {
        console.log("LISTA")
        let user_found = findUser(input_logUsername.value, input_logPassword.value);
        console.log(user_found)
        if (user_found != null && user_found instanceof User) {
            panelLoginRegistro.style.display = "none";
            if (user_found.isAdmin()) {
                showAdminUi(user_found);
            }
        }
    }
}
optionExit.onclick = function () {
    panelAdminUI.style.display = "none";
    optionExit.style.display = "none";
    navbar.textContent = "REGISTRO Y LOGIN";
    panelLoginRegistro.style.display = "inline";
}
//ONCHANGES
inputFile_adminUsers.onchange = (evt) => {
    const file = evt.target.files[0]
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
        let jsonObj = JSON.parse(fileReader.result)
        for (let i = 0; i < jsonObj.length; i++) {
            let nuevoUsuario = new User(parseInt(jsonObj[i]["dpi"]), jsonObj[i]["name"], jsonObj[i]["username"], `${jsonObj[i]["password"]}`);
            nuevoUsuario.setAdmin(jsonObj[i]["admin"]);
            user_list.add(nuevoUsuario);
        }
    }
    fileReader.onerror = () => {
        alert(fileReader.error)
    }
}
//FUNCIONES
function findUser(username, password) {
    for (let user_element of user_list.iter()) {
        if (user_element instanceof User) {
            console.log("a")
            console.log(`USUARIO: ${user_element}`)
            if (user_element.getUsername() === username && user_element.getPassword() === password) {
                console.log("b")
                return user_element;
            }
        }
    }
    return null;
}
function showAdminUi(user) {
    if (user instanceof User) {
        panelAdminUI.style.display = "inline";
        optionExit.style.display = "inline";
        navbar.textContent = `ADMINISTRACION: ${user.getUsername()}`;

    }
}
