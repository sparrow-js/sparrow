import Block from './modules/block'


export default async () => {
  return {
    block: {
      isAvailable: true,
      module: Block,
    }
  }
}