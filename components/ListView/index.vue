<!--
   User: liuyin
   Date: 2019/12/13 10:18 上午
   Description:列表页面组件
 -->
<template>
  <article>
    <!-----------------------------------顶部搜索-------------------------------------->
    <section class="search-area container">
      <!--条件选择区域-->
      <div :style="{width:getContentWidth()}">
        <el-form class="search-area-left" label-width="70px" label-position="left" @submit.native.prevent>
          <div v-for="(item,index) of searchForm" :key="index" class="search-item-parent">
            <transition name="condition">
              <div v-show="item.isVisibility" class="search-item-child">
                <el-form-item v-if="item.custom_widget" :label="item.name">
                  <!--自定义控件插槽-->
                  <slot
                    name="custom_widget"
                    :item="item"
                    :index="index"
                  />
                </el-form-item>
                <el-form-item v-else-if="item.type === 'date'" :label="item.name">
                  <el-date-picker
                    v-model="item.vModel"
                    :disabled="item.disabled"
                    :type="item.dateType"
                    :value-format="item.valueFormat"
                    :placeholder="item.placeholder"
                  />
                </el-form-item>
                <el-form-item v-else-if="item.type === 'select'" :label="item.name">
                  <el-select
                    v-model="item.vModel"
                    :disabled="item.disabled"
                    :placeholder="item.placeholder"
                    @change="handleSelectChange(item.vModel,item.key,arguments)"
                  >
                    <el-option
                      v-for="childItem in item.data"
                      :key="childItem.id"
                      :label="childItem.name"
                      :value="childItem.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item v-else-if="item.type === 'input'" :label="item.name">
                  <el-input
                    v-model.trim="item.vModel"
                    :placeholder="item.placeholder"
                    :disabled="item.disabled"
                    auto-complete="off"
                    @keyup.enter.native="handleSearch()"
                  />
                </el-form-item>
                <!--时间范围选择-->
                <el-form-item v-else-if="item.type === 'timeRange'" :label="item.name">
                  <el-date-picker
                    v-model="item.vModel"
                    :disabled="item.disabled"
                    :type="item.dateType"
                    :value-format="item.valueFormat"
                    :placeholder="item.placeholder"
                    @change="handleTimeChange($event,item)"
                  />
                </el-form-item>
              </div>
            </transition>
          </div>
        </el-form>
      </div>
      <!--所按钮操作区域-->
      <div class="button-area">
        <el-button type="primary" @click="handleSearch">
          查询
        </el-button>
        <el-button style="margin-left: 10px" @click="resetSearchForm()">
          清空
        </el-button>
        <span v-if="searchForm.length>SINGLE_LINE_NUM" class="search-arrow" @click="openOrClose()">
          <img
            src="../../assets/images/arrow-down.png"
            :class="[isOpen?'arrow-open':'arrow-close','arrow-normal']"
          >
        </span>
      </div>
    </section>

    <!-----------------------------------中间页面操作-------------------------------------->
    <section v-if="showOperate" class="list-operate">
      <slot name="operateArea">
        <el-button type="primary" icon="el-icon-plus" @click.prevent="handleAddClick">
          新增
        </el-button>
      </slot>
    </section>

    <!-----------------------------------数据列表-------------------------------------->
    <section class="table-content">
      <el-table
        border
        empty-text="暂无数据"
        :data="tableData"
        width="100%"
        :max-height="tableHeight"
      >
        <el-table-column label="序号" type="index" width="60" style="text-align:center" />
        <el-table-column
          v-for="(item,index) in tableLabel"
          :key="index"
          :show-overflow-tooltip="!item.noTip"
          :width="item.width"
          :min-width="item.minWidth"
          :label="item.title"
        >
          <template slot-scope="scope">
            <slot
              name="cell"
              :label="item"
              :labelIndex="index"
              :row="scope.row"
              :rowIndex="scope.$index"
            >
              <!--默认展示无样式-->
              <div :style="item.style">
                {{ scope.row[item.key] }}
              </div>
            </slot>
          </template>
        </el-table-column>
        <el-table-column v-if="showOperateColumn" label="操作" :fixed="fixed" :width="controlWidth">
          <template slot-scope="scope">
            <span v-for="(items,index) in tableButton" :key="index" class="button-block">
              <el-button
                size="mini"
                type="text"
                @click="handleTableClick(items.name,scope.row)"
              >
                {{ items.name }}
              </el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="total>10" class="pageAction">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </section>
  </article>
</template>

<script>
import tableMix from './tableMix'
import searchMix from './searchMix'
export default {
  name: 'ListView',
  mixins: [tableMix, searchMix]
}
</script>

<style lang="scss" scoped>
  /*最外层包裹上下过渡*/
  .container{
    display: flex;
    height: 80px;
    transition-property: height;
    transition-duration: 0.3s;
  }
  /*条件条目的显示隐藏过渡*/
  .condition-enter,.condition-leave-to{
    opacity: 0;
  }
  .condition-enter-active{
    transition-property: opacity;
    transition-duration: 1.2s;
  }
  .condition-leave-active{
    transition-property: opacity;
    transition-duration: 0.3s;
  }
  /*按钮操作区域*/
  .button-area{
    display: flex;
    align-items: center;
    height: 60px;
    margin-left: 30px;
    /*展开关闭箭头*/
    .search-arrow{
      border: 1px solid #D9D9D9;
      border-radius: 4px;
      background: #FFFFFF;
      margin-left: 10px;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    /*箭头正常状态*/
    .arrow-normal{
      width: 18px;
      height: 14px;
    }
    /*展开箭头过渡*/
    .arrow-open{
      transform: rotate(-180deg);
      transition: transform .3s;
    }
    /*关闭箭头过渡*/
    .arrow-close{
      transform: rotate(0deg);
      transition: transform .3s;
    }
  }
  /*左侧搜索条件区域*/
  .search-area-left{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100%;
    .search-item-child{
      width: 100%;
      box-sizing: border-box;
      padding-right: 20px;
    }
  }
  .list-operate{
    margin-left: 20px;
    margin-top: 15px;
  }
  .button-block{
    margin-left: 5px;
    margin-right: 5px;
  }
  .pageAction{
    margin-top: 10px;
    float: right;
  }
  .el-pagination{

  }
/*!*  /deep/ .el-pagination .number.active {*/
/*    border: 1px solid #409EFF !important*/
/*  }*!*/
/*  /deep/ .el-pagination .number.active {*/
/*    border: 1px solid #FF0000*/
/*  }*/
/*!*  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{*/
/*    background-color: #1890ff !important;*/
/*    border-color: #1890ff !important;*/
/*  }*/
/*  /deep/ .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{*/
/*    background: #fff;*/
/*  }*!*/

</style>
