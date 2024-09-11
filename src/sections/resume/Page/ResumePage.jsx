import UseCartId from 'src/hooks/use-cartId';
import Attachement from "../feuture/attachement";


const ResumePage = () =>{
    const {cartId} = UseCartId()

    console.log();
    
    return(
        <Attachement cartId={cartId}/>
    )
}


export default ResumePage;