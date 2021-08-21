
import { default as themeAs } from '../themes';
import { default as intlAs } from '../intl';
import { API as Context, Integration } from './context';


declare namespace Layout {
  export { Context };
}

namespace Layout {
  export const themes = themeAs;
  export const intl = intlAs;
  export const Provider = Integration.Provider;
  export const useContext = Integration.useContext;
};



export default Layout;