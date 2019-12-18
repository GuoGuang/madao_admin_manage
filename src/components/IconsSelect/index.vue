<template>
  <div>
    <!-- v-if="errorLogs.length>0" -->

    <el-row class="icons-container">
      <el-col :span="24">
        <div class="grid-content bg-purple-light">
          <el-form-item label="图标：" prop="icon">
            <div class="icons-wrapper" style="border: 1px solid #eaeefb;">
              <!-- <i
                v-for="item of aaa"
                :class="item"
                :key="item"
                style="font-size: 32px;padding: 12px; border-right: 1px solid #eee;
                            border-bottom: 1px solid #eee;"
                @click="handleCheck(item,$event)"/> -->

              <div class="content font-class">
                <ul class="icon_lists dib-box">
                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anquanhegui" />
                    <div class="name">
                      安全合规
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anquanhegui
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anquanduixiang" />
                    <div class="name">
                      安全对象
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anquanduixiang
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-IPshijiantongji" />
                    <div class="name">
                      IP事件统计
                    </div>
                    <div class="code-name">
                      .el-icon-cust-IPshijiantongji
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anquangoujianku" />
                    <div class="name">
                      安全构件库
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anquangoujianku
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anquanlianghua" />
                    <div class="name">
                      安全量化
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anquanlianghua
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anquantongji" />
                    <div class="name">
                      安全统计
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anquantongji
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anIPtongji" />
                    <div class="name">
                      按IP统计
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anIPtongji
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anfengxiantongji" />
                    <div class="name">
                      按风险统计
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anfengxiantongji
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anshijiantongji" />
                    <div class="name">
                      按时间统计
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anshijiantongji
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anyewutongji" />
                    <div class="name">
                      按业务统计
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anyewutongji
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anzhanghaotongji" />
                    <div class="name">
                      按账号统计
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anzhanghaotongji
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-baimingdancelveweihu" />
                    <div class="name">
                      白名单策略维护
                    </div>
                    <div class="code-name">
                      .el-icon-cust-baimingdancelveweihu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-baosongshebeishijianliangtongji" />
                    <div class="name">
                      报送设备时间量统计
                    </div>
                    <div class="code-name">
                      .el-icon-cust-baosongshebeishijianliangtongji
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-baimingdanguanli" />
                    <div class="name">
                      白名单管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-baimingdanguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-baosongshebeiyuanshijiantongji" />
                    <div class="name">
                      报送设备源事件统计
                    </div>
                    <div class="code-name">
                      .el-icon-cust-baosongshebeiyuanshijiantongji
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-budingxinxi" />
                    <div class="name">
                      补丁信息
                    </div>
                    <div class="code-name">
                      .el-icon-cust-budingxinxi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-caijipeizhi" />
                    <div class="name">
                      采集配置
                    </div>
                    <div class="code-name">
                      .el-icon-cust-caijipeizhi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-chaxun" />
                    <div class="name">
                      查询
                    </div>
                    <div class="code-name">
                      .el-icon-cust-chaxun
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-chakan" />
                    <div class="name">
                      查看
                    </div>
                    <div class="code-name">
                      .el-icon-cust-chakan
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-daochu" />
                    <div class="name">
                      导出
                    </div>
                    <div class="code-name">
                      .el-icon-cust-daochu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-daoru" />
                    <div class="name">
                      导入
                    </div>
                    <div class="code-name">
                      .el-icon-cust-daoru
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-fangda" />
                    <div class="name">
                      放大
                    </div>
                    <div class="code-name">
                      .el-icon-cust-fangda
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-heguipaiming" />
                    <div class="name">
                      合规排名
                    </div>
                    <div class="code-name">
                      .el-icon-cust-heguipaiming
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-heguiqushi" />
                    <div class="name">
                      合规趋势
                    </div>
                    <div class="code-name">
                      .el-icon-cust-heguiqushi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-qiehuandaochaxunmoshi" />
                    <div class="name">
                      切换到查询模式
                    </div>
                    <div class="code-name">
                      .el-icon-cust-qiehuandaochaxunmoshi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-jixianguanli" />
                    <div class="name">
                      基线管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-jixianguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-renwucaiji" />
                    <div class="name">
                      任务采集
                    </div>
                    <div class="code-name">
                      .el-icon-cust-renwucaiji
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shujuanquan" />
                    <div class="name">
                      数据安全
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shujuanquan
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shujuku" />
                    <div class="name">
                      数据库
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shujuku
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-sanjishijian" />
                    <div class="name">
                      三级事件
                    </div>
                    <div class="code-name">
                      .el-icon-cust-sanjishijian
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-suoxiao" />
                    <div class="name">
                      缩小
                    </div>
                    <div class="code-name">
                      .el-icon-cust-suoxiao
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-tongyijiancha" />
                    <div class="name">
                      统一检查
                    </div>
                    <div class="code-name">
                      .el-icon-cust-tongyijiancha
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-xitonganquan" />
                    <div class="name">
                      系统安全
                    </div>
                    <div class="code-name">
                      .el-icon-cust-xitonganquan
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anquanjianbaotongzhiguanli" />
                    <div class="name">
                      安全简报通知管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anquanjianbaotongzhiguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-daishenpizhishi" />
                    <div class="name">
                      待审批知识
                    </div>
                    <div class="code-name">
                      .el-icon-cust-daishenpizhishi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-gongjuguanli" />
                    <div class="name">
                      工具管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-gongjuguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-dangqianhuodonggaojing" />
                    <div class="name">
                      当前活动告警
                    </div>
                    <div class="code-name">
                      .el-icon-cust-dangqianhuodonggaojing
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-fenpeishebei" />
                    <div class="name">
                      分配设备
                    </div>
                    <div class="code-name">
                      .el-icon-cust-fenpeishebei
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-dangqianhuodonggaojing_" />
                    <div class="name">
                      当前活动告警_1
                    </div>
                    <div class="code-name">
                      .el-icon-cust-dangqianhuodonggaojing_
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-guanjianziguanli" />
                    <div class="name">
                      关键字管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-guanjianziguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-wangluoanquanshebeijiankong" />
                    <div class="name">
                      网络安全设备监控
                    </div>
                    <div class="code-name">
                      .el-icon-cust-wangluoanquanshebeijiankong
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-guibingyazhiguize" />
                    <div class="name">
                      归并压制规则
                    </div>
                    <div class="code-name">
                      .el-icon-cust-guibingyazhiguize
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-guize" />
                    <div class="name">
                      规则
                    </div>
                    <div class="code-name">
                      .el-icon-cust-guize
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-guizebaobiao" />
                    <div class="name">
                      规则报表
                    </div>
                    <div class="code-name">
                      .el-icon-cust-guizebaobiao
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-guanxiashebei" />
                    <div class="name">
                      管辖设备
                    </div>
                    <div class="code-name">
                      .el-icon-cust-guanxiashebei
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-guizeguanli" />
                    <div class="name">
                      规则管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-guizeguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-guizehegexingjiancha" />
                    <div class="name">
                      规则合格性检查
                    </div>
                    <div class="code-name">
                      .el-icon-cust-guizehegexingjiancha
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-guizexiafa" />
                    <div class="name">
                      规则下发
                    </div>
                    <div class="code-name">
                      .el-icon-cust-guizexiafa
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-jihuo" />
                    <div class="name">
                      激活
                    </div>
                    <div class="code-name">
                      .el-icon-cust-jihuo
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-jiankongguizeweihu" />
                    <div class="name">
                      监控规则维护
                    </div>
                    <div class="code-name">
                      .el-icon-cust-jiankongguizeweihu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-jiamisuanfaguanli" />
                    <div class="name">
                      加密算法管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-jiamisuanfaguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-jiesuo" />
                    <div class="name">
                      解锁
                    </div>
                    <div class="code-name">
                      .el-icon-cust-jiesuo
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-kuaijiejiancha" />
                    <div class="name">
                      快捷检查
                    </div>
                    <div class="code-name">
                      .el-icon-cust-kuaijiejiancha
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-lixianjiancha" />
                    <div class="name">
                      离线检查
                    </div>
                    <div class="code-name">
                      .el-icon-cust-lixianjiancha
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-loudong" />
                    <div class="name">
                      漏洞
                    </div>
                    <div class="code-name">
                      .el-icon-cust-loudong
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-minganshujujiankongshitu" />
                    <div class="name">
                      敏感数据监控视图
                    </div>
                    <div class="code-name">
                      .el-icon-cust-minganshujujiankongshitu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-moban" />
                    <div class="name">
                      模板
                    </div>
                    <div class="code-name">
                      .el-icon-cust-moban
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-mingdanzixuexi" />
                    <div class="name">
                      名单自学习
                    </div>
                    <div class="code-name">
                      .el-icon-cust-mingdanzixuexi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-mobanguanli" />
                    <div class="name">
                      模板管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-mobanguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-pingtaizijiankong" />
                    <div class="name">
                      平台自监控
                    </div>
                    <div class="code-name">
                      .el-icon-cust-pingtaizijiankong
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shebeixinxi" />
                    <div class="name">
                      设备信息
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shebeixinxi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shijianshuxingweihu" />
                    <div class="name">
                      事件属性维护
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shijianshuxingweihu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-weichuligaojing" />
                    <div class="name">
                      未处理告警
                    </div>
                    <div class="code-name">
                      .el-icon-cust-weichuligaojing
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-xiugaimima" />
                    <div class="name">
                      修改密码
                    </div>
                    <div class="code-name">
                      .el-icon-cust-xiugaimima
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-suoding" />
                    <div class="name">
                      锁定
                    </div>
                    <div class="code-name">
                      .el-icon-cust-suoding
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-yichuligaojing" />
                    <div class="name">
                      已处理告警
                    </div>
                    <div class="code-name">
                      .el-icon-cust-yichuligaojing
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-tongji" />
                    <div class="name">
                      统计
                    </div>
                    <div class="code-name">
                      .el-icon-cust-tongji
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-yigaojing" />
                    <div class="name">
                      已告警
                    </div>
                    <div class="code-name">
                      .el-icon-cust-yigaojing
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-yiqingchugaojing" />
                    <div class="name">
                      已清除告警
                    </div>
                    <div class="code-name">
                      .el-icon-cust-yiqingchugaojing
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-zhibiaofenleibianmapeizhi" />
                    <div class="name">
                      指标分类编码配置
                    </div>
                    <div class="code-name">
                      .el-icon-cust-zhibiaofenleibianmapeizhi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-zhilingmobanguanli" />
                    <div class="name">
                      指令模板管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-zhilingmobanguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-xinjian" />
                    <div class="name">
                      新建
                    </div>
                    <div class="code-name">
                      .el-icon-cust-xinjian
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-yidong" />
                    <div class="name">
                      移动
                    </div>
                    <div class="code-name">
                      .el-icon-cust-yidong
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-yewucaozuopaimingfenxi" />
                    <div class="name">
                      业务操作排名分析
                    </div>
                    <div class="code-name">
                      .el-icon-cust-yewucaozuopaimingfenxi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-yewufenleiweihu" />
                    <div class="name">
                      业务分类维护
                    </div>
                    <div class="code-name">
                      .el-icon-cust-yewufenleiweihu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-wangluoquyuIPhuafen" />
                    <div class="name">
                      网络区域IP划分
                    </div>
                    <div class="code-name">
                      .el-icon-cust-wangluoquyuIPhuafen
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-yonghuzhuzhanghaoguanli" />
                    <div class="name">
                      用户主账号管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-yonghuzhuzhanghaoguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-zanting" />
                    <div class="name">
                      暂停
                    </div>
                    <div class="code-name">
                      .el-icon-cust-zanting
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-zhihang" />
                    <div class="name">
                      执行
                    </div>
                    <div class="code-name">
                      .el-icon-cust-zhihang
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-zhibiaoguanli" />
                    <div class="name">
                      指标管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-zhibiaoguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-zhibiaojieguo" />
                    <div class="name">
                      指标结果
                    </div>
                    <div class="code-name">
                      .el-icon-cust-zhibiaojieguo
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-zhibiaomoban" />
                    <div class="name">
                      指标模板
                    </div>
                    <div class="code-name">
                      .el-icon-cust-zhibiaomoban
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-zhibiaotongji" />
                    <div class="name">
                      指标统计
                    </div>
                    <div class="code-name">
                      .el-icon-cust-zhibiaotongji
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-zhibiaojihua" />
                    <div class="name">
                      指标计划
                    </div>
                    <div class="code-name">
                      .el-icon-cust-zhibiaojihua
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-zhongzhi" />
                    <div class="name">
                      重置
                    </div>
                    <div class="code-name">
                      .el-icon-cust-zhongzhi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-zhuzhanghaoliebiao" />
                    <div class="name">
                      主账号列表
                    </div>
                    <div class="code-name">
                      .el-icon-cust-zhuzhanghaoliebiao
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-baobiao" />
                    <div class="name">
                      报表
                    </div>
                    <div class="code-name">
                      .el-icon-cust-baobiao
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-dangqianfeibiaozhunshijian" />
                    <div class="name">
                      当前非标准事件
                    </div>
                    <div class="code-name">
                      .el-icon-cust-dangqianfeibiaozhunshijian
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-gongzuotaishouye" />
                    <div class="name">
                      工作台首页
                    </div>
                    <div class="code-name">
                      .el-icon-cust-gongzuotaishouye
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-huifu" />
                    <div class="name">
                      恢复
                    </div>
                    <div class="code-name">
                      .el-icon-cust-huifu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-jihua" />
                    <div class="name">
                      计划
                    </div>
                    <div class="code-name">
                      .el-icon-cust-jihua
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-mubiaoIPshijianliangtongji" />
                    <div class="name">
                      目标IP时间量统计
                    </div>
                    <div class="code-name">
                      .el-icon-cust-mubiaoIPshijianliangtongji
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-ri" />
                    <div class="name">
                      日
                    </div>
                    <div class="code-name">
                      .el-icon-cust-ri
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-renyuanzuguanli" />
                    <div class="name">
                      人员组管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-renyuanzuguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-minganshujufenjiguanli" />
                    <div class="name">
                      敏感数据分级管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-minganshujufenjiguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-saomiaobingfenxi" />
                    <div class="name">
                      扫描并分析
                    </div>
                    <div class="code-name">
                      .el-icon-cust-saomiaobingfenxi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shanchu" />
                    <div class="name">
                      删除
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shanchu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shengjibiaozhuntongjipaiming" />
                    <div class="name">
                      省级标准统计排名
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shengjibiaozhuntongjipaiming
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shijianjibiezhongdingyiguize" />
                    <div class="name">
                      时间级别重定义规则
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shijianjibiezhongdingyiguize
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shijiancelveweihu" />
                    <div class="name">
                      时间策略维护
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shijiancelveweihu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-tixing" />
                    <div class="name">
                      提醒
                    </div>
                    <div class="code-name">
                      .el-icon-cust-tixing
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-tingzhi" />
                    <div class="name">
                      停止
                    </div>
                    <div class="code-name">
                      .el-icon-cust-tingzhi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shouquanguanli" />
                    <div class="name">
                      授权管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shouquanguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shengchengbaobiao" />
                    <div class="name">
                      生成报表
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shengchengbaobiao
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shoucangku" />
                    <div class="name">
                      收藏库
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shoucangku
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-wancheng" />
                    <div class="name">
                      完成
                    </div>
                    <div class="code-name">
                      .el-icon-cust-wancheng
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-tuichu" />
                    <div class="name">
                      退出
                    </div>
                    <div class="code-name">
                      .el-icon-cust-tuichu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shujujiguanli" />
                    <div class="name">
                      数据集管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shujujiguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-weizhixinxiweihu" />
                    <div class="name">
                      位置信息维护
                    </div>
                    <div class="code-name">
                      .el-icon-cust-weizhixinxiweihu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-xiazai" />
                    <div class="name">
                      下载
                    </div>
                    <div class="code-name">
                      .el-icon-cust-xiazai
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-xinxicaiji" />
                    <div class="name">
                      信息采集
                    </div>
                    <div class="code-name">
                      .el-icon-cust-xinxicaiji
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-xitonganquanheguibaobiao" />
                    <div class="name">
                      系统安全合规报表
                    </div>
                    <div class="code-name">
                      .el-icon-cust-xitonganquanheguibaobiao
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-yewucaozuorizhi" />
                    <div class="name">
                      业务操作日志
                    </div>
                    <div class="code-name">
                      .el-icon-cust-yewucaozuorizhi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-zhishikuguanli" />
                    <div class="name">
                      知识库管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-zhishikuguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-ziyuanjiaoseguanli" />
                    <div class="name">
                      资源角色管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-ziyuanjiaoseguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-zuoyebaobiao" />
                    <div class="name">
                      作业报表
                    </div>
                    <div class="code-name">
                      .el-icon-cust-zuoyebaobiao
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-baobiaoguanli" />
                    <div class="name">
                      报表管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-baobiaoguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-zichanxinxibuquancelve" />
                    <div class="name">
                      资产信息补全策略
                    </div>
                    <div class="code-name">
                      .el-icon-cust-zichanxinxibuquancelve
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-beizhu" />
                    <div class="name">
                      备注
                    </div>
                    <div class="code-name">
                      .el-icon-cust-beizhu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-celvetongjiyuzhibaobiao" />
                    <div class="name">
                      策略统计预制报表
                    </div>
                    <div class="code-name">
                      .el-icon-cust-celvetongjiyuzhibaobiao
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-chakandaorujilu" />
                    <div class="name">
                      查看导入记录
                    </div>
                    <div class="code-name">
                      .el-icon-cust-chakandaorujilu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-dangqianweizhi" />
                    <div class="name">
                      当前位置
                    </div>
                    <div class="code-name">
                      .el-icon-cust-dangqianweizhi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-fanghufangan" />
                    <div class="name">
                      防护方案
                    </div>
                    <div class="code-name">
                      .el-icon-cust-fanghufangan
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-fuzhi" />
                    <div class="name">
                      复制
                    </div>
                    <div class="code-name">
                      .el-icon-cust-fuzhi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-lousaojieguobaobiao" />
                    <div class="name">
                      漏扫结果报表
                    </div>
                    <div class="code-name">
                      .el-icon-cust-lousaojieguobaobiao
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-mingxi" />
                    <div class="name">
                      明细
                    </div>
                    <div class="code-name">
                      .el-icon-cust-mingxi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-jiansuo" />
                    <div class="name">
                      检索
                    </div>
                    <div class="code-name">
                      .el-icon-cust-jiansuo
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-peizhihechajieguobaobiao" />
                    <div class="name">
                      配置核查结果报表
                    </div>
                    <div class="code-name">
                      .el-icon-cust-peizhihechajieguobaobiao
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-qiehuandaobianjimoshi" />
                    <div class="name">
                      切换到编辑模式
                    </div>
                    <div class="code-name">
                      .el-icon-cust-qiehuandaobianjimoshi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-renzhengguanli" />
                    <div class="name">
                      认证管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-renzhengguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shezhipingfenfangan" />
                    <div class="name">
                      设置评分方案
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shezhipingfenfangan
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-quanxianziyuan" />
                    <div class="name">
                      权限资源
                    </div>
                    <div class="code-name">
                      .el-icon-cust-quanxianziyuan
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-zichan" />
                    <div class="name">
                      资产
                    </div>
                    <div class="code-name">
                      .el-icon-cust-zichan
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-ziyuanfenleiguanli" />
                    <div class="name">
                      资源分类管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-ziyuanfenleiguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-yue" />
                    <div class="name">
                      月
                    </div>
                    <div class="code-name">
                      .el-icon-cust-yue
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-zhou" />
                    <div class="name">
                      周
                    </div>
                    <div class="code-name">
                      .el-icon-cust-zhou
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-zhongduananquan" />
                    <div class="name">
                      终端安全
                    </div>
                    <div class="code-name">
                      .el-icon-cust-zhongduananquan
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-zichanliebiao" />
                    <div class="name">
                      资产列表
                    </div>
                    <div class="code-name">
                      .el-icon-cust-zichanliebiao
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-ziyuanguanli" />
                    <div class="name">
                      资源管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-ziyuanguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-ziyuanzuguanli" />
                    <div class="name">
                      资源组管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-ziyuanzuguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-zidianpeizhi" />
                    <div class="name">
                      字典配置
                    </div>
                    <div class="code-name">
                      .el-icon-cust-zidianpeizhi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-zuihouyiye" />
                    <div class="name">
                      最后一页
                    </div>
                    <div class="code-name">
                      .el-icon-cust-zuihouyiye
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-zuzhijigou" />
                    <div class="name">
                      组织机构
                    </div>
                    <div class="code-name">
                      .el-icon-cust-zuzhijigou
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-xitongguanli" />
                    <div class="name">
                      系统管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-xitongguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-zuoyerili" />
                    <div class="name">
                      作业日历
                    </div>
                    <div class="code-name">
                      .el-icon-cust-zuoyerili
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-excelwenjian" />
                    <div class="name">
                      excel文件
                    </div>
                    <div class="code-name">
                      .el-icon-cust-excelwenjian
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-jpgwenjian" />
                    <div class="name">
                      jpg文件
                    </div>
                    <div class="code-name">
                      .el-icon-cust-jpgwenjian
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-txtwenjian" />
                    <div class="name">
                      txt文件
                    </div>
                    <div class="code-name">
                      .el-icon-cust-txtwenjian
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-pdfwenjian" />
                    <div class="name">
                      pdf文件
                    </div>
                    <div class="code-name">
                      .el-icon-cust-pdfwenjian
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-pptwenjian" />
                    <div class="name">
                      ppt文件
                    </div>
                    <div class="code-name">
                      .el-icon-cust-pptwenjian
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-webliuliangfenxi" />
                    <div class="name">
                      web流量分析
                    </div>
                    <div class="code-name">
                      .el-icon-cust-webliuliangfenxi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-wordwenjian" />
                    <div class="name">
                      word文件
                    </div>
                    <div class="code-name">
                      .el-icon-cust-wordwenjian
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-webzichan" />
                    <div class="name">
                      web资产
                    </div>
                    <div class="code-name">
                      .el-icon-cust-webzichan
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anquancelvezhongxin" />
                    <div class="name">
                      安全策略中心
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anquancelvezhongxin
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anquanfagui" />
                    <div class="name">
                      安全法规
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anquanfagui
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anquanguanlimenhu" />
                    <div class="name">
                      安全管理门户
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anquanguanlimenhu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anquanjingyanku" />
                    <div class="name">
                      安全经验库
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anquanjingyanku
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anquanmenhu" />
                    <div class="name">
                      安全门户
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anquanmenhu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anquanshijiangaojingguize" />
                    <div class="name">
                      安全事件告警规则
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anquanshijiangaojingguize
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anquanyunyingfenxishitu" />
                    <div class="name">
                      安全运营分析视图
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anquanyunyingfenxishitu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-baocun" />
                    <div class="name">
                      保存
                    </div>
                    <div class="code-name">
                      .el-icon-cust-baocun
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-baocunbingxiayibu" />
                    <div class="name">
                      保存并下一步
                    </div>
                    <div class="code-name">
                      .el-icon-cust-baocunbingxiayibu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anquanzichan" />
                    <div class="name">
                      安全资产
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anquanzichan
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-baocunbingxinjian" />
                    <div class="name">
                      保存并新建
                    </div>
                    <div class="code-name">
                      .el-icon-cust-baocunbingxinjian
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-caozuofangwencelveweihu" />
                    <div class="name">
                      操作访问策略维护
                    </div>
                    <div class="code-name">
                      .el-icon-cust-caozuofangwencelveweihu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-celveguanli" />
                    <div class="name">
                      策略管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-celveguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-caidanshezhi" />
                    <div class="name">
                      菜单设置
                    </div>
                    <div class="code-name">
                      .el-icon-cust-caidanshezhi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-celve" />
                    <div class="name">
                      策略
                    </div>
                    <div class="code-name">
                      .el-icon-cust-celve
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-celvehecha" />
                    <div class="name">
                      策略核查
                    </div>
                    <div class="code-name">
                      .el-icon-cust-celvehecha
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-chanpincaijiguanli" />
                    <div class="name">
                      产品采集管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-chanpincaijiguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-caidan" />
                    <div class="name">
                      菜单
                    </div>
                    <div class="code-name">
                      .el-icon-cust-caidan
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-diyiye" />
                    <div class="name">
                      第一页
                    </div>
                    <div class="code-name">
                      .el-icon-cust-diyiye
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-celvezhihangpeizhi" />
                    <div class="name">
                      策略执行配置
                    </div>
                    <div class="code-name">
                      .el-icon-cust-celvezhihangpeizhi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-duibi" />
                    <div class="name">
                      对比
                    </div>
                    <div class="code-name">
                      .el-icon-cust-duibi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-fasong" />
                    <div class="name">
                      发送
                    </div>
                    <div class="code-name">
                      .el-icon-cust-fasong
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-fasongyoujian" />
                    <div class="name">
                      发送邮件
                    </div>
                    <div class="code-name">
                      .el-icon-cust-fasongyoujian
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-fanghuoqiang" />
                    <div class="name">
                      防火墙
                    </div>
                    <div class="code-name">
                      .el-icon-cust-fanghuoqiang
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-fanghuoqiangcelvebiangeng" />
                    <div class="name">
                      防火墙策略变更
                    </div>
                    <div class="code-name">
                      .el-icon-cust-fanghuoqiangcelvebiangeng
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-fanghuoqiangliebiao" />
                    <div class="name">
                      防火墙列表
                    </div>
                    <div class="code-name">
                      .el-icon-cust-fanghuoqiangliebiao
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-fangwenkongzhicelve" />
                    <div class="name">
                      访问控制策略
                    </div>
                    <div class="code-name">
                      .el-icon-cust-fangwenkongzhicelve
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-genzong" />
                    <div class="name">
                      跟踪
                    </div>
                    <div class="code-name">
                      .el-icon-cust-genzong
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-gengduo" />
                    <div class="name">
                      更多
                    </div>
                    <div class="code-name">
                      .el-icon-cust-gengduo
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-guanbi" />
                    <div class="name">
                      关闭
                    </div>
                    <div class="code-name">
                      .el-icon-cust-guanbi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-guifanguanli" />
                    <div class="name">
                      规范管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-guifanguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-guochengguanli" />
                    <div class="name">
                      过程管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-guochengguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-hegui" />
                    <div class="name">
                      合规
                    </div>
                    <div class="code-name">
                      .el-icon-cust-hegui
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-heguiguanli" />
                    <div class="name">
                      合规管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-heguiguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-jichuanquancelve" />
                    <div class="name">
                      基础安全策略
                    </div>
                    <div class="code-name">
                      .el-icon-cust-jichuanquancelve
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-jichushijianfenlei" />
                    <div class="name">
                      基础事件分类
                    </div>
                    <div class="code-name">
                      .el-icon-cust-jichushijianfenlei
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-jiankong" />
                    <div class="name">
                      监控
                    </div>
                    <div class="code-name">
                      .el-icon-cust-jiankong
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-jiankonggaojingweihu" />
                    <div class="name">
                      监控告警维护
                    </div>
                    <div class="code-name">
                      .el-icon-cust-jiankonggaojingweihu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-jiaoseguanli" />
                    <div class="name">
                      角色管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-jiaoseguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-jintian" />
                    <div class="name">
                      今天
                    </div>
                    <div class="code-name">
                      .el-icon-cust-jintian
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-jinggao" />
                    <div class="name">
                      警告
                    </div>
                    <div class="code-name">
                      .el-icon-cust-jinggao
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-liuliangguanli" />
                    <div class="name">
                      流量管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-liuliangguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-kaishijiankongqiehuan" />
                    <div class="name">
                      开始监控切换
                    </div>
                    <div class="code-name">
                      .el-icon-cust-kaishijiankongqiehuan
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-lousaokaiguan" />
                    <div class="name">
                      漏扫开关
                    </div>
                    <div class="code-name">
                      .el-icon-cust-lousaokaiguan
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-peizhi" />
                    <div class="name">
                      配置
                    </div>
                    <div class="code-name">
                      .el-icon-cust-peizhi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-qiehuandaojiankongmoshi" />
                    <div class="name">
                      切换到监控模式
                    </div>
                    <div class="code-name">
                      .el-icon-cust-qiehuandaojiankongmoshi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-peizhiguanli" />
                    <div class="name">
                      配置管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-peizhiguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-qingkong" />
                    <div class="name">
                      清空
                    </div>
                    <div class="code-name">
                      .el-icon-cust-qingkong
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-quanxianshezhi" />
                    <div class="name">
                      权限设置
                    </div>
                    <div class="code-name">
                      .el-icon-cust-quanxianshezhi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-queding" />
                    <div class="name">
                      确定
                    </div>
                    <div class="code-name">
                      .el-icon-cust-queding
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-riqixuanze" />
                    <div class="name">
                      日期选择
                    </div>
                    <div class="code-name">
                      .el-icon-cust-riqixuanze
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-ruokoulingguizeguanli" />
                    <div class="name">
                      弱口令规则管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-ruokoulingguizeguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shangyiye" />
                    <div class="name">
                      上一页
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shangyiye
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-sheweimoren" />
                    <div class="name">
                      设为默认
                    </div>
                    <div class="code-name">
                      .el-icon-cust-sheweimoren
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shezhi" />
                    <div class="name">
                      设置
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shezhi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shijianbiaozhunhuaguize" />
                    <div class="name">
                      事件标准化规则
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shijianbiaozhunhuaguize
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shijianchuliliangtongji" />
                    <div class="name">
                      事件处理量统计
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shijianchuliliangtongji
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shijianguoduguize" />
                    <div class="name">
                      事件过渡规则
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shijianguoduguize
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shujubiaoweihu" />
                    <div class="name">
                      数据表维护
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shujubiaoweihu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shuaxin" />
                    <div class="name">
                      刷新
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shuaxin
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shenjiguanli" />
                    <div class="name">
                      审计管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shenjiguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shouye" />
                    <div class="name">
                      首页
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shouye
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-tanzhenguanli" />
                    <div class="name">
                      探针管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-tanzhenguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-tianjia" />
                    <div class="name">
                      添加
                    </div>
                    <div class="code-name">
                      .el-icon-cust-tianjia
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-tianjiafujian" />
                    <div class="name">
                      添加附件
                    </div>
                    <div class="code-name">
                      .el-icon-cust-tianjiafujian
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-tiaodujiancha" />
                    <div class="name">
                      调度检查
                    </div>
                    <div class="code-name">
                      .el-icon-cust-tiaodujiancha
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-tongjiliebiao" />
                    <div class="name">
                      统计列表
                    </div>
                    <div class="code-name">
                      .el-icon-cust-tongjiliebiao
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-tubiaoliebiao" />
                    <div class="name">
                      图标列表
                    </div>
                    <div class="code-name">
                      .el-icon-cust-tubiaoliebiao
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-xiayiye" />
                    <div class="name">
                      下一页
                    </div>
                    <div class="code-name">
                      .el-icon-cust-xiayiye
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-xinjianlichengbei" />
                    <div class="name">
                      新建里程碑
                    </div>
                    <div class="code-name">
                      .el-icon-cust-xinjianlichengbei
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-xuanzeshebei" />
                    <div class="name">
                      选择设备
                    </div>
                    <div class="code-name">
                      .el-icon-cust-xuanzeshebei
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-yewucaozuoyingshe" />
                    <div class="name">
                      业务操作映射
                    </div>
                    <div class="code-name">
                      .el-icon-cust-yewucaozuoyingshe
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-yewucaozuoyingshefenxi" />
                    <div class="name">
                      业务操作映射分析
                    </div>
                    <div class="code-name">
                      .el-icon-cust-yewucaozuoyingshefenxi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-yewutongjifenxiguize" />
                    <div class="name">
                      业务统计分析规则
                    </div>
                    <div class="code-name">
                      .el-icon-cust-yewutongjifenxiguize
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-yewutongjijieguoguize" />
                    <div class="name">
                      业务统计结果规则
                    </div>
                    <div class="code-name">
                      .el-icon-cust-yewutongjijieguoguize
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-yichuligongdanshu" />
                    <div class="name">
                      已处理工单数
                    </div>
                    <div class="code-name">
                      .el-icon-cust-yichuligongdanshu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-yuanshirizhisousuo" />
                    <div class="name">
                      原始日志搜索
                    </div>
                    <div class="code-name">
                      .el-icon-cust-yuanshirizhisousuo
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-yiguanbigongdanshu" />
                    <div class="name">
                      已关闭工单数
                    </div>
                    <div class="code-name">
                      .el-icon-cust-yiguanbigongdanshu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-xujiayuandizhihecha" />
                    <div class="name">
                      虚假源地址核查
                    </div>
                    <div class="code-name">
                      .el-icon-cust-xujiayuandizhihecha
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-yingyonganquan" />
                    <div class="name">
                      应用安全
                    </div>
                    <div class="code-name">
                      .el-icon-cust-yingyonganquan
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-pptwenjian1" />
                    <div class="name">
                      ppt文件
                    </div>
                    <div class="code-name">
                      .el-icon-cust-pptwenjian1
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anquanhegui1" />
                    <div class="name">
                      安全合规
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anquanhegui1
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-yipaifagongdanshu" />
                    <div class="name">
                      已派发工单数
                    </div>
                    <div class="code-name">
                      .el-icon-cust-yipaifagongdanshu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anquanyuguanli" />
                    <div class="name">
                      安全域管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anquanyuguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-zuoyejihuafenlei" />
                    <div class="name">
                      作业计划分类
                    </div>
                    <div class="code-name">
                      .el-icon-cust-zuoyejihuafenlei
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-jpgwenjian1" />
                    <div class="name">
                      jpg文件
                    </div>
                    <div class="code-name">
                      .el-icon-cust-jpgwenjian1
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anquanzuoye" />
                    <div class="name">
                      安全作业
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anquanzuoye
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-denglurizhi" />
                    <div class="name">
                      登录日志
                    </div>
                    <div class="code-name">
                      .el-icon-cust-denglurizhi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-dingzhigaojingtongji" />
                    <div class="name">
                      定制告警统计
                    </div>
                    <div class="code-name">
                      .el-icon-cust-dingzhigaojingtongji
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anquanzuoyexinjian" />
                    <div class="name">
                      安全作业新建
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anquanzuoyexinjian
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-anquanzuoyeguanli" />
                    <div class="name">
                      安全作业管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-anquanzuoyeguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-gaojingbumenguize" />
                    <div class="name">
                      告警部门规则
                    </div>
                    <div class="code-name">
                      .el-icon-cust-gaojingbumenguize
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-gaojingguibingguize" />
                    <div class="name">
                      告警归并规则
                    </div>
                    <div class="code-name">
                      .el-icon-cust-gaojingguibingguize
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-gaojinggongliupaifa" />
                    <div class="name">
                      告警工流派发
                    </div>
                    <div class="code-name">
                      .el-icon-cust-gaojinggongliupaifa
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-gaojingqingchuguize" />
                    <div class="name">
                      告警清除规则
                    </div>
                    <div class="code-name">
                      .el-icon-cust-gaojingqingchuguize
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-gaojingtongzhiguize" />
                    <div class="name">
                      告警通知规则
                    </div>
                    <div class="code-name">
                      .el-icon-cust-gaojingtongzhiguize
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-gerengaojinggongdanguanli" />
                    <div class="name">
                      个人告警工单管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-gerengaojinggongdanguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-gerengongzuojihua" />
                    <div class="name">
                      个人工作计划
                    </div>
                    <div class="code-name">
                      .el-icon-cust-gerengongzuojihua
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-jiaobenguanli" />
                    <div class="name">
                      脚本管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-jiaobenguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-kexinjisuanguize" />
                    <div class="name">
                      可信计算规则
                    </div>
                    <div class="code-name">
                      .el-icon-cust-kexinjisuanguize
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-hecharenwuxiangqingliebiao" />
                    <div class="name">
                      核查任务详情列表
                    </div>
                    <div class="code-name">
                      .el-icon-cust-hecharenwuxiangqingliebiao
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-gongdanzongchulishuai" />
                    <div class="name">
                      工单总处理率
                    </div>
                    <div class="code-name">
                      .el-icon-cust-gongdanzongchulishuai
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-mingdanshujuguanli" />
                    <div class="name">
                      名单数据管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-mingdanshujuguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-renwuguanli" />
                    <div class="name">
                      任务管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-renwuguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-rizhishaixuanguize" />
                    <div class="name">
                      日志筛选规则
                    </div>
                    <div class="code-name">
                      .el-icon-cust-rizhishaixuanguize
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-ruokoulinghecha" />
                    <div class="name">
                      弱口令核查
                    </div>
                    <div class="code-name">
                      .el-icon-cust-ruokoulinghecha
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shoucanggaojing" />
                    <div class="name">
                      收藏告警
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shoucanggaojing
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shijianzhujizhongdingyiguize" />
                    <div class="name">
                      事件主机重定义规则
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shijianzhujizhongdingyiguize
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shouceguanli" />
                    <div class="name">
                      手册管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shouceguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shujuzichanshitu" />
                    <div class="name">
                      数据资产视图
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shujuzichanshitu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shujuzichanfaxianrenwu" />
                    <div class="name">
                      数据资产发现任务
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shujuzichanfaxianrenwu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-shujuzichanxinxiguanli" />
                    <div class="name">
                      数据资产信息管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-shujuzichanxinxiguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-wangluoanquanguanli" />
                    <div class="name">
                      网络安全管理
                    </div>
                    <div class="code-name">
                      .el-icon-cust-wangluoanquanguanli
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-wangluotiaodushitu" />
                    <div class="name">
                      网络调度视图
                    </div>
                    <div class="code-name">
                      .el-icon-cust-wangluotiaodushitu
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-xitongrizhi" />
                    <div class="name">
                      系统日志
                    </div>
                    <div class="code-name">
                      .el-icon-cust-xitongrizhi
                    </div>
                  </li>

                  <li class="dib">
                    <span class="icon iconfont el-icon-cust-xiugai" />
                    <div class="name">
                      修改
                    </div>
                    <div class="code-name">
                      .el-icon-cust-xiugai
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </el-form-item>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'IconsSelect',
  data() {
    return {

    }
  },
  computed: {

  }
}
</script>

<style scoped>

.icon_lists li {
  list-style:none;
  font-size: 32px;
  padding: 12px;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.code-name {
  display: none
}
.name {
  display: none
}

/* Logo 字体 */
@font-face {
  font-family: "iconfont logo";
  src: url('https://at.alicdn.com/t/font_985780_km7mi63cihi.eot?t=1545807318834');
  src: url('https://at.alicdn.com/t/font_985780_km7mi63cihi.eot?t=1545807318834#iefix') format('embedded-opentype'),
    url('https://at.alicdn.com/t/font_985780_km7mi63cihi.woff?t=1545807318834') format('woff'),
    url('https://at.alicdn.com/t/font_985780_km7mi63cihi.ttf?t=1545807318834') format('truetype'),
    url('https://at.alicdn.com/t/font_985780_km7mi63cihi.svg?t=1545807318834#iconfont') format('svg');
}

.logo {
  font-family: "iconfont logo";
  font-size: 160px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* tabs */
.nav-tabs {
  position: relative;
}

.nav-tabs .nav-more {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 42px;
  line-height: 42px;
  color: #666;
}

#tabs {
  border-bottom: 1px solid #eee;
}

#tabs li {
  cursor: pointer;
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  border-bottom: 2px solid transparent;
  position: relative;
  z-index: 1;
  margin-bottom: -1px;
  color: #666;
}

#tabs .active {
  border-bottom-color: #f00;
  color: #222;
}

.tab-container .content {
  display: none;
}

/* 页面布局 */
.main {
  padding: 30px 100px;
  width: 960px;
  margin: 0 auto;
}

.main .logo {
  color: #333;
  text-align: left;
  margin-bottom: 30px;
  line-height: 1;
  height: 110px;
  margin-top: -50px;
  overflow: hidden;
  *zoom: 1;
}

.main .logo a {
  font-size: 160px;
  color: #333;
}

.helps {
  margin-top: 40px;
}

.helps pre {
  padding: 20px;
  margin: 10px 0;
  border: solid 1px #e7e1cd;
  background-color: #fffdef;
  overflow: auto;
}

.icon_lists {
  width: 100% !important;
  overflow: hidden;
  *zoom: 1;
}

.icon_lists li {
  width: 100px;
  margin-bottom: 10px;
  margin-right: 20px;
  text-align: center;
  list-style: none !important;
  cursor: default;
}

.icon_lists li .code-name {
  line-height: 1.2;
}

.icon_lists .icon {
  display: block;
  height: 100px;
  line-height: 100px;
  font-size: 42px;
  margin: 10px auto;
  color: #333;
  -webkit-transition: font-size 0.25s linear, width 0.25s linear;
  -moz-transition: font-size 0.25s linear, width 0.25s linear;
  transition: font-size 0.25s linear, width 0.25s linear;
}

.icon_lists .icon:hover {
  font-size: 100px;
}

.icon_lists .svg-icon {
  /* 通过设置 font-size 来改变图标大小 */
  width: 1em;
  /* 图标和文字相邻时，垂直对齐 */
  vertical-align: -0.15em;
  /* 通过设置 color 来改变 SVG 的颜色/fill */
  fill: currentColor;
  /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
      normalize.css 中也包含这行 */
  overflow: hidden;
}

.icon_lists li .name,
.icon_lists li .code-name {
  color: #666;
}

/* markdown 样式 */
.markdown {
  color: #666;
  font-size: 14px;
  line-height: 1.8;
}

.highlight {
  line-height: 1.5;
}

.markdown img {
  vertical-align: middle;
  max-width: 100%;
}

.markdown h1 {
  color: #404040;
  font-weight: 500;
  line-height: 40px;
  margin-bottom: 24px;
}

.markdown h2,
.markdown h3,
.markdown h4,
.markdown h5,
.markdown h6 {
  color: #404040;
  margin: 1.6em 0 0.6em 0;
  font-weight: 500;
  clear: both;
}

.markdown h1 {
  font-size: 28px;
}

.markdown h2 {
  font-size: 22px;
}

.markdown h3 {
  font-size: 16px;
}

.markdown h4 {
  font-size: 14px;
}

.markdown h5 {
  font-size: 12px;
}

.markdown h6 {
  font-size: 12px;
}

.markdown hr {
  height: 1px;
  border: 0;
  background: #e9e9e9;
  margin: 16px 0;
  clear: both;
}

.markdown p {
  margin: 1em 0;
}

.markdown>p,
.markdown>blockquote,
.markdown>.highlight,
.markdown>ol,
.markdown>ul {
  width: 80%;
}

.markdown ul>li {
  list-style: circle;
}

.markdown>ul li,
.markdown blockquote ul>li {
  margin-left: 20px;
  padding-left: 4px;
}

.markdown>ul li p,
.markdown>ol li p {
  margin: 0.6em 0;
}

.markdown ol>li {
  list-style: decimal;
}

.markdown>ol li,
.markdown blockquote ol>li {
  margin-left: 20px;
  padding-left: 4px;
}

.markdown code {
  margin: 0 3px;
  padding: 0 5px;
  background: #eee;
  border-radius: 3px;
}

.markdown strong,
.markdown b {
  font-weight: 600;
}

.markdown>table {
  border-collapse: collapse;
  border-spacing: 0px;
  empty-cells: show;
  border: 1px solid #e9e9e9;
  width: 95%;
  margin-bottom: 24px;
}

.markdown>table th {
  white-space: nowrap;
  color: #333;
  font-weight: 600;
}

.markdown>table th,
.markdown>table td {
  border: 1px solid #e9e9e9;
  padding: 8px 16px;
  text-align: left;
}

.markdown>table th {
  background: #F7F7F7;
}

.markdown blockquote {
  font-size: 90%;
  color: #999;
  border-left: 4px solid #e9e9e9;
  padding-left: 0.8em;
  margin: 1em 0;
}

.markdown blockquote p {
  margin: 0;
}

.markdown .anchor {
  opacity: 0;
  transition: opacity 0.3s ease;
  margin-left: 8px;
}

.markdown .waiting {
  color: #ccc;
}

.markdown h1:hover .anchor,
.markdown h2:hover .anchor,
.markdown h3:hover .anchor,
.markdown h4:hover .anchor,
.markdown h5:hover .anchor,
.markdown h6:hover .anchor {
  opacity: 1;
  display: inline-block;
}

.markdown>br,
.markdown>p>br {
  clear: both;
}

.hljs {
  display: block;
  background: white;
  padding: 0.5em;
  color: #333333;
  overflow-x: auto;
}

.hljs-comment,
.hljs-meta {
  color: #969896;
}

.hljs-string,
.hljs-variable,
.hljs-template-variable,
.hljs-strong,
.hljs-emphasis,
.hljs-quote {
  color: #df5000;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-type {
  color: #a71d5d;
}

.hljs-literal,
.hljs-symbol,
.hljs-bullet,
.hljs-attribute {
  color: #0086b3;
}

.hljs-section,
.hljs-name {
  color: #63a35c;
}

.hljs-tag {
  color: #333333;
}

.hljs-title,
.hljs-attr,
.hljs-selector-id,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo {
  color: #795da3;
}

.hljs-addition {
  color: #55a532;
  background-color: #eaffea;
}

.hljs-deletion {
  color: #bd2c00;
  background-color: #ffecec;
}

.hljs-link {
  text-decoration: underline;
}

/* 代码高亮 */
/* PrismJS 1.15.0
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript */
/**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
 */
code[class*="language-"],
pre[class*="language-"] {
  color: black;
  background: none;
  text-shadow: 0 1px white;
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;

  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

pre[class*="language-"]::-moz-selection,
pre[class*="language-"] ::-moz-selection,
code[class*="language-"]::-moz-selection,
code[class*="language-"] ::-moz-selection {
  text-shadow: none;
  background: #b3d4fc;
}

pre[class*="language-"]::selection,
pre[class*="language-"] ::selection,
code[class*="language-"]::selection,
code[class*="language-"] ::selection {
  text-shadow: none;
  background: #b3d4fc;
}

@media print {

  code[class*="language-"],
  pre[class*="language-"] {
    text-shadow: none;
  }
}

/* Code blocks */
pre[class*="language-"] {
  padding: 1em;
  margin: .5em 0;
  overflow: auto;
}

:not(pre)>code[class*="language-"],
pre[class*="language-"] {
  background: #f5f2f0;
}

/* Inline code */
:not(pre)>code[class*="language-"] {
  padding: .1em;
  border-radius: .3em;
  white-space: normal;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: slategray;
}

.token.punctuation {
  color: #999;
}

.namespace {
  opacity: .7;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
  color: #905;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
  color: #690;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  color: #9a6e3a;
  background: hsla(0, 0%, 100%, .5);
}

.token.atrule,
.token.attr-value,
.token.keyword {
  color: #07a;
}

.token.function,
.token.class-name {
  color: #DD4A68;
}

.token.regex,
.token.important,
.token.variable {
  color: #e90;
}

.token.important,
.token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

</style>
