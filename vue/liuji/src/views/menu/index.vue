<template>
	<div class="mechanism">
		<el-container>
			<el-aside width="300px">
				<el-input placeholder="输入关键字进行过滤" v-model="filterText">
				</el-input>
				<el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all :filter-node-method="filterNode"
				:expand-on-click-node="false" ref="tree2" @node-click="handleNodeClick">
					<span slot-scope="{ node, data }">
						<router-link :to="data.url">
							<div>{{data.label}}</div>
						</router-link>
					</span>
				</el-tree>
			</el-aside>
			<el-main>
				<div>
					<router-view></router-view>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	// import info from 'info.vue'
	export default {
		components: {
			// info
		},
		data() {
			return {
				data: [{
					id: 1,
					label: '一级',
					url: '/info',
					children: [{
						id: 2,
						label: '二级',
						url: '/info',
						children: [{
							id: 3,
							label: '三级',
							url: '/info',
							children: [{
								id: 4,
								label: '四级',
								url: '/info',
								children: [{
									id: 5,
									label: '五级',
									url: '/info',
									children: [{
										id: 6,
										label: '六级',
										url: '/info',
									}, {
										id: 7,
										label: '六级-1',
										url: '/info',
									}, {
										id: 8,
										label: '六级-2',
										url: '/info',
									}, ]
								}]
							}]
						}]
					}]
				}],
				filterText: '',
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				panDuan: true
			};
		},
		watch: {
			filterText(val) {
				this.$refs.tree2.filter(val);
			}
		},
		methods: {
			filterNode(value, data) {
				console.log(data)
				if (!value) return true;
				return data.label.indexOf(value) !== -1;
			},
			handleNodeClick(data) {
				this.$store.state.data = data
				this.panDuan = false
				console.log(JSON.stringify(data));
			}
		},
		created() {
			this.$store.state.data = this.data;
			// console.log(JSON.stringify(this.data))
		}
	};
</script>

<style>
	.mechanism .el-aside {
		padding: 10px 15px;
	}

	.mechanism a {
		text-decoration: none;
		color: #000;
	}

	.mechanism .el-main {
		padding: 0px !important;
		color: #333;
		text-align: center;
	}

	.mechanism>.el-container {
		margin-bottom: 40px;
	}

	.mechanism .el-container:nth-child(5) .el-aside,
	.mechanism .el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}

	.mechanism .el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}
</style>
