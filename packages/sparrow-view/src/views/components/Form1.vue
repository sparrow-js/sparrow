<template>
  <div class="root">
    <box-form>
      <el-form label-width="100px"
        ><component-box :is-active="false" indexcomp="0" uuid="d537cd06">
          <el-form-item label=" ">
            <label-box label="上传头像" indexcomp="0" />

            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccessd537cd06"
              :before-upload="beforeAvatarUploadd537cd06"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else="" class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item> </component-box
      ></el-form>
    </box-form>
  </div>
</template>

<script>
export default {
  methods: {
    handleAvatarSuccessd537cd06(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },

    beforeAvatarUploadd537cd06(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }

      return isJPG && isLt2M;
    }
  },

  data() {
    return {
      form: {
        name: ""
      },
      imageUrl: ""
    };
  }
};
</script>
