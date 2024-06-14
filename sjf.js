function SJF(processes) {
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let chart = "";
    let currentTime = 0;
    let finishTime = 0, turnAroundTime = 0, waitingTime = 0, totalTAT = 0, totalWT = 0;
    let resultTable = "<table class='output'><tr><th>Processes</th><th>FinishTime</th><th>TurnAroundTime</th><th>WaitingTime</th></tr><br>";

    for (let i = 0; i < processes.length; i++) {
        processes[i].completed = false;
    }

    let flag = true;
    while (flag) {
        let minimumBurstTime = Infinity;
        let index = -1;

        for (let j = 0; j < processes.length; j++) {
            if (!processes[j].completed && processes[j].arrivalTime <= currentTime && processes[j].burstTime < minimumBurstTime) {
                minimumBurstTime = processes[j].burstTime;
                index = j;
            }
        }

        if (index !== -1) {
            finishTime = currentTime + processes[index].burstTime;
            turnAroundTime = finishTime - processes[index].arrivalTime;
            waitingTime = turnAroundTime - processes[index].burstTime;
            totalTAT += turnAroundTime;
            totalWT += waitingTime;
            currentTime = finishTime;
            processes[index].completed = true;
            chart += `<div class='chart'>${processes[index].processId}</div>`;
            resultTable += `<tr><td>${processes[index].processId}</td><td>${finishTime}</td><td>${turnAroundTime}</td><td>${waitingTime}</td></tr>`;
        } 
        else {
            let nextArrivalTime = Infinity;
            for (let k = 0; k < processes.length; k++) {
                if (!processes[k].completed && processes[k].arrivalTime < nextArrivalTime) {
                    nextArrivalTime = processes[k].arrivalTime;
                }
            }
            currentTime = nextArrivalTime;
        }

        flag = processes.some(process => !process.completed);
    }

    let avgWT = totalWT / processes.length;
    let avgTAT = totalTAT / processes.length;
    let analysis = `<span class='analysis'>Average TurnAroundTime :</span><span class='analysis'>${avgTAT}</span><div></div>`;
    analysis += `<span class='analysis'>Average WaitingTime :</span><span class='analysis'>${avgWT}</span>`;

    let clearButton = `<button onclick='clearData()'>Clear Data</button>`;
    document.getElementById('gainchart').innerHTML = chart;
    document.getElementById('clear').innerHTML = clearButton;
    document.getElementById('outputTable').innerHTML = resultTable;
    document.getElementById('analysis').innerHTML = analysis;
    console.log(processes);
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
    options +="<button onclick='SJF("+JSON.stringify(processes)+")'>SJF</button>"
    ;
    document.getElementById('options').innerHTML=options;
}

