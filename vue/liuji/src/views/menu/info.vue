<template>
	<div class="container">
		<div class="appraisers">
			<div style="color: #000;font-weight: bold;font-size: 25px;">机构</div>
			<div class="appraisers_title">
				<!-- <div class="item_Add">
					<el-button type="primary">添加人员<i class="el-icon-upload el-icon--right"></i></el-button>
				</div>-->
				<div class="item_input">
					<el-form label-width="120px">
						<el-form-item label="按机构名称查询">
							<el-input placeholder="机构名称"></el-input>
						</el-form-item>
					</el-form>
				</div>
				<div class="item_input" style="margin:0 20px">
					<el-button type="primary">新增</el-button>
					<el-button type="primary">删除</el-button>
					<el-button type="primary">修改</el-button>
				</div>
			</div>
		</div>
		<div class="item">
			<div class="item_table">
				<el-table :data="tableData" style="width: 100%;background-color: #fff !important;" height="670px">
					<el-table-column prop="date" align="center" label="机构名称"></el-table-column>
					<el-table-column prop="name" align="center" label="机构类别"></el-table-column>
				</el-table>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		components: {},
		data() {
			const item = {
				date: '研发部门',
				name: '部门',
			};
			return {
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				tableData: Array(20).fill(item),
			}
		},
	}
</script>

<style scoped lang="scss">
	.top {
		background-color: #fff;
		text-align: left;
	}

	.el-button--primary {
		background-color: #3E84E9 !important;
		border: #3E84E9 !important;
	}

	.el-button {
		padding: 10px 15px !important;
		font-size: 12px !important;
		border-radius: 1px !important;
	}

	.container {
		max-width: 1680px;
		min-width: 1080px;
		padding: 10px;
		background-color: rgb(245, 245, 245);
		.appraisers {
			color: #fff;
			text-align: left;

			.appraisers_title {
				height: 70px;
				margin-top: 10px;

				.item_Add {
					display: inline-block;
					padding: 10px 20px;
				}

				.item_dataTime {
					display: inline-block;
					padding: 10px 20px;
				}

				.item_input {
					display: inline-block;
					padding: 10px 0;
				}
			}

			.item_table {
				width: 100%;

				.assess_style {
					width: 180px;
					overflow: hidden;
					white-space: normal nowrap;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}

		.item_ul {
			li {
				width: 60px;
				height: 30px;
				line-height: 30px;
				text-align: center;
				background-color: #eee;
				border-radius: 4px;
				float: left;
				margin: 5px 15px;
				cursor: pointer;
			}

			.bgcolor {
				color: #fff;
				background-color: #3e84e9;
			}
		}

		.block {
			text-align: right;
		}

		.item {
			background-color: #fff;
			color: #000;
			padding: 20px;
		}

		/* 预警等级 */
		.warnTwo {
			color: #e6a23c;
			cursor: pointer;
		}

		.warnOne {
			color: #409eff;
			cursor: pointer;
		}

		.warnThree {
			color: #f56c6c;
			cursor: pointer;
		}

		.el-table,
		.el-table__expanded-cell {
			background-color: rgba(33, 42, 85, 1) !important;
			border: none;
		}

		.el-table__body {
			padding: 30px;
		}

		.el-table th,
		.el-table tr {
			background-color: rgba(33, 42, 85, 1) !important;
			border: none;
		}

		.el-table::before {
			height: 0;
		}

		// 分页
	}
</style>
