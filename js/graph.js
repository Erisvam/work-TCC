var context = document.getElementsByClassName('myChart');
mainGraph(context, $("#selectTypeGraph").val());


$("#selectTypeGraph").change(function(){
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
            datasets: [
                {
                    label: 'EXEMPLO',
                    data: [2, 5, 36, 1, 24],
                    borderWidth: 2,
                    borderColor: 'rgba(77,166,253, 0.85)',
                    backgroundColor: 'transparent'
                }
            ]
        },
        options: {
            title: {
                display: true,
                fontSize: 20,
                text: "QUALQUER COISA"
            }
        }
    });
}