/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */

import { Service } from 'egg'
import { Op } from 'sequelize'
import type { Menu } from '../model/Menu'
import type { AddMenuData, MenuQueryData, ModifyMenuData } from '../types'
import type { IFindOptions } from 'sequelize-typescript'


export default class MenusService extends Service {

  /**
   * Get menus by query info (REST API - GET)
   */
  public async getMenusByQuery(query: MenuQueryData): Promise<{
    rows: Menu[]
    count: number
  }> {
    let baseOptions: IFindOptions<Menu> = {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }

    if (query.current && query.pageSize) {
      const currentPageNumber = parseInt(query.current) || 1
      const pageSize = parseInt(query.pageSize) || 5

      baseOptions = {
        ...baseOptions,
        limit: pageSize,
        offset: (currentPageNumber - 1) * pageSize
      }
    }

    if (query.levelSorting) {
      baseOptions = {
        ...baseOptions,
        order: [['level', query.levelSorting], ['id', 'asc']]
      }
    }

    let whereOptions: IFindOptions<Menu>['where'] = {}

    if (query.menuDescription) {
      whereOptions = {
        ...whereOptions,
        menuDescription: { [Op.substring]: query.menuDescription }
      }
    }

    if (query.parentId) {
      whereOptions = {
        ...whereOptions,
        parentId: query.parentId
      }
    }

    if (query.menuKey) {
      whereOptions = {
        ...whereOptions,
        menuKey: { [Op.substring]: query.menuKey }
      }
    }

    if (query.level) {
      whereOptions = {
        ...whereOptions,
        level: query.level
      }
    }

    return this.ctx.model.Menu.findAndCountAll({
      ...baseOptions,
      where: whereOptions
    })
  }


  /**
   * Look for menu based on given `PRIMARY KEY`
   */
  public async getMenuById(id: string): Promise<Menu> {
    const menu = await this.ctx.model.Menu.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })

    if (menu) {
      return menu
    } else {
      throw new Error('message.menus.menu.missing')
    }
  }


  /**
   * Add menu to database (REST API - POST)
   */
  public async createMenu(data: AddMenuData): Promise<Menu> {
    const { menuName, menuDescription, menuKey } = data

    const p1 = await this._findMenu({ menuName })
    if (p1) {
      throw new Error('message.menus.menu-name.exist')
    }

    const p2 = await this._findMenu({ menuDescription })
    if (p2) {
      throw new Error('message.menus.menu-description.exist')
    }

    const p3 = await this._findMenu({ menuKey })
    if (p3) {
      throw new Error('message.menus.menu-key.exist')
    }

    return this.ctx.model.Menu.create(data)
  }


  /**
   * Update menu in database (REST API - PUT)
   */
  public async updateMenu(id: string, data: ModifyMenuData): Promise<Menu> {
    const menu = await this.getMenuById(id)
    const { menuName, menuDescription, menuKey } = data

    if (data.menuState === undefined) {
      // modifying details
      if (menuName !== menu.menuName) {
        const p = await this._findMenu({ menuName })
        if (p) {
          throw new Error('message.menus.menu-name.exist')
        }
      }

      if (menuDescription !== menu.menuDescription) {
        const p = await this._findMenu({ menuDescription })
        if (p) {
          throw new Error('message.menus.menu-description.exist')
        }
      }

      if (menuKey !== menu.menuKey) {
        const p = await this._findMenu({ menuKey })
        if (p) {
          throw new Error('message.menus.menu-key.exist')
        }
      }

      await menu.update(data)
    } else {
      // modifying state
      if (menu.parentId === 0) {
        await this.ctx.model.Menu.update({ menuState: data.menuState }, { where: { parentId: menu.id } })
      }

      await menu.update(data)
    }

    const res = menu.toJSON() as Menu
    delete res.updatedAt
    return res
  }


  /**
   * Delete menu in database (REST API - DELETE)
   */
  public async deleteMenu(id: string): Promise<Menu> {
    const menu = await this.getMenuById(id)

    if (menu.parentId === 0) {
      const p = await this._findMenu({ parentId: menu.id })
      if (p) {
        throw new Error('message.menus.delete.associated')
      }
    }

    await menu.destroy()
    return menu
  }


  /**
   * Helper functions
   */

  /**
   * Look for **ONE** menu from database based on given `WHERE` options
   * @private
   */
  private async _findMenu(options: IFindOptions<Menu>['where']): Promise<Menu | null> {
    return this.ctx.model.Menu.findOne({ where: options })
  }
}
