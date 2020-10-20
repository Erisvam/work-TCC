var context = document.getElementsByClassName('myChart');

$("#selectTypeGraph").change(function() {
    debugger;
    graph.destroy();
    var contextNew = document.getElementsByClassName('myChart');
    mainGraph(contextNew, $(this).val(), arrAmount);
});

//GRAPH
var graph;

function mainGraph(context, typeGraph, data) {
    graph = new Chart(context, {
        type: typeGraph,
        data: {
            labels: ['out', 'nov', 'dev', 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set '],
            datasets: [{
                label: "Dataset #1",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 2,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: data,
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