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