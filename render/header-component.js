function renderHeader(user) {
    return/*html*/`

        <h6 class="pHeader">Kanban Project Management Tool</h6>
        <div class="imgsHeader">
            <a href="/assets/templates/help.html">
                <img class="helpIcon" src="/assets/img/help.png" alt=""></a>
            <div id="profile-icon" onclick="openMenu()">${user[0].initials}</div>
        </div>
        <div id="header-icon-menu" class="d-none">
            <a class="menu-option" href="/assets/templates/legal_notice.html">
                Legal Notice
            </a>
            <a class="menu-option" href="/assets/templates/privacy_policy.html">
                Privacy Policy
            </a>
            <a class="menu-option" href="http://127.0.0.1:5500/index.html">
                Log out
            </a>
        </div>


    `
}

function renderDefaultHeader(){
    return/*html*/`

        <p class="pHeader">Kanban Project Management Tool</p>
        <div class="imgsHeader">
            <a href="/assets/templates/help_signUp.html">
                <img class="helpIcon" src="/assets/img/help.png" alt=""></a>
        </div>


    ` 
}

