function show_tracks(){
    $('.content .playlist').empty();
    let files = {};
    let i2 = 0;
    files_import = document.getElementById("importDirectory");
    files_import = files_import.files;
    console.log(files_import);
    for (let i = 0; i < files_import.length; i++) {
        file = {
            name: files_import[i].name.substr(0, 33),
            fullname: files_import[i].name,
            path: files_import[i].path,
            size: files_import[i].size,
            type: files_import[i].type
        };
        if(files_import[i].type == 'audio/mpeg' || files_import[i].type == 'video/mpeg' || files_import[i].type == 'video/mp4' || files_import[i].type == 'audio/wav' || files_import[i].type == 'audio/ogg'){
            files[i2] = file;
            $('.content .playlist').append(`
                <a href="#" onclick="player(` + i2 + `)">
                    <li>
                        <div class="banner">
                            <i class="bi bi-music-note-list"></i>
                        </div>
                        <p>` + files[i2].name + `</p>
                    </li>
                </a>
            `);

            i2++;
        }
    }
    window.localStorage.setItem('playlist', JSON.stringify(files));
}
if(window.localStorage.getItem('playlist') !== null){
    let i2 = 0;
    let playlist2 = JSON.parse(localStorage.getItem('playlist'));
    for (let i = 0; i < Object.keys(playlist2).length; i++) {
        $('.content .playlist').append(`
            <a href="#" onclick="player(` + i2 + `)">
                <li>
                    <div class="banner">
                        <i class="bi bi-music-note-list"></i>
                    </div>
                    <p>` + playlist2[i2].name + `</p>
                </li>
            </a>
        `);
        i2++;
    }
}else{
    show_tracks();
}
$('#importDirectory').change(function(){
    show_tracks();
});
/* Search */
$('#search-input').on('input', function(arg) {
    if($('#search-input').val() !== '' && $('#search-input').val() !== null && $('#search-input').val() !== undefined){
        $('#search-input').hideseek({
            highlight: false,
            hidden_mode: true
        });
    }else{
        $('#search-input').hideseek({
            hidden_mode: false
        });
    }
});
/* YouTube download */
