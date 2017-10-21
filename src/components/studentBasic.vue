<template>
	<div>
		<el-row>
			<el-col :span="3">
				<el-button-group>
				  <el-button type="primary" icon="plus" @click="isAddDialogVisible=true"></el-button>
				  <el-button type="primary" icon="edit"></el-button>
				  <el-button type="primary" icon="delete"></el-button>
				</el-button-group>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				<el-table
			      :data="tableData"
			      style="width: 100%">
			      <el-table-column
			        prop="idNo"
			        label="学号"
			        width="180"
			        align="center">
			      </el-table-column>
			      <el-table-column
			        prop="name"
			        label="姓名"
			        align="center">
			      </el-table-column>
			    </el-table>
			    <el-pagination
			      @current-change="handleCurrentChange"
			      :current-page.sync="currentPage"
			      :page-size="10"
			      layout="total, prev, pager, next"
			      :total="total">
			    </el-pagination>
			</el-col>
		    <msg-dialog ref="msgDialog"></msg-dialog>
		</el-row>
		<el-dialog
		  title="添加"
		  :visible.sync="isAddDialogVisible"
		  size="tiny">
		  <el-form :model="newStudent" label-width="80px">
			  <el-form-item label="学号">
			    <el-input v-model="newStudent.idNo"></el-input>
			  </el-form-item>
			  <el-form-item label="姓名">
			    <el-input v-model="newStudent.name"></el-input>
			  </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="cancelAdd">取 消</el-button>
		    <el-button type="primary" @click="addStudent">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import msgDialog from './common/msgDialog'
	export default{
		data(){
			return{
				tableData:[],
				isAddDialogVisible:false,
				newStudent:{idNo:'',name:''},
				total:0,
				currentPage:1,
			}
		},
		created(){
			this.handleCurrentChange()
		},
		methods:{
			handleCurrentChange(){
				var url = this.HOST +　'/displayAllStudents?page='+this.currentPage+'&rows=10'
				this.$http.get(url).then(response=>{
					this.tableData = response.data.rows
					this.total = response.data.total
				}).catch(errors=>{
					this.$refs.msgDialog.confirm("获取失败！")
				})
			},
			addStudent(){
				var url = this.HOST + '/addStudent'
				this.$http.post(url,this.newStudent).then(response=>{
					this.$refs.msgDialog.notify("添加成功")
					this.handleCurrentChange()
				}).catch(errors=>{
					this.$refs.msgDialog.confirm("添加失败")
				})
				this.newStudent={}
				this.isAddDialogVisible=false
			},
			cancelAdd(){
				this.newStudent={}
				this.isAddDialogVisible=false
			}
		},
		components:{
			msgDialog
		}
	}
</script>