function init() {
    let body = document.querySelector('body');
    body.innerHTML = renderNavBar();
    body.innerHTML += renderHeader();
    let main = document.querySelector('main')
    main.innerHTML= renderHelp();
}

function initSignUp() {
    let body = document.querySelector('body');
    body.innerHTML = renderDefaultNavBar();
    body.innerHTML += renderDefaultHeader();
    let main = document.querySelector('main')
    main.innerHTML= renderHelp();
}