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
				<el-button type="primary" @click="answer(problems[0].contents,problems[0].id)">作答题目一</el-button>
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
				<el-button type="primary" @click="answer(problems[1].contents,problems[1].id)">作答题目二</el-button>
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
				<el-button type="primary" @click="answer(problems[2].contents,problems[2].id)">作答题目三</el-button>
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
		    <el-button type="primary" @click="nextStep">下一步</el-button>
		    <el-button type="primary" @click="saveAnswer">确 定</el-button>
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
				currentTestId:'',
				currentTest:'',
				isAnswerDialogVisible:false,
				isThoughtDisVisible:false,
				isCodeDisVisible:true

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
			answer(content,id){
				this.currentTest=content
				this.currentTestId=id
				this.isAnswerDialogVisible=true
			},
			nextStep(){
				this.isThoughtDisVisible=true
				this.isCodeDisVisible=false
			},
			cancel(){
				this.isAnswerDialogVisible=false
				this.thought=''
				this.code=''
			},
			saveAnswer(){}
		}
	}
</script>