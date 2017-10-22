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
				<el-button type="primary" @click="answer(0)">作答题目一</el-button>
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
				<el-button type="primary" @click="answer(1)">作答题目二</el-button>
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
				<el-button type="primary" @click="answer(2)">作答题目三</el-button>
			</el-col>
		</el-row>
		<el-dialog
		  title="开始作答"
		  :visible.sync="isAnswerDialogVisible"
		  size="large"
		  :before-close="handleClose">
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
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				problems:[],
				thought:'',
				code:'',
				currentTest:'',
				isAnswerDialogVisible:false,
				isThoughtDisVisible:false,
				isCodeDisVisible:true,
				currentStudentTestDetail:{testDetail:''},
				studentTestDetail:{}

			}
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
			answer(id){
				this.currentTest = this.problems[id].contents
				var url = this.HOST + '/addStuTestDetail'
				this.currentStudentTestDetail.testDetail=id
				this.$http.post(url,this.currentStudentTestDetail).then(response=>{
					if(!response.data.answerWithAlgorithmSign){
						this.isThoughtDisVisible=true
						this.isAnswerDialogVisible=false
					}else{
						this.isThoughtDisVisible=response.data.answerWithAlgorithmSign
						this.isAnswerDialogVisible=response.data.answerWithCodeSign
					}
					this.studentTestDetail = response.data
					this.thought=response.data.answerWithAlgorithm
					this.code=response.data.answerWithCode
				})
				this.isAnswerDialogVisible=true

			},
			nextStep(){
				if(this.isThoughtDisVisible=true){
					this.$refs.msgDialog.confirm("你已提交过自然语言！")
				}else{
					this.studentTestDetail.answerWithAlgorithmSign=true
					this.studentTestDetail.answerWithCodeSign=false
					this.studentTestDetail.answerWithAlgorithm=this.thought
					var url = this.HOST + '/updateStudentTestDetail'
					this.$http.put(url,this.studentTestDetail).then(response=>{
						this.studentTestDetail=response.data
						this.thought=response.data.answerWithAlgorithm
						this.code=response.data.answerWithCode
						this.isThoughtDisVisible=response.data.answerWithAlgorithmSign
						this.isCodeDisVisible=response.data.answerWithCodeSign
					})
				}
			},
			cancel(){
				this.isAnswerDialogVisible=false
				this.thought=''
				this.code=''
			},
			saveAnswer(){
				if(this.studentTestDetail.answerWithCodeSign==true){
					this.$refs.msgDialog.confirm("你已提交试卷！")
				}else if(this.studentTestDetail.answerWithAlgorithm=false){
					this.$refs.msgDialog.confirm("请先提交自然语言！")
				}else{
					this.studentTestDetail.answerWithCodeSign=true
					this.studentTestDetail.answerWithCode=this.code
					var url = this.HOST + '/updateStudentTestDetail'
					this.$http.put(url,this.studentTestDetail).then(response=>{
						this.$refs.msgDialog.notigy("答卷完成")
						this.isAnswerDialogVisible=false
					})
				}
			}
		}
	}
</script>