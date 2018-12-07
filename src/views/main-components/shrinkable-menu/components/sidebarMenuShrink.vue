<template>
    <div>
        <template v-for="(item, index) in menuList">
            <div style="text-align: left;" :key="index">
                <Dropdown placement="right-start" :key="index" @on-click="changeMenu">
                    <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <Icon :size="20" :color="iconColor" :type="item.icon"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <template v-if="!(child.children&&child.children.length)" v-for="(child, i) in item.children">
                            <DropdownItem style="text-align:left;" :name="child.name" :key="i"><Icon :type="child.icon"></Icon><span style="padding-left:10px;">{{ itemTitle(child) }}</span></DropdownItem>
                        </template>
                        <template v-else> 
                            <DropdownItem  @click.native="changeSubmenu(child.name)" v-if="!(child.children&&child.children.length)" :name="child.name" :key="i"><Icon :type="child.icon"></Icon><span style="padding-left:10px;">{{ itemTitle(child) }}</span></DropdownItem>
                            <Dropdown style="width: 120px;" v-else placement="right-start">
                                <DropdownItem :name="child.name" :key="i">
                                        <Icon :type="child.icon"></Icon>
                                        <span style="padding-left:10px;">{{ itemTitle(child) }}</span>
                                        <Icon style="padding-left:10px;" type="ios-arrow-forward"></Icon>
                                </DropdownItem>
                                <DropdownMenu  slot="list">
                                    <DropdownItem style="text-align:left;" v-for="(grandChild,grandIndex) in child.children" :key="grandIndex" @click.native="changeSubmenu(grandChild.name)">
                                        <Icon :type="grandChild.icon"></Icon><span style="padding-left:10px;">{{ itemTitle(grandChild) }}</span>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </template>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'sidebarMenuShrink',
    props: {
        menuList: {
            type: Array
        },
        iconColor: {
            type: String,
            default: 'white'
        },
        menuTheme: {
            type: String,
            default: 'darck'
        }
    },
    methods: {
        // dropdown组件on-click事件
        changeMenu (active) {
            active&&this.$emit('on-change', active);
        },
        // dropdown组件嵌套没法触发，调用原生click事件
        changeSubmenu (active) {
            active&&this.$emit('on-change', active);
        },
        itemTitle (item) {
            if (typeof item.title === 'object') {
                return this.$t(item.title.i18n);
            } else {
                return item.title;
            }
        }
    },
    created () {
    }
};
</script>
