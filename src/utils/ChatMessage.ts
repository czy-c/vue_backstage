import store from "@/store";
let str = "";
export function ChatMessage(obj: any) {
    str = ""
    // const obj1 = JSON.parse(obj)
    console.log(obj)
    obj.forEach((item:any) => {
        str += `<div style="float:${item?.fromId==store.state.userInfo.id?'right':'left'};clear:both;padding:10px;">
            ${
                item?.fromId!=store.state.userInfo.id
                ? `<div style="display:flex;height:40px;">
                        <div style="width:40px;border-radius:50%;border:1px solid #ccc";width:20px;height:20px;>头像</div>
                        <div style="display:flex;align-items:center;">${item?.message}</div>
                    </div>`
                : `<div style="display:flex;height:40px;">
                        <div style="display:flex;align-items:center;">${item?.message}</div>
                        <div style="width:40px;border-radius:50%;border:1px solid #ccc";width:20px;height:20px;>头像</div>
                    </div>`
            }
            </div></br>`;
    });
  return str;
}
