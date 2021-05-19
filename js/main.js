function buildTOC(){
    const links = [
        {
            label: "Week 1",
            url: "week1/index.html"
        },
        {
            label: "Week 2",
            url: "week2/index.html"
        },
        {
            label: "Week 3",
            url: "week3/index.html"
        },
        {
            label: "Week 4",
            url: "week4/index.html"
        }
    ];

    var ol = document.getElementById('tableofcontents');

    links.forEach(element => {
        
        var a = document.createElement('a');
        a.append(element.label);
        a.href = element.url;

        var li = document.createElement('li');
        li.appendChild(a);

        ol.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", buildTOC);