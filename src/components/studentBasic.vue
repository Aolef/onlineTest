<template>
	<div>
		<el-row>
			<el-col :span="3">
				<el-button-group>
				  <el-button type="primary" icon="plus" @click="isAddDialogVisible=true"></el-button>
				  <el-button type="primary" icon="edit" @click="editStudent"></el-button>
				  <el-button type="primary" icon="delete" @click="delStudent"></el-button>
				</el-button-group>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				<el-table
			      :data="tableData"
			      style="width: 100%"
			      @selection-change="getCurrentRows">
			      <el-table-column
				      type="selection"
				      width="55">
				  </el-table-column>
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
		  <el-form :model="newStudent" label-width="80px" :rules="rules" ref="newStudent">
			  <el-form-item label="学号" prop="idNo">
			    <el-input v-model="newStudent.idNo"></el-input>
			  </el-form-item>
			  <el-form-item label="姓名" prop="name">
			    <el-input v-model="newStudent.name"></el-input>
			  </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="cancelAdd">取 消</el-button>
		    <el-button type="primary" @click="saveAddStudent('newStudent')">确 定</el-button>
		  </span>
		</el-dialog>



		<el-dialog
		  title="修改"
		  :visible.sync="isEditDialogVisible"
		  size="tiny">
		  <el-form :model="updateStudent" label-width="80px" :rules="rules" ref="updateStudent">
			  <el-form-item label="学号" prop="updateIdNo">
			    <el-input v-model="updateStudent.updateIdNo"></el-input>
			  </el-form-item>
			  <el-form-item label="姓名" prop="updateName">
			    <el-input v-model="updateStudent.updateName"></el-input>
			  </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="cancelEdit">取 消</el-button>
		    <el-button type="primary" @click="saveEditStudent('updateStudent')">确 定</el-button>
		  </span>
		</el-dialog>



		<el-dialog
		  title="删除"
		  :visible.sync="isDelDialogVisible"
		  size="tiny">
		  <span><h5>确认删除以下学生吗？</h5></span>
		  <el-row></el-row>
		  <div v-for="item in currentRows">{{item.name}}</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="isDelDialogVisible=false">取 消</el-button>
		    <el-button type="primary" @click="sureDelStudent">确 定</el-button>
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
				isEditDialogVisible:false,
				isDelDialogVisible:false,
				newStudent:{idNo:'',name:''},
				total:0,
				currentPage:1,
				currentRows:[],
				updateStudent:{updateIdNo:'',updateName:''},
				delIds:[],
				rules:{
					idNo:[
					{ required: true, message:"必填项", trigger: 'blur'&'change' }
					],
					name:[
					{ required: true, message:"必填项", trigger: 'blur'&'change' }
					],
					updateIdNo:[
					{ required: true, message:"必填项", trigger: 'blur'&'change' }
					],
					updateName:[
					{ required: true, message:"必填项", trigger: 'blur'&'change' }
					],
				}
				
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
			saveAddStudent(newStudent){
				 this.$refs[newStudent].validate((valid)=>{
				 	if(valid){
				 		var url = this.HOST + '/addStudent'
						this.$http.post(url,this.newStudent).then(response=>{
							this.$refs.msgDialog.notify("添加成功")
							this.handleCurrentChange()
						}).catch(errors=>{
							this.$refs.msgDialog.confirm("添加失败")
						})
						this.newStudent={}
						this.isAddDialogVisible=false
				 	}else{
				 		
				 	}
				 })
			},
			saveEditStudent(updateStudent){
				this.$refs[updateStudent].validate((valid)=>{
					if(valid){
						var url = this.HOST +　'/updateStudent'
						this.currentRows[0].idNo = this.updateStudent.updateIdNo
						this.currentRows[0].name = this.updateStudent.updateName
						this.$http.put(url,this.currentRows[0]).then(response=>{
							this.$refs.msgDialog.notify("修改成功")
							this.handleCurrentChange()
						}).catch(errors=>{
							this.$refs.msgDialog.confirm("修改失败！")
						})
						this.isEditDialogVisible = false
					}else{
					}
				})
			},
			cancelAdd(){
				this.isAddDialogVisible=false
				this.newStudent={}
			},
			cancelEdit(){
				this.isEditDialogVisible=false
				this.updateStudent.updateIdNo = this.currentRows[0].idNo
				this.updateStudent.updateName = this.currentRows[0].name
			},
			getCurrentRows(row){
				this.currentRows = row
				this.updateStudent.updateIdNo = this.currentRows[0].idNo
				this.updateStudent.updateName = this.currentRows[0].name
			},
			editStudent(){
				if(this.currentRows==''){
					this.$refs.msgDialog.confirm("请先选择一行")
				}else if(this.currentRows.length!=1){
					this.$refs.msgDialog.confirm("只能选择一行进行修改")
				}else{
					this.isEditDialogVisible = true
				}
			},
			delStudent(){
				if(this.currentRows==''){
					this.$refs.msgDialog.confirm("请先选择一行")
				}else{
					var i = 0
					this.currentRows.forEach(item=>{
						this.delIds[i] = item.id
						i++
					})
					this.isDelDialogVisible = true
				}
			},
			sureDelStudent(){
				var url = this.HOST + '/deleteStudents?ids='+this.delIds
				this.$http.delete(url).then(response=>{
					this.handleCurrentChange()
					this.$refs.notify("删除成功")
				}).catch(errors=>{
					this.$refs.confirm("删除失败！")
				})
				this.isDelDialogVisible = false
			}
		},
		components:{
			msgDialog
		}
	}
</script>