function secondsToDuration(totalSeconds){
    const hours=Math.floor(totalSeconds/3600);
    const minuites=Math.floor((totalSeconds%3600)/60);
    const seconds=Math.floor((totalSeconds%3600)%60);

    if(hours>0){
        return `${hours}h ${minuites}m`
    }else if(minuites>0){
        return `${minuites}m ${seconds}`
    }else{
        return `${seconds}s`
    }
}

module.exports=secondsToDuration;