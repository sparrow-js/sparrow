import clipboard from './clipboard';
import message from './message';
import request from './request';
import scrollTo from './scroll-to';
import validate from './validate';


export default {
  ...clipboard,
  ...message,
  ...request,
  ...scrollTo,
  ...validate,
}