import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import DateViewer from "@/ui/DateViewer"
import url from "@/utils/url";
import {postType} from "@/utils/post";

const Enum=(props:{
    item:postType[]
})=>{
    return <>
        {props.item.map(v=>{
            return <EnumItem post={v} key={v[0]}/>
        })}
    </>
}
const EnumItem=(props:{
    post:postType
})=>{
    console.log(props.post)
    const tags=props.post[2].map(value => {
        return <Chip label={value} variant="outlined" key={value}/>
    })
    return <Button
            component={"a"}
            href={url("/post/"+props.post[0])}
    >
        {props.post[1]}
            <DateViewer date={props.post[0]}/>
            {tags}
    </Button>
}
export default Enum