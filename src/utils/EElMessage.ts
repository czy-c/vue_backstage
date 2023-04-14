// const { ElMessage } = require("element-plus");
import { ElMessage } from "element-plus";
export default function EElMessage(message:string,type:'success'|'error'|'warning'|'info'){
    return ElMessage({
        message,
        type
    })
}
