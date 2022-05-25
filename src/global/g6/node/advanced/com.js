/* 为图片量身打造 */
import { mix } from '@antv/util'
import utils from '../../utils'
export default {
  name: 'common',
  extendName: 'single-node',
  options: {
    style: {
      fill: 'rgba(255,255,255,0)',
      fillOpacity: 1,
      lineDash: [],
      lineWidth: 0,
      stroke: '#f00',
      strokeOpacity: 1
    },
    shapeType: 'path',
    drawShape (cfg, group) {
      debugger
      cfg.style.lineWidth = 0
      const shapeType = this.shapeType
      const style = this.getShapeStyle(cfg)
      const keyShape = group.addShape(shapeType, {
        attrs: style,
        name: 'XFCNodeKeyShape',
        draggable: true
      })
      this.keyShape = keyShape
      return keyShape
    },
    getAnchorPoints (cfg) {
      const { anchorPoints, width, height } = cfg
      const keyShape = this.keyShape
      const points = []
      if (anchorPoints && anchorPoints.length) {
        for (let i = 0, len = anchorPoints.length; i < len; i++) {
          const point = keyShape.getPoint((i + 1) / len)
          // 方式一：通过坐标反推占比
          const x = point.x
          const y = point.y
          // 坐标系转换
          const x1 = width / 2 + x
          const y1 = height / 2 + y
          // 百分比
          const px = x1 / width
          const py = y1 / height
          points.push([px, py])
          // 方式二：覆盖坐标，有BUG
          // points.push([...anchorPoints[i], {
          //   x: bbox.minX + point.x,
          //   y: bbox.minY + point.y
          // }])
        }
      }
      // console.log('points', points)
      return points
    },
    setState (name, value, item) {
      // 设置锚点状态
      utils.anchor.setState(name, value, item)
      // 设置shapeControl状态
      utils.shapeControl.setState(name, value, item)
    },
    update (cfg, item) {
      // 自定义节点配置
      const defaultStyle = this.options
      // 从新计算图形样式
      const shapeStyle = this.getShapeStyle(cfg)
      const style = mix({}, defaultStyle, shapeStyle)
      // 更新图形
      this.updateShape(cfg, item, style)
    },
    updateShape (cfg, item, style) {
      const keyShape = item.get('keyShape')
      keyShape.attr({
        ...style
      })
      // 更新图形文本
      this.updateLabel(cfg, item)
    },
    // 绘制完成后附加锚点
    afterDraw (cfg, group) {
      // 绘制锚点
      utils.anchor.draw(cfg, group)
      // 绘制shapeControl
      utils.shapeControl.draw(cfg, group)
    },
    // 更新完成后更新锚点
    afterUpdate (cfg, item) {
      const group = item.getContainer()
      // 更新锚点
      utils.anchor.update(cfg, group)
      // 更新shapeControl
      utils.shapeControl.update(cfg, group)
    },

    getShapeStyle (cfg) {
      debugger
      const size = this.getSize(cfg)
      const width = size[0]
      const height = size[1]
      const x = 0 - width / 2
      const y = 0 - height / 2
      const path = [
        // 左上顶点
        ['M', -width / 2, -height / 2],
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
    }
  }
}
