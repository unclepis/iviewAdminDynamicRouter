    menuConfiguration<template>
        <div style="background:#eee;padding: 20px">
            <Card :bordered="false">
                <p slot="title">No border title</p>
                <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
                <Button @click="test">test</Button>
            </Card>
        </div>
    </template>
    <script>
    export default {
        methods: {
            test(){
                this.$router.push({
                    path:'/deviceManagement/deviceDetailsInfo'
                })
            }
        }
    }
    </script>
