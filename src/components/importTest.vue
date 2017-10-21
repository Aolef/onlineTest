<template>
<div>
	

	<el-row>
		<el-table
		:data="testBasicData"
		highlight-current-row
		border
		@row-click="handleRowClick"
		style="width: 100%">
		<el-table-column
		prop="name"
		label="考试名称"
		></el-table-column>
		<el-table-column
		prop="dateTime"
		label="考试时间"
		></el-table-column>	
		<el-table-column
		prop="isToConduct"
		label="当前考试"
		></el-table-column>	
		<el-table-column
		label="操作"
		><template scope="scope">
        <el-button
          size="small"
          @click="importTest(scope.row)">导出试卷</el-button>
     	 </template>
		</el-table-column>			
		</el-table>
		<el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="pageNum"
	      :page-sizes="[10, 15, 20, 25]"
	      :page-size="pageSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="testBasicDataTotal">
	    </el-pagination>    
	</el-row>
	<msg-dialog ref="msgDialog"></msg-dialog>
</div>
</template>
<script type="text/javascript">
	import msgDialog from '../components/common/msgDialog.vue'
	export default{
		data(){
			return{
				testBasicData:'',
				testBasicDataTotal:'',
				pageNum:1,
				pageSize:10,
			}
		},
		created:function(){
			this.getAllTestBasicData()
		},
		methods:{
			getAllTestBasicData:function(){
				var url=this.HOST+'/displayAllTests?page='+this.pageNum+'&rows='+this.pageSize
				this.$http.get(url).then(response=>{
					this.testBasicData=response.data.rows
					this.testBasicDataTotal=response.data.total
				}).catch(response=>{
					this.$refs.msgDialog.confirm("获取所有考试信息失败!")
				})
			},
			handleSizeChange:function(val){
				this.pageSize=val
				this.getAllTestBasicData()
			},
			handleCurrentChange:function(val){
				this.pageNum=val
				this.getAllTestBasicData()
			},
			importTest:function(val){
				var url=this.HOST+'/exportExcel?id='+val.id
				this.$http.get(url).then(response=>{
					this.$refs.msgDialog.notify("成功导出Excel至桌面!")
				}).catch(response=>{
					this.$refs.msgDialog.notify("导出excel失败!")
				})
			},
		},
		components:{
			msgDialog
		}
	}
</script>