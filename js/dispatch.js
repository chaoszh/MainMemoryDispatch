// // Component
// var componentRect='<div style="width=20px">rect</div>';

// // Vue
// new Vue({
//     el:'#app',
//     data:{
//         mes:"asdasdkjshdka"
//     }
// })

// Vue.component('rect',{
//     template: '<div style="width=20px">rect</div>'
// })

// dispatch part

var freepart=new Array();
var busypart=new Array();
var requirement=new Array();
var si;                     //执行到第si条命令
var stotal;                 //命令一共stotal条
var rtotal;                 //内存分区情况

var button = document.getElementsByClassName("button")[0].onclick=function(){    
    // UI multipulations
    document.getElementsByClassName("button")[0].innerHTML="Next";
    document.getElementsByClassName("button")[0].onclick=respond;

    read();
    respond();
}


function read(){
    si=0;
    rtotal=1;
    freepart.push([1,640]);
    let str = document.getElementsByClassName("input-content")[0].value;
    requirement=str.split('\n')
    stotal=requirement.length;
}

function respond(){
    requirement.forEach(str => {
        respondEach(str);
        si++;
    });
}

function respondEach(str){
    // console.log(str);
    let req=str.split(' ');

    req[2]=req[2].substr(0,req[2].length-1);

    if(req[1]=='require'){
        require(req[0],Number(req[2]));
    }
    else if(req[1]=='release'){
        release(req[0],Number(req[2]));
    }
}

function require(id, space){
    let i=0;
    let result_flag=false;
    freepart.forEach(p=>{
        if((p[1]-p[0]+1)>=space){
            freepart.pop(i);
            middle=p[0]+space-1;
            if(middle!=p[1])freepart.push([middle,p[1]]);
            busypart.push([p[0],p[1],id,space]);
            result_flag=true;
            debug();
        }
        i++;
    })
    if(result_flag==false){
        requirement.push([id,"require",toString(space)+'K']);
    }
}

function release(id, space){
    let i=0;
    busypart.forEach(p=>{
        if(p[2]==id&&p[3]==space){
            busypart.pop(i);
            freepart.push([p[0],p[1]]);
            debug();
        }
        i++;
    })
}

function debug(){
    console.log(
        "s_i = "+si+'\n'+
        "freepart = "+freepart+'\n'+
        "busypart = "+busypart
    );
}