<template>
  <div class="chat">
    <div class="common-layout">
      <el-container style="height: 100vh">
        <el-header>
          <h1>Chat</h1>
        </el-header>
        <el-container>
          <el-aside width="300px" style="padding-top: 20px">
            <el-card class="box-card scroll-hover">
              <template #header>
                <div class="card-header">
                  <span>My Friends</span>
                  <!-- <el-button class="button" text>Operation button</el-button> -->
                </div>
              </template>
              <div v-for="(o, idx) in friendList" :key="idx" class="text item">
                <div
                  :style="{ background: isBgc == idx ? '#ccc' : '' }"
                  @click="addBgc(o, idx)"
                >
                  {{ o.name }}({{ o?.phone }})
                </div>
              </div>
            </el-card>
          </el-aside>
          <el-main class="chatView scroll-hover">
            <div class="name">{{ current.name }}</div>
            <div class="messageContent" ref="messagesContainer">
              <div v-html="messageList"></div>
            </div>
            <div class="send">
              <el-input
                v-model="input"
                placeholder="Please input"
                style="padding-right: 10px"
              />
              <el-button type="primary" :disabled="!input" @click="sendMessage"
                >发送</el-button
              >
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { ChatMessage } from "@/utils/ChatMessage";
import { myFriendsList } from "@/api/myFriends";
import store from "@/store";
import { getMessage } from "@/api/message";

export default defineComponent({
  async setup() {
    let input = ref("");
    let isBgc = ref();
    type T = {
      account: string;
      name: string;
      phone: string;
      id: number;
    };
    let current = reactive({
      name: "",
    });
    let toId = ref();
    let friendList = ref([
      {
        name: "",
        phone: "",
        account: "",
      },
    ]);
    // 初始化myFriends列表
    await myFriendsList().then((res) => {
      let userList: Array<T> = res.data;
      let main = userList?.filter(
        (f) => f.account == store.state.userInfo.account
      );
      userList.splice(
        userList?.findIndex((f) => f.account == store.state.userInfo.account),
        1
      );
      current.name = userList[0].name;
      isBgc.value = 1;
      toId.value = userList[0].id;
      userList.unshift(...main);
      friendList.value = userList;
    });
    // 选中用户添加背景色
    const addBgc = (item: any, idx: number) => {
      current.name = item.name;
      isBgc.value = idx;
      if (idx == 0) isBgc.value = -1;
    };
    // 获取和当前用户的聊天记录
    let messageList = ref("");
    let messages = await getMessage(toId.value, store.state.userInfo.id);
    console.log(messages);
    messageList.value = ChatMessage(messages.data);
    // websocket
    let ws: any;
    ws = new WebSocket("ws://localhost:3002");

    ws.addEventListener("open", (event: any) => {
      //   console.log("WebSocket connected", event);
    });
    // 接受到服务端返回的消息
    ws.addEventListener("message", (event: any) => {
      if (event.data) {
        let a = JSON.parse(event.data);
        messageList.value = ChatMessage(a);
        setTimeout(() => {
                document.getElementsByClassName("messageContent")[0].scrollTop =
              document.getElementsByClassName("messageContent")[0].scrollHeight;
        }, 1);
      }
    });
    // 客户端向服务端返回的消息
    const sendMessage = () => {
      if (input.value) {
        let userInfo = store.state.userInfo;
        let message = Object.assign({ message: input.value }, userInfo, {
          toId: toId.value,
        });
        // console.log(JSON.stringify(message));
        ws.send(JSON.stringify(message));
        input.value = "";
        // messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    };

    setTimeout(() => {
        document.getElementsByClassName("messageContent")[0].scrollTop =
          document.getElementsByClassName("messageContent")[0].scrollHeight;
    }, 1);

    return {
      input,
      friendList,
      addBgc,
      isBgc,
      current,
      sendMessage,
      messageList,
    };
  },
});
</script>
<style lang="less" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}
.box-card {
  width: 280px;
  /deep/.el-card__body {
    max-height: 400px;
    overflow: auto;
    padding: 10px 0;
    > :nth-of-type(1) {
      background: #a0d7ff;
    }
  }
}

.chatView {
  padding: 0;
  width: 90vh;
  margin-right: 10px;
  max-height: 80vh;
  min-height: 80vh;
  overflow: hidden;
  border: 1px solid #000;
  .messageContent {
    height: 80%;
    overflow: auto;
  }
}
.name {
  background: #a0d7ff;
  padding: 15px;
}
.scroll-hover:hover ::-webkit-scrollbar-thumb {
  float: right;
  background: #ccc; // 鼠标移入滑块变色
}
.send {
  display: flex;
  padding: 0 10px;
}
.item {
  margin-bottom: 0;
  text-align: left;
  div {
    padding: 10px 0 10px 30px;
  }
}
.item:hover {
  background: #ccc;
  cursor: pointer;
}
</style>
