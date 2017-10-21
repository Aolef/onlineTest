<template></template>
<script>
	export default{
		methods:{
			//要求用户必须做出回应时使用
			confirm(msg) {
                this.$alert(msg,"提示", {
                  confirmButtonText: '确定'
                })
            },
            //仅需要显示提示信息时使用（不需要回应）
		    notify(msg) {
		        const h = this.$createElement;
		        this.$message({
		          message: h('p', null, [
		            h('span', null, msg),
		            h('i', { style: 'color: teal' }, '')
		          ])
		        });
		    }

		}
	}
</script>