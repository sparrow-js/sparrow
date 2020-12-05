export function getApiTemp (apiType: string, apiName: any) {

  let temp = '';

  if (apiType === 'getList') {
    temp = `
      async ${apiName}() {
        this.listLoading = true
        const res = await ${apiName}(this.listQuery);
        if (res && res.status === 0) {
          this.list = res.data.items
          this.total = res.data.total
          this.listLoading = false
        }
      },
    `;
  }

  return temp;
}