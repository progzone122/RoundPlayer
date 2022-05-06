var theme = JSON.parse(window.fs.readFileSync('themes/' + window.theme + '.json', 'utf8'));
res = "<style>";
for (let obj in theme.theme) {
    for (let obj2 in theme.theme[obj]) {
        res = res + obj + "{" + obj2 + ":" + theme.theme[obj][obj2] + ";" + "}";
    }
}
$("body").append(res + "</style>");   
$(document).ready(function(){
    $(".loading").fadeOut(500);
});