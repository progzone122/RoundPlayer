var theme = JSON.parse(window.fs.readFileSync('themes/' + window.theme + '.json', 'utf8'));
console.log(theme)
for (let obj in theme.theme) {
    for (let obj2 in theme.theme[obj]) {
        $("body").append("<style>" + obj + "{" + obj2 + ":" + theme.theme[obj][obj2] + ";" + "}" + "</style>");   
    }
    console.log(theme.theme[obj]);
}
$(document).ready(function(){
    $(".loading").fadeOut(500);
});