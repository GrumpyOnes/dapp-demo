#### 基于next.js [next.js文档](https://www.nextjs.cn/docs/getting-started)
- 安装chakra-ui 
    ```
    yarn add @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6
    ```
- 安装ether.js
    ```
    yarn add ethers
    ```
- 修改_app.tsx 增加头尾（没用的功能）

#### 增加区块链功能
- 连接metamask


#### 使用web3react swr交互
- 使用web3react 
   - 引入可全局使用hook  useWeb3React
   - 可方便地使用多种Connector
   - 可方便获得连接状态
   - 可方便连接智能合约
- 使用SWR 处理调用与Cache
- 监听合约事件 实时显示erc20余额

