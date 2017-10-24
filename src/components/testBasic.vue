<template>
	<el-row>
		<el-col :span="12">
			<el-row>
				<el-col :span="9">
					<el-button-group>
						<el-button type="primary" icon="plus" @click="addTest"></el-button>
					  	<el-button type="primary" icon="edit" @click="editTest"></el-button>
					  	<el-button type="primary" icon="delete" @click="deleteTest"></el-button>
					</el-button-group>
				</el-col>
			</el-row>
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
				prop="toConduct"
				label="当前考试"
				></el-table-column>		
				</el-table>
				<el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="page"
			      :page-sizes="[10, 15, 20, 25]"
			      :page-size="rows"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="testBasicDataTotal">
			    </el-pagination>
			</el-row>
		</el-col>
		<el-col :span="12">
			<el-row>
				<el-col :span="9">
					<el-button-group>
						<el-button type="primary" icon="plus" @click="addTestDetail"></el-button>
					  	<el-button type="primary" icon="edit" @click="editTestDetail"></el-button>
					  	<el-button type="primary" icon="delete" @click="deleteTestDetail"></el-button>
					</el-button-group>
				</el-col>
			</el-row>
			<el-row>
				<el-table
				:data="testDetailData"
				highlight-current-row
				border
				@row-click="handleRowClickWithTestDetail"
				style="width: 100%">
				<el-table-column
				prop="contents"
				label="题目"
				></el-table-column>
				<el-table-column
				prop="kind"
				label="试卷类型"
				></el-table-column>	
				<el-table-column
				prop="fullScore"
				label="满分"
				></el-table-column>		
				</el-table>
				<el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="page"
			      :page-sizes="[10, 15, 20, 25]"
			      :page-size="rows"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="testDetailDataTotal">
			    </el-pagination>
			</el-row>
		</el-col>
		<el-dialog v-model="showAddDialog" title="增加">
			<el-form :model="addTestData" :rules="rules" ref="ruleForm">
				<el-form-item
				label='考试名称' 
				prop="name">
					<el-input v-model="addTestData.name"></el-input>
				</el-form-item>
				<el-form-item
				label='考试时间'>
					<el-date-picker
				      v-model="addTestData.dateTime"
				      align="right"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions1">
				    </el-date-picker>
				</el-form-item>
				<el-form-item
				label='是否当前考试'
				prop='isToConduct'>
				  <el-select v-model="addTestData.isToConduct" placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				</el-form-item>
				<el-button @click="saveAdd('ruleForm')">提交</el-button>
				<el-button @click="cancelAdd">取消</el-button>
			</el-form>
		</el-dialog>
		<el-dialog v-model="showEditDialog">
			<el-form :model="editTestData" title="修改" :rules="rules" ref="ruleForm">
				<el-form-item
				label='考试名称'
				prop='name'>
					<el-input v-model="editTestData.name"></el-input>
				</el-form-item>
				<el-form-item
				label='考试时间'>
					<el-date-picker
				      v-model="editTestData.dateTime"
				      align="right"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions1">
				    </el-date-picker>
				</el-form-item>
				<el-form-item
				label='是否当前考试'
				prop='isToConduct'>
				  <el-select v-model="editTestData.isToConduct" placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				</el-form-item>
				<el-button @click="saveEdit('ruleForm')">提交</el-button>
				<el-button @click="cancelEdit">取消</el-button>
			</el-form>
		</el-dialog>
		<el-dialog v-model="showAddDetailDialog" title="增加">
			<el-form :model="addTestDetailData" :rules="rules" ref="ruleForm">
				<el-form-item
				label="题目"
				prop='contents'>
					<el-input type="textarea" :rows="3" v-model="addTestDetailData.contents"></el-input>
				</el-form-item>
				<el-form-item
				label="试卷类型"
				prop='kind'>
					<el-col :span='7'>
						<el-select v-model="addTestDetailData.kind" placeholder="请选择">
						    <el-option
						      v-for="item in allKinds"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
					  	</el-select>
				  	</el-col>
				</el-form-item>
				<el-form-item
				label="满分"
				prop='fullScore'>
					<el-col :span='6'>
						<el-input v-model="addTestDetailData.fullScore"></el-input>
					</el-col>			
				</el-form-item>
				<el-button @click="saveAddTestDetail('ruleForm')">确定</el-button>
				<el-button @click="cancelAddTestDetail">取消</el-button>
			</el-form>
		</el-dialog>
		<el-dialog v-model="showEditDetailDialog" title="修改" >
			<el-form :model="editTestDetailData" :rules="rules" ref="ruleForm">
				<el-form-item
				label="题目"
				prop='contents'>
					<el-input type="textarea" :rows="3" v-model="editTestDetailData.contents"></el-input>
				</el-form-item>
				<el-form-item
				label="试卷类型"
				prop='kind'>
					<el-col :span='7'>
						<el-select v-model="editTestDetailData.kind" placeholder="请选择">
						    <el-option
						      v-for="item in allKinds"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
					  	</el-select>
				  	</el-col>
				</el-form-item>
				<el-form-item
				label="满分"
				prop='fullScore'>
					<el-col :span='6'>
					<el-input v-model="editTestDetailData.fullScore"></el-input>
					</el-col>
				</el-form-item>
				<el-button @click="saveEditTestDetail('ruleForm')">确定</el-button>
				<el-button @click="cancelEditTestDetail">取消</el-button>
			</el-form>
		</el-dialog>
		<msg-dialog ref="msgDialog"></msg-dialog>
	</el-row>
</template>
<script>
import moment from 'moment'
import msgDialog from '../components/common/msgDialog.vue'
	export default{
		data:function(){
			return{
				testBasicData:'',
				testBasicDataTotal:'',
				testDetailData:'',
				testDetailDataTotal:'',
				showAddDialog:false,
				showEditDialog:false,
				showAddDetailDialog:false,
				showEditDetailDialog:false,
				currentRowId:'',
				currentRow:'',
				currentTestDetailId:'',
				currentTestDetailRow:'',
				addTestData:{
					name:'',
					dateTime:'',
					isToConduct:''
				},
				addTestDetailData:{
					contents:'',
					kind:'',
					fullScore:'',
					test:''
				},
				editTestData:{
					id:'',
					name:'',
					dateTime:'',
					isToConduct:''
				},
				editTestDetailData:{
					id:'',
					contents:'',
					kind:'',
					fullScore:'',
					test:''
				},
				page:1,
				rows:10,
				options: [{
		          value: "true",
		          label: '是'
		        }, {
		          value: "false",
		          label: '否'
		        }],
		        allKinds: [{
		          value: 'A',
		          label: 'A'
		        }, {
		          value: 'B',
		          label: 'B'
		        }],
				pickerOptions1: {
		          	//快捷键
		         	shortcuts: [{
		            	text: '今天',
		            	onClick(picker) {
		             		picker.$emit('pick', new Date());
		            	}
		          	}, {
		            	text: '昨天',
		            	onClick(picker) {
		              		const date = new Date();
		              		date.setTime(date.getTime() - 3600 * 1000 * 24);
		              		picker.$emit('pick', date);
		            	}
		          	}, {
		            	text: '一周前',
		            	onClick(picker) {
		              		const date = new Date();
		              		date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
		              		picker.$emit('pick', date);
		            	}
		          	}]
		        },
		        rules:{
					name:[{ required:true, message:'必填项', trigger:'blur'&'change' }],
					dateTime:[{ required:true, message:'必填项', trigger:'blur'&'change' }],
					isToConduct:[{ required: true, message: '必选项', trigger: 'blur'&'change' }],
					contents:[{ required: true, message: '必填项', trigger: 'blur'&'change' }],
					kind:[{ required: true, message: '必选项', trigger: 'blur'&'change' }],
					fullScore:[{ required: true, message: '必填项', trigger: 'blur'&'change' }],
		        }
			}
		},
		created:function(){
			this.getAllTestBasicData()
		},
		methods:{
			getAllTestBasicData:function(){
				var url=this.HOST+'/displayAllTests?page='+this.page+'&rows='+this.rows
				this.$http.get(url).then(response=>{
					this.testBasicData=response.data.rows
					this.testBasicDataTotal=response.data.total
					// console.log(JSON.stringify(this.testBasicData))
					for(var item in this.testBasicData){
						if (this.testBasicData[item].toConduct==null) {
							this.testBasicData[item].toConduct='否'
						}else if (this.testBasicData[item].toConduct==false) {
							this.testBasicData[item].toConduct='否'
						}else{
							this.testBasicData[item].toConduct='是'
						}
					}
				}).catch(response=>{
					this.$refs.msgDialog.confirm("获取所有考试信息失败!")
				})
			},
			getAllTestDetailData:function(){
				var url=this.HOST+'/findByTestId?id='+this.currentRowId+'&page='+this.page+'&rows='+this.rows
				this.$http.get(url).then(response=>{
					this.testDetailData=response.data.rows
					this.testDetailDataTotal=response.data.total
				}).catch(response=>{
					this.$refs.msgDialog.confirm("获取所有考试信息失败!")
				})
			},

			handleRowClick:function(row){
				this.currentRowId=row.id
				this.currentRow=row
				this.getAllTestDetailData()
			},
			handleSizeChange:function(val){
				this.rows=val
				this.getAllTestBasicData()
			},
			handleCurrentChange:function(val){
				this.page=val
				this.getAllTestBasicData()
			},
			handleRowClickWithTestDetail:function(val){
				this.currentTestDetailId=val.id
				this.currentTestDetailRow=val
			},
			addTest:function(){
				this.showAddDialog=true
			},
			saveAdd:function(ruleForm){
				this.$refs[ruleForm].validate((valid)=>{
					if (valid) {
						var url = this.HOST+'/addTest'
						var time = this.addTestData.dateTime
						this.addTestData.dateTime=moment(time).format("YYYY-MM-DD")
						// console.log(JSON.stringify(this.addTestData))
						if (this.addTestData.toConduct=="false") {
							this.addTestData.toConduct=false
						}else{
							this.addTestData.toConduct=true
						}
						this.$http.post(url,this.addTestData).then(response=>{
							this.getAllTestBasicData()
							this.$refs.msgDialog.notify("成功添加考试！")
							this.addTestData.name=''
							this.addTestData.dateTime=''
							this.addTestData.isToConduct=''
							this.currentRowId=''
							this.showAddDialog=false
						}).catch(response=>{
							this.$refs.msgDialog.notify("添加考试失败！")
						})
					}else{
						this.$refs.msgDialog.confirm("请检查增加信息,请正确填写")
		            	return false;
					}
				})
				
			},
			cancelAdd:function(){
				this.addTestData.name=''
				this.addTestData.dateTime=''
				this.addTestData.isToConduct=''
				this.showAddDialog=false
			},
			editTest:function(){
				if (this.currentRowId=="") {
					this.$refs.msgDialog.confirm("请选择要修改的一行!")
				}else{

					this.editTestData.id=this.currentRow.id
					this.editTestData.name=this.currentRow.name
					this.editTestData.dateTime=this.currentRow.dateTime
					this.editTestData.isToConduct=this.currentRow.isToConduct
					this.showEditDialog=true
				}
			},
			saveEdit:function(ruleForm){
				this.$refs[ruleForm].validate((valid)=>{
					if (valid) {
						var url = this.HOST+'/updateTest'
						var time = this.editTestData.dateTime
						this.editTestData.dateTime=moment(time).format("YYYY-MM-DD")
						if (this.editTestData.toConduct=="false") {
							this.editTestData.toConduct=false
						}else{
							this.editTestData.toConduct=true
						}
						this.$http.put(url,this.editTestData).then(response=>{
							this.getAllTestBasicData()
							this.$refs.msgDialog.notify("成功修改考试！")
							// this.editTestData.id=''
							// this.editTestData.name=''
							// this.editTestData.dateTime=''
							// this.editTestData.isToConduct=''
							this.currentRowId=''
							this.showEditDialog=false
						}).catch(response=>{
							this.$refs.msgDialog.notify("修改考试失败！")
						})
					}else{
						this.$refs.msgDialog.confirm("请检查增加信息,请正确填写")
	            		return false;
					}
				})
				
			},
			cancelEdit:function(){
				this.editTestData.id=''
				this.editTestData.name=''
				this.editTestData.dateTime=''
				this.editTestData.isToConduct=''
				this.showEditDialog=false
			},
			deleteTest:function(){
				if (this.currentRowId=='') {
					this.$refs.msgDialog.confirm("请选择要删除的一行!")
				}else{
					this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			          var url =this.HOST+'/deleteTest?id='+this.currentRowId
			          this.$http.delete(url).then(response=>{
			          	this.getAllTestBasicData()
			          	this.$refs.msgDialog.notify("成功删除一条数据!")
			          }).catch(response=>{
			          	this.$refs.msgDialog.notify("删除失败！")
			          })
			        }).catch(() => {
			          this.$refs.msgDialog.notify("已取消删除！")       
			        });
				}
			},
			addTestDetail:function(){		
				if (this.currentRowId=='') {
					this.$refs.msgDialog.confirm("请选择一次考试!")
				}else{
					this.showAddDetailDialog=true
				}
			},
			saveAddTestDetail:function(ruleForm){
				this.$refs[ruleForm].validate((valid)=>{
					if (valid) {
						var url = this.HOST+'/addTestDetail'
						this.addTestDetailData.test=this.currentRowId
						this.$http.post(url,this.addTestDetailData).then(response=>{
							this.getAllTestDetailData()
							this.$refs.msgDialog.notify("成功添加考试题目！")
							this.addTestDetailData.contents=''
							this.addTestDetailData.kind=''
							this.addTestDetailData.fullScore=''
							this.addTestDetailData.test=''
							this.showAddDetailDialog=false
						}).catch(response=>{
							this.$refs.msgDialog.notify("添加考试题目失败！")
						})
					}else{
						this.$refs.msgDialog.confirm("请检查增加信息,请正确填写")
		            	return false;
					}
				})
				
			},
			cancelAddTestDetail:function(){
				this.addTestDetailData.contents=''
				this.addTestDetailData.kind=''
				this.addTestDetailData.fullScore=''
				this.addTestDetailData.test=''
				this.showAddDetailDialog=false
				this.$refs.msgDialog.notify("已取消添加考试题目！")
			},
			editTestDetail:function(){
				if (this.currentTestDetailId=='') {
					this.$refs.msgDialog.confirm("请选择要修改的题目！")
				}else{
					this.editTestDetailData.id=this.currentTestDetailRow.id
					this.editTestDetailData.contents=this.currentTestDetailRow.contents
					this.editTestDetailData.kind=this.currentTestDetailRow.kind
					this.editTestDetailData.fullScore=this.currentTestDetailRow.fullScore
					this.editTestDetailData.test=this.currentRowId
					this.showEditDetailDialog=true
				}
			},
			saveEditTestDetail:function(ruleForm){
				this.$refs[ruleForm].validate((valid)=>{
					if (valid) {
						var url = this.HOST+'/updateTestDetail'
						this.$http.put(url,this.editTestDetailData).then(response=>{
							this.getAllTestDetailData()
							this.$refs.msgDialog.notify("成功修改考试题目！")
							// this.editTestDetailData.id=''
							// this.editTestDetailData.contents=''
							// this.editTestDetailData.kind=''
							// this.editTestDetailData.fullScore=''
							// this.editTestDetailData.test=''
							this.currentTestDetailId=''
							this.showEditDetailDialog=false
						}).catch(response=>{
							this.$refs.msgDialog.notify("修改考试题目失败！")
						})
					}else{
						// alert(JSON.stringify(valid))
						this.$refs.msgDialog.confirm("请检查增加信息,请正确填写")
	            		return false;
					}
				})
				
			},
			cancelEditTestDetail:function(){
				this.editTestDetailData.id=''
				this.editTestDetailData.contents=''
				this.editTestDetailData.kind=''
				this.editTestDetailData.fullScore=''
				this.editTestDetailData.test=''
				this.currentTestDetailId=''
				this.showEditDetailDialog=false
				this.$refs.msgDialog.notify("已取消修改题目！")
			},
			deleteTestDetail:function(){
				if (this.currentTestDetailId=='') {
					this.$refs.msgDialog.confirm("请选择要删除的一行!")
				}else{
					this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			          var url =this.HOST+'/deleteTestDetail?id='+this.currentTestDetailId
			          this.$http.delete(url).then(response=>{
			          	this.getAllTestDetailData()
			          	this.$refs.msgDialog.notify("成功删除一条数据!")
			          }).catch(response=>{
			          	this.$refs.msgDialog.notify("删除失败！")
			          })
			        }).catch(() => {
			          this.$refs.msgDialog.notify("已取消删除！")       
			        });
				}
			},

		},
		components:{
			msgDialog,
		}

	}
</script>