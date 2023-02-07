<!--
 * @FilePath: README.md
 * @Author: yu
 * @Date: 2023-02-01 22:20:09
 * @LastEditors: 
 * @LastEditTime: 2023-02-07 15:05:58
 * @Descripttion: 
-->
# node-express-mysql
node+express+mysql的后端项目，论文用

## 数据库  

### user表  

    id, username, password

### goods表

    id, title, price, cost, goods_img, classify, createTime, updateTime

 ```
 DROP TABLE IF EXISTS `goods`;
    CREATE TABLE `goods`  (
    `id` int(16) NOT NULL AUTO_INCREMENT,
    `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '名称',
    `price` decimal(10, 2) NOT NULL COMMENT '销售价',
    `cost` decimal(10, 2) NOT NULL COMMENT '成本价',
    `goods_img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品图片',
    `classify` int(1) NOT NULL DEFAULT 0 COMMENT '商品分类  0-宠物 1-宠物用品',
    `createtime` datetime NOT NULL COMMENT '创建时间',
    `updatetime` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`) USING BTREE
    ) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;
 
 ```