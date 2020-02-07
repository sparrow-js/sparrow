const scriptViewStr = `
  import generatorMixin from '../mixins/generatorMixin';
  export default {
    mixins: [generatorMixin]
  };
`;

const scriptBlockStr = `
  export default {}
`;

const initScriptStr = `
  export default {
    mixins: [],
    data () {
      return {};
    },
    components: {},
    methods: {}
  }
`;

export default {
  scriptViewStr,
  initScriptStr,
  scriptBlockStr
};