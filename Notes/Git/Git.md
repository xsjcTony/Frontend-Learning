# Git



> [Git](https://git-scm.com/)
>
> [Git for Windows](https://gitforwindows.org/)
>
> [猴子都能懂的GIT入门 | 贝格乐](https://backlog.com/git-tutorial/cn/)
>
> [20-Git版本控制 - 简书](https://www.jianshu.com/p/c20b416e6db3)



## 定义

- 一款 `分布式` 版本控制系统
- 自由, 开源
- 作者是 `Linux` 之父李纳斯

---

## 工作原理

- 一个仓库包含 `工作区` 和 `版本库`



### 工作区

- 仓库文件夹里面除了 `.git` 目录以外的内容



### 版本库

- 仓库文件夹中的 `.git` 目录
- 用于存储记录版本信息
- 主要包含
    - 暂缓区: 暂时存储文件
    - 分支: 初始化仓库时会默认有一个 `master` 分支
    - HEAD指针: 用于指向当前分支, 默认指向 `master`

---

## 使用环境

- 单人开发初始化一个 `本地库` 即可
    - 任何文件夹 / U盘 / 硬盘
- 多人开发时需要一个 `共享版本库`
    - 自己搭建git服务器 / 托管到第三方平台 ( `github` 等)

---

## 使用流程



### 单人开发

准备工作 (只做一次)

1. 准备一个工作区
2. 在工作区中初始化仓库
3. 设置姓名以及邮箱
4. 检查配置情况

开发阶段 (反复执行)

1. 编写代码
2. 完成一个功能后, 将文件添加到暂缓区 (文件默认不会被管理) <span style="color: yellow">【一定要是可以运行的代码】</span>
3. 将暂缓区内容添加到分支中
4. 重复 1~3 操作, 注释要认真编写, 与提交内容保持一致



### 多人开发

准备工作 (只做一次)

1. 项目负责人打开远程服务器, 然后创建一个工作区
2. 项目负责人在远程服务器上初始化仓库
3. 开发人员在自己的电脑上克隆远程服务器上的仓库
4. 开发人员设置姓名以及邮箱

开发阶段 (重复执行)

1. 下载远程服务器上的最新代码
2. 如有代码冲突需要手动处理
3. 编写代码
4. 完成一个功能后, 将文件添加到暂缓区 (文件默认不会被管理) <span style="color: yellow">【一定要是可以运行的代码】</span>
5. 将暂缓区内容添加到分支中
6. 重复 3~5 操作, 注释要认真编写, 与提交内容保持一致
7. 将本地代码提交到远程服务器 <span style="color: yellow;">(必须先下载远程服务器上的更新才能提交)</span>

---

## 分支 - GitFlow

定义

- 是一种分支使用的规范

分支

- `master` : 用于保存上线版本的代码
- `develop` : 用于保存相对稳定版本的代码, 所有的 `feature` 分支都从该分支创建
- `feature/*featureName*` : 用于开发新的功能, 不同的功能创建不同的功能分支
- `release/*versionNumber*` : 用于代码上线前的准备 (测试, 文档完善, bug修复), 从 `develop` 分支创建
- `bugfix/*bugName*` : 用于修复不紧急的bug
- `hotfix/*` : 用于修复紧急的bug

流程

1. 准备阶段
    1. 项目经理在远程服务器初始化共享版本库
    2. 在其自己电脑上给 `master` 做标记并提交到远程服务器
    3. 基于 `master` 分支创建 `develop` 分支并提交到远程服务器
    4. 给开发人员分配工作任务

2. 开发阶段
    1. 开发人员在自己电脑上基于 `deveop` 分支创建 `feature` 分支, 根据功能命名
    2. 执行单人开发的开发步骤
    3. 完成功能开发后告诉项目经理, 审核通过后将代码合并到 `develop` 分支
3. 准备上线阶段
    1. 项目经理基于 `develop` 分支创建 `release` 分支, 根据版本命名
    2. 测试人员获取 `release` 分支的代码并进行测试
    3. 发现bug后由开发人员基于 `release` 分支创建 `bugfix` 分支进行修复, 根据bug命名
    4. 修复完成后将代码合并到 `release` 分支
    5. 测试和修复完成后将最终代码合并到 `develop` 分支
    6. 将 `develop` 分支的代码合并到 `master` 分支中
4. 正式上线阶段
    1. 项目经理给 `master` 分支做标记并提交到远程服务器
5. 上线之后
    1. 如遇到紧急bug则需要基于 `master` 分支创建 `hotfix` 分支, 根据bug命名
    2. 修复完成后重新合并到 `develop` 分支和 `master` 分支上
    3. 项目经理在 `master` 分支上做标记并提交到远程服务器
    4. 重复第 2~5 大步

---

## 指令



### 初始化

- `git init` : 初始化本地的一个全新的空仓库
    - `git init --bare` : 初始化远程服务器上的一个全新的空仓库

- `git config -l` : 查看 `git` 的所有配置项

- `git config user.name` / `git config user.email` : 设置自己的姓名和联系方式, 必须设定



### 文件管理

- <span style="color: yellow;">皆为本地操作</span>
- `git status` : 查看当前仓库状态
- `git add` : 将文件从工作区添加到暂缓区
    - `git add *fileName*` : 添加指定文件
    - `git add .` : 添加所有文件
- `git commit -m "*description*"` : 将暂缓区中的所有文件添加到HEAD指针指向的分支中, 并添加注释 (需认真编写, 与提交内容保持一致)
- `git diff *fileName*` : 查看指定文件的修改内容
- `git log` : 查看整个项目的修改记录 (包括修改人和修改时间)
    - `git log *fileName*` : 查看指定文件的修改记录
- `git reflog` : 查看整个项目的修改记录 (精简版)
    - `git reflog *fileName*` : 查看指定文件的修改记录
- `git reset` : 恢复到版本
    - `git reset --hard HEAD^` : 恢复到上一个版本
    - `git reset --hard HEAD^^` : 恢复到上上个版本
    - `git reset --hard HEAD~N` : 恢复到上N个版本
    - `git reset --hard *versionNumber*` : 恢复到指定版本 (通过 `git reflog` 中的版本号恢复)
- `git tag` : 查看所有标记 (标记需要额外提交至远程服务器)
    - `git tag -a *tagName* -m *description*` : 给当前版本添加标记, 包括名称和描述
    - `git push *tagName*` : 将标记提交到远程服务器
    - `git push --delete origin *tagName*` : 删除远程服务器的标记



### 与远程共享版本库交互

- `git clone *repoUrl*` : 从远程服务器上下载当前项目的共享版本库
- `git push` : 将本地代码提交到远程服务器的共享版本库
    - `git push *branchName*` : 将本地分支提交到远程服务器
    - `git push *tagName*` : 将标记提交到远程服务器
    - `git push --delete origin *tagName*` : 删除远程服务器的标记
    - `git push origin --delete *branchName*` : 删除远程服务器上的指定分支
- `git pull` : 将远程服务器最新的共享版本库下载到本地



### 分支相关

- `git branch` : 查看当前仓库的所有分支 ( `*` 代表当前HEAD指针指向的分支) (空仓库不会输出任何内容)
    - `git branch -r` : 查看远程服务器的仓库中的所有分支
- `git branch *branchName*` : 创建指定名字的新分支, 新创建的分支会继承当前分支的所有状态 (分支需要额外提交至远程服务器)
    - `git push *branchName*` : 将本地分支提交到远程服务器
- `git switch *branchName*` : 切换分支, 将HEAD指针的指向根据分支名调整为指定分支
- `git merge *branchName*` : 将指定分支中的代码合并到当前分支中, 如有代码冲突需要手动处理
    - `git merge --no-ff *branchName*` : 合并时无论是否可以快进都会多加一个合并的 `commit`
- `git branch -d *branchName*` : 删除指定分支 (仅删除本地)
    - `git push origin --delete *branchName*` : 删除远程服务器上的指定分支



### 忽略文件

> [github/gitignore: A collection of useful .gitignore templates](https://github.com/github/gitignore)
>
> [.gitignore file - ignoring files in Git | Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials/saving-changes/gitignore)

- `touch .gitignore` : 添加忽略规则文件, 并编写规则即可

---

## 注意点

- 多人开发中写完一个可以运行的功能就立刻提交代码, 因为在企业开发中谁后提交谁就负责解决冲突, 谁的工作量就大

