<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import UsersQuery from './Users/UsersQuery.vue'
import UsersTable from './Users/UsersTable.vue'


/**
 * Header (Breadcrumb)
 */
const emit = defineEmits<(e: 'resetDefaultActiveMenuItem') => void>()
</script>

<template>
    <!-- S Breadcrumb -->
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item>
            <a href="/admin" @click="emit('resetDefaultActiveMenuItem')">Home Page</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>User Management</el-breadcrumb-item>
        <el-breadcrumb-item>User List</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- E Breadcrumb -->

    <!-- S Main -->
    <el-card>
        <UsersQuery/>
        <!-- /Top bar -->

        <UsersTable/>
        <!-- /Main table -->
    </el-card>
    <!-- E Main -->
</template>

<style lang="scss" scoped>
.el-breadcrumb {
    margin-bottom: 20px;
}

.el-card {
    min-width: 700px;
}
</style>
