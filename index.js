let alarmLists=[]
const alarmList=document.getElementById("list")
const alarmCounter=document.getElementById("alarm-counter")
var currentTime={
    hours:null,
    minute:null,
    seconds:null,
    am_pm:null
}

function deleteALarm(alarmId){
    const newAlarmLists=alarmLists.filter(function(alarm){
        
        return alarm.id!=alarmId
    })
    alarmLists=newAlarmLists
    renderList()
}

function showNotification(msg){
    alert(msg)
}

function compare(alarm){
    const alarmTime=`${alarm.hour}:${alarm.minute}:${alarm.sec} ${alarm.am_pm}`
    const compareTime=`${currentTime.hours}:${currentTime.minute}:${currentTime.seconds} ${currentTime.am_pm}`
    if(alarmTime==compareTime){
        alert('hello your alarm is arrived')
    }
   
}

function alertWindow(){
    if(alarmLists.length>0){
        for(let i=0;i<alarmLists.length;i++){
            compare(alarmLists[i])   

        }
    }
    
}
setInterval(alertWindow,1000)


function addAlarmToDOM(alarm){
    const li=document.createElement("li")
    li.innerHTML=
    `
    <label for="${alarm.id}" >${alarm.hour}:${alarm.minute}:${alarm.sec} ${alarm.am_pm} </label>
    <img src="img/delete.png" id="delete" data-id="${alarm.id}">
    `;
    alarmList.append(li)

}
function renderList(){
    alarmList.innerHTML=""
    for(let i=0;i<alarmLists.length;i++){
        addAlarmToDOM(alarmLists[i])
    }
    alarmCounter.innerHTML=alarmLists.length
}
function addAlarm(alarm){
    if(alarm){
    correct(alarm)    
    alarmLists.push(alarm)
    renderList()
    showNotification("alarm is successfully added")
    }        

}

function resetInput(){
    document.getElementById('hour').value=""
    document.getElementById('minute').value=""
    document.getElementById('sec').value=""
    document.getElementById('am-pm').value="AM"
}

function correct(time){
    time.sec=time.sec<10?'0'+time.sec:time.sec
    time.minute=time.minute<10?'0'+time.minute:time.minute
    time.hour=time.hour<10?'0'+time.hour:time.hour
}

function validateAlarm(time){
    if(time.sec>60||time.hour<0||time.sec==''){
        console.log('hello')
        showNotification("seconds should be in between the range 1-12")
        resetInput()
        return false
    }
    if(time.minute>60||time.minute<0||time.minute==''){
        console.log('hello')
        showNotification("minutes should be in between the range 1-12")
        resetInput()
        return false
    }
    if(time.hour>12||time.hour<0||time.hour==''){
            console.log('hello')
            showNotification("hours should be in between the range 1-12")
            resetInput()
            return false
        }
    return true
}

function func(){
    const alarm={
        id:Date.now(),
        hour:document.getElementById("hour").value,
        minute:document.getElementById("minute").value,
        sec:document.getElementById("sec").value,
        am_pm:document.getElementById("am-pm").value
    }
    if(validateAlarm(alarm)){
        addAlarm(alarm)
        resetInput()
    }
    
}

function correctCurrentTimeDigits(now,time){
    let h=(now.getHours()%12)||12
    time.hours=h<10?'0'+h:h
    time.minute=now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes()
    time.seconds=now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds()    
}

function updateCurrentTime(){
    const now=new Date()
    currentTime.minute=now.getMinutes()
    currentTime.seconds=now.getSeconds()
    currentTime.hours=now.getHours()
    currentTime.am_pm=currentTime.hours>=12?'PM':'AM'
    const t=document.getElementById('time')
    correctCurrentTimeDigits(now,currentTime)
    t.innerHTML=currentTime.hours+':'+currentTime.minute+':'+currentTime.seconds+' '+currentTime.am_pm
  
}
updateCurrentTime()
setInterval(updateCurrentTime,1000)

function clickListener(e) {
    const target=e.target
    
    if(target.id=="delete"){
        const alarmId=document.getElementById('delete').getAttribute('data-id')
        deleteALarm(alarmId)
        return
    }
    
}

document.addEventListener("click",clickListener)