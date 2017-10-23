<template>
	<div>
		<el-row>
			<el-col :span="18">
				<el-input
				  placeholder="题目区域"
				  :rows="6"
				  v-model="problems[0].contents"
				  :disabled="true"
				  type="textarea">
				</el-input>
			</el-col>
			<el-col :span="4">
				<el-button type="primary" @click="answer(problems[0].id,0)">作答题目一</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="18">
				<el-input
				  placeholder="题目区域"
				  :rows="6"
				  v-model="problems[1].contents"
				  :disabled="true"
				  type="textarea">
				</el-input>
			</el-col>
			<el-col :span="4">
				<el-button type="primary" @click="answer(problems[1].id,1)">作答题目二</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="18">
				<el-input
				  placeholder="题目区域"
				  :rows="6"
				  v-model="problems[2].contents"
				  :disabled="true"
				  type="textarea">
				</el-input>
			</el-col>
			<el-col :span="4">
				<el-button type="primary" @click="answer(problems[2].id,2)">作答题目三</el-button>
			</el-col>
		</el-row>
		<el-dialog
		  title="开始作答"
		  :visible.sync="isAnswerDialogVisible"
		  size="large"
		  >
		  <el-row>
			<el-col :span="24">
				<el-input
				  placeholder="题目区域"
				  :rows="6"
				  v-model="currentTest"
				  :disabled="true"
				  type="textarea">
				</el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-input
				  placeholder="答题区域--自然语言"
				  :rows="6"
				  v-model="thought"
				  :disabled="isThoughtDisVisible"
				  type="textarea">
				</el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-input
				  placeholder="答题区域--实现代码"
				  :rows="6"
				  v-model="code"
				  :disabled="isCodeDisVisible"
				  type="textarea">
				</el-input>
			</el-col>
		</el-row>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="cancel">取 消</el-button>
		    <el-button type="primary" @click="nextStep">提交自然语言</el-button>
		    <el-button type="primary" @click="saveAnswer">提交代码</el-button>
		  </span>
		</el-dialog>
		<msg-dialog ref="msgDialog"></msg-dialog>
	</div>
</template>
<script type="text/javascript">
import msgDialog from "./common/msgDialog"
	export default{
		data(){
			return{
				problems:[],
				thought:'',
				code:'',
				currentTest:'',
				isAnswerDialogVisible:false,
				isThoughtDisVisible:'',
				isCodeDisVisible:'',
				currentStudentTestDetail:{testDetail:''},
				studentTestDetail:{testDetail:''}

			}
		},
		components:{
			msgDialog
		},
		created(){
			this.findAllProblems()
		},
		methods:{
			findAllProblems(){
				var url = this.HOST + '/generateSubject'
				this.$http.get(url).then(response=>{
					this.problems = response.data
					
				}).catch(errors=>{
					this.$refs.msgDialog.confirm("获取失败")
				})
			},
			answer(id,problemIndex){
				var url = this.HOST + '/addStuTestDetail'
				this.studentTestDetail.testDetail=id
				this.$http.post(url,this.studentTestDetail).then(response=>{
					if(response.data.studentTestDetail.answerWithAlgorithmSign==null){
						this.isThoughtDisVisible=false
						this.isCodeDisVisible=true
					}else{
						this.isThoughtDisVisible=response.data.studentTestDetail.answerWithAlgorithmSign
						this.isCodeDisVisible=response.data.studentTestDetail.answerWithCodeSign
					}
					this.currentStudentTestDetail = response.data.studentTestDetail
					this.currentTest=this.problems[problemIndex].contents
					this.thought=response.data.studentTestDetail.answerWithAlgorithm
					this.code=response.data.studentTestDetail.answerWithCode
				})
				this.isAnswerDialogVisible=true

			},
			nextStep(){
				if(this.isThoughtDisVisible==true){
					this.$refs.msgDialog.confirm("你已提交过自然语言！")
				}else{
					this.currentStudentTestDetail.answerWithAlgorithmSign=true
					this.currentStudentTestDetail.answerWithCodeSign=false
					this.currentStudentTestDetail.answerWithAlgorithm=this.thought
					var url = this.HOST + '/updateStudentTestDetail'
					this.$http.put(url,this.currentStudentTestDetail).then(response=>{
						this.currentStudentTestDetail=response.data.studentTestDetail
						this.thought=response.data.studentTestDetail.answerWithAlgorithm
						this.code=response.data.studentTestDetail.answerWithCode
						this.isThoughtDisVisible=true
						this.isCodeDisVisible=false
					})
				}
			},
			cancel(){
				this.isAnswerDialogVisible=false
				this.thought=''
				this.code=''
			},
			saveAnswer(){
				if(this.currentStudentTestDetail.answerWithCodeSign==true&this.currentStudentTestDetail.answerWithAlgorithmSign==true){
					this.$refs.msgDialog.confirm("你已提交试卷！")
				}else if(this.currentStudentTestDetail.answerWithAlgorithm==false){
					this.$refs.msgDialog.confirm("请先提交自然语言！")
				}else{
					this.currentStudentTestDetail.answerWithCodeSign=true
					this.currentStudentTestDetail.answerWithCode=this.code
					var url = this.HOST + '/updateStudentTestDetail'
					this.$http.put(url,this.currentStudentTestDetail).then(response=>{
						this.$refs.msgDialog.notify("答卷完成")
						this.isCodeDisVisible=true
						this.isAnswerDialogVisible=false
					})
				}
			}
		}
	}
</script>                                                                                                             