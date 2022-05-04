var fs = require('fs');
var settings = JSON.parse(fs.readFileSync('package.json', 'utf8'));
var theme;
switch(settings.window.theme){
    case "dark":
        $("#theme_option1").prop("checked", true);
        $("#theme_option2, #theme_option3").prop("checked", false);
        theme = "dark"
    break;
    case "light":
        $("#theme_option2").prop("checked", true);
        $("#theme_option1, #theme_option3").prop("checked", false);
        theme = "light"
    break;
    case "custom":
        $("#theme_option3").prop("checked", true);
        $("#theme_option1, #theme_option2").prop("checked", false);
        theme = "custom"
    break;
}
function change_theme(theme){
    switch(theme){
        case "dark":
            $("#theme_option1").prop("checked", true);
            $("#theme_option2, #theme_option3").prop("checked", false);
            window.settings.window.theme = "dark";
            fs.writeFileSync("package.json", JSON.stringify(window.settings));
        break;
        case "light":
            $("#theme_option2").prop("checked", true);
            $("#theme_option1, #theme_option3").prop("checked", false);
            window.settings.window.theme = "light";
            fs.writeFileSync("package.json", JSON.stringify(window.settings));
        break;
        case "custom":
            $("#theme_option3").prop("checked", true);
            $("#theme_option1, #theme_option2").prop("checked", false);
            window.settings.window.theme = "custom";
            fs.writeFileSync("package.json", JSON.stringify(window.settings));
        break;
    }
    alert("Перезагрузите приложение для применения изменений");
}