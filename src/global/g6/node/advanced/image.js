
/**
 * Created by OXOYO on 2019/7/8.
 *
 * 椭圆
 */
import { mix } from '@antv/util'
import base from '../base'
import utils from '../../utils'
export default {
  name: 'fwq',
  extendName: 'common',
  options: {
    /*  img: 'https://yyb.gtimg.com/aiplat/page/product/visionimgidy/img/demo6-16a47e5d31.jpg?max_age=31536000',
     size: 200,
     label: 'AntV Team',
     labelCfg: {
       position: 'bottom'
     },
     // 裁剪图片配置
     clipCfg: {
       show: true,
       type: 'circle',
       r: 15
     }, */
    // ...base,
    // shapeType: 'path',
    /*  getShapeStyle (cfg) {
      const size = this.getSize(cfg)
      const width = size[0]
      const height = size[1]
      const x = 0 - width / 2
      const y = 0 - height / 2
      const path = [
        // 左顶点
        ['M', -width / 2, 0],
        // 左上顶点
        ['L', -width / 2, -height / 2],
        // 右上顶点
        ['L', width / 2, -height / 2],
        // 右下顶点
        ['L', width / 2, height / 2],
        // 左下顶点
        ['L', -width / 2, height / 2],
        ['Z']
      ]
      const color = cfg.color
      const style = mix({}, {
        // 节点的位置在上层确定，所以这里仅使用相对位置即可
        x,
        y,
        width,
        height,
        path,
        stroke: color
      }, cfg.style)
      return style
    }, */
    afterDraw (cfg, group) {
      const size = cfg.size
      const width = size[0] - 1
      const height = size[1] - 1
      // 添加图片
      //  const image =
      group.addShape('image', {
        attrs: {
          x: -width / 2,
          y: -height / 2,
          width: width,
          height: height,
          img: 'https://yyb.gtimg.com/aiplat/page/product/visionimgidy/img/demo6-16a47e5d31.jpg?max_age=31536000'
          //  cfg.img
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: 'image-shape'
      })
      // 绘制锚点
      utils.anchor.draw(cfg, group)
      // 绘制shapeControl
      utils.shapeControl.draw(cfg, group)
      // 执行旋转动画
      /*  image.animate((ratio) => {
         const matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1]
         const toMatrix = Util.transform(matrix, [
           ['r', ratio * Math.PI * 2]
         ])
         return {
           matrix: toMatrix
         }
       }, {
         repeat: true,
         duration: 3000,
         easing: 'easeCubic'
       }) */
    }

  }
}
