<style lang="less">
    @import '../styles/menu.less';
</style>

<template>
    <Menu ref="sideMenu" :active-name="$route.name" :open-names="openNames" :theme="menuTheme" width="auto" @on-select="changeMenu">
        <template v-for="levelOne in menuList">
            <Submenu v-if="levelOne.children.length >=1" :name="levelOne.name" :key="levelOne.path">
                <template slot="title">
                    <Icon :type="levelOne.icon" :size="iconSize"></Icon>
                    <span class="layout-text">{{ itemTitle(levelOne) }}</span>
                </template>
                <template v-for="levelTwo in levelOne.children">
                    <MenuItem class="levelOneSubmenu" v-if="isThirdLeveMenu(levelTwo)==false" :name="levelTwo.name" :key="levelTwo.name">
                        <Icon :type="levelTwo.icon" :size="iconSize" :key="levelTwo.name_icon"></Icon>
                        <span class="layout-text" :key="levelTwo.name_span">{{ levelTwo.title }}</span>
                    </MenuItem>
                       <Submenu class="levelTwoSubmenu" v-if="isThirdLeveMenu(levelTwo)==true" :name="levelTwo.name" :key="'menuitem' + levelTwo.name">
                            <template slot="title">
                                <Icon :type="levelTwo.icon" :size="iconSize" :key="'icon' + levelTwo.name"></Icon>
                                <span class="layout-text" :key="'title' + levelTwo.name">{{ itemTitle(levelTwo) }}</span>
                            </template>
                            <template v-for="levelThree in levelTwo.children">
                                <MenuItem :name="levelThree.name" :key="'menuitem' + levelThree.name">
                                <Icon :type="levelThree.icon" :size="iconSize" :key="'icon' + levelThree.name"></Icon>
                                <span class="layout-text" :key="'title' + levelThree.name">{{ itemTitle(levelThree) }}</span>
                                </MenuItem>
                            </template>
                        </Submenu>
                </template>
            </Submenu>
        </template>
    </Menu>
</template>

<script>
export default {
    name: 'sidebarMenu',
    props: {
        menuList: Array,
        iconSize: Number,
        menuTheme: {
            type: String,
            default: 'dark'
        },
        openNames: {
            type: Array
        }
    },
    methods: {
        isThirdLeveMenu(child){
            if (child.children) {
                if (child.children.length > 0) return true;
                else return false;
            }
            else {
                return false;
            }
        },
        changeMenu (active) {
            this.$emit('on-change', active);
        },
        itemTitle (item) {
            if (typeof item.title === 'object') {
                return this.$t(item.title.i18n);
            } else {
                return item.title;
            }
        }
    },
    updated () {
        this.$nextTick(() => {
            if (this.$refs.sideMenu) {
                this.$refs.sideMenu.updateOpened();
            }
        });
    }

};
</script>
