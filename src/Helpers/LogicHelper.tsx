
import MessegesDisplayDto from "../features/Tenders/Dtos/MessegesDisplayDto";

class LogicHelper {
    isDisplayMessages(messegesDisplayDto:MessegesDisplayDto, tenderId:number ) {
        let data = messegesDisplayDto.DisplayMessages?.find((item)=>{
            return item.tenderId == tenderId});
        return data? data.display : true;
    }
}

export default new LogicHelper();