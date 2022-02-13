

const Status = {isEnable:()=>false,isVisible:()=>false};
export default  function switchStatus<Status>(curstatus:String) {
     


    switch(curstatus) {
        case 'Going':
            Status.isEnable=()=>true;
            Status.isVisible=()=>true;
          break;
        case 'Ended':
            Status.isEnable=()=>false;
            Status.isVisible=()=>false;
          break;
        case 'Paused':
            Status.isEnable=()=>true;
            Status.isVisible=()=>false;
          break;
        case 'NotYetStarted':
            Status.isEnable=()=>true;
            Status.isVisible=()=>true;    
          break;
          case 'Decoded':
            Status.isEnable=()=>false;
            Status.isVisible=()=>false; 
            break;       
        default:
            Status.isEnable=()=>false;
            Status.isVisible=()=>false; 
      }

      return Status;

} 
