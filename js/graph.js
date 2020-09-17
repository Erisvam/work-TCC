var context = document.getElementsByClassName('myChart');
mainGraph(context, $("#selectTypeGraph").val());


$("#selectTypeGraph").change(function() {
    graph.destroy();
    var contextNew = document.getElementsByClassName('myChart');
    mainGraph(contextNew, $(this).val());
});

//GRAPH
var graph;

function mainGraph(context, typeGraph) {
    graph = new Chart(context, {
        type: typeGraph,
        data: {
            labels: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dec'],
            datasets: [{
                label: "Dataset #1",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 2,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: [65, 59, 20, 81, 56, 55, 40],
            }]
        },
        options: {
            title: {
                display: true,
                fontSize: 20,
                text: "QUALQUER COISA"
            },
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    stacked: true,
                    gridLines: {
                        display: true,
                        color: "rgba(255,99,132,0.2)"
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            }
        }
    });
}