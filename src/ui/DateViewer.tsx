import Tooltip from "@mui/material/Tooltip";
const DateViewer =(props:{date:string})=>{
    return <Tooltip title={props.date}>
        <p>{DateString(props.date)}</p>
    </Tooltip>
}
const DateString=(yyyymmdd:string)=>{
    const now= new Date()
    const date = new Date(
        Number(yyyymmdd.slice(0, 4)),
        Number(yyyymmdd.slice(4, 6)) - 1,
        Number(yyyymmdd.slice(6, 8)),
        0,
        0,
        0,
        0
    );
    const diff=(now.getDate()-date.getDate())/1000
    const toint=(v:string|number)=>parseInt(v.toString())
    const tostr=(v:string|number)=>toint(v).toString()
    if (diff<86400){
        return tostr(diff/60/60)+"時間前"
    }else if(diff<86400*32){
        return tostr(diff/86400)+"日前"
    }else{
        const month=toint(diff/86400/365*12)
        if(month<12){
            return month+"か月前"
        }else{
            return tostr(month/12)+"年"+tostr(month%12)+"か月前"
        }
    }
}
export default DateViewer