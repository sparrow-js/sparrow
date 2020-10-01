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



  /**
   *   getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
   */
}