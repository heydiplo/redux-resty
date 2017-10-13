import _restReducer from './reducer';
export { _restReducer as restReducer };
import _load from './decorator';
export { _load as load };
import _restAdapter from './adapters/rest';
export { _restAdapter as restAdapter };

import middleware from './middleware';

export default middleware;