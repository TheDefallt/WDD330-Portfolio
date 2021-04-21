function buildTOC(){
    const links = [
        {
            label: "Week 1 Notes",
            url: "week1/index.html"
        }
    ];

    var ol = document.getElementById('tableofcontents');
    console.log(ol.tagName);

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