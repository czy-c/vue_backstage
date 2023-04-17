<template>
    <div class="Register">
        <el-form
      class="login"
      :label-position="'top'"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 40%"
    >
        <h1>Register</h1>
      <el-form-item label="Name">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="Phone">
        <el-input v-model="formLabelAlign.phone" />
      </el-form-item>
      <el-form-item label="Account">
        <el-input v-model="formLabelAlign.account" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="formLabelAlign.password" show-password />
      </el-form-item>
      <el-form-item label="Again Password">
        <el-input v-model="formLabelAlign.againPassword" show-password />
        <b v-if="isShow" style="color: red;">两次输入的密码不一致</b>
      </el-form-item>
      <el-button type="primary" @click="Register">Register</el-button>
      <el-button type="primary" @click="$router.push({path:'/'})" plain>To Login</el-button>
    </el-form>
    </div>
</template>
<script lang="ts">
import { register } from '@/api/user'
import { ElMessage } from 'element-plus'
import EElMessage from '../utils/EElMessage'
import { defineComponent, reactive, ref, watch } from 'vue'

export default defineComponent({
    setup(props,ctx) {
        let formLabelAlign = reactive({
            name:'',
            phone:'',
            account:'',
            password:'',
            againPassword:''
        })
        const isShow = ref(false)
        const Register = ()=>{
            if(!formLabelAlign.account||!formLabelAlign.password||!formLabelAlign.againPassword){
                EElMessage('请填写完整资料','error')
                return;
            }
            if(isShow.value)return
            register(formLabelAlign).then(res=>{
                if(formLabelAlign.password!=formLabelAlign.againPassword){
                    return
                }
                EElMessage(res.data.message,res.data.status)
            })
        }
        watch(()=>formLabelAlign.againPassword,(newValue,oldValue)=>{
            if(newValue!=formLabelAlign.password){
                isShow.value = true
            }else{
                isShow.value = false
            }
        })
        return{formLabelAlign,Register,isShow}
    },
})
</script>

<style lang="less">
.Register{
    height: 100vh;
    background-image: url('../assets/images/bgc.png');
}
</style>