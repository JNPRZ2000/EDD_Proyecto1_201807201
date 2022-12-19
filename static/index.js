import SimplyLinkedList from "../edd/SimplyLinkedList.js";
import User from "../modelos/User.js";
import Artist from "../modelos/Artist.js";
import ArtistStruct from "../edd/ArtistStruct.js";
import Song from "../modelos/Song.js";
import SparceMatrix from "../edd/SparceMatrix.js";
import BSTree from "../edd/BSTree.js";
import Podcast from "../modelos/Podcast.js";
import CardMusica from "../modelos/CardMusica.js";

//onload
const user_list = new SimplyLinkedList();
const artists_list = new ArtistStruct();
const calendar = new SparceMatrix();
const podcasts = new BSTree();
let admin = new User(2654568452521, "Oscar Armin", "EDD", "123", 5021231234657);
admin.setAdmin(true);
user_list.add(admin);
//navbar
let navbar = document.getElementById("navbar");
let optionExit = document.getElementById("optionExit");
//buttons
let btn_register = document.getElementById("btn_register");
let btn_login = document.getElementById("btn_login");
let tabUserBtn = document.getElementById("tabuserBtn");
let tabArtistBtn = document.getElementById("tabArtistBtn");
let tabSongBtn = document.getElementById("tabSongBtn");
let tabProgramBtn = document.getElementById("tabProgramBtn");
let tabPodcastBtn = document.getElementById("tabPodcastBtn");
//inputs
//                  REGISTRO
let input_dpi = document.getElementById("txt_dpi");
let input_name = document.getElementById("txt_name");
let input_username = document.getElementById("txt_username");
let input_password = document.getElementById("txt_password");
let input_phone_number = document.getElementById("txt_phone_number");
//                                      FILES
let inputFile_adminUsers = document.getElementById("tabUserFile");
let inputFile_adminArtist = document.getElementById("tabArtistFile");
let inputFile_adminSongs = document.getElementById("tabSongFile");
let inputFile_adminProgram = document.getElementById("tabProgramFile");
let inputFile_adminPodcast = document.getElementById("tabPodcastFile");
//                  LOGIN
let input_logUsername = document.getElementById("txt_logUssername");
let input_logPassword = document.getElementById("txt_logPassword");
//PANELS
let panelLoginRegistro = document.getElementById("panelLoginRegistro");
let panelAdminUI = document.getElementById("panelAdmin");
let panelUser = document.getElementById("panelUsuario");
//TOAST
var toastLive = document.getElementById('liveToast');
let toastBody = document.getElementById('toastBody');
//body
let bodyUI = document.getElementById("body");
bodyUI.onload = function () {
    panelAdminUI.style.display = "none";
    optionExit.style.display = "none";
    panelUser.style.display = "none";
}
//USUARIO
let divMusicaCards = document.getElementById("musicaCards");
let btnUserReloadGraph = document.getElementById("userPlaylistReload");

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
            } else {
                showUserUI(user_found);
            }
        }
    }
}
optionExit.onclick = function () {
    panelAdminUI.style.display = "none";
    optionExit.style.display = "none";
    panelUser.style.display = "none";
    navbar.textContent = "REGISTRO Y LOGIN";
    panelLoginRegistro.style.display = "inline";
}
tabUserBtn.onclick = function () {
    let graph = user_list.toGraph("Usuarios");
    d3.select("#graphUsers").graphviz()
        .dot(`digraph G { ${graph}}`)
        .render();
}
tabArtistBtn.onclick = function () {
    let graph = artists_list.toGraph("Artistas");
    d3.select("#graphArtist").graphviz()
        .dot(`digraph G{${graph}}`)
        .render();
}
tabSongBtn.onclick = () => {
    let graph = artists_list.toGraph("Canciones");
    d3.select("#graphSong").graphviz().dot(`digraph G{${graph}}`).render();
}
tabProgramBtn.onclick = () => {
    let graph = calendar.toGraphCalendar("Música Programada");
    d3.select("#graphProgram").graphviz().dot(graph).render();
}
tabPodcastBtn.onclick = () => {
    let graph = podcasts.toGraph("Podcast", "Podcast");
    console.log(graph);
    d3.select("#graphPodcast").graphviz().dot(graph).render();
}
//ONCHANGES
inputFile_adminUsers.onchange = (evt) => {
    const file = evt.target.files[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
        let jsonObj = JSON.parse(fileReader.result);
        for (let i = 0; i < jsonObj.length; i++) {
            let nuevoUsuario = new User(parseInt(jsonObj[i]["dpi"]), jsonObj[i]["name"], jsonObj[i]["username"], `${jsonObj[i]["password"]}`);
            nuevoUsuario.setAdmin(jsonObj[i]["admin"]);
            user_list.add(nuevoUsuario);
        }
    }
    fileReader.onerror = () => {
        alert(fileReader.error);
    }
}
inputFile_adminArtist.onchange = (evt) => {
    const file = evt.target.files[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
        let jsonObj = JSON.parse(fileReader.result);
        for (let obj of jsonObj) {
            let nuevoArtista = new Artist(obj["name"], obj["age"], obj["country"]);
            artists_list.addArtist(nuevoArtista);
        }
    }
    fileReader.onerror = () => {
        alert(fileReader.error);
    }
}
inputFile_adminSongs.onchange = (evt) => {
    const file = evt.target.files[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
        let jsonObj = JSON.parse(fileReader.result);
        for (let obj of jsonObj) {
            let genders = new SimplyLinkedList();
            for (let gender of obj["gender"]) {
                genders.add(gender);
            }
            let nuevaCancion = new Song(obj["artist"], obj["name"], obj["duration"], genders);
            artists_list.addSong(obj["artist"], nuevaCancion);
        }
    }
    fileReader.onerror = () => {
        alert(fileReader.error);
    }
}
inputFile_adminProgram.onchange = (evt) => {
    const file = evt.target.files[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
        let jsonObj = JSON.parse(fileReader.result);
        for (let obj of jsonObj) {
            let song = artists_list.getSong(obj["artist"], obj["song"]);
            if (song != null) {
                calendar.add(obj["month"], obj["day"], song);
            }
        }
    }
    fileReader.onerror = () => {
        alert(fileReader.error);
    }
}
inputFile_adminPodcast.onchange = (evt) => {
    const file = evt.target.files[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
        let jsonObj = JSON.parse(fileReader.result);
        for (let obj of jsonObj) {
            let nl = new SimplyLinkedList();
            for (let inv of obj["Invitados"]) {
                nl.add(inv);
            }
            let np = new Podcast(obj["name"], obj["topic"], nl, obj["duration"]);
            podcasts.insertar(np);
        }
    }
    fileReader.onerror = () => {
        alert(fileReader.error);
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
    panelAdminUI.style.display = "inline";
    optionExit.style.display = "inline";
    navbar.textContent = `ADMINISTRACION: ${user.getUsername()}`;
}
function showUserUI(user) {
    panelUser.style.display = "inline";
    optionExit.style.display = "inline";
    navbar.textContent = `USUARIO: ${user.getUsername()}`;
    let nu = document.createElement("ul");
    nu.className = "list-group list-group-horizontal";
    for (let sng of artists_list.iter()) {
        let mc = new CardMusica(sng, user);
        //divMusicaCards.appendChild(mc.getElement());
        let ne = document.createElement("li");
        ne.className = "list-group-item";
        ne.appendChild(mc.getElement());
        nu.appendChild(ne)
    }
    divMusicaCards.appendChild(nu);
    btnUserReloadGraph.onclick = () => {
        let graph = user.getPlaylist().toGraph("Playlist");
        d3.select("#userGraphPlaylist").graphviz().dot(graph).render();
    }
    ////////
    let btnPublicarCancion = document.getElementById("btnPublicarCancion");
    let inpPCNombre = document.getElementById("publicarsongname");
    let inpPCArtista = document.getElementById("publicarsongartista");
    let inpPCGenero = document.getElementById("publicarsonggenero");
    let inpPCTime = document.getElementById("publicarsongtime");
    btnPublicarCancion.onclick = function () {
        ArtistStruct.addSong(inpPCArtista.value, new Song(inpPCArtista.value, inpPCNombre.value, inpPCTime.value, inpPCGenero.value))
    }
}

/*
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
*/
