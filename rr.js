function RR(processes){
    let timeQuantum = prompt("Enter Time Quantum : ");
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    // let timeQuantum = 1;

    let completed = 0;
    let chart = "";
    let currentTime = 0;
    let totalTAT = 0, totalWT = 0;
    let resultTable = "<table class='output'><tr><th>Processes</th><th>FinishTime</th><th>TurnAroundTime</th><th>WaitingTime</th></tr>";
    let index = -1;

    for (let i = 0; i < processes.length; i++) {
        processes[i].completed = false;
        processes[i].clockCycleUse = 0;
        processes[i].lastExecution = processes[i].arrivalTime;
        processes[i].availableTime = processes[i].burstTime;
    }
    // console.log(processes[0].availableTime);
    while (completed != processes.length) {
        let maxWaiting = -1000;
    
        for (let j = 0; j < processes.length; j++) {
            if (!processes[j].completed && processes[j].arrivalTime <= currentTime) {
                if ((currentTime - processes[j].lastExecution) > maxWaiting) {
                    maxWaiting = (currentTime - processes[j].lastExecution);
                    index = j;
                } else if ((currentTime - processes[j].lastExecution) == maxWaiting) {
                    if (processes[j].clockCycleUse < processes[index].clockCycleUse) {
                        index = j;
                    }
                }
            }
        }
        // console.log(index);
        let executeTime = Math.min(timeQuantum, processes[index].availableTime);

            chart += `<div class='chart'>${processes[index].processId}</div>`;
            currentTime += executeTime;
            processes[index].availableTime -= executeTime;
            processes[index].lastExecution = currentTime;
            processes[index].clockCycleUse++;
    
        if (processes[index].availableTime === 0) {
            processes[index].completed = true;
            let finishTime = currentTime;
            let turnAroundTime = finishTime - processes[index].arrivalTime;
            let waitingTime = turnAroundTime - processes[index].burstTime;
            totalWT += waitingTime;
            totalTAT += turnAroundTime;
            resultTable += `<tr><td>${processes[index].processId}</td><td>${finishTime}</td><td>${turnAroundTime}</td><td>${waitingTime}</td></tr>`;
            completed++;
        }
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
    options +="<button onclick='RR("+JSON.stringify(processes)+")'>Round Robin</button>"
    ;
    document.getElementById('options').innerHTML=options;
}

