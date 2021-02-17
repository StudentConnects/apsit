(function ($) {
    "use strict";

    /*  Sales Chart
    --------------------*/

    var sales = {
        type: 'line',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July","Aug", "Sep", "Oct", "Nov", "Dec"],
            type: 'line',
            defaultFontFamily: 'Montserrat',
			
            datasets: [{
				label: "Your Graph",
                data: [40, 30, 10, 60, 80, 63, 10,50,75,78,88,100],
                backgroundColor: 'transparent',
                borderColor: '#027373',
                borderWidth: 3,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: '#027373',
                    },
					{
			    label: "Graph To Get Certificate",
                data: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
                backgroundColor: 'transparent',
                borderColor: '#ffc832',
                borderWidth: 3,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: '#ffc832',
                    }]
        },
        options: {
            responsive: true,

            tooltips: {
                mode: 'index',
                titleFontSize: 12,
                titleFontColor: '#000',
                bodyFontColor: '#000',
                backgroundColor: '#fff',
                titleFontFamily: 'Montserrat',
                bodyFontFamily: 'Montserrat',
                cornerRadius: 3,
                intersect: false,
            },
            
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: true
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Month'
                    }
                        }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Monthly Average Percentage',
						
                    }
                        }]
            },
            title: {
                display: false,
                text: 'Normal Legend'
            }
        }
    };


    var pieChart = {
        type: 'pie',
        data: {
            datasets: [{
                data: [45, 25, 20, 10],
                backgroundColor: [
                                    "#ba995b",
                                    "#027373",
                                    "#ffc832",
                                    "#1fa88c"
                                ],
                hoverBackgroundColor: [
                                    "#baab8d",
                                    "#82a3a3",
                                    "#fde6a7",
                                    "#8dc8bc"
                                ]

                            }],
            labels: [
                            "Quants",
                            "Logical",
                            "Verbal Aptitude",
							"Essay"
                        ]
        },
        options: {
            responsive: true
        }
    };



    window.onload = function () {
        var ctx = document.getElementById("sales-chart").getContext("2d");
        window.myLine = new Chart(ctx, sales);

    }; 
    
})(jQuery);
