function buildTOC(){
    const links = [
        {
            label: "Week1 notes",
            url: "week1/index.html"
        }
    ];

    var ol = document.getElementById('tableofcontents');

    links.forEach(element => {
        var html = '<li><a href="${element.url}">${element.label}</a></li>';
        ol.append(html);
    });
}

buildTOC();