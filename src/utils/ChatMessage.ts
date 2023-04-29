import store from "@/store";
let str = "";
export function ChatMessage(obj: any) {
    str = ""
    // const obj1 = JSON.parse(obj)
    // console.log(obj)
    // console.log(store.state.userInfo.avatar)
    obj.forEach((item:any) => {
        str += `<div style="float:${item?.fromId==store.state.userInfo.id?'right':'left'};clear:both;padding:10px;">
            ${
                item?.fromId!=store.state.userInfo.id
                ? `<div style="display:flex;height:40px;">
                        <div style="width:40px;border-radius:50%;border:1px solid #ccc"><img style="width:100%;border-radius:50%" src="${obj.avatar}"/></div>
                        <div style="display:flex;align-items:center;border:1px solid #ccc;border-radius:5px;margin-left:10px;padding:0 10px;height:30px;margin-top:5px;">${item?.message}</div>
                    </div>`
                : `<div style="display:flex;height:40px;">
                        <div style="display:flex;align-items:center;border:1px solid #ccc;border-radius:5px;margin-right:10px;padding:0 10px;height:30px;margin-top:5px;">${item?.message}</div>
                        <div style="width:40px;border-radius:50%;border:1px solid #ccc"><img style="width:100%;border-radius:50%" src="${store.state.userInfo.avatar}"/></div>
                    </div>`
            }
            </div></br>`;
    });
  return str;
}
