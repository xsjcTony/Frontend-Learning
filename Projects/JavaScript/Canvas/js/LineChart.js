class LineChart {
  /**
   * Create <canvas> element for line chart.
   * @param {number} width - Width of canvas, default to 300
   * @param {number} height - Height of canvas, default to 150
   */
  constructor (width = 300, height = 150) {
    // create canvas element
    this.canvas = document.createElement('canvas')
    this.canvas.width = width
    this.canvas.height = height
    document.body.appendChild(this.canvas)

    // get context
    this.ctx = this.canvas.getContext('2d')
  }

  /**
   * Draw grids in canvas.
   * @param {number} gridSize - Size of each grid, default to 20
   */
  drawGrid (gridSize = 20) {
    const ctx = this.ctx

    const canvasWidth = ctx.canvas.width
    const canvasHeight = ctx.canvas.height

    const numRow = Math.floor(canvasHeight / gridSize)
    const numColumn = Math.floor(canvasWidth / gridSize)

    // draw rows
    for (let i = 0; i < numRow; i++) {
      ctx.beginPath()
      ctx.moveTo(0, i * gridSize - 0.5)
      ctx.lineTo(canvasWidth, i * gridSize - 0.5)
      ctx.strokeStyle = '#ccc'
      ctx.stroke()
    }

    // draw columns
    for (let i = 0; i < numColumn; i++) {
      ctx.beginPath()
      ctx.moveTo(i * gridSize - 0.5, 0)
      ctx.lineTo(i * gridSize - 0.5, canvasHeight)
      ctx.strokeStyle = '#ccc'
      ctx.stroke()
    }
  }

  /**
   * Draw coordinate System.
   * @param {number} gridSize - Size of each grid, default to 20
   */
  drawCoordSys (gridSize = 20) {
    const ctx = this.ctx

    const canvasWidth = ctx.canvas.width
    const canvasHeight = ctx.canvas.height

    // origin
    const originX = gridSize
    const originY = canvasHeight - gridSize
    // end point
    const endX = canvasWidth - gridSize
    const endY = gridSize
    // draw x-axis
    ctx.beginPath()
    ctx.moveTo(originX, originY - 0.5)
    ctx.lineTo(endX, originY - 0.5)
    ctx.strokeStyle = '#000'
    ctx.stroke()
    // draw x-axis arrow
    ctx.lineTo(endX - 10, originY - 0.5 + 5)
    ctx.lineTo(endX - 10, originY - 0.5 - 5)
    ctx.lineTo(endX, originY - 0.5)
    ctx.fill()
    // draw y-axis
    ctx.beginPath()
    ctx.moveTo(originX - 0.5, originY)
    ctx.lineTo(originX - 0.5, endY)
    ctx.strokeStyle = '#000'
    ctx.stroke()
    // draw y-axis arrow
    ctx.lineTo(originX - 0.5 + 5, endY + 10)
    ctx.lineTo(originX - 0.5 - 5, endY + 10)
    ctx.lineTo(originX - 0.5, endY)
    ctx.fill()
  }

  /**
   * Draw data points.
   * @param {Array<Object>} list - The data list containing x and y coordinate of each data point.
   * @param {number} pointSize - Size of each data point, default to 10
   */
  drawDataPoint (list, pointSize = 10) {
    const ctx = this.ctx

    for (const dot of list) {
      ctx.beginPath()
      ctx.moveTo(dot.x - pointSize / 2 - 0.5, dot.y - pointSize / 2 - 0.5)
      ctx.lineTo(dot.x - pointSize / 2 + pointSize - 0.5, dot.y - pointSize / 2 - 0.5)
      ctx.lineTo(dot.x - pointSize / 2 + pointSize - 0.5, dot.y - pointSize / 2 + pointSize - 0.5)
      ctx.lineTo(dot.x - pointSize / 2 - 0.5, dot.y - pointSize / 2 + pointSize - 0.5)
      ctx.closePath()
      ctx.fill()
    }
  }

  /**
   * Draw data line passing through all data points.
   * @param {Array<Object>} list - The data list containing x and y coordinate of each data point.
   */
  drawDataLine (list) {
    const ctx = this.ctx

    ctx.beginPath()
    for (let i = 0; i < list.length; i++) {
      if (i === 0) {
        ctx.moveTo(list[i].x - 0.5, list[i].y - 0.5)
      } else {
        ctx.lineTo(list[i].x - 0.5, list[i].y - 0.5)
      }
    }
    ctx.stroke()
  }
}