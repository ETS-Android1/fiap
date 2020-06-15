$( document ).ready(function() {
    $(".imc-chart").append("fdsf")

    var imcCtx = document.getElementById('imc-chart').getContext('2d');
    var atividadeCtx = document.getElementById('atividade-fisica-chart').getContext('2d');
    var caloriaCtx = document.getElementById('caloria-chart').getContext('2d');
    var pressaoCtx = document.getElementById('pressao-chart').getContext('2d');
    
    /*var chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["05/05", "10/05", "12/05"],
          datasets: [
            {
              label: "IMC",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
              data: [2478,5267,734,784,433]
            }
          ]
        },
        options: {
          legend: { display: false }
        }
    });*/
   
   var imxChart = new Chart(imcCtx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['01/05', '03/05', '08/05'],
            datasets: [{
                label: 'IMC',
                borderColor: 'rgb(232, 228, 16)',
                pointBorderColor: 'rgb(255, 255, 255)',
                pointHoverBorderColor: 'rgb(255, 255, 255)',
                data: [19.16, 19.37,30]
            }]
        },

        // Configuration options go here
        options: {
            responsive: true,
            legend: {
                display: false,
                position: 'top',
                labels: {
                  fontColor: 'rgb(255, 255, 255)'
                }
            },            
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgba(255, 255, 255, 0.8)",
                        drawOnChartArea: true,
                        drawBorder: true,
                    },
                    ticks: {
                        fontColor: "rgb(255, 255, 255)"
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgba(255, 255, 255, 0.8)",
                    },
                    ticks: {
                        fontColor: "rgb(255, 255, 255)",
                        min: 15,
                        max: 35,
                        stepSize: 5
                    }
                }]
            }

        }
    });

    var atividadeChart = new Chart(atividadeCtx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['01/05', '03/05', '08/05'],
            datasets: [{
                label: 'IMC',
                borderColor: 'rgb(3, 143, 31)',
                pointBorderColor: 'rgb(255, 255, 255)',
                pointHoverBorderColor: 'rgb(255, 255, 255)',
                data: [19.16, 30,15]
            }]
        },

        // Configuration options go here
        options: {
            responsive: true,
            legend: {
                display: false,
                position: 'top',
                labels: {
                  fontColor: 'rgb(255, 255, 255)'
                }
            },            
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgba(255, 255, 255, 0.8)",
                        drawOnChartArea: true,
                        drawBorder: true,
                    },
                    ticks: {
                        fontColor: "rgb(255, 255, 255)"
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgba(255, 255, 255, 0.8)",
                    },
                    ticks: {
                        fontColor: "rgb(255, 255, 255)",
                        min: 15,
                        max: 35,
                        stepSize: 5
                    }
                }]
            }

        }
    });

    var caloriaCtxChart = new Chart(caloriaCtx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['01/05', '03/05', '08/05'],
            datasets: [{
                label: 'IMC',
                borderColor: 'rgb(255, 64, 52)',
                pointBorderColor: 'rgb(255, 255, 255)',
                pointHoverBorderColor: 'rgb(255, 255, 255)',
                data: [19.16, 19.37,30]
            }]
        },

        // Configuration options go here
        options: {
            responsive: true,
            legend: {
                display: false,
                position: 'top',
                labels: {
                  fontColor: 'rgb(255, 255, 255)'
                }
            },            
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgba(255, 255, 255, 0.8)",
                        drawOnChartArea: true,
                        drawBorder: true,
                    },
                    ticks: {
                        fontColor: "rgb(255, 255, 255)"
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgba(255, 255, 255, 0.8)",
                    },
                    ticks: {
                        fontColor: "rgb(255, 255, 255)",
                        min: 15,
                        max: 35,
                        stepSize: 5
                    }
                }]
            }

        }
    });

    var pressaoCtxChart = new Chart(pressaoCtx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['01/05', '03/05', '08/05'],
            datasets: [{
                label: 'IMC',
                borderColor: 'rgb(16, 138, 232)',
                pointBorderColor: 'rgb(255, 255, 255)',
                pointHoverBorderColor: 'rgb(255, 255, 255)',
                data: [30, 35,20]
            }]
        },

        // Configuration options go here
        options: {
            responsive: true,
            legend: {
                display: false,
                position: 'top',
                labels: {
                  fontColor: 'rgb(255, 255, 255)'
                }
            },            
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgba(255, 255, 255, 0.8)",
                        drawOnChartArea: true,
                        drawBorder: true,
                    },
                    ticks: {
                        fontColor: "rgb(255, 255, 255)"
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgba(255, 255, 255, 0.8)",
                    },
                    ticks: {
                        fontColor: "rgb(255, 255, 255)",
                        min: 15,
                        max: 35,
                        stepSize: 5
                    }
                }]
            }

        }
    });

});