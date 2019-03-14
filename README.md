## HOW TO RUN

#### mysql
- install mysql
- change config https://github.com/CauseXL/Egg/blob/master/service/config/config.default.js#L14
- https://github.com/CauseXL/Egg/blob/master/service/database/config.json#L4

#### backend
- cd service
- npm install
- npm run dev

#### fontend
- cd client
- npm install
- npm run start










将没有被Route组件包裹的组件 提供路由相关的功能

``` js
import { withRouter } from 'react-router'

export default withRouter(LoginForm)
```

TBD
