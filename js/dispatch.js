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

var fp=new Array();             //freepart
var bp=new Array();             //busypart
var requirement=new Array();
var si;                         //执行到第si条命令
var stotal;                     //命令一共stotal条
var rtotal;                     //内存分区情况

var button = document.getElementsByClassName("button")[0].onclick=function(){    
    // UI multipulations
    document.getElementsByClassName("button")[0].innerHTML="Next";
    document.getElementsByClassName("button")[0].onclick=respond;

    read();
    UIupdate();
    respond();
}

function read(){
    si=0;
    rtotal=1;
    fp.push([1,640]);
    let str = document.getElementsByClassName("input-content")[0].value;
    requirement=str.split('\n')
    stotal=requirement.length;
}

function UIupdate(){
    document.getElementsByClassName("input-procedure")[0].style.display='flex';
    let str='';
    for(let i=0;i<requirement.length;i++){
        let tstr="<p class='procedure'>"+requirement[i]+"<p>";
        str+=tstr;
    }
    document.getElementsByClassName("input-procedure")[0].innerHTML=str;

    document.getElementsByClassName('procedure')[si].style.color='#4ba400';
    document.getElementsByClassName('procedure')[si].style.fontWeight='bold';

    document.getElementsByClassName("input-content")[0].style.display='none';
    document.getElementsByClassName("input-title")[0].style.display='none';
}

function respond(){
    respondEach(requirement[si]);
    paint();
    si++;
    if(si>=requirement.length){
        let button=document.getElementsByClassName("button")[0];
        button.innerHTML="Stop";
        button.style.background='linear-gradient(to right top,#555,#454545)';
        button.onclick=function(){return;};
    }
}

function respondEach(str){
    // console.log(requirement);
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
    let result_flag=false;

    for(let i=0;i<fp.length;i++){
        if((fp[i][1]-fp[i][0]+1)>=space){
            middle=fp[i][0]+space-1;
            //update bp
            bp.push([fp[i][0],middle,id,space]);
            sort(bp);
            //update fp
            if(middle!=fp[i][1]){
                fp[i][0]=middle+1;
            }
            else{
                fp.remove(i);
            }
            //flag
            result_flag=true;
            // debug();
            break;
        }
    }
    if(result_flag==false){
        requirement.splice(si+2,0,id+" require "+space+'K');
    }
}

function release(id, space){
    for(let i=0;i<bp.length;i++){
        if(bp[i][2]==id&&bp[i][3]==space){
            fp.push([bp[i][0],bp[i][1]]);
            sort(fp);
            merge(fp);
            bp.remove(i);
            // debug();
        }
    }
}

function sort(arr){
    for(let i=0;i<arr.length;i++){
        let min=arr[i][0];
        let index=i;
        for(let j=i+1;j<arr.length;j++){
            if(arr[j][0]<min){
                min=arr[j][0];
                index=j;
            }
        }
        //swap
        let temp=arr[i];
        arr[i]=arr[index];
        arr[index]=temp;
    }
}

function merge(arr){
    for(let i=1;i<arr.length;i++){
        if(arr[i][0]==arr[i-1][1]+1){
            //connected
            arr[i-1][1]=arr[i][1];
            arr.remove(i);
        }
    }
}


var cGreen='linear-gradient(to right top,#249100,#a4d100)';
var cRed='linear-gradient(to right top,#cf0643,#f74343)';
var msdiv=document.getElementsByClassName("main-storage")[0];
function paint(){
    //conclude in a array p
    let p=[];
    for(let i=0;i<fp.length;i++){
        p.push([fp[i][0],fp[i][1],'free']);
    }
    for(let i=0;i<bp.length;i++){
        p.push([bp[i][0],bp[i][1],bp[i][2]]);
    }
    sort(p);

    console.log(p);
    debug();

    //dom
    let dstr='';
    for(let i=0;i<p.length;i++){
        let space=p[i][1]-p[i][0]+1;
        let state=p[i][2]=='free'?'':"TASK"+p[i][2];
        let color=p[i][2]=='free'?cGreen:cRed;
        let str="<div style='height:"+space+"px; background:"+color+";'><p>"+p[i][0]+'-'+p[i][1]+"  "+state+"</p></div>";

        dstr+=str;
    }
    msdiv.innerHTML=dstr;

    UIupdate();
}

function debug(){
    console.log(
        "s_i = "+si+'\n'+
        "freepart = "+fp+'\n'+
        "busypart = "+bp
    );
}