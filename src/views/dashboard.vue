<template>
  <Layout class="i-layout">
    <Sider ref="leftSider" hide-trigger collapsible :width="256" :collapsed-width="80" v-model="isCollapsed" class="i-layout-sider-dark i-layout-sider-fix">
      <template v-if="!isCollapsed">
        <div class="i-layout-sider-logo"><img src="../assets/images/logo_w.png"></div>
        <Menu theme="dark" accordion width="auto" :open-names="[curOpenName]" :active-name="curMenuName" @on-select="onSelectMenu">
          <Submenu :name="item.name" v-for="(item,index) in menuList" :key="index">
            <template slot="title"><Icon :type="item.icon" />{{item.name}}</template>
            <MenuItem :name="menu.name" :to="menu.path" v-for="(menu,index) in item.submenu" :key="index">{{menu.name}}</MenuItem>
          </Submenu>
        </Menu>
      </template>
      <template v-if="isCollapsed">
        <div class="i-layout-sider-logo" v-if="isCollapsed"><img src="../assets/images/logo_small.png" style="height:80%;margin-top:10px;"></div>
        <Dropdown class="i-menu" placement="right-start">
          <a href="javascript:void(0)"><Icon type="ios-paper" size="16" /></a>
          <DropdownMenu slot="list">
            <DropdownItem>主控台</DropdownItem>
            <DropdownItem>工作台</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown class="i-menu" placement="right-start">
          <a href="javascript:void(0)"><Icon type="md-contacts" size="18" /></a>
          <DropdownMenu slot="list">
            <DropdownItem>用户列表</DropdownItem>
            <DropdownItem>新增用户</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </template>
    </Sider>
    <Layout :class="rightSider">
      <Header class="i-layout-header" :class="rightHeader">
        <i class="iconfont icon-collapsed" :class="rotateIcon" @click="collapsedSider"></i>
        <i class="iconfont icon-htmal5icon23 icon-reload"></i>
        <Breadcrumb class="i-layout-header-breadcrumb">
          <BreadcrumbItem>首页</BreadcrumbItem>
          <BreadcrumbItem>{{curOpenName}}</BreadcrumbItem>
          <BreadcrumbItem>{{curMenuName}}</BreadcrumbItem>
        </Breadcrumb>
        <div class="i-layout-header-right">
          <Dropdown>
            <a href="javascript:void(0)">
              <Avatar style="color: #f56a00;background-color: #fde3cf">A</Avatar> Admin
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem>个人中心</DropdownItem>
              <DropdownItem divided>退出登录</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Header>
      <Content class="i-layout-content">
        <div class="i-layout-tabs-main">
          <div class="i-layout-tabs">
            <Tabs type="card" closable >
              <TabPane label="标签一"></TabPane>
              <TabPane label="标签二"></TabPane>
              <TabPane label="标签三"></TabPane>
              <TabPane label="标签三"></TabPane>
              <TabPane label="标签三"></TabPane>
              <TabPane label="标签三"></TabPane>
              <TabPane label="标签三"></TabPane>
              <TabPane label="标签三"></TabPane>
              <TabPane label="标签三"></TabPane>
              <TabPane label="标签三"></TabPane>
              <TabPane label="标签三"></TabPane>
              <TabPane label="标签三"></TabPane>
              <TabPane label="标签三"></TabPane>
              <TabPane label="标签三"></TabPane>
            </Tabs>
          </div>
          <div class="i-layout-tabs-close">
            <Dropdown placement="bottom-end">
              <a href="javascript:void(0)"><Icon type="ios-arrow-down"></Icon></a>
              <DropdownMenu slot="list">
                <DropdownItem><Icon type="md-arrow-back"></Icon> 关闭左侧</DropdownItem>
                <DropdownItem><Icon type="md-arrow-forward"></Icon> 关闭右侧</DropdownItem>
                <DropdownItem><Icon type="md-close"></Icon> 关闭其他</DropdownItem>
                <DropdownItem><Icon type="md-close-circle"></Icon> 关闭左侧</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div class="i-layout-content-main">
          <router-view />
        </div>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import { 
  Layout, 
  Sider, 
  Menu, 
  Submenu, 
  MenuGroup, 
  MenuItem, 
  Icon, 
  Dropdown, 
  DropdownMenu, 
  DropdownItem, 
  Breadcrumb,
  BreadcrumbItem,
  Header, 
  Avatar,
  Content,
  Tabs,
  TabPane
} from 'view-design'
Vue.component('Layout', Layout)
Vue.component('Sider', Sider)
Vue.component('Menu', Menu)
Vue.component('Submenu', Submenu)
Vue.component('MenuItem', MenuItem)
Vue.component('Icon', Icon)
Vue.component('Dropdown', Dropdown)
Vue.component('DropdownMenu', DropdownMenu)
Vue.component('DropdownItem', DropdownItem)
Vue.component('Breadcrumb', Breadcrumb)
Vue.component('BreadcrumbItem', BreadcrumbItem)
Vue.component('Header', Header)
Vue.component('Avatar', Avatar)
Vue.component('Content', Content)
Vue.component('Tabs', Tabs)
Vue.component('TabPane', TabPane)

export default {
  name: 'dashboard',
  components: {
  },
  data () {
    return {
      isCollapsed: false,
      menuList: [
        { 
          name: 'Dashboard', 
          icon: 'ios-paper',
          submenu: [ 
            {name: '主控台', path: '/dashboard/console'},
            {name: '工作台', path: '/dashboard/workplace'},
          ] 
        },        
        { 
          name: '用户管理', 
          icon: 'md-contacts',
          submenu: [ 
            {name: '用户列表', path: ''},
            {name: '新增用户', path: ''},
          ] 
        }
      ],
      curOpenName: this.$storage.getStorage('curOpenName') || 'Dashboard',
      curMenuName: this.$storage.getStorage('curMenuName') || '主控台'
    }
  },
  watch: {
    $route(newValue, oldValue) {
      console.log(newValue)
      console.log(oldValue)
      // this.setTags(newValue)
    }
  },
  computed: {
    rightSider() {
      return this.isCollapsed ? 'i-layout-inside-fix-with-sider-collapse' : 'i-layout-inside-fix-with-sider'
    },
    rotateIcon () {
      return this.isCollapsed ? 'icon-suojin-copy' : 'icon-suojin'
    },
    rightHeader () {
      return this.isCollapsed ? 'i-layout-header-fix-collapse' : 'i-layout-header-fix'
    }
  },
  methods: {
    collapsedSider () {
      this.$refs.leftSider.toggleCollapse()
    },
    onSelectMenu(name) {
      this.curMenuName = name
      this.$storage.setStorage('curMenuName', name)
      this.menuList.forEach((v,i) => {
        v.submenu.forEach((vv,ii) => {
          if(vv.name == name){
            this.curOpenName = v.name
            this.$storage.setStorage('curOpenName', v.name)
          }
        })
      })
    }
  }
}
</script>

<style >
.i-layout{height:100%;}
.i-layout-sider-dark{background:#191a23;box-shadow:2px 0 6px rgba(0,21,41,.35);}
.i-layout-sider-fix{position:fixed;top:0;left:0;bottom:0;z-index:10000;}
.i-layout-inside-fix-with-sider-collapse{padding-left:80px;}
.i-layout-inside-fix-with-sider{padding-left:256px;}

.i-layout-sider-logo{width:100%;height:65px;text-align:center;}
.i-layout-sider-logo img{width:auto;height:100%;display:inline-block;}

.ivu-menu-dark,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened{background:#101117;}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title{background:#191a23 !important;}

.i-menu{height:49px;position:relative;}
.i-menu .ivu-dropdown-rel{width:80px;height:100%;}
.i-menu .ivu-dropdown-rel a{display:block;width:100%;height:100%;text-align:center;line-height:49px;color:#ddd;}
.i-menu .ivu-dropdown-rel a:hover{color:#fff;}
.i-menu:hover{background:#101117;}
.i-menu .ivu-select-dropdown{margin-left:5px;background:#191a23;}
.i-menu .ivu-dropdown-item{color:#fff;}
.i-menu .ivu-dropdown-item:hover{background:#2d8cf0;}

.i-layout-header{background:#fff;box-shadow:0 1px 4px rgba(0,21,41,.08);padding:0;}
.i-layout-header-fix{position:fixed;top:0;right:0;left:256px;z-index:11;}
.i-layout-header-fix-collapse{position:fixed;top:0;right:0;left:80px;z-index:11;}
.i-layout-header-breadcrumb{display:inline-block;}
.i-layout-header-breadcrumb>span:last-child{font-weight:normal;}

.icon-collapsed{margin:0 15px;font-size:18px;position:relative;top:2px;cursor:pointer;color:#515a6e;}
.icon-reload{margin-right:15px;font-size:18px;position:relative;top:2px;cursor:pointer;color:#515a6e;}

.i-layout-header-right{float:right;height:100%;padding-right:15px;}
.i-avatar{margin-right:10px;}

.i-layout-content{padding-top:64px;position:relative;}

.i-layout-tabs-main{padding:6px 10px;position:relative;background:#f5f7f9;}
.i-layout-tabs{padding-right:32px;}
.i-layout-tabs .ivu-tabs-bar{margin-bottom:0;border-bottom:0;}
.i-layout-tabs .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab{border:0;background:#fff;border-radius:4px;margin-right:6px;}
.i-layout-tabs .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab .ivu-tabs-close{width:22px;margin-right:-6px;}
.i-layout-tabs-close{position:absolute;right:10px;top:6px;}
.i-layout-tabs-close .ivu-dropdown-rel a{display:block;width:32px;height:32px;background:#fff;border-radius:4px;text-align:center;line-height:32px;font-size:16px;}

.i-layout-content-main{width:100%;background:#f5f7f9;position:absolute;left:0;top:108px;bottom:0;}
</style>