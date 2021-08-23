<template>
  <div>
    <el-form-item :colon="false" label="显示">
      <el-radio-group v-model="form.display" @change="displayChange">
        <el-radio-button label="block">
          <el-tooltip placement="top" content="block">
            <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="16" height="16" viewBox="0 0 22 14" class="ve-svgicon" style="vertical-align: middle;" data-spm-anchor-id="a1z13ml.21220313.0.i36.57f474e5NPDzZw"><path opacity=".15" d="M19 3v8H3V3h16m1-1H2v10h18V2z"></path><path d="M19.8 1H2.2A1.2 1.2 0 0 0 1 2.2v9.6A1.2 1.2 0 0 0 2.2 13h17.6a1.2 1.2 0 0 0 1.2-1.2V2.2A1.2 1.2 0 0 0 19.8 1zm.2 11H2V2h18v10z"></path><path opacity=".35" d="M3 3h16v8H3z"></path></svg>
          </el-tooltip>
        </el-radio-button>
        <el-radio-button label="inline-block">
          <el-tooltip placement="top" content="inline-block">
            <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="16" height="16" viewBox="0 0 28 14" class="ve-svgicon" style="vertical-align: middle;"><path d="M25 3v8H3V3h22m1-1H2v10h24V2z" opacity=".15"></path><path opacity=".35" d="M8.418 9.8H7.66L7.25 11h1.58l-.232-.676-.18-.525zM3 11h.567l2.916-7.94h3.15L11 6.78V3H3v8zm15.12-1.002a3.302 3.302 0 0 1-.48-.586c-.173.343-.42.653-.73.888.002 0 .004-.002.005-.003l-.008.006.003-.003a3.145 3.145 0 0 1-1.092.55c-.4.11-.825.15-1.303.15h6.017a4.416 4.416 0 0 1-1.12-.215 3.51 3.51 0 0 1-1.292-.787zM14.237 3c.49 0 .853.014 1.167.06.335.05.656.16.953.314h.003l.004.003c.365.19.694.492.898.866.13.234.197.49.24.747.16-.298.343-.58.578-.82v-.002c.358-.366.8-.643 1.287-.826a4.373 4.373 0 0 1 1.557-.272 5.67 5.67 0 0 1 1.442.18l.01.002.01.003c.205.06.4.126.59.208.15.064.283.125.407.185l.562.274v3.016h-1.54l-.28-.24a7.018 7.018 0 0 0-.233-.188 2.703 2.703 0 0 0-.26-.175 1.594 1.594 0 0 0-.277-.125h-.006l-.2-.03a.772.772 0 0 0-.26.042l-.16.102a.63.63 0 0 0-.13.22 1.486 1.486 0 0 0-.075.516c0 .266.04.436.074.513a.59.59 0 0 0 .13.212l.15.09h.003a.868.868 0 0 0 .265.045l.236-.037h.008a1.04 1.04 0 0 0 .25-.113l.007-.004.01-.005.24-.16a6.41 6.41 0 0 0 .216-.17l.285-.254h1.536v3.017l-.59.266c-.15.066-.292.13-.422.184a4.19 4.19 0 0 1-.53.19 5.918 5.918 0 0 1-.636.15c-.076.012-.16.02-.24.026H25V3H14.237z"></path><path d="M25.8 1H2.2A1.2 1.2 0 0 0 1 2.2v9.6A1.2 1.2 0 0 0 2.2 13h23.6a1.2 1.2 0 0 0 1.2-1.2V2.2A1.2 1.2 0 0 0 25.8 1zm.2 11H2V2h24v10zm-7.186-2.72c.258.248.567.435.927.56s.76.19 1.18.19c.29 0 .51-.014.68-.042.167-.028.34-.07.53-.123.143-.04.28-.09.41-.146l.412-.19V8.16h-.154c-.07.06-.157.134-.265.22a3.337 3.337 0 0 1-.35.237 2.11 2.11 0 0 1-.485.22 1.798 1.798 0 0 1-1.1-.01 1.403 1.403 0 0 1-.523-.3c-.15-.14-.28-.33-.38-.57a2.36 2.36 0 0 1-.152-.9c0-.347.047-.64.14-.88s.216-.433.367-.58c.157-.15.33-.26.517-.325a1.786 1.786 0 0 1 1.116-.014c.164.056.316.125.457.206a4.868 4.868 0 0 1 .644.466h.17V4.54a13.03 13.03 0 0 0-.367-.168 3.667 3.667 0 0 0-1.005-.27 4.736 4.736 0 0 0-.65-.04c-.436 0-.837.07-1.205.207s-.675.333-.924.59c-.26.262-.457.58-.59.95S18 6.6 18 7.055c0 .488.07.918.213 1.29s.343.683.6.933zm-3.264.607c.272-.076.52-.2.75-.38.195-.15.35-.338.46-.567.113-.23.17-.488.17-.778 0-.4-.11-.722-.332-.967-.22-.245-.52-.406-.896-.484v-.03a1.46 1.46 0 0 0 .623-.51 1.36 1.36 0 0 0 .22-.77c0-.25-.052-.47-.16-.665a1.15 1.15 0 0 0-.49-.465 2.065 2.065 0 0 0-.64-.215A7.67 7.67 0 0 0 14.237 4H12v6h2.515c.418 0 .763-.037 1.035-.113zM13.478 5.1h.14c.29 0 .517.002.678.006s.296.027.404.07c.12.05.206.123.253.223a.69.69 0 0 1 .072.29.86.86 0 0 1-.062.34c-.042.1-.13.18-.263.24a1.05 1.05 0 0 1-.39.08c-.166.007-.366.01-.6.01h-.233V5.1zm.108 3.8h-.108V7.405h.324c.222 0 .434 0 .638.004.203 0 .363.02.48.05.17.05.29.13.36.23s.106.25.106.44c0 .144-.03.272-.087.384s-.17.2-.32.27a1.257 1.257 0 0 1-.5.104c-.18.003-.48.004-.9.004zm-6.64-.1h2.187l.41 1.2h1.574L8.935 4.06H7.182L5 10h1.535l.412-1.2zM8.04 5.58l.727 2.13H7.313l.727-2.13z"></path></svg>
          </el-tooltip>
        </el-radio-button>
        <el-radio-button label="inline">
          <el-tooltip placement="top" content="inline">
            <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="16" height="16" viewBox="0 0 20 8" class="ve-svgicon" style="vertical-align: middle;"><path d="M14.814 6.25c.258.248.567.435.927.56s.76.19 1.18.19c.29 0 .51-.014.68-.042.167-.028.34-.07.53-.123.143-.04.28-.09.41-.146l.41-.19V5.13h-.153c-.07.06-.157.134-.265.22a3.337 3.337 0 0 1-.35.237 2.11 2.11 0 0 1-.484.22 1.798 1.798 0 0 1-1.1-.01 1.403 1.403 0 0 1-.523-.3 1.566 1.566 0 0 1-.38-.57c-.1-.24-.152-.54-.152-.9 0-.346.048-.638.14-.878s.217-.437.368-.58c.16-.155.33-.26.52-.33a1.786 1.786 0 0 1 1.117-.013c.165.055.317.124.458.205a4.385 4.385 0 0 1 .643.47h.17V1.52c-.107-.05-.23-.107-.37-.168a3.613 3.613 0 0 0-1.003-.27 4.736 4.736 0 0 0-.65-.04c-.436 0-.837.07-1.205.207s-.674.33-.923.59c-.26.26-.458.58-.59.95S14 3.57 14 4.02c0 .488.07.918.213 1.29s.343.683.6.933zm-3.264.608c.272-.075.52-.2.75-.377a1.5 1.5 0 0 0 .46-.56 1.72 1.72 0 0 0 .17-.77c0-.4-.11-.72-.332-.96-.22-.244-.52-.404-.896-.48v-.04a1.46 1.46 0 0 0 .623-.516c.147-.22.22-.474.22-.763 0-.25-.052-.47-.16-.66a1.152 1.152 0 0 0-.49-.46 2.06 2.06 0 0 0-.64-.212A7.67 7.67 0 0 0 10.237 1H8v5.97h2.515c.418 0 .763-.037 1.035-.112zM9.478 2.095h.14c.29 0 .517.002.678.006.162.01.296.03.404.07a.46.46 0 0 1 .253.23.69.69 0 0 1 .072.298.85.85 0 0 1-.062.34.492.492 0 0 1-.263.24 1.052 1.052 0 0 1-.39.08c-.166.006-.366.01-.6.01h-.232v-1.27zm.108 3.78h-.108V4.388h.324c.222 0 .434 0 .638.004a1.8 1.8 0 0 1 .48.056c.17.05.29.127.36.23.07.104.106.25.106.44 0 .144-.03.272-.087.383s-.17.2-.32.27-.32.1-.5.11c-.18.004-.48.004-.9.004zm-6.64-.106h2.187l.41 1.2h1.574L4.935 1.03H3.182L1 6.97h1.535l.412-1.2zM4.04 2.55l.727 2.13H3.313l.727-2.13z"></path></svg>
          </el-tooltip>
        </el-radio-button>
        <el-radio-button label="flex">
          <el-tooltip placement="top" content="flex">
            <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="16" height="16" viewBox="0 0 23 14" class="ve-svgicon" style="vertical-align: middle;"><g fill-rule="evenodd"><path d="M21 2v10H2V2h19zm1-1H1v12h21V1z" opacity=".15"></path><path d="M1.2 0A1.2 1.2 0 0 0 0 1.2v11.6A1.2 1.2 0 0 0 1.2 14h20.6a1.2 1.2 0 0 0 1.2-1.2V1.2A1.2 1.2 0 0 0 21.8 0H1.2zM22 13H1V1h21v12z"></path><path opacity=".4" d="M3 3h5v8H3z"></path><path d="M4 4v6h3V4H4zm4-1v8H3V3h5z"></path><path opacity=".4" d="M9 3h5v8H9z"></path><path d="M10 4v6h3V4h-3zm4-1v8H9V3h5z"></path><path opacity=".4" d="M15 3h5v8h-5z"></path><path d="M16 4v6h3V4h-3zm4-1v8h-5V3h5z"></path></g></svg>
          </el-tooltip>
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <div class="flex-box style-config-black" v-if="display === 'flex'">
      <el-form-item :colon="false" label="弹性布局">
        <el-radio-group v-model="form.flexDirection" @change="flexDirectionChange" class="mb10">
          <el-radio-button label="row">
            <el-tooltip placement="top" content="Direction:row">
              <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="20" height="20" viewBox="0 0 19 9" class="ve-svgicon" style="vertical-align: middle;"><g fill-rule="evenodd"><path d="M16 4h-4v1h4v2l3-2.5L16 2v2zM6 0h5v9H6z"></path><path opacity=".4" d="M1 1h3v7H1z"></path><path d="M1 1v7h3V1H1zM0 0h5v9H0V0z"></path></g></svg>
            </el-tooltip>
          </el-radio-button>
           <el-radio-button label="column">
            <el-tooltip placement="top" content="Direction:column">
              <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="20" height="20" viewBox="0 0 9 18" class="ve-svgicon" style="vertical-align: middle;" data-spm-anchor-id="a1z13ml.21220313.0.i72.57f474e5NPDzZw"><g fill-rule="evenodd"><path d="M0 6h9v5H0zm5 9v-3H4v3H2l2.5 3L7 15H5z"></path><path opacity=".4" d="M1 1h7v3H1z"></path><path d="M1 1v3h7V1H1zM0 0h9v5H0V0z"></path></g></svg>
            </el-tooltip>
          </el-radio-button>
           <el-radio-button label="row-reverse">
            <el-tooltip placement="top" content="Direction:row-reverse">
              <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="20" height="20" viewBox="0 0 19 9" class="ve-svgicon vs-style-reverse-h" style="vertical-align: middle;"><g fill-rule="evenodd"><path d="M16 4h-4v1h4v2l3-2.5L16 2v2zM6 0h5v9H6z"></path><path opacity=".4" d="M1 1h3v7H1z"></path><path d="M1 1v7h3V1H1zM0 0h5v9H0V0z"></path></g></svg>
            </el-tooltip>
          </el-radio-button>
           <el-radio-button label="column-reverse">
            <el-tooltip placement="top" content="Direction:column-reverse">
              <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="20" height="20" viewBox="0 0 9 18" class="ve-svgicon vs-style-reverse-v" style="vertical-align: middle;"><g fill-rule="evenodd"><path d="M0 6h9v5H0zm5 9v-3H4v3H2l2.5 3L7 15H5z"></path><path opacity=".4" d="M1 1h7v3H1z"></path><path d="M1 1v3h7V1H1zM0 0h9v5H0V0z"></path></g></svg>
            </el-tooltip>
          </el-radio-button>
        </el-radio-group>

        <el-radio-group v-model="form.alignItems" @change="alignItemsChange" class="mb10">
          <el-radio-button label="flex-start">
            <el-tooltip placement="top" content="Align:flex-start">
              <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="20" height="20" viewBox="0 0 21 18" class="ve-svgicon" style="vertical-align: middle;"><g fill-rule="evenodd"><path opacity=".5" d="M0 0h21v1H0z"></path><path d="M11 2h5v9h-5z"></path><path opacity=".4" d="M6 3h3v7H6z"></path><path d="M6 3v7h3V3H6zM5 2h5v9H5V2z"></path></g></svg>
            </el-tooltip>
          </el-radio-button>

           <el-radio-button label="center">
            <el-tooltip placement="top" content="Align:center">
              <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="20" height="20" viewBox="0 0 21 9" class="ve-svgicon" style="vertical-align: middle;"><g fill-rule="evenodd"><path d="M0 4h21v1H0V4zm4.5 0h6v1h-6V4zm6 0h6v1h-6V4z" opacity=".5"></path><path d="M11 0h5v9h-5z"></path><path opacity=".4" d="M6 1h3v7H6z"></path><path d="M6 1v7h3V1H6zM5 0h5v9H5V0z"></path></g></svg>
            </el-tooltip>
          </el-radio-button>

           <el-radio-button label="flex-end">
            <el-tooltip placement="top" content="Align:flex-end">
              <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="20" height="20" viewBox="0 0 21 18" class="ve-svgicon" style="vertical-align: middle;"><g fill-rule="evenodd"><path opacity=".5" d="M0 17h21v1H0z"></path><path d="M11 7h5v9h-5z"></path><path opacity=".4" d="M6 8h3v7H6z"></path><path d="M6 8v7h3V8H6zM5 7h5v9H5V7z"></path></g></svg>
            </el-tooltip>
          </el-radio-button>

           <el-radio-button label="stretch">
            <el-tooltip placement="top" content="Align:stretch">
              <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="20" height="20" viewBox="0 0 21 18" class="ve-svgicon" style="vertical-align: middle;"><g fill-rule="evenodd"><path opacity=".5" d="M0 17h21v1H0zM0 0h21v1H0z"></path><path d="M11 2h5v14h-5z"></path><path opacity=".4" d="M6 3h3v12H6z"></path><path d="M6 3v12h3V3H6zM5 2h5v14H5V2z"></path></g></svg>
            </el-tooltip>
          </el-radio-button>

          <el-radio-button label="baseline">
            <el-tooltip placement="top" content="Align:baseline">
              <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="20" height="20" viewBox="0 0 21 11" class="ve-svgicon" style="vertical-align: middle;"><g fill-rule="evenodd"><path d="M0 5h21v1H0V5zm4.5 0h6v1h-6V5zm6 0h6v1h-6V5z" opacity=".5"></path><path d="M11 1h5v9h-5V1zm1 1h3v3h-3V2z"></path><path opacity=".4" d="M6 5h3v5H6z"></path><path d="M6 3v7h3V3H6zM5 2h5v9H5V2z"></path></g></svg>
            </el-tooltip>
          </el-radio-button>
        </el-radio-group>

        <el-radio-group  v-model="form.justifyContent" @change="justifyContentChange">
          <el-radio-button label="flex-start">
            <el-tooltip placement="top" content="Justify:flex-start">
              <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="20" height="20" viewBox="0 0 24 17" class="ve-svgicon" style="vertical-align: middle;"><g fill-rule="evenodd"><path opacity=".5" d="M0 0h1v17H0z"></path><path d="M8 4h5v9H8z"></path><path opacity=".4" d="M3 5h3v7H3z"></path><path d="M3 5v7h3V5H3zM2 4h5v9H2V4z"></path></g></svg>
            </el-tooltip>
          </el-radio-button>

          <el-radio-button label="center">
            <el-tooltip placement="top" content="Justify:center">
              <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="20" height="20" viewBox="0 0 13 17" class="ve-svgicon" style="vertical-align: middle;"><g fill-rule="evenodd"><path opacity=".5" d="M6 0h1v17H6z"></path><path d="M8 4h5v9H8z"></path><path opacity=".4" d="M1 5h3v7H1z"></path><path d="M1 5v7h3V5H1zM0 4h5v9H0V4z"></path></g></svg>
            </el-tooltip>
          </el-radio-button>

          <el-radio-button label="flex-end">
            <el-tooltip placement="top" content="Justify:flex-end">
              <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="20" height="20" viewBox="0 0 24 17" class="ve-svgicon" style="vertical-align: middle;"><g fill-rule="evenodd"><path opacity=".5" d="M23 0h1v17h-1z"></path><path d="M17 4h5v9h-5z"></path><path opacity=".4" d="M12 5h3v7h-3z"></path><path d="M12 5v7h3V5h-3zm-1-1h5v9h-5V4z"></path></g></svg>
            </el-tooltip>
          </el-radio-button>

          <el-radio-button label="space-between">
            <el-tooltip placement="top" content="Justify:space-between">
              <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="20" height="20" viewBox="0 0 24 17" class="ve-svgicon" style="vertical-align: middle;"><g fill-rule="evenodd"><path opacity=".5" d="M0 0h1v17H0zm23 0h1v17h-1z"></path><path d="M17 4h5v9h-5z"></path><path opacity=".4" d="M3 5h3v7H3z"></path><path d="M3 5v7h3V5H3zM2 4h5v9H2V4z"></path></g></svg>
            </el-tooltip>
          </el-radio-button>

          <el-radio-button label="space-around">
            <el-tooltip placement="top" content="Justify:space-around">
              <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="20" height="20" viewBox="0 0 16 17" class="ve-svgicon" style="vertical-align: middle;"><g fill-rule="evenodd"><path d="M2 0h1v17H2V0zm0 3.5h1v10H2v-10zM13 0h1v17h-1V0zm0 3.5h1v10h-1v-10z" opacity=".5"></path><path d="M11 4h5v9h-5z"></path><path opacity=".4" d="M1 5h3v7H1z"></path><path d="M1 5v7h3V5H1zM0 4h5v9H0V4z"></path></g></svg>
            </el-tooltip>
          </el-radio-button>
        </el-radio-group>

      </el-form-item>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    display: {
      type: String,
      default: ''
    },
    flexDirection: {
      type: String,
      default: ''
    },
    justifyContent: {
      type: String,
      default: ''
    },
    alignItems: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      form: {
        display: this.display,
        flexDirection: this.flexDirection,
        justifyContent: this.justifyContent,
        alignItems: this.alignItems,
      },
      test: ''
    };
  },
  methods: {
    displayChange (value) {
      this.$emit('displayChange', value);
    },
    flexDirectionChange (value) {
      this.$emit('flexDirectionChange', value);
    },
    justifyContentChange (value) {
      this.$emit('justifyContentChange', value);
    },
    alignItemsChange (value) {
      this.$emit('alignItemsChange', value);
    }
  }
}
</script>
<style lang="scss" scoped>
.flex-box{
  background-color: rgba(31,56,88,.04);
  padding: 8px;
}
.mb10{
  margin-bottom: 10px;
}
.vs-style-reverse-v{
  transform-origin: center;
  transform: scaleY(-1);
}
.vs-style-reverse-h {
  transform-origin: center;
  transform: scaleX(-1);
}
</style>
<style lang="scss">
.style-config-black .ant-form-item-label{
  margin-bottom: 10px;
}
</style>