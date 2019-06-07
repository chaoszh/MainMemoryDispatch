function require(id, space){
    let result_flag=false;
    let resulti=0;
    let result=640;
    for(let i=0;i<fp.length;i++){
        let fpi_size=fp[i][1]-fp[i][0]+1;
        if(fpi_size>=space){
            result_flag=true;
            if(result>fpi_size-space){
                resulti=i;
                result=fpi_size-space;
            }
        }
    }
    if(result_flag==true){
        middle=fp[resulti][0]+space-1;
        //update bp
        bp.push([fp[resulti][0],middle,id,space]);
        sort(bp);
        //update fp
        if(middle!=fp[resulti][1]){
            fp[resulti][0]=middle+1;
        }
        else{
            fp.remove(resulti);
        }
    }
    else if(result_flag==false){
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