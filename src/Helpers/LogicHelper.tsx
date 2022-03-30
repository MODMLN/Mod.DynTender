
import DisplayMessage from "../features/Tenders/Dtos/DisplayMessage";

class LogicHelper {
    isDisplayMessages(displayMessages:DisplayMessage[], tenderId:number ) {
        let data = displayMessages?.find((item)=>{
            return item.tenderId == tenderId});
        return data? data.display : true;
    }
}

export default new LogicHelper();