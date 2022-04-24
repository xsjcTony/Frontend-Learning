<script lang="ts" setup>
import EmailRegisterForm from '../components/Register/EmailRegisterForm.vue'
import UsernameRegisterForm from '../components/Register/UsernameRegisterForm.vue'
</script>

<template>
    <div class="register-container">
        <div class="register-wrapper">
            <h1>Register</h1>
            <el-tabs class="register-tab" tab-position="left">
                <el-tab-pane label="Username">
                    <UsernameRegisterForm/>
                </el-tab-pane>
                <el-tab-pane label="E-mail">
                    <EmailRegisterForm/>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.register-container {
    width: 100%;
    height: 100%;
    background: url('/src/assets/images/bg.jpg') center center / cover no-repeat;

    .register-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 500px;
        height: fit-content;
        border-radius: 10px;
        background: #fff;
        transform: translate(-50%, -50%);

        h1 {
            font-size: 30px;
            text-align: center;
        }
    }
}

.el-tabs {
    height: fit-content;

    .el-tab-pane {
        padding: 0 20px 0 10px;
    }
}
</style>
