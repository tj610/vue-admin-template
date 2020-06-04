<template>
  <Layout class="i-layout">
    <Sider ref="leftSider" hide-trigger collapsible :width="256" :collapsed-width="80" v-model="isCollapsed" class="i-layout-sider-dark i-layout-sider-fix">
      <template v-if="!isCollapsed">
        <div class="i-layout-sider-logo"><img src="../assets/images/logo_w.png"></div>
        <Menu theme="dark" accordion width="auto" :open-names="[curOpenName]" :active-name="curMenuName" @on-select="onSelectMenu" ref="leftMenu">
          <Submenu :name="item.name" v-for="(item,index) in menuList" :key="index">
            <template slot="title"><Icon :type="item.icon" />{{item.name}}</template>
            <MenuItem :name="menu.name" :to="menu.path" v-for="(menu,index) in item.submenu" :key="index">{{menu.name}}</MenuItem>
          </Submenu>
        </Menu>
      </template>
      <template v-if="isCollapsed">
        <div class="i-layout-sider-logo" v-if="isCollapsed"><img src="../assets/images/logo_small.png" style="height:80%;margin-top:10px;"></div>
        <Dropdown class="i-menu" placement="right-start" v-for="(item,index) in menuList" :key="index">
          <a href="javascript:void(0)"><Icon :type="item.icon" size="16" /></a>
          <DropdownMenu slot="list">
            <DropdownItem v-for="(menu,index) in item.submenu" :key="index">{{menu.name}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </template>
    </Sider>
    <Layout :class="rightSider">
      <Header class="i-layout-header dark" :class="rightHeader">
        <i class="iconfont icon-collapsed" :class="rotateIcon" @click="collapsedSider"></i>
        <i class="iconfont icon-htmal5icon23 icon-reload" @click="reloadApp"></i>
        <Breadcrumb class="i-layout-header-breadcrumb">
          <BreadcrumbItem>首页</BreadcrumbItem>
          <BreadcrumbItem>{{curOpenName}}</BreadcrumbItem>
          <BreadcrumbItem>{{curMenuName}}</BreadcrumbItem>
        </Breadcrumb>
        <div class="i-layout-header-right">
          <Dropdown @on-click="onClickUser">
            <a href="javascript:void(0)">
              <Avatar style="background-color: #87d068" icon="ios-person" /> Admin
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem name="userCenter">个人中心</DropdownItem>
              <DropdownItem name="logout" divided>退出登录</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Header>
      <Content class="i-layout-content">
        <div class="i-layout-tabs-main">
          <div class="i-layout-tabs">
            <Tabs type="card" :value="tagsActive" @on-click="onSelectTags" @on-tab-remove="onRemoveTags">
              <TabPane :label="item.meta.title" :name="item.name" v-for="item in tagsList" :key="item.name" :closable="item.name!='console' ? true : false"></TabPane>
            </Tabs>
          </div>
          <div class="i-layout-tabs-close">
            <Dropdown placement="bottom-end" @on-click="onSelectTagsTools">
              <a href="javascript:void(0)"><Icon type="ios-arrow-down"></Icon></a>
              <DropdownMenu slot="list">
                <DropdownItem name="other"><Icon type="md-close"></Icon> 关闭其他</DropdownItem>
                <DropdownItem name="all"><Icon type="md-close-circle"></Icon> 关闭所有</DropdownItem>
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
            {name: '用户列表', path: '/dashboard/userList'},
            {name: '新增用户', path: '/dashboard/userAdd'},
          ] 
        }
      ],
      curOpenName: this.$storage.getStorage('curOpenName') || 'Dashboard',
      curMenuName: this.$storage.getStorage('curMenuName') || '主控台',
      tagsList: this.$storage.getStorage('tagsList') || {console: {name: 'console', path: '/dashboard/console', meta: { title: '主控台'}}},
      tagsActive: this.$storage.getStorage('tagsActive') || 'console'
    }
  },
  watch: {
    $route(newValue, oldValue) {
      let obj = {
        name: newValue.name,
        path: newValue.path,
        meta: newValue.meta
      }
      this.tagsList[obj.name] = obj
      this.tagsActive = obj.name
      this.$storage.setStorage('tagsList', this.tagsList)
      this.$storage.setStorage('tagsActive', this.tagsActive)
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
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$storage.setStorage('tagsList', this.tagsList)
    },
    collapsedSider() {
      this.$refs.leftSider.toggleCollapse()
    },
    onSelectMenu(name) {
      this.curMenuName = name
      this.$storage.setStorage('curMenuName', name)
      this.matchOpenName()
    },
    matchOpenName() {
      this.menuList.forEach((v,i) => {
        v.submenu.forEach((vv,ii) => {
          if(vv.name == this.curMenuName){
            this.curOpenName = v.name
            this.$storage.setStorage('curOpenName', this.curOpenName)
            this.$nextTick(() =>{
              this.$refs.leftMenu.updateOpened()
            })
          }
        })
      })
    },
    onSelectTags(name) {
      this.$router.push(this.tagsList[name].path)
      this.curMenuName = this.tagsList[name].meta.title
      this.$storage.setStorage('curMenuName', this.curMenuName)
      this.matchOpenName()
    },
    onRemoveTags(name) {
      let keys = Object.keys(this.tagsList)
      let newName = ''
      keys.map((key,i) => {
        if(key == name){
          newName = keys[i-1]
        }
      })
      delete this.tagsList[name]
      this.$storage.setStorage('tagsList', this.tagsList)
      this.onSelectTags(newName)
    },
    onSelectTagsTools(name) {
      let keys = Object.keys(this.tagsList)
      switch(name) {
        case 'other':
          keys.map((key) => {
            if(key != this.tagsActive && key != 'console'){
              this.$delete(this.tagsList, key)
            }
          })
          this.$storage.setStorage('tagsList', this.tagsList)
          break
        case 'all':
          for(let key in this.tagsList){
            if(key != 'console'){
              this.$delete(this.tagsList, key)
            }
          }
          this.$storage.setStorage('tagsList', this.tagsList)
          this.onSelectTags('console')
          break
      }
    },
    onClickUser(name) {
      switch(name) {
        case 'logout':
          this.$storage.clearAll()
          this.$router.push('/login')
          break
      }
    },
    reloadApp() {
      window.location.reload()
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

.i-layout-header.dark{background:linear-gradient(90deg,#1d42ab,#2173dc,#1e93ff);color:#fff;}
.i-layout-header.dark .icon-collapsed{color:#fff;}
.i-layout-header.dark .icon-reload{color:#fff;}
.i-layout-header.dark .ivu-breadcrumb{color:rgba(255,255,255,.7);}
.i-layout-header.dark .ivu-breadcrumb>span:last-child{color:#fff;}
.i-layout-header.dark a{color:#fff;}

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