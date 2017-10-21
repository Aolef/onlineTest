<template>
	<div>
		<el-row>
			<el-col :span="6">
				<el-button-group>
				  <el-button type="primary" icon="plus">增加</el-button>
				  <el-button type="primary" icon="edit">修改</el-button>
				  <el-button type="primary" icon="delete">修改</el-button>
				</el-button-group>
			</el-col>
		</el-row>
		<el-row>
			<el-table
		      :data="tableData"
		      style="width: 60%">
		      <el-table-column
		        prop="id_no"
		        label="学号"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="name"
		        label="姓名">
		      </el-table-column>
		    </el-table>
		    <msg-dialog ref="msgDialog"></msg-dialog>
		</el-row>
	</div>
</template>
<script type="text/javascript">
import msgDialog from './common/msgDialog'
	export default{
		data(){
			return{
				tableData:[],
			}
		},
		created(){
			this.findAllStudent()
		},
		methods:{
			findAllStudent(){
				var url = this.HOST +　'/findAllStudents'
				this.$http.get(url).then(response=>{
					this.tableData = response.data
				}).catch(errors=>{
					this.$refs.msgDialog.confirm("获取失败！")
				})
			}
		},
		components:{
			msgDialog
		}
	}
</script>