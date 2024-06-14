function FCFS(processes){
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    var chart="";
    for(let i=0;i<processes.length;i++){
        chart += `<div class='chart'>${processes[i].processId}</div>`;
    }
    document.getElementById('gainchart').innerHTML=chart;

    let currentTime=0;
    let finishTime=0,turnArroundTime=0,waitingTime=0,totalTAT=0,totalWT=0;
    var resultTable="<table class='output'><tr><th>Processes</th><th>FinishTime</th><th>TurnArroundTime</th><th>WaitingTime</th></tr><br>";
    for(let j=0;j<processes.length;j++){
        if(currentTime>=processes[j].arrivalTime){
            currentTime += processes[j].burstTime;
            finishTime = currentTime;
            turnArroundTime = finishTime - processes[j].arrivalTime;
            waitingTime = turnArroundTime - processes[j].burstTime;
            totalTAT += turnArroundTime;
            totalWT += waitingTime;
        }
        else{
            currentTime=processes[j].arrivalTime;
            currentTime += processes[j].burstTime;
            finishTime = currentTime;
            turnArroundTime = finishTime - processes[j].arrivalTime;
            waitingTime = turnArroundTime - processes[j].burstTime;
            totalTAT += turnArroundTime;
            totalWT += waitingTime;
        }
        resultTable += `<tr><td>${processes[j].processId}</td><td>${finishTime}</td><td>${turnArroundTime}</td><td>${waitingTime}</td></tr>`;
    }
    let avgWT = totalWT/processes.length;
    let avgTAT = totalTAT/processes.length;
    var analysis = `<span class='analysis'>average TurnArroundTime :</span><span class='analysis'>${avgTAT}</span><div></div>`;
    analysis += `<span class='analysis'>average WaitingTime :</span><span class='analysis'>${avgWT}</span>`;

    var clearButton = `<button onclick='clearData()'>Clear Data</button>`;
    document.getElementById('clear').innerHTML=clearButton;
    document.getElementById('outputTable').innerHTML=resultTable;
    document.getElementById('analysis').innerHTML=analysis;
}

function displayInputTable(){
    let size = document.getElementById('nprocesses').value;
    if(size<1 || size>10){
        alert("porcesses should be between 1 to 10");
        document.getElementById('nprocesses').value=null;
        return -1;
    }
    var table = "<table class='input'><tr><th>Processes</th><th>Arrival Time</th><th>Burst Time</th><th>Priority</th></tr>";
    for(let i=0;i<size;i++){
        table += "<tr>";
        table += "<td>"+"P"+(i+1)+"</td>";
        table += "<td><input type='number' id='arrival_"+(i+1)+"'></td>";
        table += "<td><input type='number' id='burst_"+(i+1)+"'></td>";
        table += "<td><input type='number' id='priority_"+(i+1)+"'></td>";
        table += "</tr><br>";
    }
    table += "</table><br><br>";
    var saveData = "<button>Save Data</button>";
    document.getElementById('inputTable').innerHTML=table;
    document.getElementById('save').innerHTML=saveData;
}

function saveData(){
    let size = document.getElementById('nprocesses').value;
    let processes = []; 

    for (let i = 0; i < size; i++) {
        let process = {};
        process.processId = "P" + (i + 1);
        process.arrivalTime = parseInt(document.getElementById('arrival_'+ (i+1)).value);
        process.burstTime = parseInt(document.getElementById('burst_' + (i+1)).value);
        process.priority = parseInt(document.getElementById('priority_' + (i+1)).value);
        processes.push(process);
    }
    var options = ""
    options += "<button onclick='FCFS("+JSON.stringify(processes)+")'>FCFS</button>";
    document.getElementById('options').innerHTML=options;
}

