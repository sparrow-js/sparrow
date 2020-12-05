import App from './App';
import ViewsIndex from './views/index';
import Utils from './utils';
import Styles from './styles';
import Router from './router/init';
import mixins from './mixins';
import components from './components';
import main from './main';
import Api from './api';

export default {
  ...App,
  ...ViewsIndex,
  ...Utils,
  ...Styles,
  ...Router,
  ...mixins,
  ...components,
  ...main,
  ...Api,
};