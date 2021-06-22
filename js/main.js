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
    },
    {
        label: "Week 5",
        url: "Week5_6%20Midterm/index.html"
    },
    {
        label: "Midterm ToDo List",
        url: "Week5_6%20Midterm/midterm/index.html"
    },
    {
        label: "Week 7",
        url: "week7/index.html"
    },
    {
        label: "Week 8",
        url: "week8/index.html"
    },
    {
        label: "Week 9",
        url: "week9/index.html"
    },
    {
        label: "Block 2 Proposal",
        url: "proposal.html"
    },
    {
        label: "Block 2 Project",
        url: "index.html"
    }
];

let ul = document.getElementById('tableofcontents');

links.forEach(element => {
    let li = document.createElement('li');
    li.setAttribute('class', 'weekItem');
    li.innerHTML = `<a href=${element.url}>${element.label}</a>`;

    ul.appendChild(li);
});