
/**
* Theme: Ubold Admin Template
* Author: Coderthemes
* Morris Chart
*/


var chartType = '';
var chartYear = new Date().getFullYear();
var chartDoctorId = '';
var chartFromDate = '';
var chartToDate = '';
var morrisChart = '';


function initBarChart(element,data,xkey,ykeys,labels,lineColors){

    $("#earning-bar-details").empty();

    $("#earning-bar-details").unbind("click");

    morrisChart = Morris.Bar({
        element: element,
        data: data,
        xkey: xkey,
        ykeys: ykeys,
        labels: labels,
        hideHover: 'auto',
        gridLineColor: '#6e645b',
        barColors: lineColors

    }).on('click',(i,row)=>{
        switch (chartType) {

            case "YEARLY":
                {
                    chartYear = row.y;
                    chartType = 'MONTHLY';

                    $("#month-year").show();
                    $("#yearlable").show();
                    $("#monthlable").hide();
                    $("#year").text(chartYear);
                    $("#weeks").empty();

                    getChartData(chartType,chartDoctorId);

                }
            break;

            case "MONTHLY":
                {
                    // month name
                    var month = row.y.trim();

                    $("#month-year").show();
                    $("#yearlable").show();
                    $("#year").text(chartYear);
                    $("#monthlable").show();
                    $("#month").text(month);

                    var dateFormat = 'YYYY-MM-DD';

                    var y = new Date("01/"+month+"/"+chartYear).getFullYear();
                    var m = new Date("01/"+month+"/"+chartYear).getMonth();
                    
                    var firstDay = new Date(y, m, 1);
                    var lastDay = new Date(y, m + 1, 0);
                    
                    var weekStartDate  = "";
                    var weekEndDate = "";

                    var weeks = [];

                    while(moment(lastDay).isAfter(moment(firstDay)) ||
                             moment(lastDay).isSame(moment(firstDay))){
                        

                        // week's first date and last date is assigned
                        if(weekStartDate == "" &&  
                                (moment(firstDay).format("dddd") == "Saturday" || 
                                 (moment(firstDay).format("dddd")=="Sunday") && moment(firstDay).isSame(moment(lastDay)))  ){

                            weekStartDate = moment(firstDay).format(dateFormat);
                            weekEndDate = moment(firstDay).format(dateFormat);
                            
                            weeks.push(weekStartDate + "**" + weekEndDate);
                            weekStartDate = "";
                            weekEndDate = "";

                        } else if(weekStartDate == ""){

                            weekStartDate = moment(firstDay).format(dateFormat);

                        } else if(weekStartDate!="" && weekEndDate == "" && 
                                    ((moment(firstDay).format("dddd") == "Saturday") || moment(lastDay).isSame(moment(firstDay))) ){

                            weekEndDate = moment(firstDay).format(dateFormat);
                            weeks.push(weekStartDate + "**" + weekEndDate);
                            weekStartDate = "";
                            weekEndDate = "";

                        } 
                        firstDay.setDate(firstDay.getDate() + 1);
                    }

                    weeks.forEach((item,index)=>{

                        var weekDay = item.split("**");
                        
                        $("#weeks").append("<button class='btn-xs btn btn-purple btn-custom waves-effect waves-light' value='"+item+"' style='margin-left:05px;' onclick='initWeek(this.value)'>"+
                            moment(new Date(weekDay[0])).format("DD MMM")+"-"+moment(new Date(weekDay[1])).format("DD MMM")+"</button>");

                    });

                    chartFromDate = moment(new Date(weeks[0].split("**")[0])).format("DD/MM/YYYY");
                    chartToDate = moment(new Date(weeks[0].split("**")[1])).format("DD/MM/YYYY");
                    chartType = 'WEEKLY';
                    getChartData(chartType,chartDoctorId);

                }
            break;

            case "WEEKLY" : 
                {

                }
            break;
        }

    });

}

function getChartData(type,doctorId){

    chartType = type;
    chartDoctorId = doctorId;
    
    var doctorEarningRequest = '{ "type":"'+chartType+'","year":"'+chartYear+'","doctor_id":"'+chartDoctorId+'","from_date":"'+chartFromDate+'","to_date":"'+chartToDate+'"}';

    $.ajax({
        url : '/oncocare/admin/doctor/earnings',
        type : 'POST',
        dataType : 'json',
        contentType : 'application/json',
        data :doctorEarningRequest,
        beforeSend : function(request) {
            request.setRequestHeader('X-CSRF-Token', document
                    .getElementById('csrf').value);
        },
        success : function(response) {
            
            if(response.code=="1"){
                
                var $barData = [];
                
                switch (response.data.type) {
                    case "YEARLY":
                       {
                            $("#month-year").show();
                            $("#yearlable").hide();
                            $("#monthlable").hide();
                            $("#weeks").empty();

                           // bar data
                            response.data.earnings.forEach((item,index)=>{
                                $barData.push({y:item.name,a:item.amount});
                            });

                            initBarChart('earning-bar-details', $barData, 'y', 'a', ['Amount'], ['#6e645b']);
                       }
                    break;
                    
                    case "MONTHLY":
                        {
                            $("#month-year").show();
                            $("#yearlable").show();
                            $("#monthlable").hide();
                            $("#year").text(chartYear);
                            $("#weeks").empty();

                            // bar data
                            response.data.earnings.forEach((item,index)=>{
                                $barData.push({y:item.name,a:item.amount});
                            });

                            initBarChart('earning-bar-details', $barData, 'y', 'a', ['Amount'], ['#6e645b']);
                        }
                    break;
                
                    case "WEEKLY" :
                        {
                            
                            // bar data
                            response.data.earnings.forEach((item,index)=>{
                                $barData.push({y:item.name,a:item.amount});
                            });

                            initBarChart('earning-bar-details', $barData, 'y', 'a', ['Amount'], ['#6e645b']);
                        }
                    break;
                }
                
            }
        }
    });
}

// to set specific date range
function initWeek(id){
    
    chartType = 'WEEKLY';
    chartFromDate = moment(new Date(id.split("**")[0])).format("DD/MM/YYYY");
    chartToDate = moment(new Date(id.split("**")[1])).format("DD/MM/YYYY");
    getChartData(chartType,chartDoctorId);

}

function  getChartDataWeekly(){

    $("#weeks").empty();

    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    var weekStartDate  = "";
    var weekEndDate = "";

    var dateFormat = 'YYYY-MM-DD';

    var weeks = [];

    $("#month-year").show();
    $("#yearlable").show();
    $("#monthlable").show();
    $("#year").text(moment(new Date()).format("YYYY"));
    $("#month").text(moment(new Date()).format("MMMM"));

    while(moment(lastDay).isAfter(moment(firstDay)) ||
                             moment(lastDay).isSame(moment(firstDay))){
                        
        // week's first date and last date is assigned
        if(weekStartDate == "" &&  
                (moment(firstDay).format("dddd") == "Saturday" || 
                    (moment(firstDay).format("dddd")=="Sunday") && moment(firstDay).isSame(moment(lastDay)))  ){

            weekStartDate = moment(firstDay).format(dateFormat);
            weekEndDate = moment(firstDay).format(dateFormat);
            
            weeks.push(weekStartDate + "**" + weekEndDate);
            weekStartDate = "";
            weekEndDate = "";

        } else if(weekStartDate == ""){

            weekStartDate = moment(firstDay).format(dateFormat);

        } else if(weekStartDate!="" && weekEndDate == "" && 
                    ((moment(firstDay).format("dddd") == "Saturday") || moment(lastDay).isSame(moment(firstDay))) ){

            weekEndDate = moment(firstDay).format(dateFormat);
            weeks.push(weekStartDate + "**" + weekEndDate);
            weekStartDate = "";
            weekEndDate = "";

        } 
        firstDay.setDate(firstDay.getDate() + 1);
    }

        weeks.forEach((item,index)=>{

            var weekDay = item.split("**");
            
            $("#weeks").append("<button class='btn-xs btn btn-purple btn-custom waves-effect waves-light' value='"+item+"' style='margin-left:05px;' onclick='initWeek(this.value)'>"+
                moment(new Date(weekDay[0])).format("DD MMM")+"-"+moment(new Date(weekDay[1])).format("DD MMM")+"</button>");

        });

        chartFromDate = moment(new Date(weeks[0].split("**")[0])).format("DD/MM/YYYY");
        chartToDate = moment(new Date(weeks[0].split("**")[1])).format("DD/MM/YYYY");

        chartType = 'WEEKLY';
        // getChartData(chartType,chartDoctorId);
        $("#weeks button:first-child" ).click();
}


$(document).ready(function(){
    $(window).resize(function() {
        morrisChart.redraw();
    });
});