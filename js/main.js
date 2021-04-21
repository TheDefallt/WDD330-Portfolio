function buildTOC(){
    const links = [
        {
            label: "Week1 notes",
            url: "week1/index.html"
        }
    ];

    var ol = document.getElementById('tableofcontents');
    console.log(ol.tagName);

    links.forEach(element => {
        var html = <li><a href="${element.url}">${element.label}</a></li>;
        ol.append(html);
    });
}

document.addEventListener("DOMContentLoaded", buildTOC);