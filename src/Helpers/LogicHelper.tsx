
import DisplayMessage from "../features/Tenders/Dtos/DisplayMessage";

class LogicHelper {
    isDisplayMessages(displayMessages:DisplayMessage[], tenderId:number | undefined ) {
        console.log(tenderId)
        //console.log(displayMessages)
        let data = displayMessages?.find((item)=>{
            return item.tenderId === tenderId?.toString()});
        console.log(data)
        return data? data.display : true;
    }
}

export default new LogicHelper();