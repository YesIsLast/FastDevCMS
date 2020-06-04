<template>
    <div class="errorMain">
        <a-result
                status="404"
                :title="$lang.page404[0]"
                :subTitle="$lang.page404[1]"
        >
            <template v-slot:extra>
                <a-button type="primary" key="console" @click="quit()">
                    {{$lang.page404[2]}}
                </a-button>
                <a-button key="buy">
                    {{$lang.page404[3]}}
                </a-button>
            </template>

            <div class="desc">
                <p style="font-size: 16px;"><strong>{{$lang.page404[4]}}</strong></p>
                <p><a-icon :style="{ color: 'red' }" type="close-circle" /> {{$lang.page404[5]}} <a>webmaster@{{global.domain}}&gt;</a></p>
                <p><a-icon :style="{ color: 'red' }" type="close-circle" /> {{$lang.page404[6]}} <a @click="quit()">{{$lang.page404[7]}} &gt;</a></p>
            </div>
        </a-result>
    </div>
</template>
<script>
    import global from '@/global.json'
    export default {
        data() {
            return {
                global:global
            };
        },
    };
</script>
<style scoped>
    .errorMain{
        width: 800px;
        margin: 0 auto;
    }
    .desc p {
        margin-bottom: 1em;
    }
</style>
